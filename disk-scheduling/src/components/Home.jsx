import React from 'react';
import { Link } from 'react-router-dom';
import './styles/card.css';

const Home = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-blue-100 to-pink-100 flex flex-col">
    {/* Header */}
    <header className="w-full flex justify-between items-center px-10 py-8 bg-white/60 backdrop-blur-md shadow-md">
      <h1 className="text-5xl font-extrabold text-indigo-700 tracking-wide drop-shadow-lg">
        DiskViz
      </h1>
      <Link
        to="/about"
        className="text-lg font-semibold text-indigo-700 hover:text-pink-600 transition px-6 py-2 rounded-full bg-white/70 shadow hover:shadow-lg"
        style={{ textDecoration: 'none' }}
      >
        About Us
      </Link>
    </header>

    {/* Main Content */}
    <main className="flex flex-1 items-center justify-center">
      <div className="card-grid" style={{ maxWidth: 1100 }}>
        <div
          className="card algorithm-card flex flex-col items-center justify-center animate-fade-in-up"
          style={{
            minHeight: 360,
            minWidth: 340,
            borderRadius: 28,
            background: 'rgba(255,255,255,0.85)',
            boxShadow: '0 8px 32px 0 rgba(99,102,241,0.12)',
            border: '2px solid #a5b4fc',
            backdropFilter: 'blur(8px)',
          }}
        >
          <h2 className="card-title mb-6 text-3xl font-bold text-indigo-800 drop-shadow">
            Disk Scheduling Simulator
          </h2>
          <p className="card-content mb-10 text-lg text-center text-gray-700">
            Visualize and compare disk scheduling algorithms interactively with step-by-step animations and insights.
          </p>
          <Link
            to="/simulator"
            className="card-button w-full text-xl text-center py-3 rounded-full bg-indigo-500 hover:bg-indigo-700 transition font-semibold shadow"
          >
            Go to Simulator
          </Link>
        </div>
        <div
          className="card visualization-card flex flex-col items-center justify-center animate-fade-in-up"
          style={{
            minHeight: 360,
            minWidth: 340,
            borderRadius: 28,
            background: 'rgba(255,255,255,0.85)',
            boxShadow: '0 8px 32px 0 rgba(139,92,246,0.10)',
            border: '2px solid #c4b5fd',
            backdropFilter: 'blur(8px)',
          }}
        >
          <h2 className="card-title mb-6 text-3xl font-bold text-purple-800 drop-shadow">
            Disk Layout Viewer
          </h2>
          <p className="card-content mb-10 text-lg text-center text-gray-700">
            Explore the file system and disk cluster allocation visually with a modern, interactive layout.
          </p>
          <Link
            to="/disk-layout"
            className="card-button w-full text-xl text-center py-3 rounded-full bg-purple-500 hover:bg-purple-700 transition font-semibold shadow"
          >
            View Disk Layout
          </Link>
        </div>
      </div>
    </main>

    {/* Footer */}
    <footer className="w-full text-center py-6 text-gray-500 text-sm mt-10">
      &copy; {new Date().getFullYear()} DiskViz &mdash; Visualizing Disk Scheduling Algorithms
    </footer>
  </div>
);

export default Home;