import db from '../../app/lib/firebase';

import { collection, query, where, getDocs } from "firebase/firestore";

describe('Firebase Database Tests', () => {
    test('Test database read operation for all users', async () => {
        // Assuming 'Userinfo' is the name of your Firestore collection
        const usersCollection = collection(db, 'Userinfo');
      
        // Query for all user documents
        const q = query(usersCollection);
      
        // Get the documents that match the query
        const querySnapshot = await getDocs(q);
      
        // Initialize an empty array to store the user data
        const usersData = [];
      
        // Loop through the query snapshot and extract the data
        querySnapshot.forEach(doc => {
          usersData.push(doc.data());
        });
      
        // Ensure that the data matches the expected data
        expect(usersData.length).toBeGreaterThan(0); // Ensure that there is at least one document
      
        // Test each user
        usersData.forEach(user => {  
        if (user.courses) {
            expect(user).toHaveProperty('courses');
        }                    
          expect(user).toHaveProperty('email');
          expect(user).toHaveProperty('firstName');
          expect(user).toHaveProperty('lastName');
          expect(user).toHaveProperty('uid');
          expect(user).toHaveProperty('userType');
        });
      });
});