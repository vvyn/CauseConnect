import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db, auth } from "../../Firebase";
import "../../assets/css/VolunteerOpp.css";
import { onAuthStateChanged } from "firebase/auth";
import {
  arrayUnion,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  getDoc
} from "firebase/firestore";

const OpportunitySignUp = () => {
  //const { id } = useParams();
  const location = useLocation();
  const { opportunity } = location.state || {};

  const [signUpStatus, setSignUpStatus] = useState("");
  const [availableSpots, setAvailableSpots] = useState(
    opportunity.availableSlots
  );
  const [userDocs, setUserDocs] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email;
        const getUserData = async () => {
          try {
            const q = query(
              collection(db, "users"),
              where("email", "==", userEmail)
            );
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
              const userDoc = querySnapshot.docs[0];
              setUserDocs(userDoc);
            } else {
              console.log("No user found");
            }
          } catch (err) {
            console.error(err);
          }
        };
        getUserData();
      }
    });
  }, []);

  

  const updateSignUpStatus = () => {

    const opportunityRef = doc(db, "volunteerPosting", opportunity.id);
    const userRef = doc(db, "users", userDocs.id);

    async function checkSignUps(){
      console.log("in check");
      console.log("user id:" + userDocs.id);
      const volunteerPost = await getDoc(opportunityRef);
      if (volunteerPost.exists()) {
        let signUpsArr = volunteerPost.data().signups;
        console.log("sign ups:" + signUpsArr);
        if(signUpsArr && signUpsArr.includes(userDocs.id)){
          console.log("user signed up");
          return false;
        } else {
          console.log("user not signed up");
          return true;
        }
      }
    }

    if(checkSignUps() === true){
      if(availableSpots > 0){
        const updatedSpots = availableSpots - 1;
        setAvailableSpots(updatedSpots);
        try {
          updateDoc(opportunityRef, { availableSlots: updatedSpots, signups: arrayUnion(userDocs.id)});
          updateDoc(userRef, { volunteerSummary: arrayUnion(opportunity.id) });
          setSignUpStatus("Successfully signed up!");
        } catch (error) {
          console.error("Error updating available slots:", error);
          setSignUpStatus("Failed to sign up. Please try again.");
        }
      } else {
        setSignUpStatus("Sorry, there are no spots available.");
      }
      
    } else {
      setSignUpStatus("You've already signed up!");
    }
  };
  

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "/vd/login"; // Redirect to login page if not signed in
      } else {
        // User is signed in, continue with page functionality
        console.log("User is logged in:", user);
      }
    });
  }, []);

  return (
    <div>
      {opportunity && (
        <div>
          <h2 className="vol-opp-title">{opportunity.title}</h2>
          <p className="vol-opp-text">
            <b>Location:</b>
            <br></br>
            {opportunity.locationName}
            <br></br>
            {opportunity.locationAddr}, {opportunity.city}, {opportunity.state},{" "}
            {opportunity.zipcode}
            <br></br>
            <br></br>
            <b>Date:</b>
            <br></br>
            {opportunity.date}
            <br></br>
            <br></br>
            <b>Time:</b>
            <br></br>
            {opportunity.startTime} - {opportunity.endTime}
            <br></br>
            <br></br>
            <b>Hours:</b>
            <br></br>
            {opportunity.hours}
            <br></br>
            <br></br>
            <b>Description:</b>
            <br></br>
            {opportunity.description}
            <br></br>
            <br></br>
            <b>Availability: </b>
            {opportunity.availableSlots} out of {opportunity.totalSpots} open
            spots
          </p>

          <button
            className="vol-opp-signup-button"
            onClick={updateSignUpStatus}
          >
            Sign Up
          </button>
          {signUpStatus && (
            <p className="vol-opp-signup-status">{signUpStatus}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OpportunitySignUp;
