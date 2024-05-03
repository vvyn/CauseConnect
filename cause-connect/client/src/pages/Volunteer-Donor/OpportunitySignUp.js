import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../Firebase";
import { doc, updateDoc } from "firebase/firestore";
import "../../assets/css/VolunteerOpp.css";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";

const OpportunitySignUp = () => {
  //const { id } = useParams();
  const location = useLocation();
  const { opportunity } = location.state || {};

  const [signUpStatus, setSignUpStatus] = useState("");
  const [availableSpots, setAvailableSpots] = useState(
    opportunity.availableSlots
  );

  const updateSignUpStatus = () => {
    if (availableSpots > 0) {
      const updatedSpots = availableSpots - 1;
      setAvailableSpots(updatedSpots);

      const opportunityRef = doc(db, "volunteerPosting", opportunity.id);

      try {
        updateDoc(opportunityRef, { availableSlots: updatedSpots });
        setSignUpStatus("Successfully signed up!");
      } catch (error) {
        console.error("Error updating available slots:", error);
        setSignUpStatus("Failed to sign up. Please try again.");
      }
    } else {
      setSignUpStatus("Sorry, there are no spots available.");
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
