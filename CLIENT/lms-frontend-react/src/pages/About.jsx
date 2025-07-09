// src/pages/About.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaReact, FaNodeJs, FaDatabase, FaHtml5, FaCss3Alt, FaJsSquare } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss } from 'react-icons/si';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-6 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-blue-700 mb-6">About SkillSprint</h1>

          <p className="text-lg text-gray-700 mb-8">
            SkillSprint is a modern Learning Management System (LMS) built to empower learners with
            hands-on skills in web development, communication, and career readiness.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🚀 Our Mission</h2>
          <p className="text-gray-600 mb-6">
            To make practical and job-oriented learning accessible and engaging through personalized progress,
            expert instructors, and an intuitive online platform.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">💻 Tech Stack & Tools</h2>
          <p className="text-gray-600 mb-6">Our courses are built around top industry tools and technologies:</p>

          {/* Animated Tool Icons */}
          <div className="flex flex-wrap justify-center gap-6 text-5xl text-blue-600 animate-pulse mb-12">
            <FaHtml5 title="HTML5" className="hover:scale-110 transition-transform" />
            <FaCss3Alt title="CSS3" className="hover:scale-110 transition-transform" />
            <FaJsSquare title="JavaScript" className="hover:scale-110 transition-transform" />
            <FaReact title="React" className="hover:scale-110 transition-transform" />
            <SiTailwindcss title="Tailwind CSS" className="hover:scale-110 transition-transform" />
            <FaNodeJs title="Node.js" className="hover:scale-110 transition-transform" />
            <SiExpress title="Express.js" className="hover:scale-110 transition-transform" />
            <SiMongodb title="MongoDB" className="hover:scale-110 transition-transform" />
            <FaDatabase title="MySQL" className="hover:scale-110 transition-transform" />
          </div>

          <div className="bg-white p-6 rounded shadow text-left">
            <h2 className="text-xl font-semibold text-purple-700 mb-3">📞 Contact Us</h2>
            <p className="text-gray-700">Have any questions or feedback?</p>
            <p className="text-blue-600 font-medium">Email: support@skillsprint.com</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
