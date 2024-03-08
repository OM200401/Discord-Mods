import Sidebar from "../components/Sidebar"; 

// Home Page that will be seen by the student user on logging in

export default function home(){
    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-96 grid grid-cols-3 gap-10 p-10">
                <div className="bg-blue-500 w-60 h-40 rounded-lg text-center flex items-center justify-center text-2xl font-mono hover:bg-blue-700 transition hover:scale-110 cursor-pointer duration-300 ease-in-out">
                    COSC 310 <br />Software Engineering
                </div>
                <div className="bg-blue-500 w-60 h-40 rounded-lg text-center flex items-center justify-center text-2xl font-mono hover:bg-blue-700 transition hover:scale-110 cursor-pointer duration-300 ease-in-out">
                    COSC 304 <br />Introduction to Databases
                </div>
                <div className="bg-blue-500 w-60 h-40 rounded-lg text-center flex items-center justify-center text-2xl font-mono hover:bg-blue-700 transition hover:scale-110 cursor-pointer duration-300 ease-in-out">
                    PHIL 331 <br />Computer Ethics
                </div>
                <div className="bg-blue-500 w-60 h-40 rounded-lg text-center flex items-center justify-center text-2xl font-mono hover:bg-blue-700 transition hover:scale-110 cursor-pointer duration-300 ease-in-out">
                    PSYO 111 <br />Intro to Psychology I
                </div>
            </div>
        </div>
    );
}