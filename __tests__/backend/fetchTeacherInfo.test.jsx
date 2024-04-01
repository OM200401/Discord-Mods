import db from '../../app/lib/firebase';

import { collection, query, where, getDocs } from "firebase/firestore";

describe('Firebase Database Tests', () => {
    test('Test database read operation for all users', async () => {
        // Assuming 'Userinfo' is the name of your Firestore collection
        const teacherCollection = collection(db, 'teacher');
      
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
            expect(teacher).toHaveProperty('courses');
        }                    
          expect(teacher).toHaveProperty('email');
          expect(teacher).toHaveProperty('firstName');
          expect(teacher).toHaveProperty('lastName');
          expect(teacher).toHaveProperty('uid');
          expect(teacher).toHaveProperty('userType');
        });
      });
});