import React from "react";
import TextField from '@mui/material/TextField';

export default function Home() {
  return (
    <div className="">
      <div className="pt-20 flex items-center justify-center">
        <img className="" src="CauseConnect-logo.png"/>
      </div>
      <div className="pb-6 flex items-center justify-center text-6xl text-orange-400">CauseConnect</div>
      <div className="flex items-center justify-center">
        <button className="bg-orange-400 p-2  px-6 rounded-3xl text-white text-sm">Volunteer / Donor Portal</button>
        <button className="ml-4 bg-orange-400 p-2 px-6 rounded-3xl text-white text-sm">Organization Portal</button>
      </div>
      
      <div className="flex">
        <div className="px-10 py-20 w-1/2 bg-white bg-opacity-20 rounded-md">
          <div className="text-xl pb-10">What We Do</div>
          <p className="font-bold text-3xl">Give back with us</p>
          <p className="pb-5 font-bold text-3xl">Explore with us</p>
          <p className="pb-5 text-sm">CauseConnect is the ultimate platform connecting volunteers and donors with nonprofit organizations. With features like easy sign-up for volunteer shifts across multiple organizations, tracking volunteer history and donations, and facilitating communication between organizations and individuals, CauseConnect simplifies the process of making a difference. Join us today and be part of the movement for positive change.</p>
          <div className="flex">
            <TextField id="outlined-basic" label="Email address" variant="outlined" />
            <button className="bg-orange-400 ml-4 p-2 px-6 rounded-3xl text-white text-sm">Sign Up</button>
          </div>
        </div>
        <div className="w-1/2">
          <img src="home1.png"/>
        </div>
      </div>

      <div className="flex">
        <div className="w-1/2">
          <img src="home2.png"/>
        </div>
        <div className="px-10 py-20 w-1/2 bg-white bg-opacity-20 rounded-md">
          <div className="text-xl pb-10">Who We Serve</div>
          <p className="font-bold text-3xl">Give back with us</p>
          <p className="pb-5 font-bold text-3xl">Explore with us</p>
          <p className="pb-5 text-sm">CauseConnect is the ultimate platform connecting volunteers and donors with nonprofit organizations. With features like easy sign-up for volunteer shifts across multiple organizations, tracking volunteer history and donations, and facilitating communication between organizations and individuals, CauseConnect simplifies the process of making a difference. Join us today and be part of the movement for positive change.</p>
        </div>
      </div>

      <div className="flex">
        <div className="px-10 py-20 w-1/2 bg-white bg-opacity-20 rounded-md">
          <div className="text-xl pb-10">Join Us</div>
          <p className="font-bold text-3xl">Give back with us</p>
          <p className="pb-5 font-bold text-3xl">Explore with us</p>
          <p className="pb-5 text-sm">CauseConnect is the ultimate platform connecting volunteers and donors with nonprofit organizations. With features like easy sign-up for volunteer shifts across multiple organizations, tracking volunteer history and donations, and facilitating communication between organizations and individuals, CauseConnect simplifies the process of making a difference. Join us today and be part of the movement for positive change.</p>
        </div>
        <div className="w-1/2">
          <img src="home3.png"/>
        </div>
      </div>

    </div>
  );
}
