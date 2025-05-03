import React, { useState } from 'react';

const InputForm = ({ onStartSimulation }) => {
  const [requests, setRequests] = useState('');
  const [startPosition, setStartPosition] = useState('');
  const [algorithm, setAlgorithm] = useState('fcfs');
  const [error, setError] = useState('');

  const validateInput = () => {
    if (!requests.trim()) {
      setError('Please enter track requests');
      return false;
    }
    
    if (!startPosition.trim()) {
      setError('Please enter starting head position');
      return false;
    }
    
    const requestsArray = requests.split(',').map(req => req.trim());
    for (const req of requestsArray) {
      if (isNaN(parseInt(req))) {
        setError('Track requests must be numbers');
        return false;
      }
    }
    
    if (isNaN(parseInt(startPosition))) {
      setError('Starting head position must be a number');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateInput()) {
      return;
    }
    
    const requestsArray = requests.split(',').map(req => parseInt(req.trim()));
    const startPositionInt = parseInt(startPosition);
    
    onStartSimulation({
      requests: requestsArray,
      startPosition: startPositionInt,
      algorithm
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Disk Scheduling Simulator</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="requests">
            Track Requests (comma separated numbers)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="requests"
            type="text"
            placeholder="e.g., 98, 183, 37, 122, 14, 124, 65, 67"
            value={requests}
            onChange={(e) => setRequests(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startPosition">
            Starting Head Position
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="startPosition"
            type="text"
            placeholder="e.g., 53"
            value={startPosition}
            onChange={(e) => setStartPosition(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="algorithm">
            Algorithm
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="algorithm"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="fcfs">First-Come, First-Served (FCFS)</option>
            <option value="sstf">Shortest Seek Time First (SSTF)</option>
            <option value="scan">SCAN (Elevator)</option>
            <option value="cscan">C-SCAN (Circular SCAN)</option>
            <option value="look">LOOK</option>
            <option value="clook">C-LOOK (Circular LOOK)</option>
          </select>
        </div>
        
        {error && (
          <div className="mb-4 text-red-500 text-sm">
            {error}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Start Simulation
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm; 