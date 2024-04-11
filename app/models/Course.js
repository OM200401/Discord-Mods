import db from '../lib/firebase';
import { doc, getDoc, getDocs, setDoc, collection, updateDoc } from 'firebase/firestore';

export class Course {
    constructor(courseCode, courseName, teacher) {
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.teacher = teacher;
        // Add more fields here as needed
    }
}

export async function getAllCourses() {
    const courses = [];
    const coursesCollection = collection(db, 'courses');
    const snapshot = await getDocs(coursesCollection);
    snapshot.forEach(async (doc) => {
        if (doc.id !== "DefaultCourse") {
            courses.push( {id: doc.id, ...doc.data()} );   
        }                      
    });
    return courses;
}

export async function getCourseDoc(courseCode) {
    const courseDoc = doc(db, 'courses', courseCode);
    const courseSnapshot = await getDoc(courseDoc);
    return courseSnapshot;
}


export async function getCourseRef(courseCode) {
    const courseRef = doc(db, 'courses', courseCode);
    return courseRef;
}

export async function addAssignmentToCourse(courseCollectionRef,courseSnapshot,collectionRef,weightage) {
    const courseData = courseSnapshot.data();
    const currentAssignments = courseData.currentAssignments || [];

    currentAssignments.push(collectionRef.id);
    await setDoc(courseCollectionRef,{...courseData,currentWeight:courseSnapshot.data().currentWeight+parseInt(weightage)});
}


export async function getRegisteredCoursesDoc(studentDoc,courseCode) {
   const registeredCoursesRef = collection(studentDoc.ref, 'registeredCourses');
   let registeredCoursesSnapshot = doc(registeredCoursesRef, courseCode);
   let registeredCourses = await getDoc(registeredCoursesSnapshot);
   return registeredCourses;
}


export async function getRegisteredCoursesRef(studentDoc,courseCode) {
    const registeredCoursesCollection = collection(studentDoc.ref, 'registeredCourses');
    let registeredCoursesRef = doc(registeredCoursesCollection, courseCode);

    return registeredCoursesRef;
 }
export async function getGradesForCourse(courseCode){
    const coursesDocSnapshot = await getCourseDoc(courseCode);
    
    let studentGrades = [];

    if (!coursesDocSnapshot.empty) {
        let gradedAssignments = coursesDocSnapshot.data().gradedAssignments;
        gradedAssignments.forEach((assignment) => {
            studentGrades.push({ ...assignment })
        });
    }

    return studentGrades;
}

export async function updateGradedAssignments(course,courseDoc,email,assignmentName, grade)
{
    const gradedAssignments = courseDoc.data().gradedAssignments ? courseDoc.data().gradedAssignments : [];
    let updatedGradedAssignments = [...gradedAssignments, { email:email, assignmentName: assignmentName, grade: grade }]
    await updateDoc(course, { gradedAssignments: updatedGradedAssignments });
    console.log('Updated gradedAssignments in the courses document');
}

export async function setGradedAssignments(course,email,assignmentName, grade)
{
    await setDoc(course, { gradedAssignments: [{ email:email, assignmentName: assignmentName, grade: grade }] });

}