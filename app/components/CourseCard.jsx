import Image from 'next/image';

export default function CourseCard({ courseCode, courseName, imageUrl }) {
    return (
        <div data-testid="course-card" className="relative bg-white shadow-lg rounded-lg group hover:scale-110 transition duration-200 max-w-md mx-auto">
            <div className="relative w-full h-48 md:h-64 lg:h-40 overflow-hidden rounded-t-lg">
                <Image src={imageUrl} layout="responsive" width={500} height={300} alt={courseName} />
            </div>
            <div className="px-6 py-4">
                <h3 className="text-lg md:text-xl font-bold text-gray-800">{courseCode}</h3>
                <p className="mt-2 text-xs md:text-sm text-gray-600">{courseName}</p>
            </div>
        </div>
    );
}