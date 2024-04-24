import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../../Firebase";
import { collection, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import "../../styles/Login.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function VDLogin() {
  const [email, setLoginEmail] = useState("");
  const [password, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  //   onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // const user = userCredential.user;
      // const userDoc = await getDoc(collection(db, "users", user));
      // const userData = userDoc.data();
      //console.log(userData);
      // const userDoc = await getDoc(userRef);

      // if (userDoc.exists()) {
      //   const userData = userDoc.data();
      //   setUser({ user: userCredential.user, role: userData.role });
      alert(user.email + " Successfully logged In");
      console.log(user);
      window.location = "/vd/welcome";
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage);
      alert(errorCode + ": " + errorMessage);
    }
  };

  const resetPassword = async () => {
    if (email === "") {
      alert("Please enter an email address.");
      return;
    }
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  };

  return (
    <div className="App flex">
      <div>
        <img
          className="size-full hidden sm:block"
          src="../LoginPage-image.png"
          alt="login-image"
        />
      </div>
      <div className="flex justify-center items-center h-screen">
        <div className="login-page">
          <h1 className="text-4xl font-bold pb-20">Volunteer & Donor Login</h1>
          <input
            className="text-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setLoginEmail(event.target.value)}
          />
          <input
            className="text-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setLoginPassword(event.target.value)}
          />
          <button className="login-button" onClick={login}>
            Login
          </button>
          <p className="text-center pt-5">
            Don't have an account?{" "}
            <a href="/vd/signup" className="text-blue-500 underline">
              Sign Up
            </a>
          </p>
          <p className="text-center pt-5">
            <button className="text-blue-500 underline" onClick={resetPassword}>
              Forgot Password?
            </button>
          </p>
          <p className="text-center pt-5">
            <a href="/np/login" className="text-blue-500 underline">
              Log in as a NonProfit
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
