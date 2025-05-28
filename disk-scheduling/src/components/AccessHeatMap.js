import React, { useMemo } from 'react';

const AccessHeatMap = ({ accessHistory, totalTracks, width = 600, height = 100 }) => {
  // Process data for heatmap
  const heatmapData = useMemo(() => {
    const trackAccesses = new Array(totalTracks).fill(0);
    accessHistory.forEach(access => {
      trackAccesses[access.track]++;
    });

    // Create bins for the heatmap
    const binSize = Math.ceil(totalTracks / 50); // Adjust number of bins as needed
    const bins = [];
    
    for (let i = 0; i < totalTracks; i += binSize) {
      const binSum = trackAccesses.slice(i, i + binSize).reduce((a, b) => a + b, 0);
      bins.push({
        bin: i,
        count: binSum
      });
    }

    return bins;
  }, [accessHistory, totalTracks]);

  const maxCount = Math.max(...heatmapData.map(d => d.count));
  const binWidth = width / heatmapData.length;

  // Function to convert count to color
  const getColor = (count) => {
    const intensity = count / maxCount;
    const r = Math.round(intensity * 255);
    return `rgb(${r}, 0, 0)`;
  };

  return (
    <div className="relative">
      <svg width={width} height={height}>
        {heatmapData.map((bin, i) => (
          <g key={i}>
            <rect
              x={i * binWidth}
              y={0}
              width={binWidth}
              height={height}
              fill={getColor(bin.count)}
              rx={2}
            >
              <title>{`Tracks ${bin.bin}-${bin.bin + Math.ceil(totalTracks / 50)}: ${bin.count} accesses`}</title>
            </rect>
          </g>
        ))}
      </svg>
      <div className="absolute -bottom-6 left-0 text-sm text-gray-400">Track 0</div>
      <div className="absolute -bottom-6 right-0 text-sm text-gray-400">Track {totalTracks}</div>
    </div>
  );
};

export default AccessHeatMap; 