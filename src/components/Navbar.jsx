import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [itemToShow, setItemToShow] = useState("add");
  const menuItems = [
    { title: "Add Measurement", path: "add", id: 1 },
    { title: "Averages", path: "averages", id: 2 },
  ];

  return (
    <nav className="flex items-center h-16 px-10 border-b bg-bgpri text-textpri border-white/10">
      <Link to={`/`}>
        <div className="mr-20 text-xl font-black text-transparent normal-case bg-gradient-to-r from-factorial to-factorialdark bg-clip-text selection:bg-transparent">
          Factorial Home Assignment
        </div>
      </Link>
      <ul className="flex">
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link to={`${item.path}`}>
              <div
                className={`${
                  itemToShow === item.path ? "underline underline-offset-4" : ""
                } hover:text-white/70 mr-10`}
                onClick={() => {
                  setItemToShow(item.path);
                }}
              >
                {item.title}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="navbar-end"></div>
    </nav>
  );
}
