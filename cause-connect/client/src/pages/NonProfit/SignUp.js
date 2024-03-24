import React, { useState } from "react";
import "../styles/Login.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
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
<<<<<<< HEAD
      <h1> Nonprofit Signup </h1>
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

      <button onClick={signup}> Create User</button>
=======
      <p>Hi44</p>
>>>>>>> 0667c21f8e6ab04babd66be9e95f731a2f56a4a0
    </div>
  );
}
