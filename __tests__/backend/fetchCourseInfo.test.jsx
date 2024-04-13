import jest from 'jest';
import * as firestore from 'firebase/firestore'
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '../../app/lib/firebase';

describe('Firebase Database Tests', () => {
    test('Test course collection fetch operation', async () => {
      
      const coursesCollection = collection(db, 'courses');        
      const q = query(coursesCollection);  
      // Get the documents that match the query
      const querySnapshot = await getDocs(q);  
      // Array to store course info
      const courseData = [];  
      // Loop through the query snapshot and extract the data
      querySnapshot.forEach(doc => {
        courseData.push(doc.data());
      });
  
      // Ensure that the data matches the expected data
      expect(courseData.length).toBeGreaterThan(0); // Ensure that there is at least one document
      // Test each course
      courseData.forEach(course => {          
        expect(course).toHaveProperty('courseName');
        // expect(course).toHaveProperty('CurrentAssignments'); //Implement this once database is updated.  
        expect(course).toHaveProperty('description'); //Implement this once database is updated.
        // expect(course).toHaveProperty('imageUrl'); //Implement this once database is updated.
        // expect(course).toHaveProperty('teacher'); //Implement this once database is updated.
      });   
    });

    test('Test COSC304 fetch operation', async () => {
      
      const coursesCollection = collection(db, 'courses');        
      const q = query(coursesCollection, where('courseName', '==', 'Introduction to Databases'));  
      // Get the documents that match the query
      const querySnapshot = await getDocs(q);  
      // Array to store course info
      const courseData = [];  
      // Loop through the query snapshot and extract the data
      querySnapshot.forEach(doc => {
        courseData.push(doc.data());
      });
  
      // Ensure that the data matches the expected data
      expect(courseData.length).toBeGreaterThan(0); // Ensure that there is at least one document
      // Test COSC304
      // expect(courseData[0]).toEqual({        //implement this once database is updated.
      //   courseName: 'Introduction to Databases',
      //   currentAssignments: ['test test essay', 'second essay test test test', 'tester quiz shi'],
      //   description: 'Databases from a user\'s perspective: querying with SQL, designing with UML, and using programs to analyze data. Construction of database-driven applications and websites and experience with current database technologies. Completion of COSC 121 is recommended.',
      //   imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_gaZXWjn_qJVUXTVnHnGIPRka3psRSJgShg&usqp=CAU',
      // });
  });
});