// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/outline';


const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    useEffect(() => {
        const loginStatus = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(loginStatus === "true");
    }, []);
    return (
        <nav className="bg-white shadow px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">SkillSprint</h1>
            <div className="flex items-center gap-x-6">
                <Link to="/" className="text-gray-600 hover:text-blue-500">Home</Link>
                <Link to="/About" className="text-gray-600 hover:text-blue-500">About</Link>
                <Link to="/Courses" className="text-gray-600 hover:text-blue-500">Courses</Link>
                {isLoggedIn ? (
                    <>
                        <Link to="/Dashboard" className="text-gray-600 hover:text-blue-500">Dashboard</Link>

                        <Link to="/profile" className="flex items-center text-gray-600 hover:text-blue-700">
                            <UserCircleIcon className="h-7 w-7 mr-2" />
                            <span className="hidden sm:inline">Profile</span>
                        </Link>

                    </>
                ) : (
                    <>
                        <Link to="/Login" className="text-gray-600 hover:text-blue-500">Login</Link>
                        <Link to="/Register" className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">Register</Link>
                    </>
                )}

            </div>
        </nav>
    );
};

export default Navbar;
