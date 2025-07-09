"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ import router

export default function Add() {
    const router = useRouter(); // ✅ initialize router
    const [about, setAbout] = useState({
        quote: "",
        title: "",
        description: "",
        mission: "",
        phone: "",
        email: "",
    });
    const [submitted, setSubmitted] = useState(false);


    const [companies, setCompanies] = useState([""]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAbout({ ...about, [name]: value });
    };

    const handleCompanyChange = (index, value) => {
        const updated = [...companies];
        updated[index] = value;
        setCompanies(updated);
    };

    const addCompanyField = () => setCompanies([...companies, ""]);
    const removeCompanyField = (index) =>
        setCompanies(companies.filter((_, i) => i !== index));

    const handleSubmit = (e) => {
        e.preventDefault();
        const aboutData = { ...about, companies };
        localStorage.setItem("aboutInfo", JSON.stringify(aboutData));
        alert("✅ About section added!");
        router.push("/about/view"); // ✅ Redirect to view page
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-blue-700 mb-6">➕ Add About Info</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                {/* Quote */}
                <div>
                    <label className="block text-gray-700 font-medium">SkillSprint Quote</label>
                    <input
                        type="text"
                        name="quote"
                        value={about.quote}
                        onChange={handleChange}
                        placeholder="Empower your skills"
                        className="w-full border p-2 rounded mt-1"
                        required
                    />
                </div>

                {/* Title */}
                <div>
                    <label className="block text-gray-700 font-medium">About Title</label>
                    <input
                        type="text"
                        name="title"
                        value={about.title}
                        onChange={handleChange}
                        placeholder="Who we are"
                        className="w-full border p-2 rounded mt-1"
                        required
                    />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium">Description</label>
                    <textarea
                        name="description"
                        value={about.description}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Brief description about SkillSprint"
                        className="w-full border p-2 rounded mt-1"
                        required
                    />
                </div>

                {/* Our Mission */}
                <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium">Our Mission</label>
                    <textarea
                        name="mission"
                        value={about.mission}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Our goal is to help every learner achieve..."
                        className="w-full border p-2 rounded mt-1"
                        required
                    />
                </div>

                {/* Help Desk Info */}
                <div>
                    <label className="block text-gray-700 font-medium">Help Desk Email</label>
                    <input
                        type="email"
                        name="email"
                        value={about.email}
                        onChange={handleChange}
                        placeholder="support@skillsprint.com"
                        className="w-full border p-2 rounded mt-1"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Help Desk Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={about.phone}
                        onChange={handleChange}
                        placeholder="99999 99999"
                        className="w-full border p-2 rounded mt-1"
                        required
                    />
                </div>

                {/* Tied-up Companies */}
                <div className="md:col-span-2">
                    <label className="block text-gray-700 font-medium mb-1">
                        Tied-up Companies for Placement
                    </label>
                    {companies.map((company, idx) => (
                        <div key={idx} className="flex items-center gap-2 mb-2">
                            <input
                                type="text"
                                value={company}
                                onChange={(e) => handleCompanyChange(idx, e.target.value)}
                                placeholder={`Company ${idx + 1}`}
                                className="flex-1 border p-2 rounded"
                            />
                            {companies.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeCompanyField(idx)}
                                    className="text-red-600 hover:underline"
                                >
                                    ❌
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addCompanyField}
                        className="text-blue-600 hover:underline text-sm"
                    >
                        ➕ Add Company
                    </button>
                </div>

                {/* Submit */}
                <div className="md:col-span-2 text-right">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Submit About Info
                    </button>

                    {submitted && (
                        <div className="mt-6 text-green-600 text-center font-semibold">
                            ✅ About information saved successfully!
                        </div>
                    )}

                </div>
            </form>
        </div>
    );
}
