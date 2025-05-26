import React from 'react';
import amanImg from './images/aman.jpg';
import ayushImg from './images/ayush.jpg';
import lokeshImg from './images/lokesh.jpg';

const team = [
   {
    name: 'Ayush Saklani',
    course: 'B.Tech  Computer Science and Engineering (CSE) ',
    university: 'Graphic Era Deemed to be University',
    img: ayushImg,
    linkedin: 'https://www.linkedin.com/in/ayush-saklani-70519b250/',
    github: 'https://github.com/ayushaha', 
  },
  {
    name: 'Aman Negi',
    course: 'B.Tech  Computer Science and Engineering (CSE)',
    university: 'Graphic Era Deemed to be University',
    img: amanImg,
    linkedin: 'https://www.linkedin.com/in/aman-negi-917028248',
    github: 'https://github.com/Aman-Negi07', 
  },
  {
    name: 'Lokesh Negi',
    course: 'B.Tech  Computer Science and Engineering (CSE)',
    university: 'Graphic Era Deemed to be University',
    img: lokeshImg,
    linkedin: 'https://www.linkedin.com/in/lokesh-negi-383625275', 
    github: 'https://github.com/LokeshN1', 
  },
];

const About = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center py-10">
    <h1 className="text-5xl font-extrabold text-indigo-700 mb-4 tracking-wide drop-shadow-lg">Meet Our Team</h1>
    <p className="mb-10 text-xl text-gray-700 max-w-2xl text-center">
      We are a passionate group of students dedicated to building interactive and educational tools for disk scheduling visualization.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {team.map((member, idx) => (
        <div
          key={idx}
          className="card flex flex-col items-center p-8 shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white/90"
          style={{
            minWidth: 320,
            borderRadius: 24,
            border: '2px solid #a5b4fc',
            boxShadow: '0 8px 32px 0 rgba(31, 41, 55, 0.10)'
          }}
        >
          <div
            className="overflow-hidden mb-6"
            style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              border: '6px solid #6366f1',
              boxShadow: '0 4px 24px 0 rgba(99,102,241,0.15)'
            }}
          >
            <img
              src={member.img}
              alt={member.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
                transition: 'transform 0.3s',
              }}
              className="hover:scale-110"
            />
          </div>
          <h2 className="card-title text-2xl font-bold text-indigo-800 mb-1">{member.name}</h2>
          <div className="text-gray-600 text-lg mb-1 font-medium">{member.course}</div>
          <div className="text-gray-700 text-lg mb-1 font-medium">
            {member.university}
            <br />
            <span className="text-base text-gray-500 block w-full text-center">Dehradun, Uttarakhand</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm font-medium shadow"
              title={`Connect with ${member.name} on LinkedIn`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="mr-2"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
              LinkedIn
            </a>
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors text-sm font-medium shadow"
              title={`View ${member.name}'s GitHub`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="mr-2"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              GitHub
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default About;