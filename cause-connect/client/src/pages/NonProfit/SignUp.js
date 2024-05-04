import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import { db } from "../../Firebase";
import { doc, addDoc, collection, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validNumber, setValidNumber] = useState(false);
  const [validURL, setValidURL] = useState(true);
  const [validZip, setValidZip] = useState(false);

  const storage = getStorage();
  const signup = async () => {
    if(!(registerOrganizationName && validEmail && validNumber &&  validPassword && validURL && registerNonProfitStatus && registerState && registerCity && validZip && registerCause)) {
      alert("Please fill out all required fields!\nPassword Requirements:\nMinimum 8 characters\nAt least 1 Uppercase letter\nAt least 1 Lowercase letter\nAt least 1 Number\nAt least 1 Special character (@, $, !, %, *, ?, &)");
    } else {
      try {

        const createUser = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );
        const user = {
          name: registerOrganizationName,
          email: registerEmail,
          phone: registerPhoneNumber,
          website: registerWebsite,
          status: registerNonProfitStatus,
          state: registerState,
          city: registerCity,
          zipcode: registerZip,
          category: registerCause,
          role: "np",
          };
          const docRef = await addDoc(collection(db, "nonprofits"), user);
          alert("Successfully signed up!");
          console.log("Document Written with ID: ", docRef.id);
          const fileElement = document.getElementById("file-upload");
        if (fileElement.files.length > 0) {
          const file = fileElement.files[0];
          const storageRef = ref(storage, 'status/' + docRef.id + '/' + file.name);
          const uploadTask = await uploadBytes(storageRef, file);

          const downloadURL = await getDownloadURL(uploadTask.ref);
          console.log('File available at', downloadURL);
          await updateDoc(doc(db, "nonprofits", docRef.id), {
            status: downloadURL
          });
        }
        console.log(createUser);
        window.location = "/np/welcome";
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          alert(registerEmail + " already in use. Please login in.");
          window.location = "/np/login";
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

  const validateURL = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-zA-Z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-zA-Z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(url);
  }

  const validateZip = (zipcode) => {
    return /^\d{5}(?:[-\s]\d{4})?$/.test(zipcode);
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

  const password = document.querySelector("input[name='password']");
  if(password) {
    password.addEventListener("blur", (event) => {
      if(!validatePassword(event.target.value)) {
        event.target.style.background = "pink";
        setValidPassword(false);
      } else {
        event.target.style.background = "";
        setValidPassword(true);
      }
    });
  }
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
  const website = document.querySelector("input[name='website']");
  if(website) {
    website.addEventListener("blur", (event) => {
      if(!validateURL(event.target.value) && event.target.value !== "") {
        event.target.style.background = "pink";
        setValidURL(false);
      } else {
        event.target.style.background = "";
        setValidURL(true);
      }
    });
  }
  const zipcode = document.querySelector("input[name='zipcode']");
  if(zipcode) {
    zipcode.addEventListener("blur", (event) => {
      if(!validateZip(event.target.value)) {
        event.target.style.background = "pink";
        setValidZip(false);
      } else {
        event.target.style.background = "";
        setValidZip(true);
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
          <h1 className="text-3xl justify-left">NonProfit Sign Up</h1>
        </div>

        <div className="w-1/3">
          <label className="text-sm justify-left">
            Organization Name <font color="red">*</font>
          </label>
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
            onChange={ (event) => {
              setRegisterEmail(event.target.value);
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
          <label className="text-sm justify-left">
            Non Profit Status <font color="red">*</font>
          </label>
        </div>
        <div className="relative w-1/3">
          <label
            for="file-upload"
            className="z-10 pt-2 absolute bg-orange-100 text-left text-gray-400 rounded-md h-10 w-full opacity-0"
          >
            Upload Document
          </label>
          <input
            className="absolute bg-orange-100 p-2 rounded-md text-black w-full"
            placeholder="Upload Document"
            value={fileName(document.getElementById("file-upload"))}
          />
          <label
            for="file-upload"
            className="z-20 pt-2 absolute bg-orange-200 w-1/3 text-center text-gray-500 rounded-md h-10 right-0 hover:bg-orange-300"
          >
            Browse Files
          </label>
          <input
            id="file-upload"
            type="file"
            name="status"
            className="opacity-0"
            placeholder="Upload Document"
            onChange={(event) => {
              setRegisterNonProfitStatus(event.target.value);
            }}
            required
          />
        </div>

        <div className="w-1/3">
          <label className="text-sm justify-left">
            State <font color="red">*</font>
          </label>
        </div>
        <div className="w-1/3">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth required>
              <Select
                className="h-10 bg-orange-100"
                value={registerState}
                name="state"
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
          <label className="text-sm justify-left">
            City <font color="red">*</font>
          </label>
        </div>
        <div className="w-1/3">
          <input
            className="bg-orange-100 p-2 rounded-md text-black w-full"
            type="text"
            name="city"
            placeholder="e.g. Richardson"
            onChange={(event) => {
              setRegisterCity(event.target.value);
            }}
            required
          />
        </div>

        <div className="w-1/3">
          <label className="text-sm justify-left">
            Zip Code <font color="red">*</font>
          </label>
        </div>
        <div className="w-1/3">
          <input
            className="bg-orange-100 p-2 rounded-md text-black w-full"
            type="text"
            name="zipcode"
            placeholder=""
            onChange={(event) => {
              setRegisterZip(event.target.value);
            }}
            required
          />
        </div>

        <div className="w-1/3">
          <label className="text-sm justify-left">
            {" "}
            Cause Category <font color="red">*</font>
          </label>
        </div>
        <div className="w-1/3">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth required>
              <Select
                className="h-10 bg-orange-100"
                value={registerCause}
                name="category"
                onChange={(event) => {
                  setRegisterCause(event.target.value);
                }}
                IconComponent={ExpandMoreSharpIcon}
              >
                <MenuItem value={"Women's Issues"}>Food</MenuItem>
                <MenuItem value={"Healthcare"}>Healthcare</MenuItem>
                <MenuItem value={"Environment"}>Environment</MenuItem>
                <MenuItem value={"Humanitarian Aid"}>Humanitarian Aid</MenuItem>
                <MenuItem value={"Animals"}>Animals</MenuItem>
                <MenuItem value={"Education"}>Education</MenuItem>
                <MenuItem value={"Religious"}>Religious</MenuItem>
                <MenuItem value={"Library"}>Library</MenuItem>
                <MenuItem value={"Youth"}>Youth</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
          <a href="/np/login" className="text-blue-500 underline">
            Log in
          </a>
        </p>
      </Stack>
    </div>
  );
}
