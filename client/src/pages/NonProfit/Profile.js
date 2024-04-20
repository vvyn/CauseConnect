import React from "react";

export default function Profile() {
  return (
    <div className="p-10">
      <div className="py-2 text-4xl text-orange-400">Organization Profile</div>
      <div className="py-2">Edit your information</div>
      <div className="flex">
        <div className="mr-40">
          <div className="py-2 font-bold">
            Organization Name: 
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
            Website: 
          </div>
          <div className="py-2 font-bold">
            Non Profit Status: 
          </div>
          <div className="py-2 font-bold">
            Cause Category: 
          </div>
        </div>
        <div>
          <div className="py-2 font-bold">
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change First Name</button>
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
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Website</button>
          </div>
          <div className="py-2 font-bold">
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Non Profit Status</button>
          </div>
          <div className="py-2 font-bold">
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Cause Category</button>
          </div>
        </div>
      </div>
      <div className="py-2 font-bold">
        Manage Volunteers: 
      </div>
      <div className="py-2 font-bold">
        Manage Donations: 
      </div>
    </div>
  );
}
