"use client";
import { useEffect, useState } from "react";

export default function ViewTeachersPage() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("teachersList")) || [];
    setTeachers(data);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">👁️ View All Teachers</h1>

      {teachers.length === 0 ? (
        <p className="text-gray-600">No teachers added yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full table-auto text-sm border-collapse">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border">Photo</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Subject</th>
                <th className="p-3 border">Expertise</th>
                <th className="p-3 border">Qualification</th>
                <th className="p-3 border">Experience</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Address</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t, idx) => (
                <tr key={idx} className="text-center hover:bg-gray-50">
                  <td className="border p-2">{idx + 1}</td>
                  <td className="border p-2">
                    {t.profilePic ? (
                      <img src={t.profilePic} alt="pic" className="h-10 w-10 rounded mx-auto" />
                    ) : (
                      <span className="text-gray-400 italic">No Image</span>
                    )}
                  </td>
                  <td className="border p-2 font-medium">{t.name}</td>
                  <td className="border p-2">{t.subject}</td>
                  <td className="border p-2">{t.expertise}</td>
                  <td className="border p-2">{t.qualification}</td>
                  <td className="border p-2">{t.experience} yrs</td>
                  <td className="border p-2">{t.email}</td>
                  <td className="border p-2">{t.phone}</td>
                  <td className="border p-2">
                    <span className={`px-2 py-1 rounded text-white text-xs ${t.status === "active" ? "bg-green-500" : "bg-red-500"}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="border p-2 text-left">{t.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
