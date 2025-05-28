import React, { useState, useEffect } from 'react';
import DiskPlatter from './DiskPlatter';
import HeadMovementGraph from './HeadMovementGraph';
import TimelineView from './TimelineView';
import AccessHeatMap from './AccessHeatMap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const DiskView2D = () => {
  const [totalTracks] = useState(200);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [requests, setRequests] = useState([]);
  const [headMovements, setHeadMovements] = useState([{ track: 0 }]);
  const [accessHistory, setAccessHistory] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [algorithm, setAlgorithm] = useState('sstf');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [totalSeekTime, setTotalSeekTime] = useState(0);
  const [requestHistory, setRequestHistory] = useState([]);

  // Function to process the next request based on the selected algorithm
  const processNextRequest = () => {
    const unprocessedRequests = requests.filter(r => !r.isProcessed);
    if (unprocessedRequests.length === 0) {
      setIsPlaying(false);
      return;
    }

    let nextRequest;
    switch (algorithm) {
      case 'fcfs':
        nextRequest = unprocessedRequests[0];
        break;
      case 'sstf':
        nextRequest = unprocessedRequests.reduce((closest, current) => {
          const closestDistance = Math.abs(closest.track - currentTrack);
          const currentDistance = Math.abs(current.track - currentTrack);
          return currentDistance < closestDistance ? current : closest;
        }, unprocessedRequests[0]);
        break;
      case 'scan':
        const upwardRequests = unprocessedRequests.filter(r => r.track >= currentTrack)
          .sort((a, b) => a.track - b.track);
        const downwardRequests = unprocessedRequests.filter(r => r.track < currentTrack)
          .sort((a, b) => b.track - a.track);
        nextRequest = upwardRequests.length > 0 ? upwardRequests[0] : downwardRequests[0];
        break;
      default:
        nextRequest = unprocessedRequests[0];
    }

    if (nextRequest) {
      const seekDistance = Math.abs(nextRequest.track - currentTrack);
      const seekTime = seekDistance * 0.1;
      setTotalSeekTime(prev => prev + seekTime);
      
      // Save current state to history before updating
      setRequestHistory(prev => [...prev, {
        requests: [...requests],
        currentTrack,
        headMovements: [...headMovements],
        accessHistory: [...accessHistory],
        totalSeekTime
      }]);

      setRequests(requests.map(request => 
        request === nextRequest ? { ...request, isProcessed: true } : request
      ));
      setCurrentTrack(nextRequest.track);
      setHeadMovements(prev => [...prev, { track: nextRequest.track }]);
      setAccessHistory(prev => [...prev, { track: nextRequest.track, time: currentTime }]);
      setCurrentTime(prev => prev + 1);
    }
  };

  // Function to handle going back to previous state
  const handlePreviousState = (time) => {
    if (time < 0 || !requestHistory[time]) return;
    
    const previousState = requestHistory[time];
    setRequests(previousState.requests);
    setCurrentTrack(previousState.currentTrack);
    setHeadMovements(previousState.headMovements);
    setAccessHistory(previousState.accessHistory);
    setTotalSeekTime(previousState.totalSeekTime);
    setCurrentTime(time);
  };

  // Update currentTime handler
  const handleTimeChange = (newTime) => {
    if (newTime < currentTime) {
      handlePreviousState(newTime);
    } else if (newTime > currentTime) {
      // Process the next request
      const unprocessedRequests = requests.filter(r => !r.isProcessed);
      if (unprocessedRequests.length > 0) {
        processNextRequest();
      }
    }
  };

  // Auto-play effect
  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      intervalId = setInterval(() => {
        processNextRequest();
      }, 1000 / playbackSpeed);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, currentTrack, requests, currentTime, playbackSpeed, algorithm]);

  const generateRandomRequests = () => {
    const newRequests = Array.from({ length: 20 }, () => ({
      track: Math.floor(Math.random() * totalTracks),
      isProcessed: false
    }));
    setRequests(newRequests);
    setHeadMovements([{ track: currentTrack }]);
    setAccessHistory([]);
    setCurrentTime(0);
    setTotalSeekTime(0);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 py-6 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Disk Platter Visualization</h1>
          <div className="flex items-center gap-4">
            <select
              className="bg-gray-700 text-white px-4 py-2 rounded"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
            >
              <option value="fcfs">First Come First Served (FCFS)</option>
              <option value="sstf">Shortest Seek Time First (SSTF)</option>
              <option value="scan">SCAN (Elevator)</option>
              <option value="cscan">C-SCAN (Circular SCAN)</option>
              <option value="look">LOOK</option>
              <option value="clook">C-LOOK</option>
            </select>
            <select
              className="bg-gray-700 text-white px-4 py-2 rounded"
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            >
              <option value={0.5}>0.5x Speed</option>
              <option value={1}>1x Speed</option>
              <option value={2}>2x Speed</option>
              <option value={4}>4x Speed</option>
            </select>
            <Link
              to="/"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded transition shadow"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">2D Disk View</h2>
            <DiskPlatter
              currentTrack={currentTrack}
              totalTracks={totalTracks}
              requests={requests}
              headPosition={currentTrack}
            />
            <div className="mt-4 flex justify-center gap-4">
              <button
                className={`px-6 py-2 rounded-lg font-semibold ${
                  isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                }`}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold"
                onClick={generateRandomRequests}
              >
                Generate Requests
              </button>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Head Movement Graph</h2>
            <HeadMovementGraph movements={headMovements} />
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Request Timeline</h2>
            <TimelineView
              requests={requests}
              currentTime={currentTime}
              setCurrentTime={handleTimeChange}
            />
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Access Heat Map</h2>
            <AccessHeatMap
              accessHistory={accessHistory}
              totalTracks={totalTracks}
            />
          </div>
        </div>

        {/* Stats Panel */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <h3 className="text-gray-400 text-sm">Total Tracks</h3>
              <p className="text-2xl font-bold">{totalTracks}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Current Track</h3>
              <p className="text-2xl font-bold">{currentTrack}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Pending Requests</h3>
              <p className="text-2xl font-bold">{requests.filter(r => !r.isProcessed).length}</p>
            </div>
            <div>
              <h3 className="text-gray-400 text-sm">Total Seek Time</h3>
              <p className="text-2xl font-bold">{totalSeekTime.toFixed(2)}ms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiskView2D; 