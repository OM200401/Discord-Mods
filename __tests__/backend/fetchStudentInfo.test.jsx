import db from '../../app/lib/firebase';

import { collection, query, where, getDocs } from "firebase/firestore";

describe('Firebase Database Tests', () => {
    test('Test database read operation for student abcd', async () => {
        // Assuming 'Userinfo' is the name of your Firestore collection
        const studentCollection = collection(db, 'students');

        // Query for all user documents
        const q = query(studentCollection, where('email', '==', 'abcd@gmail.com'));
      
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
        // Test student abcd
        expect(studentData[0].registeredCourses[1]).toEqual({        
          courseCode: "COSC304",
          courseName: "Introduction to Databases",
          description: "Databases from a user's perspective: querying with SQL, designing with UML, and using programs to analyze data. Construction of database-driven applications and websites and experience with current database technologies. Completion of COSC 121 is recommended.",
          id: "COSC304", // Edit this out when its fixed
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_gaZXWjn_qJVUXTVnHnGIPRka3psRSJgShg&usqp=CAU"
        });    

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
        // expect(student).toHaveProperty('uid'); // Implement when database is updated
        // expect(student).toHaveProperty('userType'); // Implement when database is updated
      });
    });

});