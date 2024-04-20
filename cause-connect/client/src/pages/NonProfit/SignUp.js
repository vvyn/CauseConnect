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
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
//import { register } from "module";

export default function Signup_NP() {
  const [registerOrganizationName, setRegisterOrganizationName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerWebsite, setRegisterWebsite] = useState("");
  const [registerNonProfitStatus, setRegisterNonProfitStatus] = useState("");
  const [registerState, setRegisterState] = useState("");
  const [registerCity, setRegisterCity] = useState("");
  const [registerZip, setRegisterZip] = useState("");
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
  function fileName() {
    const fileData=document.getElementById('file-upload');
    if(fileData != null) {
      return fileData.files.item(0).name;
    }
  }
  return (
    <form className="pt-20">
      <Stack className="relative" direction="column" alignItems="center" spacing={2}>
      <div className="w-1/3">
        <h1 className="text-3xl justify-left">Non-Profit Sign Up</h1>
      </div>
      <div className="w-1/3">
        <label className="text-sm justify-left">Organization Name{" "}<font color="red">*</font></label>
      </div>
      <div className="w-1/3">
        <input
          className="bg-orange-100 p-2 rounded-md text-black w-full"
          type="text"
          name="organization"
          placeholder="i.e. Cause Connect"
          onChange={(event) => {
            setRegisterOrganizationName(event.target.value);
          }}
          required
        />
      </div>
      <div className="w-1/3">
        <label className="text-sm justify-left">Email{" "}<font color="red">*</font></label>
      </div>
      <div className="w-1/3">
        <input
          className="bg-orange-100 p-2 rounded-md text-black w-full"
          type="text"
          name="email"
          placeholder="Email"
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
          required
        />
      </div>
      <div className="w-1/3">
        <label className="text-sm justify-left">Phone Number{" "}<font color="red">*</font></label>
      </div>
      <div className="w-1/3">
        <input
          className="bg-orange-100 p-2 rounded-md text-black w-full"
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={(event) => {
            setRegisterPhoneNumber(event.target.value);
          }}
          required
       />
      </div>
      <div className="w-1/3">
        <label className="text-sm justify-left">Password{" "}<font color="red">*</font></label>
      </div>
      <div className="w-1/3">
        <input
          className="bg-orange-100 p-2 rounded-md text-black w-full"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
          required
        />
      </div>
      <div className="w-1/3">
        <label className="text-sm justify-left">Website</label>
      </div>
      <div className="w-1/3">
        <input
          className="bg-orange-100 p-2 rounded-md text-black w-full"
          type="url"
          name="website"
          placeholder="Website"
          onChange={(event) => {
            setRegisterWebsite(event.target.value);
          }}
        />
      </div>
      <div className="w-1/3">
        <label className="text-sm justify-left">Non Profit Status{" "}<font color="red">*</font></label>
      </div>
      <div className="relative w-1/3">
        <label for="file-upload" className="z-10 pt-2 absolute bg-orange-100 text-left text-gray-400 rounded-md h-10 w-full opacity-0">Upload Document</label>
        <input
          className="absolute bg-orange-100 p-2 rounded-md text-black w-full"
          placeholder="Upload Document"
          value={fileName()}
        />
        <label for="file-upload" className="z-20 pt-2 absolute bg-orange-200 w-1/3 text-center text-gray-500 rounded-md h-10 right-0 hover:bg-orange-300">Browse Files</label>
        <input
          id="file-upload"
          type="file"
          className="opacity-0"
          placeholder="Upload Document"
          onChange={(event) => {
            setRegisterNonProfitStatus(event.target.value);
          }}
          required
        />

      </div>
      <div className="w-1/3">
        <label className="text-sm justify-left">State{" "}<font color="red">*</font></label>
      </div>
      <div className="w-1/3">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth required>
            <Select
              value={registerState}
              onChange={(event) => {
                setRegisterState(event.target.value);
              }}
              IconComponent={ExpandMoreSharpIcon}
            >
              <MenuItem value="AL">Alabama</MenuItem>
	<MenuItem value="AK">Alaska</MenuItem>
	<MenuItem value="AZ">Arizona</MenuItem>
	<MenuItem value="AR">Arkansas</MenuItem>
	<MenuItem value="CA">California</MenuItem>
	<MenuItem value="CO">Colorado</MenuItem>
	<MenuItem value="CT">Connecticut</MenuItem>
	<MenuItem value="DE">Delaware</MenuItem>
	<MenuItem value="DC">District Of Columbia</MenuItem>
	<MenuItem value="FL">Florida</MenuItem>
	<MenuItem value="GA">Georgia</MenuItem>
	<MenuItem value="HI">Hawaii</MenuItem>
	<MenuItem value="ID">Idaho</MenuItem>
	<MenuItem value="IL">Illinois</MenuItem>
	<MenuItem value="IN">Indiana</MenuItem>
	<MenuItem value="IA">Iowa</MenuItem>
	<MenuItem value="KS">Kansas</MenuItem>
	<MenuItem value="KY">Kentucky</MenuItem>
	<MenuItem value="LA">Louisiana</MenuItem>
	<MenuItem value="ME">Maine</MenuItem>
	<MenuItem value="MD">Maryland</MenuItem>
	<MenuItem value="MA">Massachusetts</MenuItem>
	<MenuItem value="MI">Michigan</MenuItem>
	<MenuItem value="MN">Minnesota</MenuItem>
	<MenuItem value="MS">Mississippi</MenuItem>
	<MenuItem value="MO">Missouri</MenuItem>
	<MenuItem value="MT">Montana</MenuItem>
	<MenuItem value="NE">Nebraska</MenuItem>
	<MenuItem value="NV">Nevada</MenuItem>
	<MenuItem value="NH">New Hampshire</MenuItem>
	<MenuItem value="NJ">New Jersey</MenuItem>
	<MenuItem value="NM">New Mexico</MenuItem>
	<MenuItem value="NY">New York</MenuItem>
	<MenuItem value="NC">North Carolina</MenuItem>
	<MenuItem value="ND">North Dakota</MenuItem>
	<MenuItem value="OH">Ohio</MenuItem>
	<MenuItem value="OK">Oklahoma</MenuItem>
	<MenuItem value="OR">Oregon</MenuItem>
	<MenuItem value="PA">Pennsylvania</MenuItem>
	<MenuItem value="RI">Rhode Island</MenuItem>
	<MenuItem value="SC">South Carolina</MenuItem>
	<MenuItem value="SD">South Dakota</MenuItem>
	<MenuItem value="TN">Tennessee</MenuItem>
	<MenuItem value="TX">Texas</MenuItem>
	<MenuItem value="UT">Utah</MenuItem>
	<MenuItem value="VT">Vermont</MenuItem>
	<MenuItem value="VA">Virginia</MenuItem>
	<MenuItem value="WA">Washington</MenuItem>
	<MenuItem value="WV">West Virginia</MenuItem>
	<MenuItem value="WI">Wisconsin</MenuItem>
	<MenuItem value="WY">Wyoming</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="w-1/3">
        <label className="text-sm justify-left">City{" "}<font color="red">*</font></label>
      </div>
      <div className="w-1/3">
        <input
          className="bg-orange-100 p-2 rounded-md text-black w-full"
          type="text"
          placeholder="e.g. Richardson"
          onChange={(event) => {
            setRegisterCity(event.target.value);
          }}
          required
        />
      </div>
      <div className="w-1/3">
        <label className="text-sm justify-left">Zip Code{" "}<font color="red">*</font></label>
      </div>
      <div className="w-1/3">
        <input
          className="bg-orange-100 p-2 rounded-md text-black w-full"
          type="text"
          placeholder=""
          onChange={(event) => {
            setRegisterZip(event.target.value);
          }}
          required
        />
      </div>
      <div className="w-1/3">
        <label className="text-sm justify-left"> Cause Category{" "}<font color="red">*</font></label>
      </div>
      <div className="w-1/3">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth required>
            <Select
              value={registerCause}
              onChange={(event) => {
                setRegisterCause(event.target.value);
              }}
              IconComponent={ExpandMoreSharpIcon}
            >
              <MenuItem value={"Women's Issues"}>Women's Issues</MenuItem>
              <MenuItem value={"Homeless"}>Homeless</MenuItem>
              <MenuItem value={"Animals"}>Animals</MenuItem>
              <MenuItem value={"Humanitarian Aid"}>Humanitarian Aid</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <button className="bg-orange-400 p-2 rounded-3xl text-white w-1/3 hover:bg-orange-500" onClick={signup}> Sign Up </button>
      <p className="pb-20">
        Already have an account?{" "}
        <a href="/np/login" className="text-blue-500 underline">
          Log in
        </a>
      </p>
      </Stack>
    </form>
  );
}
