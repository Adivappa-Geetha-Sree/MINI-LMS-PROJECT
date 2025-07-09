"use client";
import { useEffect, useState } from "react";

export default function ViewAbout() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("aboutInfo"));
    setAbout(data);
  }, []);

  if (!about) {
    return (
      <div className="p-6 text-gray-600 min-h-screen bg-gray-100">
        No about information added yet.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">📘 About SkillSprint</h1>

      <div className="bg-white p-6 rounded shadow space-y-4 text-gray-700">
        <p>
          <strong>💬 Quote:</strong> {about.quote}
        </p>
        <p>
          <strong>📌 Title:</strong> {about.title}
        </p>
        <p>
          <strong>📄 Description:</strong> {about.description}
        </p>
        <p>
          <strong>🎯 Mission:</strong> {about.mission}
        </p>
        <p>
          <strong>📞 Phone:</strong> {about.phone}
        </p>
        <p>
          <strong>📧 Email:</strong> {about.email}
        </p>
        <div>
          <strong>🏢 Tied-up Companies:</strong>
          <ul className="list-disc pl-6 mt-1 text-sm">
            {about.companies?.map((company, idx) => (
              <li key={idx}>{company}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
