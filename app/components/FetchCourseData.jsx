import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

const FetchCourseData = {
    fetchCourseInfo: async function(courseCodeFilter = null) {
        const db = getFirestore();
        const coursesCollection = collection(db, 'Courses');

        /*
        Working on logic for filtering courses by courseCode

        let filteredCourses = query(courses);

        if (courseCodeFilter) {
            filteredCourses = query(courses, where('courseCode', '==', courseCodeFilter));
        }

        filteredCourses = orderBy(filteredCourses, 'courseCode');
        */

        const snapshot = await getDocs(coursesCollection);
        const courses = snapshot.docs
                                .map((doc) => ({ id: doc.id, ...doc.data() }))              // map the data to an array of objects
                                .sort((a, b) => (a.courseCode > b.courseCode ? 1 : -1));    // sort the array by courseCode

        return courses;
    }
};

export default FetchCourseData;