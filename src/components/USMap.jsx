import React from 'react';
import { AlbersUsa } from '@vx/geo';
import topology from '../static/us-states.json';
import { mapNameToState, color } from '../utils/helpers.js';

const bg = '#f9f7e8';

export const USMap = ({ onStateSelect, ufos }) => {
  return (
    <AlbersUsa data={topology.features}>
      {({ path, features }) => {
        return (
          <g>
            {features.map((feature, i) => {
              const { feature: f } = feature;
              const occ = ufos[mapNameToState(f.properties.name)];

              return (
                <path
                  className="state-path"
                  key={`map-feature-${i}`}
                  d={path(f)}
                  fill={color(Object.entries(ufos).reduce((a, [, o]) => a + o, 0))(occ || 0)}
                  stroke={bg}
                  strokeWidth={1}
                  onClick={event => {
                    onStateSelect([f.properties.name, mapNameToState(f.properties.name)])
                  }}
                />
              );
            })}
          </g>
        );
      }}
    </AlbersUsa>
  );
}
