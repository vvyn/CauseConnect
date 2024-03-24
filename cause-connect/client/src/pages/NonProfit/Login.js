import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import "../styles/Login.css";
import { auth } from "../../Firebase";

export default function App() {
  const [email, setLoginEmail] = useState("");
  const [password, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  //   onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });

  const login = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        alert(user.email + " Successfully logged In");
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
      });
  };

  return (
    <div>
      <p>Hi</p>
    </div>
  );
}
