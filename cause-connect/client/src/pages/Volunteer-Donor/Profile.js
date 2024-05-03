import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { collection, query, where, getDocs, doc, updateDoc, getDoc} from "firebase/firestore";
import {db, auth} from "../../Firebase";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [volunteerData, setVolunteerData] = useState(null);

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

  useEffect(() => {
    const getVolunteerData = async () => {
      if (userData && userData.volunteerSummary) {
        const volunteerPromises = userData.volunteerSummary.map(id => 
          getDoc(doc(db, "volunteerPosting", id))
        );
        const volunteerDocs = await Promise.all(volunteerPromises);
        const volunteerDetails = volunteerDocs.map(doc => doc.exists() ? doc.data() : null).filter(doc => doc);
        setVolunteerData(volunteerDetails);
      }
    };
    getVolunteerData();
  }, [userData]);
  
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

  const updateVolunteerGoal = async () => {
    if (!userData) return;
    const userDoc = doc(db, "users", userData.id);
    const newValue = prompt(`Enter new volunteer goal:`);
    if (newValue) {
      await updateDoc(userDoc, { "volunteerGoal": newValue });
      setUserData({...userData, volunteerGoal: newValue});
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

  function capitalizeWords(input) {
    return input.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }  

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
          <div className="py-2 font-bold flex">
            Volunteer Goal: 
            <p className='font-normal pl-2'>
              {userData ? userData.volunteerGoal : null}
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
          <div className="py-2 font-bold" onClick={updateVolunteerGoal}>
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Volunteer Goal</button>
          </div>
          <div className="py-2 font-bold" onClick={resetPassword}>
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Password</button>
          </div>
        </div>
      </div>
      <div className='mt-10'>
        <div className="py-2 font-bold flex text-lg">Volunteer Sign Ups: </div>
        <div className="vol-card-container">
          {volunteerData ? volunteerData.map((opportunity) => (
            <div className="vol-card" key={opportunity.id}>
              <div className="vol-card-content">
                <div className="vol-wrapper-heading">
                  <h2 className="vol-card-title">{opportunity.title}</h2>
                </div>
                <div className="vol-wrapper">
                  <p className="vol-location" >{opportunity.locationName}</p>
                  <p className="vol-city-state">{capitalizeWords(opportunity.city)}, {opportunity.state}</p>
                </div>
                <p className="vol-date"><b>Date: </b>{opportunity.date}</p>
                <p className="vol-time"><b>Time: </b>{opportunity.startTime}-{opportunity.endTime}</p>
                <p>{opportunity.description}</p>
              </div>
            </div>
          )) : null} 

        </div>
      </div>
    </div>
  );
}
