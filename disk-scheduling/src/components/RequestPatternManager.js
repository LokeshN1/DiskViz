import React, { useState } from 'react';

const presetPatterns = {
  sequential: {
    name: 'Sequential Access',
    description: 'Simulates sequential file reading/writing',
    requests: Array.from({ length: 20 }, (_, i) => ({ track: i * 10, isProcessed: false }))
  },
  random: {
    name: 'Random Access',
    description: 'Simulates random file access patterns',
    requests: Array.from({ length: 20 }, () => ({ track: Math.floor(Math.random() * 200), isProcessed: false }))
  },
  localizedRandom: {
    name: 'Localized Random',
    description: 'Simulates database index scanning',
    requests: Array.from({ length: 20 }, () => {
      const baseTrack = Math.floor(Math.random() * 180);
      return { track: baseTrack + Math.floor(Math.random() * 20), isProcessed: false };
    })
  },
  alternating: {
    name: 'Alternating Pattern',
    description: 'Simulates concurrent file operations',
    requests: Array.from({ length: 20 }, (_, i) => ({
      track: i % 2 === 0 ? i * 15 : 199 - (i * 15),
      isProcessed: false
    }))
  },
  clustering: {
    name: 'Clustered Access',
    description: 'Simulates file system clustering',
    requests: [
      ...Array.from({ length: 7 }, (_, i) => ({ track: 50 + i, isProcessed: false })),
      ...Array.from({ length: 7 }, (_, i) => ({ track: 120 + i, isProcessed: false })),
      ...Array.from({ length: 6 }, (_, i) => ({ track: 180 + i, isProcessed: false }))
    ]
  }
};

const RequestPatternManager = ({ onLoadPattern, currentRequests }) => {
  const [savedPatterns, setSavedPatterns] = useState(() => {
    const saved = localStorage.getItem('savedPatterns');
    return saved ? JSON.parse(saved) : {};
  });
  const [patternName, setPatternName] = useState('');
  const [showTutorial, setShowTutorial] = useState(false);

  const saveCurrentPattern = () => {
    if (!patternName.trim()) {
      alert('Please enter a pattern name');
      return;
    }

    const newPatterns = {
      ...savedPatterns,
      [patternName]: {
        name: patternName,
        description: 'Custom saved pattern',
        requests: currentRequests
      }
    };

    setSavedPatterns(newPatterns);
    localStorage.setItem('savedPatterns', JSON.stringify(newPatterns));
    setPatternName('');
  };

  const deletePattern = (name) => {
    const newPatterns = { ...savedPatterns };
    delete newPatterns[name];
    setSavedPatterns(newPatterns);
    localStorage.setItem('savedPatterns', JSON.stringify(newPatterns));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Request Pattern Manager</h2>
        <button
          onClick={() => setShowTutorial(!showTutorial)}
          className="bg-blue-100 text-blue-600 px-4 py-2 rounded hover:bg-blue-200"
        >
          {showTutorial ? 'Hide Tutorial' : 'Show Tutorial'}
        </button>
      </div>

      {showTutorial && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">How to use patterns:</h3>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Choose from preset patterns to simulate common disk access scenarios</li>
            <li>Save your current request pattern for future use</li>
            <li>Load previously saved patterns or delete them when no longer needed</li>
            <li>Each pattern simulates different real-world scenarios</li>
          </ul>
        </div>
      )}

      {/* Save current pattern */}
      <div className="flex gap-4 items-center">
        <input
          type="text"
          value={patternName}
          onChange={(e) => setPatternName(e.target.value)}
          placeholder="Enter pattern name"
          className="flex-1 px-4 py-2 border rounded"
        />
        <button
          onClick={saveCurrentPattern}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save Current Pattern
        </button>
      </div>

      {/* Preset patterns */}
      <div>
        <h3 className="font-semibold mb-2">Preset Patterns:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(presetPatterns).map(([key, pattern]) => (
            <div key={key} className="border rounded p-4 hover:bg-gray-50">
              <h4 className="font-semibold">{pattern.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{pattern.description}</p>
              <button
                onClick={() => onLoadPattern(pattern.requests)}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
              >
                Load Pattern
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Saved patterns */}
      {Object.keys(savedPatterns).length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Saved Patterns:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(savedPatterns).map(([name, pattern]) => (
              <div key={name} className="border rounded p-4 hover:bg-gray-50">
                <h4 className="font-semibold">{pattern.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{pattern.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => onLoadPattern(pattern.requests)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Load Pattern
                  </button>
                  <button
                    onClick={() => deletePattern(name)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestPatternManager; 