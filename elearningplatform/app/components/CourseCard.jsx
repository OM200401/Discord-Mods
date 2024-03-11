import Image from 'next/image';

export default function CourseCard({ courseCode, courseName, imageUrl }) {
    return (
        <div className="relative bg-white shadow-lg rounded-lg group hover:shadow-2xl transition duration-200">
            <div className="relative w-full h-30 overflow-hidden rounded-t-lg">
                <Image src={imageUrl} layout="fill" objectFit="cover" alt={courseName} />
            </div>
            <div className="px-6 py-4">
                <h3 className="text-xl font-bold text-gray-800">{courseCode}</h3>
                <p className="mt-2 text-sm text-gray-600">{courseName}</p>
            </div>
        </div>
    );
}