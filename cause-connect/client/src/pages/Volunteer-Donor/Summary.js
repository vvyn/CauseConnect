import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { db, auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";


export default function DonationSummary() {
  const [totalHours, setTotalHours] = useState(0);
  const [userData, setUserData] = useState(null);
  const [goalProgress, setGoalProgress] = useState(0);
  const [displayMessage, setDisplayMessage] = useState("");
  const [curGoal, setCurGoal] = useState(0);
  const [curDonations, setCurDonations] = useState([]);

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
    async function getHours() {
      if (userData) {
        const volunteerOpportunities = userData.volunteerSummary || [];
        let sumHours = 0;
        for (const oppId of volunteerOpportunities) {
          const volOppRef = doc(db, "volunteerPosting", oppId);
          const volOppDoc = await getDoc(volOppRef);
          if(volOppDoc.exists()){
            sumHours += volOppDoc.data().hours;
          }
        }
        setTotalHours(sumHours);
      }
    }

    getHours();

    async function calculateProgress() {
      if (userData) {
        const goal = userData.volunteerGoal;
        setCurGoal(goal);
        let progressPercentage = (totalHours / goal) * 100;
        setGoalProgress(progressPercentage);

        if(progressPercentage === 100){
          setDisplayMessage("Congratulations! You've met your goal!");
        } else if (progressPercentage > 0){
          setDisplayMessage("Hooray! You've made progress towards your goal of " + curGoal + " hours!");
        }
      }
    }

    calculateProgress();


  }, [userData, curGoal, goalProgress, totalHours]);

  useEffect(() => {
    async function userDonationSummary() {
      if (userData) {
        const donatedHere = userData.donationSummary || [];
        let orgArray = [];
        for (const donationId of donatedHere) {
          const donationRef = doc(db, "donationPosting", donationId);
          const donationDoc = await getDoc(donationRef);
          if(donationDoc.exists()){
            orgArray.push(donationDoc.data().location);
          }
        }
        setCurDonations(orgArray);
        
      }
    }

    userDonationSummary();
  }, [userData])




  return (
    <div>
      <div className="p-10">
        <div className="py-2 text-5xl text-orange-400">Your Volunteer Summary</div>
        <div className="text-2xl py-2"><span>Total Hours Volunteered:</span>
        <div className="mt-0 text-2xl text-orange-300">{totalHours} Hours</div></div>

        <ProgressBar completed = {goalProgress} bgColor="orange" />
        {displayMessage && <p className="py-2 text-2xl">{displayMessage}</p>}


        <div className="mt-40 py-2 text-5xl text-orange-400">Your Donation Summary</div>
        <div className="text-2xl py-2"><span>Donated to Nonprofits:</span>
          <ul className="mt-0 text-2xl text-orange-300">
            {curDonations.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>

      </div>
      
    </div>
  );
}

