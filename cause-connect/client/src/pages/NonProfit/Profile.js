import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { collection, query, where, getDocs, doc, updateDoc} from "firebase/firestore";
import {db, auth} from "../../Firebase";

export default function Profile() {
  const [nonProfitData, setNonProfitData] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (nonProfit) => {
      if (nonProfit) {
        const nonProfitEmail = nonProfit.email;
        const getNonProfitData = async () => {
          try {
            const q = query(collection(db, "nonprofits"), where("email", "==", nonProfitEmail));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
              const nonProfitDoc = querySnapshot.docs[0];
              const data = nonProfitDoc.data();
              data.id = nonProfitDoc.id;
              setNonProfitData(data);
            } else {
              console.log("No non profit found");
              setNonProfitData(null);
            }
          } catch (err) {
            console.error(err);
          }
        };
        getNonProfitData();
      }
    });
  }, []);

  const updateName = async () => {
    if (!nonProfitData) return;
    const nonProfitDoc = doc(db, "nonprofits", nonProfitData.id);
    const newValue = prompt(`Enter new first name:`);
    if (newValue) {
      await updateDoc(nonProfitDoc, { "name": newValue });
      setNonProfitData({...nonProfitData, name: newValue});
    }
  }

  const updateEmail = async () => {
    if (!nonProfitData) return;
    const nonProfitDoc = doc(db, "nonprofits", nonProfitData.id);
    const newValue = prompt(`Enter new email:`);
    if (newValue) {
      await updateDoc(nonProfitDoc, { "email": newValue });
      setNonProfitData({...nonProfitData, email: newValue});
    }
  }

  const updatePhoneNumber = async () => {
    if (!nonProfitData) return;
    const nonProfitDoc = doc(db, "nonprofits", nonProfitData.id);
    const newValue = prompt(`Enter new phone number:`);
    if (newValue) {
      await updateDoc(nonProfitDoc, { "phone": newValue });
      setNonProfitData({...nonProfitData, phone: newValue});
    }
  }

  const updateWebsite = async () => {
    if (!nonProfitData) return;
    const nonProfitDoc = doc(db, "nonprofits", nonProfitData.id);
    const newValue = prompt(`Enter new phone number:`);
    if (newValue) {
      await updateDoc(nonProfitDoc, { "website": newValue });
      setNonProfitData({...nonProfitData, website: newValue});
    }
  }

  const updateCauseCategory = async () => {
    if (!nonProfitData) return;
    const nonProfitDoc = doc(db, "nonprofits", nonProfitData.id);
    const newValue = prompt(`Enter new phone number:`);
    if (newValue) {
      await updateDoc(nonProfitDoc, { "category": newValue });
      setNonProfitData({...nonProfitData, category: newValue});
    }
  }

  const updateState = async () => {
    if (!nonProfitData) return;
    const nonProfitDoc = doc(db, "nonprofits", nonProfitData.id);
    const newValue = prompt(`Enter new phone number:`);
    if (newValue) {
      await updateDoc(nonProfitDoc, { "state": newValue });
      setNonProfitData({...nonProfitData, state: newValue});
    }
  }

  const updateCity = async () => {
    if (!nonProfitData) return;
    const nonProfitDoc = doc(db, "nonprofits", nonProfitData.id);
    const newValue = prompt(`Enter new phone number:`);
    if (newValue) {
      await updateDoc(nonProfitDoc, { "city": newValue });
      setNonProfitData({...nonProfitData, city: newValue});
    }
  }

  const updateZipcode = async () => {
    if (!nonProfitData) return;
    const nonProfitDoc = doc(db, "nonprofits", nonProfitData.id);
    const newValue = prompt(`Enter new phone number:`);
    if (newValue) {
      await updateDoc(nonProfitDoc, { "zipcode": newValue });
      setNonProfitData({...nonProfitData, zipcode: newValue});
    }
  }
  
  const updatePassword = async () => {
    await sendPasswordResetEmail(auth, nonProfitData.email)
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
      <div className="py-2">Edit your information</div>
      <div className="flex">
        <div className="mr-40">
          <div className="py-2 font-bold flex">
            Name: 
            <p className='font-normal pl-2'>
              {nonProfitData ? nonProfitData.name : null}
            </p>
          </div>
          <div className="py-2 font-bold flex">
            Email: 
            <p className='font-normal pl-2'>
              {nonProfitData ? nonProfitData.email : null}
            </p>
          </div>
          <div className="py-2 font-bold flex">
            Phone Number: 
            <p className='font-normal pl-2'>
              {nonProfitData ? nonProfitData.phone : null}
            </p>
          </div>
          <div className="py-2 font-bold flex">
            Website: 
            <p className='font-normal pl-2'>
              {nonProfitData ? nonProfitData.website : null}
            </p>
          </div>
          <div className="py-2 font-bold flex">
            Cause Category: 
            <p className='font-normal pl-2'>
              {nonProfitData ? nonProfitData.category : null}
            </p>
          </div>
          <div className="py-2 font-bold flex">
            State: 
            <p className='font-normal pl-2'>
              {nonProfitData ? nonProfitData.state : null}
            </p>
          </div>
          <div className="py-2 font-bold flex">
            City: 
            <p className='font-normal pl-2'>
              {nonProfitData ? nonProfitData.city : null}
            </p>
          </div>
          <div className="py-2 font-bold flex">
            Zipcode: 
            <p className='font-normal pl-2'>
              {nonProfitData ? nonProfitData.zipcode : null}
            </p>
          </div>
          <div className="py-2 font-bold">
            Password: 
          </div>
        </div>
        <div>
          <div className="py-2 font-bold" onClick={updateName}>
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Name</button>
          </div>
          <div className="py-2 font-bold" onClick={updateEmail}>
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Email</button>
          </div>
          <div className="py-2 font-bold" onClick={updatePhoneNumber}>
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Phone Number</button>
          </div>
          <div className="py-2 font-bold" onClick={updateWebsite}>
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Website</button>
          </div>
          <div className="py-2 font-bold" onClick={updateCauseCategory}>
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Cause Category</button>
          </div>
          <div className="py-2 font-bold" onClick={updateState}>
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change State</button>
          </div>
          <div className="py-2 font-bold" onClick={updateCity}>
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change City</button>
          </div>
          <div className="py-2 font-bold" onClick={updateZipcode}>
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Zipcode</button>
          </div>
          <div className="py-2 font-bold" onClick={updatePassword}>
            <button className="mx-2 bg-orange-300 rounded-xl text-xs py-1 text-white px-2">Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
}
