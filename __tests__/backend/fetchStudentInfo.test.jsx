import db from '../../app/lib/firebase';
import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore";

describe('Firebase Database Tests', () => {
    test('Test database read operation for student', async () => {
        // Assuming 'Userinfo' is the name of your Firestore collection
        const studentCollection = collection(db, 'students');

        // Query for all user documents
        const q = query(studentCollection, where('email', '==', 'uid52@gmail.com'));
      
        // Get the documents that match the query
        const querySnapshot = await getDocs(q);
      
        // Initialize an empty array to store the user data
        const studentData = [];
      
        for (const doc of querySnapshot.docs) {
          studentData.push(doc.data());
      
          // Get the 'registeredCourses' subcollection for the current student
          const registeredCoursesCollection = collection(doc.ref, 'registeredCourses');
          const registeredCoursesSnapshot = await getDocs(registeredCoursesCollection);
      
          // Initialize an array to store the registered courses
          const registeredCourses = [];
      
          // Loop through the snapshot and extract the data
          registeredCoursesSnapshot.forEach(courseDoc => {
            registeredCourses.push(courseDoc.data());
          });
      
          // Add the registered courses to the student data
          studentData[studentData.length - 1].registeredCourses = registeredCourses;
        }
      
      
        // Ensure that the data matches the expected data
        expect(studentData.length).toBeGreaterThan(0); // Ensure that there is at least one document                 
        expect(studentData[0].email).toEqual('uid52@gmail.com');
        expect(studentData[0].firstName).toEqual('uid');
        expect(studentData[0].lastName).toEqual('test');
        expect(studentData[0].uid).toEqual('k1lrM1csitPxFtBf73HuuqiNjPo2');
        expect(studentData[0].userType).toEqual('Student');

    });
    test('Test database read operation for students', async () => {
      // Assuming 'Userinfo' is the name of your Firestore collection
      const studentCollection = collection(db, 'students');

      // Query for all user documents
      const q = query(studentCollection);
    
      // Get the documents that match the query
      const querySnapshot = await getDocs(q);
    
      // Initialize an empty array to store the user data
      const studentData = [];
    
      // Loop through the query snapshot and extract the data
      querySnapshot.forEach(doc => {
        studentData.push(doc.data());
      });
    
      // Ensure that the data matches the expected data
      expect(studentData.length).toBeGreaterThan(0); // Ensure that there is at least one document
    
      // Test each user
      studentData.forEach(student => {  
      if (student.courses) {
          expect(student).toHaveProperty('registeredCourses');
      }  
        expect(student).toHaveProperty('email');
        expect(student).toHaveProperty('firstName');
        expect(student).toHaveProperty('lastName');        
      });
    });

});