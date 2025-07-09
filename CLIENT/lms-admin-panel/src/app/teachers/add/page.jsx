"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Add() {
    const router = useRouter();

    const [teacher, setTeacher] = useState({
        name: "",
        subject: "",
        email: "",
        phone: "",
        address: "",
        qualification: "",
        expertise: "",
        experience: "",
        status: "active",
    });

    const [profilePic, setProfilePic] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacher({ ...teacher, [name]: value });
    };

    const handleProfilePic = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const existing = JSON.parse(localStorage.getItem("teachersList")) || [];
        const updated = [...existing, { ...teacher, profilePic }];
        localStorage.setItem("teachersList", JSON.stringify(updated));
        alert("✅ Teacher profile saved!");
        router.push("/teachers/view"); // ✅ Redirect to view page

    };

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="text-2xl font-bold text-blue-700 mb-6">➕ Add New Teacher</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                {/* Name */}
                <div>
                    <label className="block font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={teacher.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mt-1"
                        required
                    />
                </div>

                {/* Subject Expertise */}
                <div>
                    <label className="block font-medium text-gray-700">Subject Expertise</label>
                    <input
                        type="text"
                        name="subject"
                        value={teacher.subject}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mt-1"
                        placeholder="e.g., React, Communication"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={teacher.email}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mt-1"
                        required
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block font-medium text-gray-700">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={teacher.phone}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mt-1"
                        placeholder="e.g., 9876543210"
                        required
                    />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                    <label className="block font-medium text-gray-700">Address</label>
                    <textarea
                        name="address"
                        value={teacher.address}
                        onChange={handleChange}
                        rows={2}
                        className="w-full border p-2 rounded mt-1"
                        required
                    />
                </div>

                {/* Qualification */}
                <div>
                    <label className="block font-medium text-gray-700">Qualification</label>
                    <input
                        type="text"
                        name="qualification"
                        value={teacher.qualification}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mt-1"
                        placeholder="e.g., M.Tech, MBA"
                    />
                </div>

                {/* Experience */}
                <div>
                    <label className="block font-medium text-gray-700">Experience (years)</label>
                    <input
                        type="number"
                        name="experience"
                        value={teacher.experience}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mt-1"
                        placeholder="e.g., 5"
                    />
                </div>
                {/* Expert In (detailed skills) */}
                <div className="md:col-span-2">
                    <label className="block font-medium text-gray-700">Expert In</label>
                    <input
                        type="text"
                        name="expertise"
                        value={teacher.expertise || ""}
                        onChange={(e) =>
                            setTeacher((prev) => ({ ...prev, expertise: e.target.value }))
                        }
                        className="w-full border p-2 rounded mt-1"
                        placeholder="e.g., React, Node.js, MongoDB, Docker"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block font-medium text-gray-700">Status</label>
                    <select
                        name="status"
                        value={teacher.status}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mt-1"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {/* Profile Image Upload */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Faculty Photo</label>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => document.getElementById("profilePicUpload").click()}
                            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                        >
                            Upload
                        </button>
                        <input
                            id="profilePicUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePic}
                            className="hidden"
                        />
                        {profilePic ? (
                            <img
                                src={profilePic}
                                alt="Preview"
                                className="h-16 w-16 object-cover rounded"
                            />
                        ) : (
                            <span className="text-sm text-gray-500">No photo uploaded</span>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 text-right mt-4">
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                    >
                        Save Teacher
                    </button>
                </div>
            </form>
        </div>
    );
}
