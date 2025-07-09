// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

        const matchedUser = storedUsers.find(
            (user) => user.email === email && user.password === password
        );

        if (matchedUser) {
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("userName", matchedUser.name);
            // if (!localStorage.getItem("education")) {
            //     const defaultEducation = { degree: "", college: "", year: "" };
            //     localStorage.setItem("education", JSON.stringify(defaultEducation));
            // }

            // if (!localStorage.getItem("personal")) {
            //     const defaultPersonal = { email: email, phone: "", location: "" };
            //     localStorage.setItem("personal", JSON.stringify(defaultPersonal));
            // }
            alert("Login successful!");
            navigate("/profile");
        } else {
            alert("Incorrect email or password. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
                    Login to SkillSprint
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center mt-4 text-sm text-gray-600">
                    Forgot password?{" "}
                    <Link to="/Forgetpassword" className="text-blue-600 hover:underline">
                        Click here
                    </Link>
                </p>

                <p className="text-center mt-2 text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/Register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
