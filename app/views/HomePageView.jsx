import Link from "next/link";
import Loader from '../components/Loader';
import CourseCard from "../components/CourseCard";

export default function HomePageView({ courses, loading, userType }) {

    return (
        <div className="mt-4 md:mt-0 md:ml-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 p-4 md:p-8">
            {loading ? (
                <Loader/>
            ) : (
                courses.map(course => (
                    <Link key={course.id} href={ userType === 'Student' ? `../stu/${course.id}` : `${course.id}` }>
                        <CourseCard data-testid="course-card" courseCode={course.id} courseName={course.courseName} imageUrl={course.imageUrl}/>
                    </Link>
                ))
            )}
        </div>
    );
}