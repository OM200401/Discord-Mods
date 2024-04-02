import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

const FetchCourseData = {
    fetchStudentCourseInfo: async function(studentId) {
        const db = getFirestore();
        const registeredCoursesCollection = collection(db, 'students', studentId, 'registeredCourses');

        const snapshot = await getDocs(registeredCoursesCollection);
        const courses = snapshot.docs
                                .map((doc) => ({ id: doc.id, ...doc.data() })) // map the data to an array of objects
                                .sort((a, b) => (a.id > b.id ? 1 : -1));    // sort the array by docId

        return courses;
    },
    fetchTeacherCourseInfo: async function(teacherId) {
        const db = getFirestore();
        const coursesCollection = collection(db, 'teachers', teacherId, 'courses');

        const snapshot = await getDocs(coursesCollection);
        const courses = snapshot.docs
                                .map((doc) => ({ id: doc.id, ...doc.data() })) // map the data to an array of objects
                                .sort((a, b) => (a.id > b.id ? 1 : -1));    // sort the array by docId

        return courses;
    }
};
export default FetchCourseData;