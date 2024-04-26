import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore();
const auth = getAuth();

export default function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email;
        const fetchUserData = async () => {
          try {
            const q = query(collection(db, "users"), where("email", "==", userEmail));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
              const userDoc = querySnapshot.docs[0].data();
              setUserData(userDoc);
            } else {
              console.log("No user found with that email.");
              setUserData(null);
            }
          } catch (err) {
            console.error(err);
          }
        };

        fetchUserData();
      } else {
        console.log("User is not signed in.");
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const resetPassword = async () => {
    await sendPasswordResetEmail(auth, userData.email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-10">
      <div className="py-2 text-4xl text-orange-400">Profile</div>
      <div className="py-2">Edit your personal information</div>
      <div className="flex">
        <div className="mr-40">
          <div className="py-2 font-bold flex">
            First Name: 
            <p className='font-normal pl-2'>
              {userData ? userData.firstName : null}
            </p>
          </div>
          <div className="py-2 font-bold flex">
            Last Name: 
            <p className='font-normal pl-2'>
              {userData ? userData.lastName : null}
            </p>
          </div>
          <div className="py-2 font-bold flex">
            Email: 
            <p className='font-normal pl-2'>
              {userData ? userData.email : null}
            </p>
          </div>
          <div className="py-2 font-bold flex">
            Phone Number: 
            <p className='font-normal pl-2'>
              {userData ? userData.phoneNumber : null}
            </p>
          </div>
          <div className="py-2 font-bold">
            Password: 
          </div>
          <div className="py-2 font-bold">
            Photo ID: 
          </div>
        </div>
        <div>
          <div className="py-2 font-bold">
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change First Name</button>
          </div>
          <div className="py-2 font-bold">
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Last Name</button>
          </div>
          <div className="py-2 font-bold">
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Email</button>
          </div>
          <div className="py-2 font-bold">
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Phone Number</button>
          </div>
          <div className="py-2 font-bold">
            <button onClick={() => resetPassword} className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Password</button>
          </div>
          <div className="py-2 font-bold">
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Photo ID</button>
          </div>
        </div>
      </div>
      <div className="py-2 font-bold">
        Manage Volunteer Sign Ups: 
      </div>
    </div>
  );
}
