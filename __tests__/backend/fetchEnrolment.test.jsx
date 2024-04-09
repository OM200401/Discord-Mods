import { describe } from 'node:test';
import db from '../../app/lib/firebase';
import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore";

describe('Firebase Database Tests', () => {
    test('Test enrolments collection fetch operation', async () => {
      
        const enrCollection = collection(db, 'enrolments');        
        const q = query(enrCollection);  
        // Get the documents that match the query
        const querySnapshot = await getDocs(q);  
        // Array to store course info
        const enrolData = [];  
        // Loop through the query snapshot and extract the data
        querySnapshot.forEach(doc => {
            enrolData.push(doc.data());
        });
    
        // Ensure that the data matches the expected data
        expect(enrolData.length).toBeGreaterThan(0); // Ensure that there is at least one document
        // Test each course
        enrolData.forEach(e => {          
            expect(e).toHaveProperty('courseCode');
            expect(e).toHaveProperty('email');             
        }); 
    });

});