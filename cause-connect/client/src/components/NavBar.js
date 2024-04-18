import React from "react";

function NavBar() {
  return (
    <div className="bg-orange-200 flex align-center">
      <div className="p-6">
        <a href="/">
          <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Home</button>
        </a>
        <a href="/vd/welcome">
        <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">VD Welcome</button>
        </a>
        <a href="/vd/donor">
        <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2"> VD Donor</button>
        </a>
        <a href="/vd/donations">
        <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2"> VD Donations</button>
        </a>
        <a href="/vd/donationSummary">
        <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2"> VD Summary</button>
        </a>
        <a href="/vd/login">
          <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">VD Login</button>
        </a>
        <a href="/vd/profile">
          <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">VD Profile</button>
        </a>
        <a href="/vd/signup">
          <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">VD Signup</button>
        </a>
        <a href="/vd/volunteer">
          <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">VD Volunteer</button>
        </a>
        <a href="/vd/donationSummary">
          <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">VD Donation Summary</button>
        </a>
        <a href="/np/login">
          <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">NP Login</button>
        </a>
        <a href="/np/profile">
          <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">NP Profile</button>
        </a>
        <a href="/np/signup">
          <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">NP Signup</button>
        </a>
        <a href="/np/volunteer">
          <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">NP Volunteer</button>
        </a>
        <a href="/np/welcome">
          <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">NP Welcome</button>
        </a>
        <a href="/*">
          <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Error</button>
        </a>
      </div>
    </div>
  );
}

export default NavBar;
