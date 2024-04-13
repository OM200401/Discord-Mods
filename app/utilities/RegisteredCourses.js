import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import db from '../lib/firebase';

export async function getRegisteredCourses(userDoc){

    const courses = [];
    const getRegisteredCoursesRef = collection(userDoc.ref,'registeredCourses');
    const snapshot = await getDocs(getRegisteredCoursesRef);
    if(!snapshot.empty){
    snapshot.forEach(async (registeredCourseDoc) => {
        if (registeredCourseDoc.id !== "DefaultCourse") {
            const courseDoc = doc(db,'courses', registeredCourseDoc.id);
            const courseSnapshot = await getDoc(courseDoc);
            courses.push( {id: courseSnapshot.id, ...courseSnapshot.data()} );   
        }                      
    });
}
    console.log("Util: " + courses);
    return courses;
}

