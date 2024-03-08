import Sidebar from "../components/Sidebar"; 

// Home Page that will be seen by the user on logging in

export default function home(){
    return (
        <div className="flex">
            <Sidebar />
        </div>
    );
}