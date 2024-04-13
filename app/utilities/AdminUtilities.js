import db from '../lib/firebase';
import { doc, collection, getDoc, getDocs, updateDoc, setDoc } from 'firebase/firestore';

export async function getAdminDoc(uid){
    const admin = doc(db, 'admin', uid);
    const adminSnapshot = await getDoc(admin);
    return adminSnapshot;
}
