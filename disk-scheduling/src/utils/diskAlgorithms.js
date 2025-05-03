// First-Come First-Served (FCFS) Algorithm
export function fcfsAlgorithm(requests, start) {
  let path = [start, ...requests];
  let seekCount = 0;

  for (let i = 0; i < path.length - 1; i++) {
    seekCount += Math.abs(path[i + 1] - path[i]);
  }

  return { path, seekCount };
}

// Shortest Seek Time First (SSTF) Algorithm
export function sstfAlgorithm(requests, start) {
  let path = [start];
  let seekCount = 0;
  let currPosition = start;
  let remainingRequests = [...requests];

  while (remainingRequests.length > 0) {
    // Find the closest track
    let minDistance = Infinity;
    let nextIndex = -1;

    for (let i = 0; i < remainingRequests.length; i++) {
      const distance = Math.abs(remainingRequests[i] - currPosition);
      if (distance < minDistance) {
        minDistance = distance;
        nextIndex = i;
      }
    }

    // Move to the closest track
    currPosition = remainingRequests[nextIndex];
    path.push(currPosition);
    seekCount += minDistance;
    remainingRequests.splice(nextIndex, 1);
  }

  return { path, seekCount };
}

// SCAN Algorithm (Elevator Algorithm)
export function scanAlgorithm(requests, start, diskSize = 199) {
  let path = [start];
  let seekCount = 0;
  
  // Copy requests and add start position
  let allRequests = [...requests].sort((a, b) => a - b);
  
  // Find the position where head is currently located
  let headIndex = 0;
  while (headIndex < allRequests.length && allRequests[headIndex] < start) {
    headIndex++;
  }
  
  // First, move towards higher tracks (right direction)
  for (let i = headIndex; i < allRequests.length; i++) {
    path.push(allRequests[i]);
    seekCount += Math.abs(allRequests[i] - path[path.length - 2]);
  }
  
  // Reach the end of disk
  if (allRequests[allRequests.length - 1] < diskSize) {
    path.push(diskSize);
    seekCount += Math.abs(diskSize - path[path.length - 2]);
  }
  
  // Then reverse direction and move towards lower tracks
  for (let i = headIndex - 1; i >= 0; i--) {
    path.push(allRequests[i]);
    seekCount += Math.abs(allRequests[i] - path[path.length - 2]);
  }
  
  return { path, seekCount };
}

// C-SCAN Algorithm (Circular SCAN)
export function cscanAlgorithm(requests, start, diskSize = 199) {
  let path = [start];
  let seekCount = 0;
  
  // Copy requests and add start position
  let allRequests = [...requests].sort((a, b) => a - b);
  
  // Find the position where head is currently located
  let headIndex = 0;
  while (headIndex < allRequests.length && allRequests[headIndex] < start) {
    headIndex++;
  }
  
  // First, move towards higher tracks (right direction)
  for (let i = headIndex; i < allRequests.length; i++) {
    path.push(allRequests[i]);
    seekCount += Math.abs(allRequests[i] - path[path.length - 2]);
  }
  
  // Reach the end of disk
  if (allRequests[allRequests.length - 1] < diskSize) {
    path.push(diskSize);
    seekCount += Math.abs(diskSize - path[path.length - 2]);
  }
  
  // Go back to beginning (0) in one sweep
  path.push(0);
  seekCount += Math.abs(0 - path[path.length - 2]); // Count the seek to 0
  
  // Then move again towards higher tracks from beginning
  for (let i = 0; i < headIndex; i++) {
    path.push(allRequests[i]);
    seekCount += Math.abs(allRequests[i] - path[path.length - 2]);
  }
  
  return { path, seekCount };
}

// LOOK Algorithm
export function lookAlgorithm(requests, start) {
  let path = [start];
  let seekCount = 0;
  
  // Copy requests and sort them
  let allRequests = [...requests].sort((a, b) => a - b);
  
  // Find the position where head is currently located
  let headIndex = 0;
  while (headIndex < allRequests.length && allRequests[headIndex] < start) {
    headIndex++;
  }
  
  // First, move towards higher tracks (right direction)
  for (let i = headIndex; i < allRequests.length; i++) {
    path.push(allRequests[i]);
    seekCount += Math.abs(allRequests[i] - path[path.length - 2]);
  }
  
  // Then reverse direction and move towards lower tracks
  for (let i = headIndex - 1; i >= 0; i--) {
    path.push(allRequests[i]);
    seekCount += Math.abs(allRequests[i] - path[path.length - 2]);
  }
  
  return { path, seekCount };
}

// C-LOOK Algorithm (Circular LOOK)
export function clookAlgorithm(requests, start) {
  let path = [start];
  let seekCount = 0;
  
  // Copy requests and sort them
  let allRequests = [...requests].sort((a, b) => a - b);
  
  // Find the position where head is currently located
  let headIndex = 0;
  while (headIndex < allRequests.length && allRequests[headIndex] < start) {
    headIndex++;
  }
  
  // First, move towards higher tracks (right direction)
  for (let i = headIndex; i < allRequests.length; i++) {
    path.push(allRequests[i]);
    seekCount += Math.abs(allRequests[i] - path[path.length - 2]);
  }
  
  // Then jump to the lowest track and continue upwards
  if (headIndex > 0) {
    // Consider the seek count when jumping from highest to lowest
    seekCount += Math.abs(allRequests[0] - path[path.length - 1]);
    
    // Move from lowest track upwards
    for (let i = 0; i < headIndex; i++) {
      path.push(allRequests[i]);
      if (i > 0) {
        seekCount += Math.abs(allRequests[i] - allRequests[i - 1]);
      }
    }
  }
  
  return { path, seekCount };
} 