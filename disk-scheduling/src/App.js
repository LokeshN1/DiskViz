import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import DiskVisualizer from './components/DiskVisualizer';
import Comparison from './components/Comparison';
import { fcfsAlgorithm, sstfAlgorithm, scanAlgorithm, cscanAlgorithm, lookAlgorithm, clookAlgorithm } from './utils/diskAlgorithms';
import { FileSystem, File } from './models/FileSystem';
import FileSystemVisualizer from './components/FileSystemVisualizer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DiskLayout from './components/DiskLayout';
import Home from './components/Home';
import About from './components/About';
import DiskView2D from './components/DiskView2D';
import './App.css';

function App() {
  const [simulationData, setSimulationData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showComparison, setShowComparison] = useState(false);
  const [fileSystem, setFileSystem] = useState(new FileSystem(199));
  const [totalTracks] = useState(200);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [requests, setRequests] = useState([]);
  const [headMovements, setHeadMovements] = useState([{ track: 0 }]);
  const [accessHistory, setAccessHistory] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [algorithm, setAlgorithm] = useState('sstf');
  const [direction, setDirection] = useState('up');

  useEffect(() => {
    const initializeFileSystem = () => {
      const newFileSystem = new FileSystem(400);
      const files = [
        new File('document.txt', 3, [10, 11, 12]),
        new File('image.jpg', 4, [20, 21, 45, 46]),
        new File('video.mp4', 5, [50, 51, 80, 81, 82]),
        new File('fragmented.dat', 4, [15, 30, 60, 90]),
        new File('large_file.iso', 6, [200, 201, 202, 203, 204, 205]),
        new File('backup.zip', 5, [300, 301, 302, 350, 351]),
        new File('newfile.zip', 5, [2, 20, 200, 30, 33])
      ];
      files.forEach(file => newFileSystem.addFile(file));
      setFileSystem(newFileSystem);
    };
    
    initializeFileSystem();
  }, []);

  const handleStartSimulation = (data) => {
    const { requests, startPosition, algorithm } = data;
    let result;
    switch (algorithm) {
      case 'fcfs':
        result = fcfsAlgorithm(requests, startPosition);
        break;
      case 'sstf':
        result = sstfAlgorithm(requests, startPosition);
        break;
      case 'scan':
        result = scanAlgorithm(requests, startPosition);
        break;
      case 'cscan':
        result = cscanAlgorithm(requests, startPosition);
        break;
      case 'look':
        result = lookAlgorithm(requests, startPosition);
        break;
      case 'clook':
        result = clookAlgorithm(requests, startPosition);
        break;
      default:
        result = fcfsAlgorithm(requests, startPosition);
    }
    setSimulationData({
      requests,
      startPosition,
      algorithm,
      path: result.path,
      seekCount: result.seekCount
    });
    setCurrentStep(0);
    setShowComparison(false);
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
    if (simulationData && step === simulationData.path.length - 1) {
      setShowComparison(true);
    } else {
      setShowComparison(false);
    }
  };

  const processNextRequest = () => {
    if (!requests || requests.length === 0) {
      setIsRunning(false);
      return;
    }

    const unprocessedRequests = requests.filter(r => !r.isProcessed);
    if (unprocessedRequests.length === 0) {
      setIsRunning(false);
      return;
    }

    let nextRequest;
    switch (algorithm) {
      case 'fcfs':
        nextRequest = fcfsAlgorithm(unprocessedRequests, currentTrack).path[0];
        break;
      case 'sstf':
        nextRequest = sstfAlgorithm(unprocessedRequests, currentTrack).path[0];
        break;
      case 'scan':
        nextRequest = scanAlgorithm(unprocessedRequests, currentTrack, direction, totalTracks).path[0];
        break;
      case 'cscan':
        nextRequest = cscanAlgorithm(unprocessedRequests, currentTrack, totalTracks).path[0];
        break;
      case 'look':
        nextRequest = lookAlgorithm(unprocessedRequests, currentTrack, direction).path[0];
        break;
      case 'clook':
        nextRequest = clookAlgorithm(unprocessedRequests, currentTrack).path[0];
        break;
      default:
        nextRequest = sstfAlgorithm(unprocessedRequests, currentTrack).path[0];
    }

    if (nextRequest) {
      setRequests(requests.map(request => 
        request === nextRequest
          ? { ...request, isProcessed: true }
          : request
      ));
      setCurrentTrack(nextRequest.track);
      setHeadMovements(prev => [...prev, { track: nextRequest.track }]);
      setAccessHistory(prev => [...prev, { track: nextRequest.track, time: currentTime }]);
      setCurrentTime(prev => prev + 1);
    }
  };

  useEffect(() => {
    let animationFrame;
    if (isRunning) {
      animationFrame = setTimeout(() => {
        processNextRequest();
      }, 1000);
    }
    return () => clearTimeout(animationFrame);
  }, [isRunning, currentTrack, requests, currentTime]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
        path="/simulator"
        element={
          <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Disk Scheduling Algorithm Simulator</h1>
                <Link
                  to="/disk-layout"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  View Disk Layout
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <InputForm onStartSimulation={handleStartSimulation} />
                {simulationData && (
                  <>
                    <DiskVisualizer
                      path={simulationData.path}
                      diskSize={400}
                      currentStep={currentStep}
                      onStepChange={handleStepChange}
                      seekCount={simulationData.seekCount}
                    />
                    {showComparison && (
                      <Comparison
                        requests={simulationData.requests}
                        startPosition={simulationData.startPosition}
                        currentAlgorithm={simulationData.algorithm}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        }
      />
      <Route
        path="/disk-layout"
        element={<DiskLayout fileSystem={fileSystem} />}
      />
        <Route
          path="/disk-layout"
          element={<DiskLayout fileSystem={fileSystem} />}
        />
        <Route
          path="/disk-view-2d"
          element={<DiskView2D />}
        />
        <Route
          path="/about"
          element={<About />}
        />
      </Routes>
    </Router>
  );
}

export default App;