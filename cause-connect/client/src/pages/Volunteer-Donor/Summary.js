import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { db, auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";


export default function Summary() {
  const [totalHours, setTotalHours] = useState(0);
  const [userData, setUserData] = useState(null);
  const [goalProgress, setGoalProgress] = useState(0);
  const [displayMessage, setDisplayMessage] = useState("");
  const [curGoal, setCurGoal] = useState(0);

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
        console.log("goal = " + curGoal);
        let progressPercentage = (totalHours / goal) * 100;
        console.log("% = " + progressPercentage);
        setGoalProgress(progressPercentage);

        if(progressPercentage === 100){
          setDisplayMessage("Congratulations! You've met your goal!");
        } else if (progressPercentage > 0){
          setDisplayMessage("Hooray, you've made progress towards your goal of " + curGoal + " hours!");
        }
      }
    }

    calculateProgress();
  }, [userData, curGoal, totalHours]);




  return (
    <div>
      <div className="p-10">
        <div className="py-2 text-5xl text-orange-400">Your Volunteer Summary</div>
        <div className="py-2"><span>Total Volunteer Hours:</span>
        <div className="mt-0 text-2xl text-orange-300">{totalHours} Hours</div></div>

      <ProgressBar completed = {goalProgress} bgColor="orange" />
      {displayMessage && <p className="py-2">{displayMessage}</p>}
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