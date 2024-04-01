import db from '../../app/lib/firebase';

import { collection, query, where, getDocs } from "firebase/firestore";

describe('Firebase Database Tests', () => {
    test('Test database read operation for all users', async () => {
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
            expect(student).toHaveProperty('courses');
        }                    
          expect(student).toHaveProperty('email');
          expect(student).toHaveProperty('firstName');
          expect(student).toHaveProperty('lastName');
          expect(student).toHaveProperty('uid');
          expect(student).toHaveProperty('userType');
        });
      });
});