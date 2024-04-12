import db from '../lib/firebase';
import { doc, collection, getDoc, getDocs, updateDoc, setDoc } from 'firebase/firestore';
import { getStudentDocs } from './StudentUtilities';
import { getRegisteredCoursesDoc } from '../models/Course';
import { getQuizDoc } from '../models/Assignment';


const fetchStudentInfo = async (studentUid, name, courseCode, setLoading, setStudentInfo, setAssignmentType) => {
    try {
        const querySnapshot = await getStudentDocs();
        const studentsData = [];

        querySnapshot.forEach(async (studentDoc) => {
            if (studentDoc.data().uid === studentUid) {
                const coursesRegisteredDoc = await getRegisteredCoursesDoc(studentDoc, courseCode);
                const submittedAssignments = coursesRegisteredDoc.data().submittedAssignments || [];

                submittedAssignments.forEach(async (assignment) => {
                    if (assignment.name === name) {
                        studentsData.push({
                            studentName: `${studentDoc.data().firstName} ${studentDoc.data().lastName}`,
                            assignmentSubmission: assignment.submission,
                            assignmentFileSubmission: assignment.fileSubmission
                        });

                        const quizSnapshot = await getQuizDoc(name);

                        if (!quizSnapshot.empty) {
                            setAssignmentType('quiz');
                        } else {
                            setAssignmentType('essay');
                        }
                    }
                });
                setStudentInfo(studentsData);
            }
        });
        setLoading(false);
    } catch (error) {
        console.error('Error fetching student info:', error);
        setLoading(false);
    }
};

export {fetchStudentInfo};