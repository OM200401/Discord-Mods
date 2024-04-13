import React from 'react';
import StudentAssignmentCard from './StudentAssignmentCard';

const AssignmentsList = ({ currentAssignments, courseCode, submittedAssignments }) => (
    <div className="p-6 text-center w-full md:pl-64 md:ml-72">
        <h1 className="text-3xl text-black font-bold mb-4" data-testid="course-heading">Course Name</h1>
        <h2 className="text-3xl text-black font-semibold mt-4 mb-4" data-testid="assignments-heading">Assignments</h2>
        <div className="flex justify-end">
        </div>
        <div className="overflow-x-auto">
            {currentAssignments.map((assignment, index) => (
                <StudentAssignmentCard key={index} assignment={assignment} courseCode={courseCode} assignmentType={assignment.assignmentType} />
            ))}

            <div className="overflow-x-auto">
                <h2 className="text-3xl text-black font-semibold text-center mb-4">Submitted Assignments</h2>
                <div className="grid grid-cols-2 text-black md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {/* Display submitted assignments */}
                    {submittedAssignments.map((assignment, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-4 border flex flex-col items-center border-gray-200 hover:shadow-2xl hover:border-gray-600 transition-all duration-200">
                            <p className="font-semibold text-lg">{assignment.name}</p>
                            <p className="text-gray-500 mb-4">Grade: {assignment.grade ? assignment.grade : "Not graded yet"}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export {AssignmentsList};
