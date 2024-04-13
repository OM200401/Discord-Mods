import jest from 'jest';
import * as firestore from 'firebase/firestore'
import { collection, query, where, getDocs, getDoc, doc} from "firebase/firestore";
import db from '../../app/lib/firebase';
import { getAllCourses, isCourseCodeValid} from '../../app/models/Course';


describe('Firebase Database Tests', () => {
    test('Test isCourseCodeValid with correct information', async () => {
       // Test valid course codes
       expect(isCourseCodeValid('ABCD123')).toBe(true);
       expect(isCourseCodeValid('WXYZ456')).toBe(true);
       expect(isCourseCodeValid('MNOQ789')).toBe(true);
    });

    test('Test isCourseCodeValid with incorrect information', async () => {
        // Test invalid course codes
        expect(isCourseCodeValid('AB123')).toBe(false); // Less than 7 characters
        expect(isCourseCodeValid('WXYZ')).toBe(false); // No numbers
        expect(isCourseCodeValid('MNOQ12345')).toBe(false); // More than 7 characters
        expect(isCourseCodeValid('ABCD1234')).toBe(false); // More than 4 letters
        expect(isCourseCodeValid('ABCD12X')).toBe(false); // Contains non-alphanumeric characters
    });
});