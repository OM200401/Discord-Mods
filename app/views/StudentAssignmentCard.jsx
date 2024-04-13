import Link from "next/link";

const   StudentAssignmentCard = ({ assignment, courseCode }) => {
  const dueDate = new Date(assignment.dueDate);
  const currentDate = new Date();

  const difference = dueDate - currentDate;
  const differenceDays = Math.ceil(difference/  (1000 * 60 * 60 * 24));

  const type = assignment.assignmentType;

  return currentDate < dueDate ? (
    <div className="flex items-center justify-between bg-white mb-4 p-4 rounded-lg shadow-md border border-gray-200">
      <div>
        <h3 className="text-lg font-semibold text-black">{assignment.name}</h3>
        <p className="text-sm text-gray-600">Weightage: {assignment.weightage}</p>
        <p className="text-sm text-gray-600">Due date: {assignment.dueDate} - {differenceDays} days</p>
        <p className="text-sm text-gray-600">Type: {type}</p> 
      </div>
      
      <div className="flex">

        {type === "essay" ? 
          <Link href={`/stu/${courseCode}/submitAssignment/${assignment.name}`} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Start</Link> : 
          <Link href={`/stu/${courseCode}/submitQuiz/${assignment.name}`} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Start</Link>
        }

      </div>
    </div>
  ) : null;
}

export default StudentAssignmentCard;