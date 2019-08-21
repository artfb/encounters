import React from 'react';
import { Circle } from '@vx/shape';
import { AlbersUsa } from '@vx/geo';

export const USMapOccurencies = ({ data }) => {
  return (
    <AlbersUsa data={data}>
      {({ path, features }) => {
        return features.map(({ feature: f, projection }, i) => {
          const pos = [parseFloat(f.longitude), parseFloat(f.latitude)];
          return !!projection(pos) && <Circle
            key={`${pos[0]}${pos[1]}${i}`}
            cx={projection(pos)[0]}
            cy={projection(pos)[1]}
            r={3}
          />
        });
      }}
    </AlbersUsa>
  )
}
