import React, { useEffect, useState } from 'react';
import { byYear, statesByYear, filterState } from '../utils/helpers';
import { USMap } from './USMap';
import { USMapOccurencies } from './USMapOccurrencies';
import { Bars } from './Bars';
import { PieTop } from './Pie';

export const ChartsPlayground = () => {
  const [ufos, setUfos] = useState([]);
  const [ufosByState, setUfosByState] = useState({});
  const [ufosByYear, setUfosByYear] = useState();
  const [showDots, setShowDots] = useState(false);
  const [currentState, setCurrentState] = useState([]);
  const [year, setYear] = useState('');
  const [years, setYears] = useState([]);
  const [top, setTop] = useState([]);

  const handleSelect = (e) => {
    setYear(e.target.value)
  }

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://localhost:3003');
      const j = await response.json();
      const years = Object.entries(byYear(j)).reduce((acc, [year]) => new Set([...acc, year]), []);

      setUfos(j);
      setYears([...years]);
      setYear([...years][0])
      setUfosByYear(byYear(j))

      const sortedOccur = Object.entries(statesByYear()(j)).sort(([,a], [,b]) => b - a);
      const all = sortedOccur.reduce((acc, curr) => acc + curr[1] ,0);
      const topOcc = sortedOccur.reduce((acc, [name, occ]) => ([
        ...acc,
        {
          name,
          number: occ / all * 100
        }
      ]), [])
      setTop(topOcc)
    }

    getData();
  }, [])

  useEffect(() => {
    if (year && ufos) {
      setUfosByState(statesByYear(year)(ufos));
    }
  }, [year, ufos]);

  const toggleDots = (e) => {
    setShowDots(!showDots)
  }
  const filteredByState = filterState(ufosByYear)(currentState[1]);

  return (
    <div className="App">
      <div><h1>Charts playground</h1></div>
      <div style={{ flex: 1 }}><PieTop data={top} height={600} width={600} /></div>
      <div className="charts">
        <div style={{ flex: 1 }}>
          <div className="controls">
            <div>
              <input type="checkbox" onChange={toggleDots} checked={showDots} />
              <label>show occurrences</label>
            </div>
            <div>
              <select onChange={handleSelect} value={year}>
                {years.map(year => <option key={year} value={year}>{year}</option>)}
              </select>
            </div>
            <div>
              <button onClick={() => setCurrentState([])}>show all states</button>
            </div>

          </div>

          <svg width={960} height={600}>
            <USMap onStateSelect={setCurrentState} ufos={ufosByState} />
            {!!ufosByYear && showDots && <USMapOccurencies data={ufosByYear[year]} />}
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div>
            {currentState[0] || 'USA'} in {year}
          </div>
          <Bars
            height={300}
            width={600}
            data={
              Object.entries(filterState(ufosByYear)(currentState[1]) || {}).reduce((acc, [xValue, enc]) => ([...acc, {
                xValue,
                yValue: enc.length,
              }]), [])
            }
          />
          <Bars
            height={300}
            width={600}
            data={(() => {
              const f = filteredByState && filteredByState[year].reduce((acc, curr) => {
                const month = curr.date_documented.split('/')[0]

                return {
                  ...acc,
                  [month]: (acc[month] || 0) + 1
                }
              }, {});
              return f ? Object.entries(f).reduce((acc, [xValue, yValue]) => ([...acc, {
                xValue,
                yValue,
              }]), []) : []
            })()}
          />
        </div>
      </div>
    </div>
  )
}
