import db from '../../app/lib/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

describe('Firebase Database Tests', () => {
  test('Test student collection read operation', async () => {
    // Assuming 'Students' is the name of your Firestore collection
    const studentsCollection = collection(db, 'students');

    // Query for a specific student document with an ID of 'nYhZn7r4g529WXaYzSlx'
    const q = query(studentsCollection, where('firstName', '==', 'NewTest'));

    // Get the documents that match the query
    const querySnapshot = await getDocs(q);

    // Initialize an empty array to store the student data
    const studentsData = [];

    // Loop through the query snapshot and extract the data
    querySnapshot.forEach(doc => {
      studentsData.push(doc.data());
    });

    // Ensure that the data matches the expected data
    expect(studentsData.length).toBeGreaterThan(0); // Ensure that there is at least one document
    expect(studentsData[0]).toEqual({
      email: "abcde@gmail.com",
      firstName:"NewTest",
      lastName:"Refactor",
      uid: "dZt1dKjhShTlsN7Jm6OzevIzdSr1",
      userType: "Student"
    });
  });

  test('Test teacher collection read operation', async () => {
    // Assuming 'Teachers' is the name of your Firestore collection
    const teachersCollection = collection(db, 'teachers');
  
    // Query for a specific teacher document with an ID of 'nYhZn7r4g529WXaYzSlx'
    const q = query(teachersCollection, 
      where('firstName', '==', 'NewTest'),
      where('lastName', '==', 'Refactor'),      
      );
  
    // Get the documents that match the query
    const querySnapshot = await getDocs(q);
  
    // Initialize an empty array to store the teacher data
    const teacherData = [];
  
    // Loop through the query snapshot and extract the data
    for (const doc of querySnapshot.docs) {
      teacherData.push(doc.data());
  
      // Get the 'registeredCourses' subcollection for the current teacher
      const registeredCoursesCollection = collection(doc.ref, 'registeredCourses');
      const registeredCoursesSnapshot = await getDocs(registeredCoursesCollection);
  
      // Initialize an array to store the registered courses
      const registeredCourses = [];
  
      // Loop through the snapshot and extract the data
      registeredCoursesSnapshot.forEach(courseDoc => {
        registeredCourses.push(courseDoc.data());
      });
  
      // Add the registered courses to the teacher data
      teacherData[teacherData.length - 1].registeredCourses = registeredCourses;
    }
  
    // Ensure that the data matches the expected data
    expect(teacherData.length).toBeGreaterThan(0); // Ensure that there is at least one document
    expect(teacherData[0].registeredCourses[0]).toEqual({
      courseName: "Intro to Programming",
      description: "e2e",
      teacher: "qZVypWCy9BM6zaqpKXWKii3esby2"
    });
    expect(teacherData[0].email).toEqual("xyz@gmail.com");
    expect(teacherData[0].firstName).toEqual("NewTest");
    expect(teacherData[0].lastName).toEqual("Refactor");
    expect(teacherData[0].uid).toEqual("qZVypWCy9BM6zaqpKXWKii3esby2");
    expect(teacherData[0].userType).toEqual("Teacher");
  });
});
