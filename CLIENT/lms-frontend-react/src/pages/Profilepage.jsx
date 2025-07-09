import React, { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Profile = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [userName, setUserName] = useState('');
    const [education, setEducation] = useState({ degree: '', college: '', year: '' });
    const [personal, setPersonal] = useState({ email: '', phone: '', location: '' });
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const enrolled = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
        setEnrolledCourses(enrolled);

        const storedName = localStorage.getItem('userName') || 'Learner';
        setUserName(storedName);

        const storedEdu = JSON.parse(localStorage.getItem('education')) || { degree: '', college: '', year: '' };
        const storedPersonal = JSON.parse(localStorage.getItem('personal')) || { email: '', phone: '', location: '' };

        setEducation(storedEdu);
        setPersonal(storedPersonal);

        const isIncomplete = !storedEdu.degree || !storedEdu.college || !storedEdu.year ||
            !storedPersonal.email || !storedPersonal.phone || !storedPersonal.location;

        if (isIncomplete) {
            setEditMode(true);
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('education', JSON.stringify(education));
        localStorage.setItem('personal', JSON.stringify(personal));
        setEditMode(false);
    };

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', false);
        localStorage.removeItem('userName');
        navigate('/');
        window.location.reload();
    };

    const isInfoMissing = !education.degree || !education.college || !education.year ||
        !personal.email || !personal.phone || !personal.location;

    return (
        <>
            <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
                <Navbar />
                <div className="min-h-screen bg-gray-100 px-4 py-8">
                    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-blue-700">Welcome, {userName} 👋</h1>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>

                        {/* Enrolled Courses */}
                        <section className="mb-8">
                            <h2 className="text-xl font-semibold mb-2 text-blue-600">🎓 Enrolled Courses</h2>
                            {enrolledCourses.length > 0 ? (
                                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                                    {enrolledCourses.map((course, index) => (
                                        <div key={index} className="bg-blue-50 p-4 rounded shadow-md">
                                            <h3 className="text-lg font-semibold text-blue-800">{course.title}</h3>
                                            <p className="text-gray-700 mt-1">{course.description}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600">You haven't enrolled in any courses yet.</p>
                            )}
                        </section>

                        {/* Education Details */}
                        <section className="mb-8">
                            <h2 className="text-xl font-semibold mb-2 text-green-600">🎓 Education Details</h2>
                            {editMode ? (
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        placeholder="Degree"
                                        className="border p-2 rounded w-full"
                                        value={education.degree}
                                        onChange={(e) => setEducation({ ...education, degree: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="College"
                                        className="border p-2 rounded w-full"
                                        value={education.college}
                                        onChange={(e) => setEducation({ ...education, college: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Year of Graduation"
                                        className="border p-2 rounded w-full"
                                        value={education.year}
                                        onChange={(e) => setEducation({ ...education, year: e.target.value })}
                                    />
                                </div>
                            ) : (
                                <ul className="list-disc ml-6 text-gray-700">
                                    <li><strong>Degree:</strong> {education.degree || "Not provided"}</li>
                                    <li><strong>College:</strong> {education.college || "Not provided"}</li>
                                    <li><strong>Year:</strong> {education.year || "Not provided"}</li>
                                </ul>
                            )}
                        </section>

                        {/* Personal Details */}
                        <section className="mb-8">
                            <h2 className="text-xl font-semibold mb-2 text-purple-600">👤 Personal Details</h2>
                            {editMode ? (
                                <div className="space-y-2">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="border p-2 rounded w-full"
                                        value={personal.email}
                                        onChange={(e) => setPersonal({ ...personal, email: e.target.value })}
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Phone"
                                        className="border p-2 rounded w-full"
                                        value={personal.phone}
                                        onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Location"
                                        className="border p-2 rounded w-full"
                                        value={personal.location}
                                        onChange={(e) => setPersonal({ ...personal, location: e.target.value })}
                                    />
                                </div>
                            ) : (
                                <ul className="list-disc ml-6 text-gray-700">
                                    <li><strong>Email:</strong> {personal.email || "Not provided"}</li>
                                    <li><strong>Phone:</strong> {personal.phone || "Not provided"}</li>
                                    <li><strong>Location:</strong> {personal.location || "Not provided"}</li>
                                </ul>
                            )}
                        </section>

                        {/* Buttons */}
                        <div className="flex justify-end mt-4">
                            {editMode ? (
                                <button
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                    onClick={handleSave}
                                >
                                    Save Details
                                </button>
                            ) : (
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    onClick={() => setEditMode(true)}
                                >
                                    {isInfoMissing ? 'Add Details' : 'Edit Details'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Suspense>
        </>
    );
};

export default Profile;
