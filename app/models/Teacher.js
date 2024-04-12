import db from '../lib/firebase';
import { doc, collection, getDoc, getDocs, updateDoc, setDoc } from 'firebase/firestore';

export class Student extends User {
    constructor(uid, userType, firstName, lastName, email) {
        super(uid, userType, firstName, lastName, email);
    }
}

export async function fetchAllTeachers() {
    try {
        const teachersRef = collection(db, 'teachers');
        const snapshot = await getDocs(teachersRef);
        const teachersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return teachersData;
    } catch (error) {
        console.error('Error fetching teachers:', error);
    }
}

export async function getTeacherDoc(uid){
    const teacherDoc = doc(db, 'teachers', uid);
    const teacherSnapshot = await getDoc(teacherDoc);
    return teacherSnapshot;
}

// TODO: check if we actually need new courseData. If not, remove it from the function signature.
export async function addTeacherRegisteredCourse(teacherDocRef, courseCode, courseData){
    const registeredCoursesCollection = collection(teacherDocRef, 'registeredCourses');
    await setDoc(doc(registeredCoursesCollection, courseCode), courseData);
}