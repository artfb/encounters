import { scaleLinear } from '@vx/scale';
import statesAbbrs from '../static/name-abbr.json';

export const mapNameToState = (name) => statesAbbrs[name];
export const getYear = (date) => date.split('/')[2]

export const byYear = (ufos) => ufos.reduce((acc, curr) => {
  return curr.country === 'us' ?
    {
      ...acc,
      [getYear(curr.date_documented)]: [...(acc[getYear(curr.date_documented)] || []), curr],
    } : acc
}, {});


export const statesByYear = (year) => (ufos) => ufos.reduce((acc, curr) => {
  return {
    ...acc,
    [curr.state.toUpperCase()]:
      year === getYear(curr.date_documented)
        ? (acc[curr.state.toUpperCase()] || 0) + 1
        : acc[curr.state.toUpperCase()] || 0,
  }
}, {});

export const color = (max) => scaleLinear({
  domain: [
    0,
    max / 50
  ],
  range: ['#ffb01d', '#ffa020', '#ff9221', '#ff8424', '#ff7425', '#fc5e2f', '#f94b3a', '#f63a48']
});
