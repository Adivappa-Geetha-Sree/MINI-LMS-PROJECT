import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = existingUsers.find(user => user.email === email);

        if (userExists) {
            alert("Email already exists. Go to login page.");
            navigate("/Login");
            return;
        }

        const newUser = { name, email, password };
        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));
        localStorage.setItem("userName", name)
        localStorage.setItem("isLoggedIn", true); // simulate login
        // localStorage.setItem("userName", registerName);
        // localStorage.setItem("education", JSON.stringify({ degree: "", college: "", year: "" }));
        // localStorage.setItem("personal", JSON.stringify({ email: email, phone: "", location: "" }));

        navigate("/");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-600">Create Your Account</h2>
                <p className="text-l font-bold mb-6 text-center text-blue-600">for Continous browsing</p>


                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Name</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Password</label>
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
                        Register
                    </button>
                </form>

                <p className="text-center mt-4 text-sm text-gray-600">
                    Please Register for continous browsing.....
                </p>
                <p className="text-center mt-4 text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/Login" className="text-blue-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
