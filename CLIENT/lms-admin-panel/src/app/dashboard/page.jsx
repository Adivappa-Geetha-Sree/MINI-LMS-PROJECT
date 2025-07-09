"use client";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Dashboard() {
  const [view, setView] = useState("weekly");

  const userStats = {
    weekly: { current: 300, previous: 240, clients: 120 },
    monthly: { current: 1300, previous: 1100, clients: 480 },
    yearly: { current: 15800, previous: 14500, clients: 5200 },
  };

  const teachers = {
    total: 40,
    active: 32,
    inactive: 8,
  };

  const growth = 23.6; // %

  const activeView = userStats[view];

  const chartData = {
    labels: ["Previous", "Current"],
    datasets: [
      {
        label: "Users",
        data: [activeView.previous, activeView.current],
        fill: false,
        borderColor: "#3b82f6",
        tension: 0.4,
        pointBackgroundColor: "#3b82f6",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.y} users`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 100 },
        title: { display: true, text: "Users Count" },
      },
    },
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">📈 LMS Dashboard</h1>

      {/* View Selector */}
      <div className="flex gap-4 mb-6">
        {["weekly", "monthly", "yearly"].map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-2 rounded ${view === v
              ? "bg-blue-600 text-white"
              : "bg-white border text-blue-700"
              }`}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)} View
          </button>
        ))}
      </div>

      {/* Graphical Comparison */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">📊 User Comparison ({view})</h2>
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">👥 Users</h2>
          <p className="text-3xl text-blue-600">{activeView.current}</p>
          <p className="text-sm text-gray-500">Current in {view}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">🤝 Clients</h2>
          <p className="text-3xl text-green-600">{activeView.clients}</p>
          <p className="text-sm text-gray-500">Clients in {view}</p>
        </div>
      </div>

      {/* Teacher Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">👩‍🏫 Total Teachers</h2>
          <p className="text-2xl text-purple-600">{teachers.total}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">✅ Active</h2>
          <p className="text-2xl text-green-600">{teachers.active}</p>
        </div>
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">🚫 Inactive</h2>
          <p className="text-2xl text-red-500">{teachers.inactive}</p>
        </div>
      </div>

      {/* LMS Growth Box */}
      <div className="bg-white p-6 rounded shadow text-center">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">📈 LMS Growth Rate</h2>
        <p className="text-3xl text-indigo-600">{growth}%</p>
        <p className="text-sm text-gray-500">Compared to last {view}</p>
      </div>
    </div>
  );
}