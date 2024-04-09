import { describe } from 'node:test';
import db from '../../app/lib/firebase';
import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore";

describe('Firebase Database Tests', () => {
    test('Test essay collection fetch operation', async () => {
      
        const essaysCollection = collection(db, 'essays');        
        const q = query(essaysCollection);  
        // Get the documents that match the query
        const querySnapshot = await getDocs(q);  
        // Array to store course info
        const essayData = [];  
        // Loop through the query snapshot and extract the data
        querySnapshot.forEach(doc => {
            essayData.push(doc.data());
        });
    
        // Ensure that the data matches the expected data
        expect(essayData.length).toBeGreaterThan(0); // Ensure that there is at least one document
        // Test each course
        essayData.forEach(essay => {          
          expect(essay).toHaveProperty('questionPrompt');          
          expect(essay).toHaveProperty('weightage'); 
          
        }); 
    });

});