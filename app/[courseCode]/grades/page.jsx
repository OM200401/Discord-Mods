'use client';
import { useState, useEffect } from 'react';
import CourseNavBar from '../../components/CourseNavBar';
import Sidebar from '../../components/Sidebar';
import Loader from '../../components/Loader';
import { FaChevronDown } from 'react-icons/fa';

export default function Assignments() {

    const [loading, setLoading] = useState(true);

    // Demo students array to display some students but will later have data 
    // displayed from the database
    const [students, setStudents] = useState([
        { firstName: 'John', lastName: 'Doe', grade: 'A', assignments: [{ name: 'Assignment 1', grade: 90 }, { name: 'Assignment 2', grade: 85 }] },
        { firstName: 'Jane', lastName: 'Doe', grade: 'B', assignments: [{ name: 'Assignment 1', grade: 80 }, { name: 'Assignment 2', grade: 75 }] },
        { firstName: 'Jim', lastName: 'Smith', grade: 'C', assignments: [{ name: 'Assignment 1', grade: 70 }, { name: 'Assignment 2', grade: 65 }] },
        { firstName: 'Jill', lastName: 'Johnson', grade: 'A', assignments: [{ name: 'Assignment 1', grade: 95 }, { name: 'Assignment 2', grade: 90 }] },
        { firstName: 'Jack', lastName: 'Brown', grade: 'B', assignments: [{ name: 'Assignment 1', grade: 85 }, { name: 'Assignment 2', grade: 80 }] },
    ]);

    const toggleAssignments = index => {
        const newStudents = [...students];
        newStudents[index].showAssignments = !newStudents[index].showAssignments;
        setStudents(newStudents);
    };

    const updateGrade = (studentIndex, assignmentIndex, newGrade) => {
        const newStudents = [...students];
        newStudents[studentIndex].assignments[assignmentIndex].grade = newGrade;
        setStudents(newStudents);
    };

    useEffect(() => {
        // Simulate a network request
        setTimeout(() => {
            setLoading(false); // Set loading to false after 3 seconds
        }, 1000);
    }, []);

    if (loading) {
        return <Loader />; // Return the Loading component if loading is true
    }

    return (
        <div className="flex flex-col md:flex-row bg-blue-100">
            <Sidebar />
            <div className="relative md:ml-64">
                <CourseNavBar />
            </div>
            <div className="p-6 text-center w-full">
                <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">Course Name</h1>
                <h2 className="text-3xl text-black font mt-4" data-testid="assignments-heading">Students</h2>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-black">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Full Name</th>
                                <th className="px-4 py-2">Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={index} className="bg-gray-100 mb-4 p-4 rounded border border-gray-300">
                                    <td className="px-4 py-2">
                                        {student.firstName + " " + student.lastName}
                                        <button onClick={() => toggleAssignments(index)}>
                                            <FaChevronDown />
                                        </button>
                                        <div style={{ display: student.showAssignments ? 'block':'none'}}>
                                            {student.assignments.map((assignment, index) => (
                                                <div key={index}>
                                                    <p>{assignment.name}: {assignment.grade}</p>
                                                    <input type="number" min="0" max="100" defaultValue={assignment.grade} onChange={(e) => updateGrade(index, index, e.target.value)} />
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">{student.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}