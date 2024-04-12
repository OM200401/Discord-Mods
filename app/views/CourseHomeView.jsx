import Loader from './Loader';

export default function CourseHomeView({ courseName = "Course Name", courseCode = "Course Code", loading, pdfUrl, userType = "Teacher"}) {
    return (
        loading ? (
            <Loader/>
        ) : (
            <div className="p-6 w-screen bg-blue-100 text-center">
                <h1 className="text-3xl text-black font-semibold"  data-testid="course-heading">{ courseCode }</h1>
                <div className="mt-4 text-left  bg-white rounded-md shadow-lg p-8">
                    <h2 className="text-2xl font-semibold text-black mb-4 pb-2 border-b-2 border-blue-500">Info about the Course</h2>
                    <p className="leading-relaxed text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
                    </p>
                </div>

                <div className="mt-4">
                    <h2 className="text-2xl font-semibold text-black mt-48">{ courseName }</h2>
                    
                    <ul className="list-disc ml-80 text-left">
                        <li><p className="text-blue-500 hover:underline">Syllabus</p>
                            {pdfUrl && <iframe src={pdfUrl} className="mt-2 w-full h-screen" />}</li>
                    </ul>
                </div>
                
            </div>
        )
    );
}