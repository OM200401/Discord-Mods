import CourseNavBar from '../../components/CourseNavBar';
import Sidebar from '../../components/Sidebar';

// Assignments Page for the Course

export default function Assignments({assignments}) {

    // Demo assignments array to display some assignments but will later have data 
    // displayed from the database
    const assignments = [
        { title: 'Assignment 1', dueDate: '2022-01-01', points: 100 },
        { title: 'Assignment 2', dueDate: '2022-01-15', points: 150 },
    ];

    return (
        <div className="flex flex-col md:flex-row bg-blue-100">
            <Sidebar />
            <div className="relative md:ml-64">
                <CourseNavBar />
            </div>
                <div className="p-6 text-center w-screen">
                    <h1 className="text-3xl text-black font-semibold mb-4" data-testid="course-heading">Course Name </h1>
                    <h2 className="text-3xl text-black font mt-20" data-testid="assignments-heading">Assignments</h2>
                    <table className="mt-4 w-full text-left text-black border-collapse table-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-2 border-gray-400">Title</th>
                                <th className="px-4 py-2 border-2 border-gray-400">Due Date</th>
                                <th className="px-4 py-2 border-2 border-gray-400">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((assignment, index) => (
                                <tr key={index} className="bg-gray-100">
                                    <td className="px-4 py-2 border-2 border-gray-400">{assignment.title}</td>
                                    <td className="px-4 py-2 border-2 border-gray-400">{assignment.dueDate}</td>
                                    <td className="px-4 py-2 border-2 border-gray-400">{assignment.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
    );
}

// This function gets called at build time
export async function getStaticPaths() {
    // Hardcode some course codes
    const courses = ['course1', 'course2', 'course3'];

    // Get the paths we want to pre-render based on courses
    const paths = courses.map((course) => ({ params: { courseCode: course } }));

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    // Hardcode some assignments
    const assignments = [
        { title: 'Assignment 1', dueDate: '2022-01-01', points: 100 },
        { title: 'Assignment 2', dueDate: '2022-01-15', points: 150 },
    ];

    // Pass assignments data to the page via props
    return { props: { assignments } }
}