import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FileSystemVisualizer = ({ fileSystem, currentCluster, path }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const getClusterColor = (cluster) => {
    if (cluster === currentCluster) return '#F97316';
    if (!fileSystem.clusterMap[cluster]) return '#E5E7EB';
    
    const file = fileSystem.files.get(fileSystem.clusterMap[cluster]);
    return file.isFragmented ? '#FBBF24' : '#34D399';
  };

  const getFileSize = (file) => {
    return `${file.size * 512} KB`; // Assuming 512 bytes per cluster
  };

  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    const types = {
      txt: 'Text Document',
      jpg: 'Image File',
      mp4: 'Video File',
      dat: 'Data File'
    };
    return types[extension] || 'Unknown Type';
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">File System Layout</h3>
      <div className="flex flex-wrap gap-1 relative">
        {/* Draw path lines between clusters */}
        <svg className="absolute inset-0 pointer-events-none">
          {path?.map((cluster, index) => {
            if (index === path.length - 1) return null;
            const nextCluster = path[index + 1];
            return (
              <line
                key={`path-${index}`}
                x1={`${(cluster % 20) * 28 + 14}px`}
                y1={`${Math.floor(cluster / 20) * 28 + 14}px`}
                x2={`${(nextCluster % 20) * 28 + 14}px`}
                y2={`${Math.floor(nextCluster / 20) * 28 + 14}px`}
                stroke="#4B5563"
                strokeWidth="1"
                strokeDasharray="4"
              />
            );
          })}
        </svg>
        {Array.from({ length: fileSystem.diskSize + 1 }, (_, i) => (
          <motion.div
            key={i}
            className={`w-6 h-6 rounded border ${
              fileSystem.files.get(fileSystem.clusterMap[i])?.isFragmented 
                ? 'border-red-500 border-2' 
                : 'border-gray-300'
            }`}
            style={{ backgroundColor: getClusterColor(i) }}
            initial={{ scale: 0.9 }}
            animate={{ 
              scale: i === currentCluster ? 1.2 : 1,
              backgroundColor: getClusterColor(i)
            }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              const fileName = fileSystem.clusterMap[i];
              setSelectedFile(fileName ? fileSystem.files.get(fileName) : null);
            }}
          >
            <span className="text-xs">{i}</span>
          </motion.div>
        ))}
      </div>

      {/* File Information Panel */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-sm">
          <h4 className="font-bold mb-2">Files:</h4>
          {Array.from(fileSystem.files.values()).map(file => (
            <div 
              key={file.name} 
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
              onClick={() => setSelectedFile(file)}
            >
              <div 
                className={`w-3 h-3 rounded-full ${
                  file.isFragmented ? 'bg-yellow-400' : 'bg-green-400'
                }`}
              />
              <span>
                {file.name} 
                {file.isFragmented && <span className="text-red-500 ml-1">🔀</span>}
              </span>
            </div>
          ))}
        </div>
        <div className="text-sm">
          <h4 className="font-bold mb-2">Statistics:</h4>
          <p>Fragmentation: {fileSystem.getFragmentationPercentage().toFixed(1)}%</p>
          {selectedFile && (
            <div className="mt-2 p-2 bg-gray-50 rounded">
              <h5 className="font-semibold">{selectedFile.name}</h5>
              <p>Type: {getFileType(selectedFile.name)}</p>
              <p>Size: {getFileSize(selectedFile)}</p>
              <p>Clusters: {selectedFile.clusters.join(', ')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileSystemVisualizer;