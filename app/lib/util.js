// import firebase from 'firebase/app';
// import 'firebase/auth';
// import firebaseConfig from './firebase';
// import { redirect } from "next/navigation";
// import storageBucket from './firebase';
// import {auth} from '../lib/firebase';
// import { getAuth, onAuthStateChanged } from "firebase/auth";


// let authenticated = false;
// let emailVerified = false;

// export async function init() {
//     firebase.initializeApp(firebaseConfig);
//     firebase.apiKey = firebaseConfig.apiKey;
//     try{
//         await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
//     }catch(e){
//         await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
//     }
//     return new Promise((resolve, reject) => {
//         auth.onAuthStateChanged((user) => {
//             if (user) {
//                 authenticated = true;
//                 emailVerified = user.emailVerified;
//             } else {
//                 authenticated = false;                
//                 if (window.location.pathname.includes('action')) {
//                     redirect('/login');
//                 }
//             }
//             resolve();
//         });
//     });    
// }
// export function isAuthenticated() {
//     return authenticated && emailVerified;
// }
// // export function isEmailVerified() {
// //     if(firebase.auth().currentUser){
// //         emailVerified=  firebase.auth().currentUser.emailVerified;
// //     }
// //     return emailVerified;
// // }
// // export function getIdToken() {
// //     return firebase.auth().currentUser.getIdToken();
// // }

// // export function signInWithEmailandPassword(email, password) {
// //     return new Promise((resolve, reject) => {
// //         signInWithEmailAndPassword(auth, email, password)
// //             .then((user) => {
// //                 authenticated = true;
// //                 emailVerified = user.user.emailVerified;
// //                 resolve(user);
// //             }).catch(reject) ;
// //     });
// // }

// // export function signOut() {
// //     return new Promise(resolve => {
// //         auth.signOut().then(() => {
// //             authenticated = false;                
// //             redirect('/login');
// //             resolve();
// //         });
// //     });
// }