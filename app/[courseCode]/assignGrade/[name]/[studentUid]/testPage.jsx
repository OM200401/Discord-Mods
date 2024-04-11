import { useState, useEffect } from 'react';
import CourseNavBar from '../../../../components/CourseNavBar';
import Sidebar from '../../../../components/Sidebar';
import Loader from '../../../../components/Loader';

// Mock student data
const mockStudentData = {
  studentName: "John Doe",
};

export default function AssignGrade({ name, courseCode, studentUid }) {
    const [loading, setLoading] = useState(true);
    const [studentInfo, setStudentInfo] = useState({});
    const [grade, setGrade] = useState('');
    const [assignmentType, setAssignmentType] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulate fetching student data from Firestore
                // In a real application, you would fetch this data from Firestore
                // const studentRef = doc(db, 'courses', courseCode, 'students', studentUid);
                // const studentSnap = await getDoc(studentRef);
                // if (studentSnap.exists()) {
                //     setStudentInfo(studentSnap.data());
                // } else {
                //     console.log('No such document!');
                // }
                
                // For testing purposes, set the student data to the mock data
                setStudentInfo(mockStudentData);
            } catch (error) {
                console.error('Error fetching document: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [courseCode, studentUid]);

    const handleGradeChange = (e) => {
        setGrade(e.target.value);
    };

    const handleAssignmentTypeChange = (e) => {
        setAssignmentType(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            // Simulate updating student data in Firestore
            // In a real application, you would update the data in Firestore
            // const studentRef = doc(db, 'courses', courseCode, 'students', studentUid);
            // await updateDoc(studentRef, {
            //     [`assignments.${name}.grade`]: grade,
            //     [`assignments.${name}.type`]: assignmentType
            // });

            // For testing purposes, log the grade and assignment type
            console.log('Grade:', grade);
            console.log('Assignment Type:', assignmentType);
        } catch (error) {
            console.error('Error updating grade: ', error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-blue-100">
            <Sidebar />
            <div data-testid="navBar" className="relative md:ml-64">
                <CourseNavBar />
            </div>
            <div className="p-6 text-center w-full">
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">{studentInfo.studentName}</h1>
                        <h2 className="text-3xl text-black font mt-4" data-testid="assignments-heading">{name}</h2>
                        <div className="overflow-x-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <input type="text" placeholder="Grade" value={grade} onChange={handleGradeChange} />
                                    <select value={assignmentType} onChange={handleAssignmentTypeChange}>
                                        <option data-testid="essay" value="essay">Essay</option>
                                        <option data-testid="project" value="project">Project</option>
                                        <option data-testid="presentation" value="presentation">Presentation</option>
                                    </select>
                                    <button onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
