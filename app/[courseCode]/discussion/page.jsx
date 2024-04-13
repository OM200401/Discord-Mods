"use client";
import Sidebar from "@/app/views/Sidebar";
import DiscussionBoardView from "@/app/views/DiscussionBoardView";

export default function Page() {
  return (
    <div className="flex bg-white">
      <div className="w-1/4 bg-white text-white">
        <Sidebar /> 
      </div>
      <div className="w-full m-3 ">
        <DiscussionBoardView />
      </div>
    </div>
  );
}