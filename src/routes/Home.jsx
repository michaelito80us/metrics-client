import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-wrap items-center min-h-[calc(100vh-4rem)] gap-10 overflow-hidden text-white justify-evenly bg-bgpri">
        <Outlet />
      </div>
    </>
  );
}
