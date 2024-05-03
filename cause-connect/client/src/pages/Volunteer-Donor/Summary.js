import React, { useEffect, useState } from "react";
import { db, auth } from "../../Firebase";
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";


export default function Summary() {
  const [totalHours, setTotalHours] = useState(0);
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


  useEffect (() => {
    async function getHours() {
      if (userData) {
        const volunteerOpportunities = userData.volunteerSummary || [];
        for (const oppId of volunteerOpportunities) {
          const volOppRef = doc(db, "volunteerPostings", oppId);
          if(volOppRef.exists()){
            setTotalHours(totalHours + volOppRef.data().hours);
          }
        }
      }
    }

    getHours();
  }, []);




  return (
    <div>
      <div className="p-10">
        <div className="py-2 text-5xl text-orange-400">Your Volunteer Summary</div>
        <div className="py-2"><span>Total Volunteer Hours:</span>
        <div className="mt-0 text-2xl text-orange-300">{totalHours} Hours</div></div>


      </div>
      <div className="p-10">
        <div className="py-2 font-bold"></div>
        <div className="py-2 text-2xl text-orange-400" style={{textAlign:'center'}}> Thank you for your donation!</div>
      </div>
    </div>
  );
}



// extract donations id from users table, then use id to get amount
// extract volunteerid from users, get hours from id
// add donations
// add volunteer hours
// show volunteer progress goal
// update volunteer goal
// if goal is met, display message
// 