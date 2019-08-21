import React from 'react';
import { Pie } from '@vx/shape';
import { Group } from '@vx/group';
import { Text } from '@vx/text';

const usage = d => d.number;

export const PieTop = ({ width, height, data }) => {
  const radius = Math.min(width, height) / 2;
  const centerY = height / 2;
  const centerX = width / 2;

  return (
    <svg width={width} height={height}>
      <Group top={centerY} left={centerX}>
        <Pie
          data={data}
          pieValue={usage}
          outerRadius={radius - 80}
          innerRadius={radius - 120}
          padAngle={0}
          top={10}
        >
          {pie => {
            return pie.arcs.map((arc, i) => {
              const opacity = 1 / (i + 2);
              const [centroidX, centroidY] = pie.path.centroid(arc);
              const { startAngle, endAngle } = arc;
              const hasSpaceForLabel = endAngle - startAngle >= 0.1;
              return (
                <g key={`browser-${arc.data.label}-${i}`}>
                  <path d={pie.path(arc)} fill={'#f63a48'} fillOpacity={opacity} />
                  {hasSpaceForLabel && (
                    <text
                      fill={'#000'}
                      x={centroidX}
                      y={centroidY}
                      dy=".33em"
                      fontSize={9}
                      textAnchor="middle"
                    >
                      {arc.data.name}
                    </text>
                  )}
                </g>
              );
            });
          }}
        </Pie>
        <Text textAnchor="middle" verticalAnchor="middle">Most invaded since 2006</Text>
      </Group>
    </svg>
  );
};
