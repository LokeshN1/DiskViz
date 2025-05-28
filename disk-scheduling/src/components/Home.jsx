import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './styles/card.css';

const algorithmTheory = [
  {
    title: "First Come First Served (FCFS)",
    description: "The simplest disk scheduling algorithm that serves requests in the order they arrive in the disk queue.",
    advantages: ["Simple to implement", "Fair to all requests"],
    disadvantages: ["Can cause long seek times", "May not provide the best service"]
  },
  {
    title: "Shortest Seek Time First (SSTF)",
    description: "Selects the request with the minimum seek time from the current head position.",
    advantages: ["Reduces total seek time", "Better performance than FCFS"],
    disadvantages: ["May cause starvation of some requests", "Not optimal in all cases"]
  },
  {
    title: "SCAN (Elevator)",
    description: "The disk arm moves in one direction servicing requests until it reaches the end, then reverses direction.",
    advantages: ["Prevents starvation", "Good for high-load systems"],
    disadvantages: ["May cause longer wait times for recently arrived requests"]
  },
  {
    title: "C-SCAN (Circular SCAN)",
    description: "A variant of SCAN that always moves in the same direction, returning to the beginning when reaching the end.",
    advantages: ["More uniform wait times", "Better performance for high-load systems"],
    disadvantages: ["Longer seek times for some requests", "May not be optimal for light loads"]
  },
  {
    title: "LOOK",
    description: "Similar to SCAN but only goes as far as the last request in each direction.",
    advantages: ["More efficient than SCAN", "Reduces unnecessary movement"],
    disadvantages: ["Implementation complexity", "May not be optimal in all cases"]
  },
  {
    title: "C-LOOK",
    description: "Circular version of LOOK that always moves in the same direction.",
    advantages: ["More uniform wait times", "Efficient for high-load systems"],
    disadvantages: ["May cause longer wait times for some requests"]
  }
];

const theoryContent = {
  introduction: {
    title: "Introduction to Disk Scheduling",
    content: `Disk scheduling algorithms are crucial in managing how data is read from and written to a computer's hard disk. These algorithms help determine the order in which disk read and write requests are processed, significantly impacting the speed and efficiency of data access. By understanding and implementing these algorithms, we can optimize system performance and ensure faster data retrieval.`
  },
  importance: {
    title: "Importance of Disk Scheduling",
    points: [
      "Multiple I/O requests may arrive from different processes, but only one I/O request can be served at a time.",
      "Two or more requests may be far from each other, resulting in greater disk arm movement.",
      "Hard drives are one of the slowest parts of the computer system and need to be accessed efficiently."
    ]
  },
  keyTerms: {
    title: "Key Terms in Disk Scheduling",
    terms: [
      {
        term: "Seek Time",
        definition: "The time taken to locate the disk arm to a specified track where the data is to be read or written."
      },
      {
        term: "Rotational Latency",
        definition: "The time taken by the desired sector of the disk to rotate into a position so that it can access the read/write heads."
      },
      {
        term: "Transfer Time",
        definition: "The time to transfer the data. Depends on the rotating speed of the disk and number of bytes to be transferred."
      },
      {
        term: "Disk Access Time",
        definition: "Seek Time + Rotational Latency + Transfer Time"
      },
      {
        term: "Response Time",
        definition: "The average time spent by a request waiting to perform its I/O operation."
      }
    ]
  },
  goals: {
    title: "Goals of Disk Scheduling",
    points: [
      "Minimize Seek Time",
      "Maximize Throughput",
      "Minimize Latency",
      "Fairness",
      "Efficiency in Resource Utilization"
    ]
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Home = () => {
  const [showTheory, setShowTheory] = useState(false);

  const handleTheoryToggle = () => {
    setShowTheory(!showTheory);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
    {/* Header */}
      <header className="fixed w-full z-50 px-6 md:px-10 py-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-white">D</span>
            </div>
            <h1 className="text-3xl font-bold text-white">
              Disk<span className="text-blue-500">Viz</span>
      </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
      <Link
        to="/about"
              className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-full border border-slate-700 hover:border-blue-500 transition-all duration-300"
      >
              About Team
      </Link>
          </motion.div>
        </div>
    </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-10">
        <div className="absolute inset-0 bg-grid-slate-800/20 mask-gradient-to-b" />
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-500 mb-6">
              Visualize Disk Scheduling Like Never Before
          </h2>
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              Experience an interactive journey through disk scheduling algorithms with real-time visualizations and comprehensive analysis tools.
          </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/simulator"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:from-blue-500 hover:to-indigo-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                Launch Simulator
                <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <button
                onClick={handleTheoryToggle}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium text-slate-300 bg-slate-800/50 rounded-full hover:bg-slate-700/50 border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
              >
                {showTheory ? "Hide Theory" : "Explore Theory"}
                <svg 
                  className={`ml-2 -mr-1 w-5 h-5 transform transition-transform duration-300 ${showTheory ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {/* Simulator Card */}
            <div className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative">
                <div className="h-12 w-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Interactive Simulator</h3>
                <p className="text-slate-300 mb-4">Experience real-time visualization of disk scheduling algorithms in action.</p>
                <Link
                  to="/simulator"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                >
                  Try it out
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Layout Card */}
            <div className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative">
                <div className="h-12 w-12 bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Disk Layout</h3>
                <p className="text-slate-300 mb-4">Explore the physical structure of hard drives with our interactive 3D visualization.</p>
                <Link
                  to="/disk-layout"
                  className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  View layout
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* 2D View Card */}
            <div className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative">
                <div className="h-12 w-12 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">2D Visualization</h3>
                <p className="text-slate-300 mb-4">View disk operations in a simplified, intuitive 2D interface.</p>
                <Link
                  to="/disk-view-2d"
                  className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Open view
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
          </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rest of the content (Theory section, etc.) */}
      <div className="px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Existing theory content */}
          {showTheory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-8 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/20"
            >
              {/* Introduction */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-200">
                    {theoryContent.introduction.title}
          </h2>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed max-w-4xl">
                  {theoryContent.introduction.content}
                </p>
              </div>

              {/* Importance */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-blue-200">
                    {theoryContent.importance.title}
                  </h3>
                </div>
                <ul className="grid md:grid-cols-2 gap-4">
                  {theoryContent.importance.points.map((point, index) => (
                    <li key={index} className="flex items-start space-x-3 bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                      <span className="text-blue-400 mt-1">•</span>
                      <span className="text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Terms */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-blue-200">
                    {theoryContent.keyTerms.title}
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {theoryContent.keyTerms.terms.map((item, index) => (
                    <div key={index} className="group bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm">
                      <h4 className="text-xl font-semibold text-blue-300 mb-3 group-hover:text-blue-200 transition-colors">
                        {item.term}
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {item.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Goals */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-blue-200">
                    {theoryContent.goals.title}
                  </h3>
                </div>
                <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {theoryContent.goals.points.map((goal, index) => (
                    <div key={index} 
                      className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 text-center border border-white/10 hover:border-white/20 transition-all duration-300 group backdrop-blur-sm"
                    >
                      <p className="text-blue-300 font-semibold group-hover:text-blue-200 transition-colors">{goal}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formula Section */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-green-500/20 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-blue-200">
                    Important Formulas
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm">
                    <h4 className="text-lg font-semibold text-blue-300 mb-3">Disk Access Time</h4>
                    <p className="text-gray-300 font-mono bg-black/20 p-4 rounded-lg">
                      Disk Access Time = Seek Time + Rotational Latency + Transfer Time
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 border border-white/10 backdrop-blur-sm">
                    <h4 className="text-lg font-semibold text-blue-300 mb-3">Total Seek Time</h4>
                    <p className="text-gray-300 font-mono bg-black/20 p-4 rounded-lg">
                      Total Seek Time = Total Head Movement × Seek Time
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Theory Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl shadow-xl p-8 mb-8 border border-white/20"
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              Understanding Disk Scheduling Algorithms
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {algorithmTheory.map((algo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 * index }}
                  className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-indigo-400 mb-3">
                    {algo.title}
                  </h3>
                  <p className="text-indigo-100 mb-4 text-sm">
                    {algo.description}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-400 mb-2 text-sm">Advantages</h4>
                      <ul className="list-disc list-inside text-green-200 text-sm">
                        {algo.advantages.map((adv, i) => (
                          <li key={i}>{adv}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-400 mb-2 text-sm">Disadvantages</h4>
                      <ul className="list-disc list-inside text-red-200 text-sm">
                        {algo.disadvantages.map((dis, i) => (
                          <li key={i}>{dis}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

    {/* Footer */}
      <footer className="mt-20 py-8 bg-slate-900/80 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} DiskViz &mdash; A Project by Team DiskViz
          </p>
        </div>
    </footer>
  </div>
);
};

export default Home;