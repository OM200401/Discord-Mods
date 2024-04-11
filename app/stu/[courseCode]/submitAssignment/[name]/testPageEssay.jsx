'use client';
import React, { useState } from 'react';
import Sidebar from '../../../../components/Sidebar';
import CourseNavBar from '../../../../components/StuCourseNavBar';
import { useParams } from 'next/navigation';

export default function Assignments() {


    let name = 'cosc304';

    let courseCode = 'cosc304';

    name = decodeURIComponent(name);
    courseCode = decodeURIComponent(courseCode);

    const [assignmentData, setAssignmentData] = useState({
        name: "Your Essay Assignment",
        questionPrompt: "Write an essay on a given topic."
    });

    const [userType, setUserType] = useState('user');
    const [userName, setUserName] = useState('non');
    const assignmentType = 'essay'; 
    const [essay, setEssay] = useState('');
    const [file, setFile] = useState(null);

    const handleChange = (event) => {
        setEssay(event.target.value);
    };

    const handleSubmitEssay = async (event) => {
        event.preventDefault();
        // Handle essay submission here
        console.log('Submitted essay:', essay);
    };

    return (
        <>
            {assignmentType === 'essay' && (
                <div className="flex flex-col md:flex-row bg-blue-100">
                    <Sidebar userName={userName} userType={userType} />
                    <div className="relative md:ml-64">
                        <CourseNavBar courseCode={courseCode} />
                    </div>
                    <div className="p-6 text-center w-full">
                        <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">{assignmentData && assignmentData.name}</h1>
                        <h2 className="text-3xl text-black font mt-4" data-testid="assignments-heading">Prompt: {assignmentData && assignmentData.questionPrompt}</h2>
                        <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold mb-4">Write Submission</h2>
                                <form onSubmit={handleSubmitEssay}>
                                    <div className="mb-4">
                                        <label htmlFor="essay" className="block text-gray-700" data-testid="writeEssay">Write your essay:</label>
                                        <textarea
                                            id="essay"
                                            name="essay"
                                            rows="6"
                                            className="w-full text-black px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            value={essay}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
