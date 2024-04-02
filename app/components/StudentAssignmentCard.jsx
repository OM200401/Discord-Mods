import Link from "next/link";

const StudentAssignmentCard = ({ assignment, courseCode }) => {
  
  return (
    <div className="flex items-center justify-between bg-gray-100 mb-4 p-4 rounded border border-gray-300">
      <div>
        <h3 className="text-lg font-semibold text-black">{assignment.name}</h3>
        <p className="text-sm text-gray-600">Weightage: {assignment.weightage}</p>
        {/* Need to add due date here */}
      </div>
      <div className="flex">
        <Link href={`/${courseCode}/submitAssignment/${assignment.name}`} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Start</Link>
      </div>
    </div>
  );
}

export default StudentAssignmentCard;