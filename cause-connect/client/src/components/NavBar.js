import React from "react";

function NavBar() {
  return (
    <div className="bg-orange-200 flex justify-between align-center">
      <div className="p-6">
        <a href="/">
          <div className="w-10 mr-10">
            <img className="" alt="logo" src="../CauseConnect-logo.png"/>
          </div>
        </a> 
      </div>
      <div className="flex flex-row flex-wrap p-6">
        <a href="/">
          <div className="my-2 mx-2 py-1 text-black px-2">About Us</div>
        </a>
        <a href="/vd/login">
          <div className="my-2 mx-2 py-1 text-black px-2">Volunteer / Donor Portal</div>
        </a>
        <a href="/np/login">
          <div className="my-2 mx-2 py-1 text-black px-2">Organization Portal</div>
        </a>
      </div>
    </div>
  );
}

export default NavBar;