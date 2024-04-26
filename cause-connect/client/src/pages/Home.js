import React from "react";
import TextField from "@mui/material/TextField";

export default function Home() {
  return (
    <div className="">
      <div className="pt-20 flex items-center justify-center">
        <img className="" src="CauseConnect-logo.png" />
      </div>
      <div className="pb-6 flex items-center justify-center text-6xl text-orange-400">
        CauseConnect
      </div>
      <div className="flex items-center justify-center">
        <a href="/vd/login">
          <button className="bg-orange-400 p-2  px-6 rounded-3xl text-white text-sm">
            Volunteer / Donor Portal
          </button>
        </a>
        <a href="/np/login">
          <button className="ml-4 bg-orange-400 p-2 px-6 rounded-3xl text-white text-sm">
            Organization Portal
          </button>
        </a>
      </div>

      <div className="flex">
        <div className="px-10 py-20 w-1/2 rounded-md">
          <div className="text-xl pb-10" style={{ paddingLeft: '10rem', fontStyle: 'italic'}}> What We Do</div>
          <p className="pb-5 font-bold text-3xl" style={{ paddingLeft: '10rem' }}> Empowering Change Together</p>
          <p className="pb-5 text-sm" style={{ paddingLeft: '10rem' }}> 
          At CauseConnect, we're dedicated to revolutionizing the way volunteers and
          donors connect with nonprofit organizations. Seamlessly bridging the gap between
          individuals and causes, our platform streamlines the process of contributing to
          positive change. Experience easy sign-ups, efficient tracking of volunteer history
          and donations, all geared towards empowering you to make an impact.
          </p>

        </div>
        <div className="w-1/2 flex justify-center items-center">
          <img src="home1.png" style={{ maxWidth: "50%", height: "auto" }} />
        </div>
      </div>

      <div className="flex">
        <div className="w-1/2 flex justify-center items-center">
          <img src="home2.png" style={{ maxWidth: "50%", height: "auto" }} />
        </div>
        <div className="px-10 py-20 w-1/2 rounded-md">
          <div className="text-xl pb-10" style={{ paddingRight: '10rem', fontStyle: 'italic' }}>Who We Serve</div>
          <p className="pb-5 font-bold text-3xl" style={{ paddingRight: '10rem' }}> Uniting Passion and Purpose</p>
          <p className="pb-5 text-sm" style={{ paddingRight: '10rem' }}>
          At CauseConnect, our mission is clear: to serve both the passionate volunteers
          and dedicated nonprofit organizations striving for social good. Whether you're
          an individual eager to lend a helping hand or an organization seeking invaluable
          support, our platform caters to your needs. Become part of a collective driving
          meaningful change worldwide.

          </p>
        </div>
      </div>

      <div className="flex">
        <div className="px-10 py-20 w-1/2 rounded-md">
          <div className="text-xl pb-10" style={{ paddingLeft: '10rem', fontStyle: 'italic'}}>Join Us Today</div>
          <p className="pb-5 font-bold text-3xl" style={{ paddingLeft: '10rem' }}>Ignite Your Impact</p>
          <p className="pb-5 text-sm" style={{ paddingLeft: '10rem' }}>
          Ready to be a catalyst for positive change? Join CauseConnect and embark on a
          journey where every action counts. By becoming part of our vibrant community, you
          gain access to a plethora of opportunities to make a difference. From volunteering
          your time to amplifying the impact of your donations, together we can create a
          better tomorrow. Join us today and let's build a brighter future, one connection
          at a time.

            <div className="flex-col justify-end ml-4 py-5">
            <TextField
              id="outlined-basic"
              label="Email address"
              variant="outlined"
              style={{ width: '300px' }}
            />
            <button className="bg-orange-400 ml-4 p-4 px-6 rounded-3xl text-white text-sm">
              Sign Up
            </button>
          </div>
          </p>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <img src="home3.png" style={{ maxWidth: "50%", height: "auto" }} />
        </div>
      </div>
    </div>
  );
}
