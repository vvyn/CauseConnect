// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbXz-mlBfCY1xyGygMgxFP_9VuA89gXS4", // USE ENV VARIABLES
  authDomain: "causeconnect-27414.firebaseapp.com",
  projectId: "causeconnect-27414",
  storageBucket: "causeconnect-27414.appspot.com",
  messagingSenderId: "1029886444351",
  appId: "1:1029886444351:web:df3377d0d5600ffad1c98a",
  measurementId: "G-B1G1LN9TLL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
