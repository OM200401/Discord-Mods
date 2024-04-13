import jest from 'jest';
import * as firestore from 'firebase/firestore'
import { collection, query, where, getDocs, getDoc, doc} from "firebase/firestore";
import db from '../../app/lib/firebase';
import {courseAlreadyExists} from '../../app/models/Course';


describe('Firebase Database Tests', () => {
    test('Existing Course', async () => {
        // Specify the course code for testing an existing course
        const existingCourseCode = 'COSC304';

        // Test if the existing course code is detected as existing
        const exists = await courseAlreadyExists(existingCourseCode);
        expect(exists).toBe(true);
    });

    test('Non-existing Course', async () => {
        // Specify a course code for testing a non-existing course
        const nonExistingCourseCode = 'NONE123';

        // Test if the non-existing course code is detected as non-existing
        const exists = await courseAlreadyExists(nonExistingCourseCode);
        expect(exists).toBe(false);
    });    
});