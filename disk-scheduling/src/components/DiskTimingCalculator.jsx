import React, { useState, useEffect, useCallback } from 'react';
import DiskTimingGraph from './DiskTimingGraph'; // ✅ Import the graph component

const DiskTimingCalculator = () => {
  const [diskParams, setDiskParams] = useState({
    totalTracks: 500,
    sectorsPerTrack: 100,
    bytesPerSector: 500,
    headMovementTime: 1,
    rotationSpeed: 600,
    bytesToTransfer: 250
  });

  const [timings, setTimings] = useState({
    seekTime: 0,
    rotationalLatency: 0,
    transferTime: 0,
    totalTime: 0
  });

  const [totalTimeHistory, setTotalTimeHistory] = useState([]);
 // ✅ Seek time history state

  const calculateTimings = useCallback(() => {
    const { totalTracks, headMovementTime, rotationSpeed, sectorsPerTrack, bytesPerSector, bytesToTransfer } = diskParams;

    const avgSeekTime = (totalTracks / 3) * headMovementTime;
    const msPerRotation = (60 * 1000) / rotationSpeed;
    const avgRotationalLatency = msPerRotation / 2;
    const bytesPerTrack = sectorsPerTrack * bytesPerSector;
    const transferTime = (msPerRotation * bytesToTransfer) / bytesPerTrack;

    const totalTime = avgSeekTime + avgRotationalLatency + transferTime;

    setTimings({
      seekTime: avgSeekTime,
      rotationalLatency: avgRotationalLatency,
      transferTime,
      totalTime
    });

    setTotalTimeHistory(prev => {
  const newHistory = [...prev, totalTime];
  return newHistory.length > 100 ? newHistory.slice(newHistory.length - 100) : newHistory;
});

 // ✅ Append new seek time to history
  }, [diskParams]);

  useEffect(() => {
    calculateTimings();
  }, [calculateTimings]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDiskParams(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Disk Timing Calculator</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Disk Parameters</h3>

          {[
            { label: "Total Tracks", name: "totalTracks" },
            { label: "Sectors per Track", name: "sectorsPerTrack" },
            { label: "Bytes per Sector", name: "bytesPerSector" },
            { label: "Head Movement Time (ms)", name: "headMovementTime", step: 0.1 },
            { label: "Rotation Speed (RPM)", name: "rotationSpeed" },
            { label: "Bytes to Transfer", name: "bytesToTransfer" }
          ].map(({ label, name, step = 1 }) => (
            <div className="flex flex-col" key={name}>
              <label className="text-sm font-medium text-gray-700">{label}</label>
              <input
                type="number"
                name={name}
                value={diskParams[name]}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded"
                min="1"
                step={step}
              />
            </div>
          ))}
        </div>

        {/* Output Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Timing Analysis</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white rounded shadow">
              <span className="font-medium">Average Seek Time:</span>
              <span className="font-mono">{timings.seekTime.toFixed(2)} ms</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-white rounded shadow">
              <span className="font-medium">Rotational Latency:</span>
              <span className="font-mono">{timings.rotationalLatency.toFixed(2)} ms</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-white rounded shadow">
              <span className="font-medium">Transfer Time:</span>
              <span className="font-mono">{timings.transferTime.toFixed(2)} ms</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-blue-50 rounded shadow">
              <span className="font-bold">Total Access Time:</span>
              <span className="font-mono font-bold">{timings.totalTime.toFixed(2)} ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Seek Time Graph */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Total Access Time Trend</h3>
        <DiskTimingGraph seekTimes={totalTimeHistory} />
      </div>
    </div>
  );
};

export default DiskTimingCalculator;
