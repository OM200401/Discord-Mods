import db from '../../app/lib/firebase';

import { collection, query, where, getDocs } from "firebase/firestore";

describe('Firebase Database Tests', () => {
    test('Test database read operation for test teacher', async () => {
        // Assuming 'Userinfo' is the name of your Firestore collection
        const teachersCollection = collection(db, 'teachers');

        // Query for all user documents
        const q = query(teachersCollection, where('email', '==', 'aaronbanerweee@outlook.com'));
      
        // Get the documents that match the query
        const querySnapshot = await getDocs(q);
      
        // Initialize an empty array to store the user data
        const teacherData = [];
      
        for (const doc of querySnapshot.docs) {
            teacherData.push(doc.data());
      
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
          teacherData[teacherData.length - 1].registeredCourses = registeredCourses;
        }
      
      
        // Ensure that the data matches the expected data
        expect(teacherData.length).toBeGreaterThan(0); // Ensure that there is at least one document      
        // Test student abcd
        expect(teacherData[0].registeredCourses[1]).toEqual({        
          courseCode: "COSC341",
          courseName: "HCL",
          description: "Figma",
          teacher: "NdPq1RYG2Ioe1TIDaPKR"
        });    

    });
    test('Test database read operation for teachers', async () => {
      // Assuming 'Userinfo' is the name of your Firestore collection
      const teacherCollection = collection(db, 'teachers');

      // Query for all user documents
      const q = query(teacherCollection);
    
      // Get the documents that match the query
      const querySnapshot = await getDocs(q);
    
      // Initialize an empty array to store the user data
      const teacherData = [];
    
      // Loop through the query snapshot and extract the data
      querySnapshot.forEach(doc => {
        teacherData.push(doc.data());
      });
    
      // Ensure that the data matches the expected data
      expect(teacherData.length).toBeGreaterThan(0); // Ensure that there is at least one document
    
      // Test each user
      teacherData.forEach(teacher => {  
      if (teacher.courses) {
          expect(teacher).toHaveProperty('registeredCourses');
      }  
        expect(teacher).toHaveProperty('email');
        expect(teacher).toHaveProperty('firstName');
        expect(teacher).toHaveProperty('lastName');
        // expect(teacher).toHaveProperty('uid'); // Implement once database is updated
        // expect(teacher).toHaveProperty('userType'); // Implement once database is updated
      });
    });

});