import React, { useState } from 'react';
import InputForm from './components/InputForm';
import DiskVisualizer from './components/DiskVisualizer';
import Comparison from './components/Comparison';
import { fcfsAlgorithm, sstfAlgorithm, scanAlgorithm, cscanAlgorithm, lookAlgorithm, clookAlgorithm } from './utils/diskAlgorithms';
import './App.css';

function App() {
  const [simulationData, setSimulationData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

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

  // This function is passed down to DiskVisualizer and Controls
  const handleStepChange = (step) => {
    setCurrentStep(step);
    if (simulationData && step === simulationData.path.length - 1) {
      setShowComparison(true);
    } else {
      setShowComparison(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Disk Scheduling Algorithm Simulator</h1>
        <div className="grid grid-cols-1 gap-6">
          <InputForm onStartSimulation={handleStartSimulation} />
          {simulationData && (
            <>
              <DiskVisualizer
                path={simulationData.path}
                diskSize={199}
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
  );
}

export default App;
