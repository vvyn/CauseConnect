import { useState } from "react";
const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-orange-300 pr-5">
      <div
        className={` ${
          open ? "w-48 h-screen p-5" : "w-5 "
        } h-screen p-5 pt-8 relative duration-300`}
      >
        <img
          src="/hamburger.svg"
          className={`absolute cursor-pointer -right-1 top-9 w-7
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="items-center">
          <h1
            className={`origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            <a href="/"><div>Home</div></a>
            <a href="/vd/welcome"><div>Welcome</div></a>
            <a href="/vd/donor"><div>Donate</div></a>
            <a href="/vd/volunteer"><div>Volunteer</div></a>
            <a href="/vd/profile"><div>Profile</div></a>
            <a href="/vd/login"><div>Sign Out</div></a>
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
