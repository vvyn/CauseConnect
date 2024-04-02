import React, { useState } from "react";
import "../styles/Login.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import Button from '@mui/material/Button';
//import { register } from "module";

export default function Signup_NP() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

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
    <div>
      <h1> <center> Signup </center> </h1>
      <label> Email: </label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={(event) => {
          setRegisterEmail(event.target.value);
        }}
      />
      <label> Password: </label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={(event) => {
          setRegisterPassword(event.target.value);
        }}
      />
      <button className="bg-orange-400 p-2 rounded-md text-white"> Sign Up </button>
      <button onClick={signup}> Create User</button>
    </div>
  );
}
