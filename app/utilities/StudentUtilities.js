import db from '../lib/firebase';
import { doc, collection, getDoc, getDocs, updateDoc, setDoc } from 'firebase/firestore';

export async function setDefaultStudentCourse(uid) {

    const defaultCourse = doc(db, 'courses', 'DefaultCourse');
    const defaultCourseDoc = await getDoc(defaultCourse);

    let defaultCourseData = defaultCourseDoc.data();

    
    const registeredCoursesCollectionRef = collection(db, 'students', uid, 'registeredCourses');
    await setDoc(doc(registeredCoursesCollectionRef, 'DefaultCourse'), defaultCourseData);
      

}


export async function createStudent(firstName,lastName,email,userType,uid){
    const studentCollection = collection(db,'students');

       
    await setDoc(doc(studentCollection, uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        userType: userType,
        uid: uid
    });
}

export async function updateStudentSubmittedAssignments(courseDocRef,updatedSubmittedAssignments){
    await updateDoc(courseDocRef, { submittedAssignments: updatedSubmittedAssignments });
}

export async function fetchAllStudents() {
    try {
        const studentsRef = collection(db, 'students');
        const snapshot = await getDocs(studentsRef);
        const studentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return studentsData;
    } catch (error) {
        console.error('Error fetching teachers:', error);
    }
}

export async function getNumStudents(){
    const studentCollection = collection(db, 'students');
    const studentDocs = await getDocs(studentCollection);
    return studentDocs.size;
}

export async function getStudentDoc(uid){
    const studentDoc = doc(db, 'students', uid);
    const studentSnapshot = await getDoc(studentDoc);
    return studentSnapshot;
} //remove

export async function getStudentDocs(){
    const studentCollection = collection(db, 'students');
    const studentDocs = await getDocs(studentCollection);
    return studentDocs;
} //remove

export async function updateStudentGrade(courseDocRef,grade){
    updateDoc(courseDocRef,{grade:grade.toString()})
}