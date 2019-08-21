import React from 'react';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { GradientTealBlue } from '@vx/gradient';
import { scaleBand, scaleLinear } from '@vx/scale';

// accessors
const x = d => parseInt(d.xValue);
const y = d => d.yValue;

export const Bars = ({ width, height, data }) => {
  if (!data) return null;

  // bounds
  const yMax = height - 50 - 50;
  const xMax = width - 50 - 50;
  // scales
  const xScale = scaleBand({
    domain: data.map(x),
    padding: 0.4,
    range : [0, xMax]
  });
  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map(y))],
    range: [yMax, 0]
  });

  return (
    <svg width={width} height={height}>
      <GradientTealBlue id="teal" />
      <Group top={50} left={50}>
        {data.map((d, i) => {
          const year = x(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - yScale(y(d));
          const barX = xScale(year);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${year}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .5)"
            />
          );
        })}
        <AxisLeft
          scale={yScale}
          tickValues={yScale.ticks().filter(Number.isInteger)}
        />
        <AxisBottom
          top={yMax}
          scale={xScale}
        />
      </Group>
    </svg>
  );
};
