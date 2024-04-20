import { useState } from "react";
import Icon from "@mui/material/Icon";
const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-52 bg-dark-purple h-screen p-5" : "w-5 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src="/hamburger.svg"
          className={`absolute cursor-pointer -right-1 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1>
        </div>
        <ul className="pt-6">
          <span
            className={`${!open && "hidden"} origin-left duration-200`}
          ></span>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
