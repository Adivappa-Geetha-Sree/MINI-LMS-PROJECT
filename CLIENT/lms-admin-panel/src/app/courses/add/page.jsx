"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Add() {
  const router = useRouter();

  const [course, setCourse] = useState({
    name: "",
    sector: "IT",
    description: "",
    price: "",
    duration: "",
    fromTime: "",
    toTime: "",
    status: "active",
  });

  const [mainImage, setMainImage] = useState(null);
  const [classImages, setClassImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allCourses = JSON.parse(localStorage.getItem("addedCourses")) || [];
    const fullTiming = `${course.fromTime} - ${course.toTime}`;
    allCourses.push({ ...course, timing: fullTiming, mainImage, classImages });
    localStorage.setItem("addedCourses", JSON.stringify(allCourses));

    alert("✅ Course added successfully!");
    router.push("/courses/view");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">➕ Add New Course</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded shadow-md p-6 grid gap-4 md:grid-cols-2"
      >
        {/* Course Name */}
        <div>
          <label className="block font-medium text-gray-700">Course Name</label>
          <input
            type="text"
            name="name"
            value={course.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* Sector */}
        <div>
          <label className="block font-medium text-gray-700">Course Sector</label>
          <select
            name="sector"
            value={course.sector}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="IT">IT</option>
            <option value="Non-IT">Non-IT</option>
            <option value="Management">Management</option>
            <option value="Soft Skills">Soft Skills</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium text-gray-700">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={course.price}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block font-medium text-gray-700">Duration</label>
          <input
            type="text"
            name="duration"
            value={course.duration}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            placeholder="e.g., 3 months"
          />
        </div>

        {/* Timing From */}
        <div>
          <label className="block font-medium text-gray-700">From Time</label>
          <input
            type="time"
            name="fromTime"
            value={course.fromTime}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* Timing To */}
        <div>
          <label className="block font-medium text-gray-700">To Time</label>
          <input
            type="time"
            name="toTime"
            value={course.toTime}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={course.status}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            rows={4}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* Main Image Upload */}
        <div className="md:col-span-1">
          <label className="block font-medium text-gray-700 mb-1">Main Course Image</label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => document.getElementById("mainImageUpload").click()}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Upload
            </button>
            <input
              id="mainImageUpload"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setMainImage(reader.result);
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
            />
            {mainImage ? (
              <img src={mainImage} alt="Preview" className="h-16 w-16 object-cover rounded" />
            ) : (
              <div className="h-16 w-16 flex items-center justify-center border rounded text-xs text-gray-500 bg-gray-50">
                No Preview
              </div>
            )}
          </div>
        </div>

        {/* Class Images Upload */}
        <div className="md:col-span-1">
          <label className="block font-medium text-gray-700 mb-1">Class Images</label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => document.getElementById("classImageUpload").click()}
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
            >
              Upload
            </button>
            <input
              id="classImageUpload"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                const readers = files.map((file) => {
                  return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                  });
                });
                Promise.all(readers).then(setClassImages);
              }}
              className="hidden"
            />
          </div>

          {classImages.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {classImages.map((img, idx) => (
                <img key={idx} src={img} alt={`class-${idx}`} className="h-16 w-16 object-cover rounded" />
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500 mt-2 italic">No class images uploaded</div>
          )}
        </div>

        {/* Submit */}
        <div className="md:col-span-2 text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
}
