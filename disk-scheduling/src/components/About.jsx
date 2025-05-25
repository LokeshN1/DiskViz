import React from 'react';
import amanImg from './images/aman.jpg';
import ayushImg from './images/ayush.jpg';
import lokeshImg from './images/lokesh.jpg';

const team = [
  {
    name: 'Aman Negi',
    course: 'B.Tech Computer Science',
    section: 'Section B',
    university: 'Graphic Era Deemed to be University',
    rollno: '2021076',
    img: amanImg,
  },
  {
    name: 'Ayush Saklani',
    course: 'B.Tech Computer Science',
    section: 'Section A',
    university: 'Graphic Era Deemed to be University',
    rollno: '2021075',
    img: ayushImg,
  },
  {
    name: 'Lokesh Negi',
    course: 'B.Tech Computer Science',
    section: 'Section AR-Q',
    university: 'Graphic Era Deemed to be University',
    rollno: '2021097',
    img: lokeshImg,
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
          <div className="text-gray-700 text-lg mb-1 font-medium">{member.course}</div>
          <div className="text-gray-600 mb-1">{member.section}</div>
          <div className="text-gray-600 mb-1">{member.university}</div>
          <div className="text-indigo-700 font-semibold mb-2">{member.rollno}</div>
        </div>
      ))}
    </div>
  </div>
);

export default About;