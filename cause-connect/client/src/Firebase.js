import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbXz-mlBfCY1xyGygMgxFP_9VuA89gXS4", // USE ENV VARIABLES
  authDomain: "causeconnect-27414.firebaseapp.com",
  projectId: "causeconnect-27414",
  storageBucket: "causeconnect-27414.appspot.com",
  messagingSenderId: "1029886444351",
  appId: "1:1029886444351:web:df3377d0d5600ffad1c98a",
  measurementId: "G-B1G1LN9TLL",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email;
        const getUserData = async () => {
          try {
            const q = query(collection(db, "nonprofits"), where("email", "==", userEmail));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
              const userDoc = querySnapshot.docs[0];
              const data = userDoc.data();
              setUserData(data);
            } else {
              console.log("No user found");
              setUserData(null);
            }
          } catch (err) {
            console.error(err);
          }
        };
        getUserData();
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ userData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function CheckRoute({ children, allowedTypes }) {
  const { userData } = useAuth();

  if (!userData || !allowedTypes.includes(userData.type)) {
    return <Navigate to="/" />;
  }
  
  return children;
}