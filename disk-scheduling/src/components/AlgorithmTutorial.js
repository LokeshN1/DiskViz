import React, { useState } from 'react';

const algorithmInfo = {
  fcfs: {
    name: 'First Come First Served (FCFS)',
    description: 'The simplest disk scheduling algorithm that serves requests in the order they arrive.',
    advantages: [
      'Simple to implement',
      'Fair to all requests',
      'No starvation'
    ],
    disadvantages: [
      'High seek time',
      'Not optimized for performance',
      'No optimization for disk arm movement'
    ],
    example: 'If requests come in order: 95, 180, 34, 119, FCFS will serve them in exactly that order, regardless of head position.',
    bestCase: 'When requests are physically close to each other in the order they arrive.',
    worstCase: 'When requests are far apart and arrive in a random order.'
  },
  sstf: {
    name: 'Shortest Seek Time First (SSTF)',
    description: 'Selects the request that requires the least head movement from the current position.',
    advantages: [
      'Better performance than FCFS',
      'Minimizes seek time',
      'Good for systems with mostly random requests'
    ],
    disadvantages: [
      'Can cause starvation of some requests',
      'Not as fair as FCFS',
      'Overhead in finding closest request'
    ],
    example: 'If head at 50 and requests are: 95, 180, 34, 119, SSTF will choose 34 next as it\'s closest.',
    bestCase: 'When most requests are clustered around the same area.',
    worstCase: 'When new requests keep arriving closer to current head position, causing starvation of distant requests.'
  },
  scan: {
    name: 'SCAN (Elevator)',
    description: 'The disk arm moves in one direction serving requests until it reaches the end, then reverses direction.',
    advantages: [
      'Better performance than FCFS',
      'No starvation',
      'Good for high-load systems'
    ],
    disadvantages: [
      'May not be optimal for specific workloads',
      'Longer wait times for recently passed locations'
    ],
    example: 'If moving up and requests are: 95, 180, 34, 119, SCAN will serve 95, 119, 180 then reverse and get 34.',
    bestCase: 'When requests are evenly distributed across the disk.',
    worstCase: 'When most requests are in the opposite direction of arm movement.'
  },
  cscan: {
    name: 'Circular SCAN (C-SCAN)',
    description: 'Similar to SCAN, but only serves requests when moving in one direction. When reaching the end, it quickly returns to the beginning.',
    advantages: [
      'More uniform wait times than SCAN',
      'Good for systems with heavy loads',
      'Prevents clustering'
    ],
    disadvantages: [
      'Longer seek times than SCAN in some cases',
      'May not be optimal for light loads'
    ],
    example: 'If moving up and requests are: 95, 180, 34, 119, C-SCAN will serve 95, 119, 180 then jump to 0 and get 34.',
    bestCase: 'When requests are evenly distributed and mostly sequential.',
    worstCase: 'When requests are concentrated in the area just passed by the head.'
  },
  look: {
    name: 'LOOK',
    description: 'Similar to SCAN but only goes as far as the last request in each direction.',
    advantages: [
      'More efficient than SCAN',
      'Good balance of fairness and performance',
      'No unnecessary movements'
    ],
    disadvantages: [
      'More complex to implement than SCAN',
      'May not be optimal for all workloads'
    ],
    example: 'If moving up and requests are: 95, 180, 34, 119, LOOK will serve 95, 119, 180 then reverse to 34.',
    bestCase: 'When requests are clustered in specific regions.',
    worstCase: 'When new requests keep arriving just behind the head movement.'
  },
  clook: {
    name: 'C-LOOK',
    description: 'Similar to C-SCAN but only goes as far as the last request in each direction before quickly returning.',
    advantages: [
      'More efficient than C-SCAN',
      'Uniform wait times',
      'Good for high-load systems'
    ],
    disadvantages: [
      'More complex than LOOK',
      'May have higher seek times in some cases'
    ],
    example: 'If moving up and requests are: 95, 180, 34, 119, C-LOOK will serve 95, 119, 180 then jump to 34.',
    bestCase: 'When requests are mostly sequential with some backwards jumps.',
    worstCase: 'When requests are concentrated just behind the head position.'
  }
};

const AlgorithmTutorial = ({ selectedAlgorithm = 'fcfs' }) => {
  const [expandedSection, setExpandedSection] = useState('description');
  const algorithm = algorithmInfo[selectedAlgorithm];

  const Section = ({ title, content, id }) => (
    <div className="mb-4">
      <button
        className={`w-full text-left p-3 rounded-lg ${
          expandedSection === id ? 'bg-blue-100' : 'bg-gray-50'
        } hover:bg-blue-50`}
        onClick={() => setExpandedSection(expandedSection === id ? null : id)}
      >
        <h3 className="font-semibold">{title}</h3>
      </button>
      {expandedSection === id && (
        <div className="p-4 bg-white border rounded-b-lg">
          {Array.isArray(content) ? (
            <ul className="list-disc list-inside space-y-2">
              {content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{content}</p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{algorithm.name}</h2>
      
      <Section
        title="Description"
        content={algorithm.description}
        id="description"
      />
      
      <Section
        title="Advantages"
        content={algorithm.advantages}
        id="advantages"
      />
      
      <Section
        title="Disadvantages"
        content={algorithm.disadvantages}
        id="disadvantages"
      />
      
      <Section
        title="Example"
        content={algorithm.example}
        id="example"
      />
      
      <Section
        title="Best Case Scenario"
        content={algorithm.bestCase}
        id="bestCase"
      />
      
      <Section
        title="Worst Case Scenario"
        content={algorithm.worstCase}
        id="worstCase"
      />
    </div>
  );
};

export default AlgorithmTutorial; 