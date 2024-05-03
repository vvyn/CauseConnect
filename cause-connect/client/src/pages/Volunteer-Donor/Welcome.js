import React, { useEffect } from "react";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Welcome() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "/vd/login"; // Redirect to login page if not signed in
      } else {
        // User is signed in, continue with page functionality
        console.log("User is logged in:", user);
      }
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen ml-auto mr-auto">
      <div className="">
        <div className="text-5xl text-orange-400 mb-4 flex justify-center items-center">
          Welcome to Cause Connect!
        </div>
        <div className="mb-10 flex justify-center items-center">
          Explore donation and volunteering opportunities here!
        </div>
        <div className="flex justify-center gap-4">
          <a href="/vd/volunteer">
            <button className="bg-orange-400 p-4 px-6 rounded-3xl text-white text-md">
              Sign Up to Volunteer
            </button>
          </a>
          <a href="/vd/donor">
            <button className="bg-orange-400 p-4 px-6 rounded-3xl text-white text-md">
              Make a Donation
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
