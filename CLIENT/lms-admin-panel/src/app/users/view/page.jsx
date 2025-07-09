"use client";
import React, { useEffect, useState } from "react";

export default function ViewUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    setUsers(storedUsers);
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">👥 Registered Users</h1>

      {users.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full border">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Degree</th>
                <th className="p-3 border">College</th>
                <th className="p-3 border">Graduation Year</th>
                <th className="p-3 border">Courses</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Location</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} className="text-sm text-gray-700 even:bg-gray-50">
                  <td className="p-2 border text-center">{idx + 1}</td>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.education?.degree || "-"}</td>
                  <td className="p-2 border">{user.education?.college || "-"}</td>
                  <td className="p-2 border">{user.education?.year || "-"}</td>
                  <td className="p-2 border">
                    {user.enrolledCourses?.map((c) => c.title).join(", ") || "—"}
                  </td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.phone}</td>
                  <td className="p-2 border">{user.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No users registered yet.</p>
      )}
    </div>
  );
}
