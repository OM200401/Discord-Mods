import { describe } from 'node:test';
import db from '../../app/lib/firebase';
import { collection, query, where, doc, getDoc, getDocs } from "firebase/firestore";

describe('Firebase Database Tests', () => {
    test('Test quiz collection fetch operation', async () => {
      
        const quizzesCollection = collection(db, 'quizzes');        
        const q = query(quizzesCollection);  
        // Get the documents that match the query
        const querySnapshot = await getDocs(q);  
        // Array to store course info
        const quizData = [];  
        // Loop through the query snapshot and extract the data
        querySnapshot.forEach(doc => {
            quizData.push(doc.data());
        });
    
        // Ensure that the data matches the expected data
        expect(quizData.length).toBeGreaterThan(0); // Ensure that there is at least one document
        // Test each course
        quizData.forEach(quiz => {          
        //   expect(quiz).toHaveProperty('questions');
        // Check that the quiz is an object with at least one property (the question)
        expect(Object.keys(quiz).length).toBeGreaterThan(0);
        // // Check that each property in the quiz object is an array (the possible answers) 
        // Object.values(quiz).forEach(value => {
        //     expect(Array.isArray(value)).toBe(true);
        // });   
        }); 
    });

});