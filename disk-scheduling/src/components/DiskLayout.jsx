import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DiskTimingCalculator from './DiskTimingCalculator';
import { motion, animate } from 'framer-motion';

const componentDescriptions = {
  platter: 'Platters: The circular disks where data is stored.',
  track: 'Tracks: The concentric rings on each platter that store data.',
  head: 'Read/Write Head: Reads and writes data on the tracks.',
  arm: 'Actuator Arm: Holds the read/write head and moves it across the platter.',
  spindle: 'Spindle: The axis that the platters rotate around.',
  sector: 'Sector: The smallest unit of data storage on a track.'
};

const DiskPlatterVisualization = ({ numberOfPlatters, tracksPerPlatter = 5 }) => {
  const [headPosition, setHeadPosition] = useState(0);
  const [targetTrack, setTargetTrack] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTrack, setActiveTrack] = useState(null);
  const [totalSeekTime, setTotalSeekTime] = useState(0);
  const [hoverText, setHoverText] = useState('');
  const [sectorsPerTrack, setSectorsPerTrack] = useState(8);

  const platterHeight = 100;
  const platterWidth = 450;
  const spacing = 40;
  const totalHeight = (numberOfPlatters * (platterHeight + spacing));
  const trackWidth = (platterWidth/2 - 30) / tracksPerPlatter;

  const normalizeTrackPosition = (position) => {
    if (position >= tracksPerPlatter) return 0;
    if (position < 0) return tracksPerPlatter - 1;
    return position;
  };

  const calculateSeekTime = (distance) => Math.abs(distance) * 0.2;

  const handleSeek = (track) => {
    if (isAnimating) return;
    const normalizedTarget = normalizeTrackPosition(track);
    if (normalizedTarget === headPosition) return;
    setIsAnimating(true);
    const distance = track - headPosition;
    const seekTime = calculateSeekTime(distance);
    setTotalSeekTime(prev => prev + seekTime);

    animate(headPosition, track, {
      duration: seekTime,
      onUpdate: (latest) => {
        const normalizedPosition = normalizeTrackPosition(latest);
        setHeadPosition(normalizedPosition);
        setActiveTrack(Math.round(normalizedPosition));
      },
      onComplete: () => {
        setIsAnimating(false);
        setTimeout(() => setActiveTrack(null), 500);
      }
    });
  };

  // Generate sectors for a given track
  const generateEllipticalSectors = (cx, cy, rx, ry, numSectors) => {
  return Array.from({ length: numSectors }).map((_, i) => {
    const startAngle = (i * 2 * Math.PI) / numSectors;
    const endAngle = ((i + 1) * 2 * Math.PI) / numSectors;

    // Elliptical parametric equations
    const x1 = cx + rx * Math.cos(startAngle);
    const y1 = cy + ry * Math.sin(startAngle);
    const x2 = cx + rx * Math.cos(endAngle);
    const y2 = cy + ry * Math.sin(endAngle);

    // Large arc flag is always 0 since sector < 180deg
    return (
      <path
        key={i}
        d={`
          M ${cx} ${cy}
          L ${x1} ${y1}
          A ${rx} ${ry} 0 0 1 ${x2} ${y2}
          Z
        `}
        fill="rgba(59,130,246,0.08)"
        stroke="#222"
        strokeWidth="0.8"
        onMouseEnter={() => setHoverText(componentDescriptions.sector)}
        onMouseLeave={() => setHoverText('')}
      />
    );
  });
};

  return (
    <div className="relative">
      <div className="mb-2">
        <label className="text-sm font-medium mr-2">Sectors per Track:</label>
        <input
          type="number"
          min="2"
          max="32"
          value={sectorsPerTrack}
          onChange={e => setSectorsPerTrack(Number(e.target.value))}
          className="w-16 px-2 py-1 border rounded"
        />
      </div>
      <svg 
        width={platterWidth + 100} 
        height={totalHeight + 50}
        className="mx-auto"
        style={{ marginLeft: '100px' }}
      >
        {/* Spindle */}
        <line 
          x1={platterWidth/2} 
          y1={0} 
          x2={platterWidth/2} 
          y2={totalHeight}
          stroke="#666"
          strokeWidth="4"
          onMouseEnter={() => setHoverText(componentDescriptions.spindle)}
          onMouseLeave={() => setHoverText('')}
        />

        {/* Arm Assembly Base */}
        <line 
          x1={platterWidth + 20} 
          y1={0} 
          x2={platterWidth + 20} 
          y2={totalHeight}
          stroke="#444"
          strokeWidth="6"
          onMouseEnter={() => setHoverText(componentDescriptions.arm)}
          onMouseLeave={() => setHoverText('')}
        />

        {Array.from({ length: numberOfPlatters }).map((_, index) => (
          <g key={index} transform={`translate(0, ${index * (platterHeight + spacing)})`}>
            {/* Platter */}
            <ellipse
              cx={platterWidth/2}
              cy={platterHeight/2}
              rx={platterWidth/2}
              ry={platterHeight/2}
              fill="#ddd"
              stroke="#999"
              onMouseEnter={() => setHoverText(componentDescriptions.platter)}
              onMouseLeave={() => setHoverText('')}
            />
            {/* Tracks with sectors */}
            {Array.from({ length: tracksPerPlatter }).map((_, trackIdx) => {
  const scale = (trackIdx + 1) / tracksPerPlatter;
  const rx = (platterWidth/2 - 10) * scale;
  const ry = (platterHeight/2 - 5) * scale;
  return (
    <g key={trackIdx}>
      {/* Sectors for this elliptical track */}
      {generateEllipticalSectors(platterWidth/2, platterHeight/2, rx, ry, sectorsPerTrack)}
      {/* Track outline */}
      <ellipse
        cx={platterWidth/2}
        cy={platterHeight/2}
        rx={rx}
        ry={ry}
        fill="none"
        stroke={activeTrack === trackIdx ? "#4CAF50" : "#999"}
        strokeWidth={activeTrack === trackIdx ? "2" : "1"}
        className={activeTrack === trackIdx ? "animate-pulse" : ""}
        onMouseEnter={() => setHoverText(componentDescriptions.track)}
        onMouseLeave={() => setHoverText('')}
      />
    </g>
  );
})}
            {/* Animated Read/Write Head */}
            <motion.g
              animate={{ translateX: headPosition * trackWidth }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              onMouseEnter={() => setHoverText(componentDescriptions.head)}
              onMouseLeave={() => setHoverText('')}
            >
              <line
                x1={platterWidth/2 + 20}
                y1={platterHeight/2}
                x2={platterWidth + 20}
                y2={platterHeight/2}
                stroke="#666"
                strokeWidth="2"
              />
              <circle 
                cx={platterWidth/2 + 20}
                cy={platterHeight/2}
                r="3"
                fill="#666"
              />
            </motion.g>
            <text
              x={platterWidth + 30}
              y={platterHeight/2}
              className="text-xs"
              fill="#666"
            >
              Track {Math.floor(headPosition)} / {tracksPerPlatter - 1}
            </text>
          </g>
        ))}
      </svg>

      <div className="absolute top-2 right-2 bg-white p-4 rounded shadow">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Seek to Track:</label>
            <input
              type="number"
              value={targetTrack}
              onChange={(e) => setTargetTrack(Number(e.target.value))}
              className="w-16 px-2 py-1 border rounded"
            />
            <button
              onClick={() => handleSeek(targetTrack)}
              disabled={isAnimating}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded disabled:opacity-50"
            >
              Seek
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Current Position: Track {Math.floor(headPosition)}
            {activeTrack !== null && (
              <span className="ml-2 text-green-600">
                Moving to Track {normalizeTrackPosition(targetTrack)}...
              </span>
            )}
            <div className="mt-2">
              Total Seek Time: {totalSeekTime.toFixed(2)}ms
            </div>
            {hoverText && <div className="mt-2 text-blue-600 font-medium">{hoverText}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

const DiskLayout = ({ fileSystem }) => {
  const navigate = useNavigate();
  const [platters, setPlatters] = useState(3);
  const [tracksPerPlatter, setTracksPerPlatter] = useState(5);
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Disk Layout Visualization</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Platters:</label>
              <input
                type="number"
                min="1"
                max="8"
                value={platters}
                onChange={(e) => setPlatters(Number(e.target.value))}
                className="w-16 px-2 py-1 border rounded"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Tracks per Platter:</label>
              <input
                type="number"
                min="1"
                max="15"
                value={tracksPerPlatter}
                onChange={(e) => setTracksPerPlatter(Number(e.target.value))}
                className="w-16 px-2 py-1 border rounded"
              />
            </div>
            <button 
              onClick={() => navigate('/')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Back to Simulator
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Physical Disk Structure</h2>
          <DiskPlatterVisualization 
            numberOfPlatters={platters} 
            tracksPerPlatter={tracksPerPlatter}
          />
          <h2 className="text-xl font-bold mb-4">Disk Timing Analysis</h2>
          <DiskTimingCalculator />
        </div>
      </div>
    </div>
  );
};

export default DiskLayout;