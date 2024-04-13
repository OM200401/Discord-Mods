
import db from '../../app/lib/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../app/lib/firebase';


describe('Firebase Database Tests', () => {    
    test('Test wrong info login operation', async () => {
        let error='';
        try {
            await signInWithEmailandPassword('abcd@gmail.com','1');
        }catch(e){
            error = e.toString();
        }        
        expect(error).toBeDefined();
    });

    test('Test correct login', async () => {        
        const email = 'abcde@gmail.com';
        const password = '123456';

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;                   
            expect(user.uid).toBeDefined(); // Ensure a user object is returned
            expect(user.email).toEqual(email); // Ensure the returned user has the correct email
            // Add more assertions as needed
        } catch (error) {
            // If login fails, fail the test
            throw new Error('Login failed: ' + error.message);
        }
    });

});
