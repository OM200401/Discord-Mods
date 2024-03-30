const FetchAllCourses = {
    
    fetchAllCourses: async function () {
        const db = getFirestore();
        const coursesCollection = collection(db, 'courses');

        const snapshot = await getDocs(coursesCollection);
        const courses = snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() })) // map the data to an array of objects
            .filter((doc) => doc.id !== "DefaultCourse") // filter the array by courseCode
            .sort((a, b) => (a.courseCode > b.courseCode ? 1 : -1)); // sort the array by courseCode

        return courses;
    }
}

export default FetchAllCourses;