// src/components/CourseCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleViewCourse = () => {
    localStorage.setItem("selectedCourse", JSON.stringify(course));
    navigate(`/course/${course.id}`);
  };

  if (!course) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={course.image || "https://via.placeholder.com/400x300?text=No+Image"}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{course.title}</h2>
        <p className="text-gray-600 mt-2">{course.description}</p>
        <button
          onClick={handleViewCourse}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Course
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
