import jest from 'jest';

import { fetchCourseInfo } from '../../app/components/FetchCourseData'
import * as firestore from 'firebase/firestore'
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '../../app/lib/firebase';

describe('Firebase Database Tests', () => {
    test('Test database fetch operation', async () => {
      
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
      const expectedCourses=[        
        {
            courseCode: 'PSYO 111',
            courseName: 'Introduction to Psychology 1',
            description: 'Survey of topics in psychology which relate to basic processes. Methods and statistics, the nervous system and physiological processes, sensation and perception, learning, cognition and memory.',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_gaZXWjn_qJVUXTVnHnGIPRka3psRSJgShg&usqp=CAU',
        },
        {
            courseCode: 'COSC 310',
            courseName: 'Software Engineering',
            description: 'Techniques to construct large systems using fundamental activities of specification, design, implementation, testing, and maintenance. Various life cycle models, exposure to software development tools, modelling techniques, good development practices, and project management.',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_gaZXWjn_qJVUXTVnHnGIPRka3psRSJgShg&usqp=CAU',
        },
        {
            courseCode: 'COSC 304',
            courseName: 'Introduction to Databases',
            description: 'Databases from a user\'s perspective: querying with SQL, designing with UML, and using programs to analyze data. Construction of database-driven applications and websites and experience with current database technologies.',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_gaZXWjn_qJVUXTVnHnGIPRka3psRSJgShg&usqp=CAU',
        },
        {
            courseCode: 'PHIL 331',
            courseName: 'Computer Ethics',
            description: 'Ethical and professional issues facing those who work with computers. Piracy, hacking, responsibility, and liability for the use of software; cyberpornography and freedom of information; computerized invasion of privacy; computers in the workplace; the use of artificial intelligence; and expert systems.',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_gaZXWjn_qJVUXTVnHnGIPRka3psRSJgShg&usqp=CAU',
        }
      ];
      expectedCourses.forEach((expectedCourse, index) => {
        expect(courseData[index]).toEqual(expectedCourse);
      });
    });
});