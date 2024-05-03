import { useState } from "react";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        alert("Successfully signed out!");
      })
      .catch((error) => {
        console.log("Sign out error");
      });
  };

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
            <a href="/">
              <div>Home</div>
            </a>

            <br/>

            <a href="/vd/login">
              <div>User Login</div>
            </a>
            <a href="/vd/signup">
              <div>User Sign Up</div>
            </a>

            <br/>
            
            <a href="/np/login">
              <div>Org Login</div>
            </a>
            <a href="/np/signup">
              <div>Org Sign Up</div>
            </a>
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

