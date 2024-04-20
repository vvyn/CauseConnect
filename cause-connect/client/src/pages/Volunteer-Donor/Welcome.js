import React from "react";

export default function Welcome() {
  return (
    <div>
      <div className="pt-20 py-4 flex items-center justify-center">
        <div className="py-2 text-5xl text-orange-400">Welcome to Cause Connect!</div>
      </div>
      <div className="py-4 flex items-center justify-center">
        <div className="py-2">Explore donation and volunteering opportunities here!</div>
      </div>
      <div className="pt-10 pb-52 flex items-center justify-center">
        <a href="/vd/donor">
          <button className="ml-4 bg-orange-400 p-4 px-6 rounded-3xl text-white text-md">Sign Up to Volunteer</button>
        </a>
        <a href="/vd/volunteer">
          <button className="ml-4 bg-orange-400 p-4 px-6 rounded-3xl text-white text-md">Make a Donation</button>
        </a>
      </div>
    </div>
  );
}
