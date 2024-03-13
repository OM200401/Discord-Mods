import Sidebar from '../components/Sidebar';

export default function CoursePage() {

    // Fetch course info from the database based on the courseCode

    return (
        <div className="flex flex-col md:flex-row">
            <Sidebar userName={ 'Your User Name' } />
            <div className="mt-4 md:mt-0 md:ml-8 p-4 md:p-8">
                <h1 className="text-2xl font-bold ml-48">WAASSSUP</h1>
            </div>
        </div>
    );
}