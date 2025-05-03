# Disk Scheduling Algorithm Simulator

An interactive web-based simulator to visualize various disk scheduling algorithms. This tool helps students understand how different disk scheduling algorithms work by providing a step-by-step visualization of disk head movements.

## Features

- Input track requests and starting head position
- Choose from 6 disk scheduling algorithms:
  - First-Come, First-Served (FCFS)
  - Shortest Seek Time First (SSTF) 
  - SCAN (Elevator Algorithm)
  - C-SCAN (Circular SCAN)
  - LOOK
  - C-LOOK (Circular LOOK)
- Animated visualization of disk head movement
- Step-by-step playback controls with adjustable speed
- Algorithm comparison with performance metrics

## Getting Started

### Prerequisites

- Node.js (version 14.0.0 or later)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd disk-scheduling
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## How to Use

1. **Input Parameters**:
   - Enter comma-separated track request numbers (e.g., `98, 183, 37, 122, 14, 124, 65, 67`)
   - Enter the starting head position (e.g., `53`)
   - Select a disk scheduling algorithm from the dropdown

2. **Start Simulation**:
   - Click the "Start Simulation" button

3. **Control Playback**:
   - Use Play/Pause button to start/stop automatic playback
   - Use Next/Previous buttons to move one step at a time
   - Adjust playback speed with the speed selector
   - Use Reset button to return to the initial state

4. **View Results**:
   - Watch the animated disk head movement
   - See the current position and movement details
   - When simulation completes, view the algorithm comparison chart

## Algorithms Explained

- **FCFS**: Serves requests in the order they arrive
- **SSTF**: Serves the request closest to the current head position
- **SCAN**: Moves in one direction serving requests until it reaches the end, then reverses direction
- **C-SCAN**: Moves in one direction, jumps back to the beginning when it reaches the end
- **LOOK**: Similar to SCAN but only goes as far as the last request in each direction
- **C-LOOK**: Similar to C-SCAN but only goes as far as the last request before jumping back

## Technologies Used

- React.js
- TailwindCSS
- Framer Motion
- Chart.js

## License

This project is licensed under the MIT License.
