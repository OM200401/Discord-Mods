import db from '../lib/firebase';
import { doc, collection, getDoc, getDocs, updateDoc, setDoc } from 'firebase/firestore';


export async function createTeacher(firstName,lastName,email,userType,uid){
    const teacherCollection = collection(db,'teachers');

       
    await setDoc(doc(teacherCollection, uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        userType: userType,
        uid: uid
    });
}

export async function setDefaultTeacherCourse(uid) {

    const defaultCourse = doc(db, 'courses', 'DefaultCourse');
    const defaultCourseDoc = await getDoc(defaultCourse);

    let defaultCourseData = defaultCourseDoc.data();

    
    const registeredCoursesCollectionRef = collection(db, 'teachers', uid, 'registeredCourses');
    await setDoc(doc(registeredCoursesCollectionRef, 'DefaultCourse'), defaultCourseData);
}

export async function getTeacherDoc(uid){
    const teacherDoc = doc(db, 'teachers', uid);
    const teacherSnapshot = await getDoc(teacherDoc);
    return teacherSnapshot;
}


export async function getNumTeachers(){
    const teacherCollection = collection(db, 'teachers');
    const teacherDocs = await getDocs(teacherCollection);
    return teacherDocs.size;
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

export async function addTeacherRegisteredCourse(teacherDocRef, courseCode, courseData=''){
    const registeredCoursesCollection = collection(teacherDocRef, 'registeredCourses');
    await setDoc(doc(registeredCoursesCollection, courseCode), courseData);
}
