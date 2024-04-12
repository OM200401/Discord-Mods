import db from '../lib/firebase';
import { doc, collection, getDoc, getDocs, updateDoc, setDoc } from 'firebase/firestore';

export class Student extends User {
    constructor(uid, userType, firstName, lastName, email) {
        super(uid, userType, firstName, lastName, email);
    }
}

const studentCollection = collection(db, 'students'); 

// Function that returns a studentDoc snapshot from the database
export async function getStudentDocs(){
    const studentDocs = await getDocs(studentCollection);
    return studentDocs;
}

export async function getStudentDoc(uid){
    const studentDoc = doc(studentCollection, uid);
    const studentSnapshot = await getDoc(studentDoc);
    return studentSnapshot;
}

export async function getNumStudents(){
    const studentDocs = await getStudentDocs();
    return studentDocs.size;
}

export async function fetchAllStudents() {
    try {
        const snapshot = await getStudentDocs();
        const studentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return studentsData;
    } catch (error) {
        console.error('Error fetching teachers:', error);
    }
}

export async function updateStudentSubmittedAssignments(courseDocRef,updatedSubmittedAssignments){
    await updateDoc(courseDocRef, { submittedAssignments: updatedSubmittedAssignments });
}