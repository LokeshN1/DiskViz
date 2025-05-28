import React from 'react';
import { motion } from 'framer-motion';

const HeadMovementGraph = ({ movements }) => {
  // Make the graph bigger with fixed dimensions
  const width = 800;
  const height = 400;
  const margin = { top: 30, right: 30, bottom: 50, left: 60 };
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;

  // Calculate scales manually
  const maxTrack = Math.max(...movements.map(m => m.track), 1);
  const scaleY = (graphHeight - 20) / maxTrack; // Add 20px padding to prevent touching edges
  const scaleX = graphWidth / Math.max(movements.length - 1, 1);

  // Create points for the path
  const points = movements.map((m, i) => {
    const x = margin.left + (i * scaleX);
    const y = height - margin.bottom - (m.track * scaleY);
    return `${x},${y}`;
  }).join(' ');

  // Generate axis ticks
  const yAxisTicks = Array.from({ length: 5 }, (_, i) => {
    const value = Math.round((maxTrack / 4) * i);
    const y = height - margin.bottom - (value * scaleY);
    return { value, y };
  });

  const xAxisTicks = Array.from({ length: Math.min(movements.length, 10) }, (_, i) => {
    const step = Math.floor((movements.length - 1) / Math.min(9, Math.max(movements.length - 1, 1)));
    const index = i * step;
    const x = margin.left + (index * scaleX);
    return { value: index, x };
  });

  return (
    <div className="w-full flex justify-center items-center bg-gray-900 rounded-lg p-6">
      <svg width={width} height={height} className="max-w-full">
        {/* Grid lines */}
        {yAxisTicks.map(({ y }, i) => (
          <line
            key={`grid-${i}`}
            x1={margin.left}
            y1={y}
            x2={width - margin.right}
            y2={y}
            stroke="#374151"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
        ))}

        {/* Y-axis */}
        <line
          x1={margin.left}
          y1={margin.top}
          x2={margin.left}
          y2={height - margin.bottom}
          stroke="#6B7280"
          strokeWidth={2}
        />
        
        {/* X-axis */}
        <line
          x1={margin.left}
          y1={height - margin.bottom}
          x2={width - margin.right}
          y2={height - margin.bottom}
          stroke="#6B7280"
          strokeWidth={2}
        />

        {/* Y-axis ticks and labels */}
        {yAxisTicks.map(({ value, y }) => (
          <g key={`y-tick-${value}`}>
            <line
              x1={margin.left - 5}
              y1={y}
              x2={margin.left}
              y2={y}
              stroke="#6B7280"
              strokeWidth={2}
            />
            <text
              x={margin.left - 10}
              y={y}
              textAnchor="end"
              dominantBaseline="middle"
              fill="#9CA3AF"
              fontSize={12}
            >
              {value}
            </text>
          </g>
        ))}

        {/* X-axis ticks and labels */}
        {xAxisTicks.map(({ value, x }) => (
          <g key={`x-tick-${value}`}>
            <line
              x1={x}
              y1={height - margin.bottom}
              x2={x}
              y2={height - margin.bottom + 5}
              stroke="#6B7280"
              strokeWidth={2}
            />
            <text
              x={x}
              y={height - margin.bottom + 20}
              textAnchor="middle"
              fill="#9CA3AF"
              fontSize={12}
            >
              {value}
            </text>
          </g>
        ))}

        {/* Movement path */}
        {movements.length > 1 && (
          <>
            <motion.polyline
              points={points}
              fill="none"
              stroke="#3B82F6"
              strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            {/* Movement points */}
            {movements.map((m, i) => {
              const x = margin.left + (i * scaleX);
              const y = height - margin.bottom - (m.track * scaleY);
              return (
                <motion.circle
                  key={`point-${i}`}
                  cx={x}
                  cy={y}
                  r={4}
                  fill="#3B82F6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                />
              );
            })}
          </>
        )}

        {/* Axis labels */}
        <text
          x={-height/2}
          y={margin.left/2 - 10}
          transform={`rotate(-90)`}
          textAnchor="middle"
          fill="#9CA3AF"
          fontSize={14}
          fontWeight="bold"
        >
          Track Number
        </text>
        <text
          x={width/2}
          y={height - 5}
          textAnchor="middle"
          fill="#9CA3AF"
          fontSize={14}
          fontWeight="bold"
        >
          Request Sequence
        </text>
      </svg>
    </div>
  );
};

export default HeadMovementGraph; 