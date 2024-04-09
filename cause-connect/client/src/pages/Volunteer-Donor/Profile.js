import React from "react";

export default function Profile() {
  return (
    <div className="p-10">
      <div className="py-2 text-4xl text-orange-400">Profile</div>
      <div className="py-2">Edit your personal information</div>
      <div className="flex">
        <div className="mr-40">
          <div className="py-2 font-bold">
            First Name: 
          </div>
          <div className="py-2 font-bold">
            Last Name: 
          </div>
          <div className="py-2 font-bold">
            Email: 
          </div>
          <div className="py-2 font-bold">
            Phone Number: 
          </div>
          <div className="py-2 font-bold">
            Password: 
          </div>
          <div className="py-2 font-bold">
            Photo ID: 
          </div>
        </div>
        <div>
          <div className="py-2 font-bold">
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change First Name</button>
          </div>
          <div className="py-2 font-bold">
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Last Name</button>
          </div>
          <div className="py-2 font-bold">
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Email</button>
          </div>
          <div className="py-2 font-bold">
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Phone Number</button>
          </div>
          <div className="py-2 font-bold">
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Password</button>
          </div>
          <div className="py-2 font-bold">
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Photo ID</button>
          </div>
        </div>
      </div>
      <div className="py-2 font-bold">
        Manage Volunteer Sign Ups: 
      </div>
    </div>
  );
}
