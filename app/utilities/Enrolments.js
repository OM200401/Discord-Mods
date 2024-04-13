import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';

export async function deleteEnrolment(userEmail, courseCode) {
    const enrolmentRef = collection(db, 'enrolments');
    const q = query(enrolmentRef, where('email', '==', userEmail), where('courseCode', '==', courseCode));
    const snapshot = await getDocs(q);

    snapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log('Document successfully deleted!');
    })
}

export async function fetchEnrolments() {
    try {
        // Fetch all documents from the enrolments collection and map to an array
        const enrolmentsCollection = collection(db,'enrolments');
        const snapshot = await getDocs(enrolmentsCollection);
        const enrolmentsData = snapshot.docs
                                .filter(doc => doc.id !== "DefaultCourse")
                                .map((doc) => ({ id: doc.id, ...doc.data() })); 
        return enrolmentsData;
    } catch (error) {
        console.error('Error fetching enrolments:', error);
    }
};