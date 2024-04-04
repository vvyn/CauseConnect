import React, { useState } from "react";
import "../styles/Login.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
    <div class="relative" fullWidth>
      <h1 class="absolute top-0 "> Signup </h1>
      
      <label class="absolute"> Organization Name * </label>
      <input
        className="bg-orange-100 p-2 rounded-md text-white"
        type="text"
        name="organization"
        placeholder="i.e. Cause Connect"
        onChange={(event) => {
          setRegisterOrganizationName(event.target.value);
        }}
      />
      <label> Email * </label>
      <input
        className="bg-orange-100 p-2 rounded-md text-white"
        type="text"
        name="email"
        placeholder="Email"
        onChange={(event) => {
          setRegisterEmail(event.target.value);
        }}
      />
      <label> Phone Number * </label>
      <input
        className="bg-orange-100 p-2 rounded-md text-white"
        type="text"
        name="phone"
        placeholder="Phone Number"
        onChange={(event) => {
          setRegisterPhoneNumber(event.target.value);
        }}
      />
      <label> Password: </label>
      <input
        className="bg-orange-100 p-2 rounded-md text-white"
        type="password"
        name="password"
        placeholder="Password"
        onChange={(event) => {
          setRegisterPassword(event.target.value);
        }}
      />
      <label> Website </label>
      <input
        className="bg-orange-100 p-2 rounded-md text-white"
        type="url"
        name="website"
        placeholder="Website"
        onChange={(event) => {
          setRegisterWebsite(event.target.value);
        }}
      />
      <label> Non Profit Status </label>
      <input
        className="bg-orange-100 p-2 rounded-md text-white"
        type="file"
        name="status"
        placeholder="Upload Document"
        onChange={(event) => {
          setRegisterNonProfitStatus(event.target.value);
        }}
      />
      {/* <label> Cause Category </label>
      <input
        className="bg-orange-100 p-2 rounded-md text-white"
        type="text"
        name="status"
        placeholder="Upload Document"
        onChange={(event) => {
          setRegisterNonProfitStatus(event.target.value);
        }}
      /> */}
        <label> Cause Category * </label>
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
      <button className="bg-orange-400 p-2 rounded-md text-white" onClick={signup}> Sign Up </button>
    </div>
  );
}
