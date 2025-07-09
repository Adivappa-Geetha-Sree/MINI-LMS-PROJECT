"use client";
import { useEffect, useState } from "react";

export default function ViewCoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("addedCourses")) || [];
    setCourses(stored);
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">👁️ View All Courses</h1>

      {courses.length === 0 ? (
        <p className="text-gray-600">No courses added yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full table-auto border-collapse text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border">Main Image</th>
                <th className="p-3 border">Course Name</th>
                <th className="p-3 border">Sector</th>
                <th className="p-3 border">Price (₹)</th>
                <th className="p-3 border">Duration</th>
                <th className="p-3 border">Timing</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Class Images</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, idx) => (
                <tr key={idx} className="text-center hover:bg-gray-50">
                  <td className="border p-2">{idx + 1}</td>
                  <td className="border p-2">
                    {course.mainImage ? (
                      <img
                        src={course.mainImage}
                        alt="Main"
                        className="h-12 w-12 object-cover mx-auto rounded"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No Image</span>
                    )}
                  </td>
                  <td className="border p-2 font-semibold">{course.name}</td>
                  <td className="border p-2">{course.sector}</td>
                  <td className="border p-2">₹{course.price}</td>
                  <td className="border p-2">{course.duration}</td>
                  <td className="border p-2">{course.timing || `${course.fromTime} - ${course.toTime}`}</td>
                  <td className="border p-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        course.status === "active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {course.status}
                    </span>
                  </td>
                  <td className="border p-2 text-left">{course.description}</td>
                  <td className="border p-2">
                    <div className="flex gap-1 overflow-x-auto">
                      {(course.classImages || []).map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`Class-${i}`}
                          className="h-10 w-10 object-cover rounded"
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
