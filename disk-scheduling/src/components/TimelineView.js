import React from 'react';
import { motion } from 'framer-motion';

const TimelineView = ({ requests, currentTime, setCurrentTime }) => {
  const timelineHeight = 80;
  const requestSize = 20;

  const handlePrev = () => {
    if (currentTime > 0) {
      setCurrentTime(currentTime - 1);
    }
  };

  const handleNext = () => {
    const unprocessedRequests = requests.filter(r => !r.isProcessed);
    if (unprocessedRequests.length > 0) {
      setCurrentTime(currentTime + 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="w-full h-[100px] relative bg-gray-800 rounded-lg p-4">
        {/* Timeline base */}
        <div className="absolute left-0 right-0 h-1 bg-gray-600 top-1/2 transform -translate-y-1/2" />

        {/* Request markers */}
        {requests.map((request, index) => (
          <motion.div
            key={index}
            className={`absolute rounded-full ${
              request.isProcessed ? 'bg-green-500' : 'bg-yellow-500'
            }`}
            style={{
              width: requestSize,
              height: requestSize,
              left: `${(index / requests.length) * 100}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white">
              {request.track}
            </div>
          </motion.div>
        ))}

        {/* Time labels */}
        <div className="absolute -bottom-8 left-0 text-sm text-gray-400">0ms</div>
        <div className="absolute -bottom-8 right-0 text-sm text-gray-400">
          {requests.length * 100}ms
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handlePrev}
          disabled={currentTime === 0}
          className={`px-4 py-2 rounded-lg font-semibold ${
            currentTime === 0
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!requests.some(r => !r.isProcessed)}
          className={`px-4 py-2 rounded-lg font-semibold ${
            !requests.some(r => !r.isProcessed)
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TimelineView; 