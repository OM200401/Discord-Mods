import React from 'react';

export default function AssignGradeView({ studentInfo, grade, setGrade, handleGradeSubmit }) {
    return (
        <div className="p-6 text-center w-full">
            <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">{studentInfo.studentName}</h1>
            <h2 className="text-3xl text-black font mt-4" data-testid="assignments-heading">{name}</h2>
            <div className="overflow-x-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {studentInfo.map((student, index) => (
                        student.assignmentFileSubmission === 'false' ? (
                            <div key={index} className="bg-white rounded-lg p-6 border border-gray-300">
                                <p className="font-semibold text-lg">{student.studentName}</p>
                                <p className="text-gray-500 mb-4">{student.assignmentSubmission}</p>
                                <div className="flex items-center justify-between">
                                    <input
                                        type="number"
                                        className="w-24 p-2 border border-gray-300 rounded"
                                        placeholder="/100"
                                        value={grade}
                                        onChange={(e) => setGrade(e.target.value)}
                                    />
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        onClick={() => handleGradeSubmit(grade)}
                                    >
                                        Grade 
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div key={index} className="rounded-lg p-6 border border-gray-300">
                                <iframe src={student.assignmentSubmission} type="pdf" className="mb-5" title="Downloaded PDF" width="900px" height="800px" />
                                <div>
                                    <p className="font-semibold text-lg">{student.studentName}</p>
                                </div>
                                <div className="flex items-center mt-4">
                                    <input
                                        type="number"
                                        className="w-24 p-2 border border-gray-300 rounded"
                                        placeholder="/100"
                                        value={grade}
                                        onChange={(e) => setGrade(e.target.value)}
                                    />
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
                                        onClick={() => handleGradeSubmit(grade)}
                                    >
                                        Grade
                                    </button>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}
