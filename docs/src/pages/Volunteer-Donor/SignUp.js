import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import Stack from '@mui/material/Stack';

export default function Signup_VD() {
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPhotoID, setRegisterPhotoID] = useState("");

  const signup = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
    
  };
  return (
    <div className="pt-20">
      <Stack className="relative" direction="column" alignItems="center" spacing={2}>
      <div className="w-1/3">
        <h1 className="text-3xl justify-left">Volunteer / Donor Sign Up</h1>
      </div>

      <div className="w-1/3">
        <label className="text-sm justify-left">First Name *</label>
      </div>
      <div className="w-1/3">
        <input
          className="bg-orange-100 p-2 rounded-md text-white w-full"
          type="text"
          name="firstname"
          placeholder="First Name"
          onChange={(event) => {
            setRegisterFirstName(event.target.value);
          }}
        />
      </div>

      <div className="w-1/3">
        <label className="text-sm justify-left">Last Name *</label>
      </div>
      <div className="w-1/3">
        <input
          className="bg-orange-100 p-2 rounded-md text-white w-full"
          type="text"
          name="lastname"
          placeholder="Last Name"
          onChange={(event) => {
            setRegisterLastName(event.target.value);
          }}
        />
      </div>

      <div className="w-1/3">
        <label className="text-sm justify-left">Email *</label>
      </div>
      <div className="w-1/3">
        <input
          className="bg-orange-100 p-2 rounded-md text-white w-full"
          type="text"
          name="email"
          placeholder="Email"
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
       />
      </div>
      
      <div className="w-1/3">
        <label className="text-sm justify-left">Phone Number *</label>
      </div>
      <div className="w-1/3">
        <input
          className="bg-orange-100 p-2 rounded-md text-white w-full"
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={(event) => {
            setRegisterPhoneNumber(event.target.value);
          }}
       />
      </div>

      <div className="w-1/3">
        <label className="text-sm justify-left">Password *</label>
      </div>
      <div className="w-1/3">
        <input
          className="bg-orange-100 p-2 rounded-md text-white w-full"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />
      </div>

      <div className="w-1/3">
        <label className="text-sm justify-left">Photo ID *</label>
      </div>
      <div className="w-1/3">
        <input
          className="bg-orange-100 p-2 rounded-md text-white w-full"
          type="file"
          name="status"
          placeholder="Upload Document"
          onChange={(event) => {
            setRegisterPhotoID(event.target.value);
          }}
        />
      </div>

      <button className="bg-orange-400 p-2 rounded-3xl text-white w-1/3" onClick={signup}> Sign Up </button>
      <p className="pb-20">
        Already have an account?{" "}
        <a href="/np/login" className="text-blue-500 underline">
          Log in
        </a>
      </p>
      </Stack>
    </div>
  );
}
