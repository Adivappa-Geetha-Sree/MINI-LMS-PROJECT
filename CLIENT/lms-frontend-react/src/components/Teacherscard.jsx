// src/components/TeacherCard.jsx
import React from 'react';

const TeacherCard = ({ teacher }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center w-56">
      <img
        src={teacher.image}
        alt={teacher.name}
        className="w-24 h-24 rounded-full mx-auto object-cover mb-2"
      />
      <h3 className="text-lg font-semibold text-gray-800">{teacher.name}</h3>
      <p className="text-gray-500 text-sm">{teacher.subject}</p>
    </div>
  );
};

export default TeacherCard;
