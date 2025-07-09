"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { cookies } from 'next/headers'; // For server-side login
// OR use js-cookie for client-side

import Cookies from 'js-cookie'; // Install this via `npm i js-cookie`


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = () => {
        const storedPassword = localStorage.getItem("adminPassword") || "admin123";
        const storedEmail = localStorage.getItem("adminEmail") || "admin@example.com";

        if (email === storedEmail && password === storedPassword) {
            Cookies.set("adminLoggedIn", true,{expires:1}); // expires by default in browser session
            localStorage.setItem("adminLoggedIn", true);
            router.push("/dashboard");
        } else {
            alert("Invalid credentials.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Admin Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 rounded w-full mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 rounded w-full mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
