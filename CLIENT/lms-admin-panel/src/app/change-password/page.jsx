"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ChangePasswordPage() {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("adminLoggedIn");
    if (isAdmin !== "true") {
      router.push("/login");
    }
  }, [router]);

  const handleChange = () => {
    const storedPass = localStorage.getItem("adminPassword") || "admin123";

    if (currentPass !== storedPass) {
      setError("❌ Current password is incorrect.");
      return;
    }

    if (newPass !== confirmPass) {
      setError("❌ New passwords do not match.");
      return;
    }

    localStorage.setItem("adminPassword", newPass);
    alert("✅ Password changed successfully!");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Change Password</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          type="password"
          placeholder="Current Password"
          className="w-full border p-2 rounded mb-3"
          value={currentPass}
          onChange={(e) => setCurrentPass(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-2 rounded mb-3"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full border p-2 rounded mb-6"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />
        <button
          onClick={handleChange}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
