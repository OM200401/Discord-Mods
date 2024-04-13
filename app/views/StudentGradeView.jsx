import React from 'react';

const GradeView = ({ currentAssignments, grade,courseCode }) =>{
    return (
        <div className="p-6 text-center w-full">
            <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">{courseCode}</h1>
            <h2 className="text-3xl text-black font mt-4 mb-6" data-testid="assignments-heading">Assignments</h2>
            <h3 className="text-3xl text-black font mt-4 mb-6" data-testid="assignments-heading">Grade: {grade && <>{grade}%</>}</h3>
            <div className="flex justify-end"></div>
            <div className="overflow-x-auto">
                {currentAssignments.map((assignment, index) => (
                    <div key={index} className="bg-white mb-4 p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-blue-400 hover:text-blue-500 cursor-pointer">{assignment.name}</h3>
                            </div>
                            <div>
                                <p className="text-s text-gray-600">Grade: {assignment.grade}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export {GradeView};
