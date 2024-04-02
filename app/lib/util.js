import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase';
import { navigate } from '@reach/router';
import storageUtil from './storage';
import{LAST_ACTIVE_TIME} from '../constants';

let authenticated = false;
let emailVerified = false;

async function init() {
    firebase.initializeApp(firebaseConfig);
    firebase.apiKey = firebaseConfig.apiKey;
    try{
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    }catch(e){
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    }
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                authenticated = true;
                emailVerified = user.emailVerified;
            } else {
                authenticated = false;
                emailVerified = false;
                if (window.location.pathname.includes('action')) {
                    navigate('./login/page.jsx');
                }
            }
            resolve();
        });
    });
}