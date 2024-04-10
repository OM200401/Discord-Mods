import db from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export class Course {
    constructor(courseCode, courseName, teacher) {
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.teacher = teacher;
        // Add more fields here as needed
    }
}

export async function getCourse(courseCode) {
    const courseDoc = doc(db, 'courses', courseCode);
    const courseSnapshot = await getDoc(courseDoc);
    return new Course(courseSnapshot.data().courseCode, courseSnapshot.data().courseName, courseSnapshot.data().teacher);
}