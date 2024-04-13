import jest from 'jest';
import * as firestore from 'firebase/firestore'
import { collection, query, where, getDocs, getDoc, doc} from "firebase/firestore";
import db from '../../app/lib/firebase';
import { getAllCourses, getCourseDoc, getCourseRef} from '../../app/models/Course';


describe('Firebase Database Tests', () => {
    test('Test getAllCourses', async () => {
      
      const coursesCollection = collection(db, 'courses');        
      // Get the documents that match the query
      const querySnapshot = await getDocs(coursesCollection);  
      // Array to store course info
      const courseData = [];  
      // Loop through the query snapshot and extract the data
      querySnapshot.forEach(doc => {
        courseData.push(doc.data());
      });

      const getAllCoursesData = await getAllCourses();
  
      // Ensure that the data matches the expected data
      expect(courseData.length).toBeGreaterThan(0); // Ensure that there is at least one document
      expect(getAllCoursesData.length).toBeGreaterThan(0); // Ensure that there is at least one document from the getAllCourses function
      // Test each course
      getAllCoursesData.forEach(course => {          
        // Check if the course fetched from the function exists in the data fetched from the database
        const foundCourse = getAllCoursesData.find(dbCourse => dbCourse.id === course.id);
        expect(foundCourse).toBeDefined(); // Ensure that the course is found in the data from the database
        expect(foundCourse).toEqual(course); // Ensure that the course data matches
      });   
    });

    test('Test getCourseDoc', async () => {
        const courseCode = 'COSC304'; // Specify the course code for testing

        // Get the course document using Firestore's getDoc function directly
        const courseDocFromDB = await getDoc(doc(db, 'courses', courseCode));

        // Get the course document using getCourseDoc function
        const getCourseDocFunction = await getCourseDoc(courseCode);

        // Compare the data of the course document from the database with the one fetched by the function
        expect(getCourseDocFunction.data()).toEqual(courseDocFromDB.data());
    });

    test('Test getCourseRef', async () => {
        // Specify the course code for testing
        const courseCode = 'COSC304';

        // Retrieve the course reference
        const courseRef = await getCourseRef(courseCode);

        // Ensure that the course reference is not null or undefined
        expect(courseRef).toBeDefined();
        expect(courseRef.id).toBe(courseCode); // Ensure that the course reference has the correct ID
    });

    
});