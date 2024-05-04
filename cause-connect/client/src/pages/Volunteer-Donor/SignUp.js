import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Firebase";
import Stack from "@mui/material/Stack";
import { addDoc, collection, doc} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";


export default function Signup_VD() {
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPhotoID, setRegisterPhotoID] = useState("");
  const [registerGoal, setRegisterGoal] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validNumber, setValidNumber] = useState(false);
  const [validGoal, setValidGoal] = useState(false);
  const storage = getStorage();


  const signup = async () => {
    if(!(registerFirstName && registerLastName && validEmail && validNumber &&  registerPassword /*validPassword*/ && registerPhotoID && validGoal)) {
      alert("Please fill out all required fields!\nPassword Requirements:\nMinimum 8 characters\nAt least 1 Uppercase letter\nAt least 1 Lowercase letter\nAt least 1 Number\nAt least 1 Special character (@, $, !, %, *, ?, &)");
    } else {
      try {
        const createUser = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );
        const user = {
          firstName: registerFirstName,
          lastName: registerLastName,
          email: registerEmail,
          phoneNumber: registerPhoneNumber,
          volunteerGoal: registerGoal,
          role: "vd",
        };
        const docRef = await addDoc(collection(db, "users"), user);
        const fileElement = document.getElementById("upload");
        if (fileElement.files.length > 0) {
          const file = fileElement.files[0];
          const storageRef = ref(storage, 'id/' + docRef.id + '/' + file.name);
          const uploadTask = await uploadBytes(storageRef, file);
        }
        alert("Successfully signed up!");
        console.log(createUser);
        window.location.href = "/vd/welcome";
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          alert(registerEmail + " already in use. Please login.");
          window.location.href = "/vd/login";
        }
        console.log(error.message);
      }
    }
  };
  function fileName(fileData) {
    try {
      if (fileData != null) {
        return fileData.files.item(0).name;
      } else {
        return "";
      }
    } catch (error) {
    }
  }
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(String(email).toLowerCase());
  }

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  }

  const validateNumber = (number) => {
    const re = new RegExp('^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$');
    return !!re.test(String(number));
  }

  const email = document.querySelector("input[name='email']");
  if(email) {
    email.addEventListener("blur", (event) => {
      if(!validateEmail(event.target.value)) {
        event.target.style.background = "pink";
        setValidEmail(false);
      } else {
        event.target.style.background = "";
        setValidEmail(true);
      }
    });
  }

  // const password = document.querySelector("input[name='password']");
  // if(password) {
  //   password.addEventListener("blur", (event) => {
  //     if(!validatePassword(event.target.value)) {
  //       event.target.style.background = "pink";
  //       setValidPassword(false);
  //     } else {
  //       event.target.style.background = "";
  //       setValidPassword(true);
  //     }
  //   });
  // }

  const number = document.querySelector("input[name='phone']");
  if(number) {
    number.addEventListener("blur", (event) => {
      if(!validateNumber(event.target.value)) {
        event.target.style.background = "pink";
        setValidNumber(false);
      } else {
        event.target.style.background = "";
        setValidNumber(true);
      }
    });
  }

  const goal = document.querySelector("input[name='goal']");
  if(goal) {
    goal.addEventListener("blur", (event) => {
      if(event.target.value < 0) {
        event.target.style.background = "pink";
        setValidGoal(false);
      } else {
        event.target.style.background = "";
        setValidGoal(true);
      }
    });
  }
  return (
    <div className="pt-20 w-full">
      <Stack
        className="relative"
        direction="column"
        alignItems="center"
        spacing={2}
      >
        <div className="w-1/3">
          <h1 className="text-3xl justify-left">Volunteer / Donor Sign Up</h1>
        </div>

        <div className="w-1/3">
          <label className="text-sm justify-left">
            First Name <font color="red">*</font>
          </label>
        </div>
        <div className="w-1/3">
          <input
            className="bg-orange-100 p-2 rounded-md text-black w-full"
            type="text"
            name="firstname"
            placeholder="First Name"
            onChange={(event) => {
              setRegisterFirstName(event.target.value);
            }}
            required
          />
        </div>

        <div className="w-1/3">
          <label className="text-sm justify-left">
            Last Name <font color="red">*</font>
          </label>
        </div>
        <div className="w-1/3">
          <input
            className="bg-orange-100 p-2 rounded-md text-black w-full"
            type="text"
            name="lastname"
            placeholder="Last Name"
            onChange={(event) => {
              setRegisterLastName(event.target.value);
            }}
            required
          />
        </div>

        <div className="w-1/3">
          <label className="text-sm justify-left">
            Email <font color="red">*</font>
          </label>
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
          <label className="text-sm justify-left">
            Password <font color="red">*</font>
          </label>
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
          <label className="text-sm justify-left">
            Phone Number <font color="red">*</font>
          </label>
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
          <label className="text-sm justify-left">
            Photo ID <font color="red">*</font>
          </label>
        </div>

        <div className="relative w-1/3">
          <label
            for="upload"
            className="z-10 pt-2 absolute bg-orange-100 text-left text-gray-400 rounded-md h-10 w-full opacity-0"
          >
            Upload Document
          </label>
          <input
            className="absolute bg-orange-100 p-2 rounded-md text-black w-full"
            placeholder="Upload Document"
            value={fileName(document.getElementById("upload"))}
          />
          <label
            for="upload"
            className="z-20 pt-2 absolute bg-orange-200 w-1/3 text-center text-gray-500 rounded-md h-10 right-0 hover:bg-orange-300"
          >
            Browse Files
          </label>
          <input
            id="upload"
            type="file"
            className="opacity-0"
            placeholder="Upload Document"
            onChange={(event) => {
              setRegisterPhotoID(event.target.value);
            }}
            required
          />
        </div>

        <div className="w-1/3">
          <label className="text-sm justify-left">
            Volunteering Goal <font color="red">*</font>
          </label>
        </div>
        <div className="w-1/3">
          <input
            className="bg-orange-100 p-2 rounded-md text-black w-full"
            type="number"
            name="goal"
            placeholder="0"
            onChange={(event) => {
              setRegisterGoal(event.target.value);
            }}
            required
          />
        </div>

        <button
          className="bg-orange-400 p-2 rounded-3xl text-white w-1/3 hover:bg-orange-500"
          onClick={signup}
        >
          {" "}
          Sign Up{" "}
        </button>
        <p className="pb-20">
          Already have an account?{" "}
          <a href="/vd/login" className="text-blue-500 underline">
            Log in
          </a>
        </p>
      </Stack>
    </div>
  );
}
