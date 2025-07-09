import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const storedCourse = JSON.parse(localStorage.getItem("selectedCourse"));
        if (storedCourse && storedCourse.id.toString() === id) {
            setCourse(storedCourse);
        } else {
            navigate("/courses"); // fallback
        }
    }, [id, navigate]);

    if (!course) return null;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 px-4 py-8">
                <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
                    {/* 🔙 Back Button */}
                    <button
                        onClick={() => navigate("/courses")}
                        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
                    >
                        {/* You can use an icon like Lucide or just emoji */}
                        <span className="mr-2 text-xl">←</span> Back to Courses
                    </button>
                    <h1 className="text-3xl font-bold text-blue-700 mb-4">{course.title}</h1>
                    <img src={course.image} alt={course.title} className="w-full h-64 object-cover rounded mb-4" />
                    <p className="text-gray-700">{course.description}</p>

                    <button
                        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                        onClick={() => {
                            const enrolled = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
                            const alreadyEnrolled = enrolled.some(c => c.id === course.id);
                            if (!alreadyEnrolled) {
                                enrolled.push(course);
                                localStorage.setItem("enrolledCourses", JSON.stringify(enrolled));
                                alert("Course enrolled!");
                            } else {
                                alert("You are already enrolled in this course.");
                            }
                        }}
                    >
                        Enroll Now
                    </button>
                </div>
            </div>
        </>
    );
};

export default CourseDetails;
