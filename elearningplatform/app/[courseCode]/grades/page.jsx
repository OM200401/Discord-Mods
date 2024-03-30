'use client';
import CourseNavBar from '../../components/CourseNavBar';
import Sidebar from '../../components/Sidebar';


export default function Assignments() {

    // Demo assignments array to display some assignments but will later have data 
    // displayed from the database
    const assignments = [
        { title: 'Assignment 1', dueDate: '2022-01-01', points: 100 },
        { title: 'Assignment 2', dueDate: '2022-01-15', points: 150 },
        { title: 'Assignment 3', dueDate: '2022-01-15', points: 150 },
        { title: 'Assignment 4', dueDate: '2022-01-15', points: 150 },
        { title: 'Assignment 5', dueDate: '2022-01-15', points: 150 },
    ];

    return (
        <div className="flex flex-col md:flex-row bg-blue-100">
            <Sidebar />
            <div className="relative md:ml-64">
                <CourseNavBar />
            </div>
            <div className="p-6 text-center w-full">
                <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">Course Name</h1>
                <h2 className="text-3xl text-black font mt-4" data-testid="assignments-heading">Grading</h2>
                <div className="overflow-x-auto">
                    {assignments.map((assignment, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-100 mb-4 p-4 rounded border border-gray-300">
                            <div>
                                <h3 className="text-lg font-semibold text-black">{assignment.title}</h3>
                                <p className="text-sm text-gray-600">Due Date: {assignment.dueDate}</p>
                                <p className="text-sm text-gray-600">Points: {assignment.points}</p>
                            </div>
                            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Grade</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
