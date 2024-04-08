import React from 'react';
import Link from 'next/link';
const TeacherAssignmentCard = ({ assignment,courseCode }) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 mb-4 p-4 rounded-md shadow-md border border-gray-300 hover:shadow-xl hover:border-gray-600">
      <div>
        <h3 className="text-lg font-semibold text-black">{assignment.name}</h3>
        <p className="text-sm text-gray-600">Weightage: {assignment.weightage}</p>
        {/* Need to add due date here */}
      </div>
      <div className="flex">
        <button className="px-4 py-2 bg-yellow-500 text-white rounded mx-4 hover:bg-yellow-600 hover:scale-110 transition ease-in-out duration-200"><Link href={`/${courseCode}/grades/${assignment.name}`}>Grade</Link></button>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 hover:scale-110 transition ease-in-out duration-200">Delete</button>
      </div>
    </div>
  );
}

export default TeacherAssignmentCard;