import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { collection, query, where, getDocs, doc, updateDoc} from "firebase/firestore";
import {db, auth} from "../../Firebase";

export default function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email;
        const getUserData = async () => {
          try {
            const q = query(collection(db, "users"), where("email", "==", userEmail));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
              const userDoc = querySnapshot.docs[0];
              const data = userDoc.data();
              data.id = userDoc.id;
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

  const updateFirstName = async () => {
    if (!userData) return;
    const userDoc = doc(db, "users", userData.id);
    const newValue = prompt(`Enter new first name:`);
    if (newValue) {
      await updateDoc(userDoc, { "firstName": newValue });
      setUserData({...userData, firstName: newValue});
    }
  }

  const updateLastName = async () => {
    if (!userData) return;
    const userDoc = doc(db, "users", userData.id);
    const newValue = prompt(`Enter new last name:`);
    if (newValue) {
      await updateDoc(userDoc, { "lastName": newValue });
      setUserData({...userData, lastName: newValue});
    }
  }

  const updateEmail = async () => {
    if (!userData) return;
    const userDoc = doc(db, "users", userData.id);
    const newValue = prompt(`Enter new email:`);
    if (newValue) {
      await updateDoc(userDoc, { "email": newValue });
      setUserData({...userData, email: newValue});
    }
  }

  const updatePhoneNumber = async () => {
    if (!userData) return;
    const userDoc = doc(db, "users", userData.id);
    const newValue = prompt(`Enter new phone number:`);
    if (newValue) {
      await updateDoc(userDoc, { "phoneNumber": newValue });
      setUserData({...userData, phoneNumber: newValue});
    }
  }
  
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
        </div>
        <div>
          <div className="py-2 font-bold" onClick={updateFirstName}>
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change First Name</button>
          </div>
          <div className="py-2 font-bold" onClick={updateLastName}>
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Last Name</button>
          </div>
          <div className="py-2 font-bold" onClick={updateEmail}>
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Email</button>
          </div>
          <div className="py-2 font-bold" onClick={updatePhoneNumber}>
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Phone Number</button>
          </div>
          <div className="py-2 font-bold" onClick={resetPassword}>
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
}
