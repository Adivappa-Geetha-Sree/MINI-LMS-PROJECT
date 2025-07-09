import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';
import TeacherCard from '../components/Teacherscard';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      const timer = setTimeout(() => {
        navigate('/register');
      }, 2 * 60 * 1000);
      return () => clearTimeout(timer);
    }
  }, [navigate]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const featuredCourses = [
    {
      id: 1,
      title: "React Basics",
      description: "Learn the fundamentals of React.js",
      image: "https://source.unsplash.com/400x300/?reactjs",
    },
    {
      id: 2,
      title: "Node.js + Express",
      description: "Build REST APIs with Node and Express",
      image: "https://source.unsplash.com/400x300/?nodejs",
    },
    {
      id: 3,
      title: "MongoDB Essentials",
      description: "Work with NoSQL databases effectively",
      image: "https://source.unsplash.com/400x300/?mongodb",
    },
  ];

  const nonTechCourses = [
    {
      id: 4,
      title: "Time Management",
      description: "Improve productivity and manage your time better.",
      image: "https://source.unsplash.com/400x300/?time,management",
    },
    {
      id: 5,
      title: "Public Speaking",
      description: "Become a confident and engaging speaker.",
      image: "https://source.unsplash.com/400x300/?public,speaking",
    },
  ];

  const interviewCourses = [
    {
      id: 6,
      title: "HR Interview Prep",
      description: "Crack your HR interviews with confidence.",
      image: "https://source.unsplash.com/400x300/?interview,hr",
    },
    {
      id: 7,
      title: "Technical Interview Mastery",
      description: "Ace coding and system design interviews.",
      image: "https://source.unsplash.com/400x300/?interview,tech",
    },
  ];

  const teachers = [
    { name: "Anjali Sharma", subject: "React.js", image: "https://source.unsplash.com/100x100/?woman,teacher" },
    { name: "Ravi Kumar", subject: "Node.js", image: "https://source.unsplash.com/100x100/?man,teacher" },
    { name: "Sneha Verma", subject: "Soft Skills", image: "https://source.unsplash.com/100x100/?mentor,woman" },
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <header className="text-center mt-10">
        <h1 className="text-4xl font-bold text-gray-800">Learn New Skills Online</h1>
        <p className="text-gray-600 mt-2">Explore curated courses and level up your career 🚀</p>
        <button
          onClick={() => navigate('/courses')}
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Get Started
        </button>
      </header>

      {/* Featured Courses */}
      <section className="mt-12 px-6 md:px-20">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Featured Courses</h2>
        <Slider {...sliderSettings}>
          {featuredCourses.slice(0, 12).map((course) => (
            <div key={course.id} className="px-2">
              <CourseCard course={course} />
            </div>
          ))}
        </Slider>
      </section>

      {/* Non-Tech Skills */}
      <section className="mt-12 px-6 md:px-20">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Non-Tech Skills</h2>
        <Slider {...sliderSettings}>
          {nonTechCourses.slice(0, 12).map((course) => (
            <div key={course.id} className="px-2">
              <CourseCard course={course} />
            </div>
          ))}
        </Slider>
      </section>

      {/* Interview Preparation */}
      <section className="mt-12 px-6 md:px-20">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Interview Preparation</h2>
        <Slider {...sliderSettings}>
          {interviewCourses.slice(0, 12).map((course) => (
            <div key={course.id} className="px-2">
              <CourseCard course={course} />
            </div>
          ))}
        </Slider>
      </section>

      {/* Teachers */}

      <section className="mt-12 px-6 md:px-20 text-center">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Our Expert Instructors</h2>

      <Slider {...sliderSettings}>
        {teachers.map((teacher, index) => (
          <div key={index} className="px-3">
            <TeacherCard teacher={teacher} />
          </div>
        ))}
      </Slider >
      </section >


      <Footer />
    </>
  );
};

export default Home;
