import React from "react";

function NavBar() {
  return (
    <div className="bg-orange-200 flex justify-between align-center">
      <div className="p-6">
        <div className="w-10 mr-10">
          <img className="" alt="logo" src="../CauseConnect-logo.png"/>
        </div>
      </div>
      <div className="flex flex-row flex-wrap p-6">
        <a href="/np/signup">
          <div className="my-2 mx-2 py-1 text-black px-2">About Us</div>
        </a>
        <a href="/np/volunteer">
          <div className="my-2 mx-2 py-1 text-black px-2">Volunteers / Donors</div>
        </a>
        <a href="/np/welcome">
          <div className="my-2 mx-2 py-1 text-black px-2">Non Profits</div>
        </a>
        <a href="/*">
          <div className="my-2 mx-2 py-1 text-black px-2">Make an Impact</div>
        </a>
      </div>
    </div>
  );
}

export default NavBar;


/**
import React from "react";

function NavBar() {
  return (
    <div className="bg-orange-200 flex align-center">
      <div className="flex flex-row flex-wrap p-6">
        <a href="/">
          <div className="my-2 mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Home</div>
        </a>
        <a href="/vd/welcome">
          <div className="my-2 mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">VD Welcome</div>
        </a>
        <a href="/vd/donor">
          <div className="my-2 mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2"> VD Donor</div>
        </a>
        <a href="/vd/donations">
          <div className="my-2 mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2"> VD Donations</div>
        </a>
        <a href="/vd/donationSummary">
          <div className="my-2 mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2"> VD Summary</div>
        </a>
        <a href="/vd/login">
          <div className="my-2 mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">VD Login</div>
        </a>
        <a href="/vd/profile">
          <div className="my-2 mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">VD Profile</div>
        </a>
        <a href="/vd/signup">
          <div className="my-2 mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">VD Signup</div>
        </a>
        <a href="/vd/volunteer">
          <div className="my-2 mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">VD Volunteer</div>
        </a>
        <a href="/vd/donationSummary">
          <div className="my-2 mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">VD Donation Summary</div>
        </a>
        <a href="/vd/opportunitySignUp">
          <div className="my-2 mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">VD opp sign up</div>
        </a>
        <a href="/np/login">
          <div className="my-2 mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">NP Login</div>
        </a>
        <a href="/np/profile">
          <div className="my-2 mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">NP Profile</div>
        </a>
        <a href="/np/signup">
          <div className="my-2 mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">NP Signup</div>
        </a>
        <a href="/np/volunteer">
          <div className="my-2 mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">NP Volunteer</div>
        </a>
        <a href="/np/welcome">
          <div className="my-2 mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">NP Welcome</div>
        </a>
        <a href="/*">
          <div className="my-2 mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Error</div>
        </a>
      </div>
    </div>
  );
}

export default NavBar;


*/