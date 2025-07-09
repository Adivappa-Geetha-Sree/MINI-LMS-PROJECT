import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);

    useEffect(() => {
        const enrolled = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
        const completed = JSON.parse(localStorage.getItem('completedCourses')) || [];
        setEnrolledCourses(enrolled);
        setCompletedCourses(completed);
    }, []);

    const progress = enrolledCourses.length
        ? Math.round((completedCourses.length / enrolledCourses.length) * 100)
        : 0;

    // const chartData = {
    //     labels: ['Enrolled', 'Completed'],
    //     datasets: [
    //         {
    //             label: 'Course Progress',
    //             data: [enrolledCourses.length, completedCourses.length],
    //             backgroundColor: ['#3B82F6', '#10B981'],
    //             borderRadius: 5,
    //         },
    //     ],
    // };

    // Chart data for individual courses
    const individualChartData = {
        labels: enrolledCourses.map((course) => course.title),
        datasets: [
            {
                label: 'Progress (%)',
                data: enrolledCourses.map((course) =>
                    completedCourses.some((c) => c.id === course.id) ? 100 : 0
                ),
                backgroundColor: enrolledCourses.map((course) =>
                    completedCourses.some((c) => c.id === course.id) ? '#10B981' : '#FBBF24'
                ),
                borderRadius: 5,
            },
        ],
    };


    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-blue-700 mb-6">📊 Skill Dashboard</h1>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded shadow">
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Courses Enrolled</h2>
                            <p className="text-3xl text-blue-600">{enrolledCourses.length}</p>
                        </div>

                        <div className="bg-white p-6 rounded shadow">
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Courses Completed</h2>
                            <p className="text-3xl text-green-600">{completedCourses.length}</p>
                        </div>

                        <div className="bg-white p-6 rounded shadow">
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Overall Progress</h2>
                            <div className="w-full bg-gray-200 rounded h-6">
                                <div
                                    className="h-6 bg-green-500 rounded text-white text-sm text-center"
                                    style={{ width: `${progress}%` }}
                                >
                                    {progress}%
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Graph Section */}
                    <div className="bg-white p-6 rounded shadow mb-8">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">📈 Course Progress Chart</h2>
                        {/* <Bar data={chartData} /> */}
                        <Bar data={individualChartData} options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false
                                },
                                tooltip: {
                                    callbacks: {
                                        label: (context) => `${context.raw}%`
                                    }
                                }
                            },
                            scales: {
                                y: {
                                    min: 0,
                                    max: 100,
                                    ticks: {
                                        callback: (value) => `${value}%`
                                    },
                                    title: {
                                        display: true,
                                        text: 'Completion %'
                                    }
                                }
                            }
                        }} />

                    </div>

                    {/* Individual Course Progress */}
                    <div className="bg-white p-6 rounded shadow mb-8">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">📚 Course-wise Progress</h2>
                        <ul className="space-y-4">
                            {enrolledCourses.map((course) => {
                                const isCompleted = completedCourses.some((c) => c.id === course.id);
                                const mentor = course.mentor || 'Not Assigned';

                                return (
                                    <li key={course.id} className="border rounded p-4 bg-gray-50">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-semibold text-lg">{course.title}</h3>
                                                <p className="text-sm text-gray-500">Mentor: {mentor}</p>
                                            </div>
                                            <span
                                                className={`px-3 py-1 text-sm rounded-full ${isCompleted ? 'bg-green-200 text-green-700' : 'bg-yellow-200 text-yellow-700'
                                                    }`}
                                            >
                                                {isCompleted ? 'Completed' : 'In Progress'}
                                            </span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Tip Section */}
                    <div className="bg-white p-6 rounded shadow text-gray-700">
                        <h2 className="text-xl font-semibold mb-2">💡 Tip of the Day</h2>
                        <p>“Consistency is key. Learn a little every day and stay curious!”</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
