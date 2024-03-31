import { useRouter } from "next/navigation";

export default function Card({ courseCode, courseName }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/browseCourses/${courseCode}`);
    }

    return (
        <div className="w-72 h-40 flex flex-col justify-center gap-2 bg-blue-500 rounded-lg shadow p-2 m-4">
        <div className="flex justify-center">
            <div className="flex flex-col text-white">
            <span className="font-bold italic">{courseCode}</span>
            <p className="line-clamp-3">
                {courseName}
            </p>
            </div>
        </div>
        <button onClick={handleClick} className="hover:bg-gray-300 bg-neutral-50 font-bold text-blue-500 rounded p-2">
            See more
        </button>
        </div>

    );
}