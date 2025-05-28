import React from 'react';
import { motion } from 'framer-motion';

const DiskPlatter = ({ currentTrack, totalTracks, requests, headPosition }) => {
  const size = 400;
  const center = size / 2;
  const radius = (size - 40) / 2;
  
  // Calculate radius for a given track
  const getTrackRadius = (track) => {
    return (track / totalTracks) * (radius - 20) + 20;
  };

  // Calculate arm angle based on current position
  const armAngle = (headPosition / totalTracks) * 360;

  return (
    <div className="relative">
      <div className="w-[400px] h-[400px]">
        <svg width={size} height={size}>
          {/* Platter background */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="#2a2a2a"
            stroke="#444"
            strokeWidth={2}
          />
          
          {/* Track circles */}
          {Array.from({ length: 10 }).map((_, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={getTrackRadius((totalTracks / 10) * i)}
              fill="none"
              stroke="#444"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
          ))}

          {/* Request points */}
          {requests.map((request, i) => (
            <circle
              key={i}
              cx={center + Math.cos((request.track / totalTracks) * Math.PI * 2) * getTrackRadius(request.track)}
              cy={center + Math.sin((request.track / totalTracks) * Math.PI * 2) * getTrackRadius(request.track)}
              r={4}
              fill={request.isProcessed ? "#4CAF50" : "#FFA726"}
            />
          ))}

          {/* Disk arm */}
          <motion.line
            x1={center}
            y1={center}
            x2={center + Math.cos(armAngle * Math.PI / 180) * radius}
            y2={center + Math.sin(armAngle * Math.PI / 180) * radius}
            stroke="#E91E63"
            strokeWidth={3}
            animate={{
              x2: center + Math.cos(armAngle * Math.PI / 180) * radius,
              y2: center + Math.sin(armAngle * Math.PI / 180) * radius,
            }}
            transition={{ type: "spring", stiffness: 100 }}
          />

          {/* Track labels */}
          {Array.from({ length: 5 }).map((_, i) => {
            const track = Math.round((totalTracks / 4) * i);
            const radius = getTrackRadius(track);
            const angle = -45 * (Math.PI / 180); // Position labels at -45 degrees
            return (
              <text
                key={i}
                x={center + Math.cos(angle) * radius}
                y={center + Math.sin(angle) * radius}
                fill="#666"
                fontSize={12}
                textAnchor="end"
              >
                {track}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Current Track Display */}
      <div className="absolute top-2 right-2 bg-gray-800 p-4 rounded shadow">
        <div className="text-sm text-gray-300">
          Current Position: Track {Math.floor(currentTrack)}
        </div>
      </div>
    </div>
  );
};

export default DiskPlatter; 