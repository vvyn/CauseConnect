import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
//import { register } from "module";

export default function Signup_NP() {
  const [registerOrganizationName, setRegisterOrganizationName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerWebsite, setRegisterWebsite] = useState("");
  const [registerNonProfitStatus, setRegisterNonProfitStatus] = useState("");
  const [registerCause, setRegisterCause] = useState("");

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
        <h1 className="text-3xl justify-left">Non-Profit Sign Up</h1>
      </div>
      <div className="w-1/3">
        <label className="text-sm justify-left">Organization Name *</label>
      </div>
      <div className="w-1/3">
        <input
          className="bg-orange-100 p-2 rounded-md text-white w-full"
          type="text"
          name="organization"
          placeholder="i.e. Cause Connect"
          onChange={(event) => {
            setRegisterOrganizationName(event.target.value);
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
        <label className="text-sm justify-left">Website</label>
      </div>
      <div className="w-1/3">
        <input
          className="bg-orange-100 p-2 rounded-md text-white w-full"
          type="url"
          name="website"
          placeholder="Website"
          onChange={(event) => {
            setRegisterWebsite(event.target.value);
          }}
        />
      </div>
      <div className="w-1/3">
        <label className="text-sm justify-left">Non Profit Status *</label>
      </div>
      <div className="w-1/3">
        <input
          className="bg-orange-100 p-2 rounded-md text-white w-full"
          type="file"
          name="status"
          placeholder="Upload Document"
          onChange={(event) => {
            setRegisterNonProfitStatus(event.target.value);
          }}
        />
      </div>
      <div className="w-1/3">
        <label className="text-sm justify-left"> Cause Category * </label>
      </div>
      <div className="w-1/3">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={registerCause}
              label=""
              onChange={(event) => {
                setRegisterCause(event.target.value);
              }}
            >
              <MenuItem value={"Women's Issues"}>Women's Issues</MenuItem>
              <MenuItem value={"Homeless"}>Homeless</MenuItem>
              <MenuItem value={"Animals"}>Animals</MenuItem>
              <MenuItem value={"Humanitarian Aid"}>Humanitarian Aid</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
