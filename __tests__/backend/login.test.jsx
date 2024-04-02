
import db from '../../app/lib/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInWithEmailandPassword } from "firebase/auth";
import {auth} from '../lib/firebase';


describe('Firebase Database Tests', () => {    
    test('Test wrong info signUp operation', async () => {
        let error='';
        try {
            await signInWithEmailandPassword('abcd@gmail.com','1');
        }catch(e){
            error = e.toString();
        }        
        expect(error).toBeDefined();
    });

    test('Test correct info signUp operation', async () => {
        let auth = getAuth();
        signInWithEmailAndPassword(auth,'abcd@gmail.com','123456').then((user) => {
            const testuid = user.uid;
        });        
        // expect(isAuthenticated()).toBe(true);
        expect(user.uid).toEqual('e1BVk9Axbjg5dmC62XcjtDDBZcy2');
    });

});