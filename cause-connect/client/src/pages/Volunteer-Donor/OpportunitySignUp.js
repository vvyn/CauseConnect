import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { db } from "../../Firebase";
import { doc, updateDoc } from "firebase/firestore";
import '../../assets/css/VolunteerOpp.css';

const OpportunitySignUp = () => {
    //const { id } = useParams();
    const location = useLocation();
    const { opportunity } = location.state || {};

    const [signUpStatus, setSignUpStatus] = useState('');
    const [availableSpots, setAvailableSpots] = useState(opportunity.availableSlots);

    const updateSignUpStatus = () => {
        if (availableSpots > 0){
            const updatedSpots = availableSpots - 1;
            setAvailableSpots(updatedSpots);

            const opportunityRef = doc(db, "volunteerPosting", opportunity.id);

            try{
                updateDoc(opportunityRef, {availableSlots: updatedSpots});
                setSignUpStatus('Successfully signed up!');
            } catch (error) {
                console.error("Error updating available slots:", error);
                setSignUpStatus('Failed to sign up. Please try again.');
            }
            
        } else {
            setSignUpStatus('Sorry, there are no spots available.')
        }
    }

    return (
        <div>
            {opportunity && (
                <div>
                    <h2 className='opp-title'>{opportunity.title}</h2>
                    <p className='opp-text'><b>Location:</b><br></br>
                        {opportunity.locationName}<br></br>
                        {opportunity.locationAddr}, {opportunity.city}, {opportunity.state}, {opportunity.zipcode}<br></br><br></br>
                        <b>Date:</b><br></br>{opportunity.date}<br></br><br></br>
                        <b>Time:</b><br></br>{opportunity.startTime} - {opportunity.endTime}<br></br><br></br>
                        <b>Description:</b><br></br>{opportunity.description}<br></br><br></br>
                        <b>Availability: </b>{opportunity.availableSlots} out of {opportunity.totalSpots} open spots</p>
                    
                    <button className='opp-signup-button' onClick={updateSignUpStatus} >Sign Up</button>
                    {signUpStatus && <p className='opp-signup-status'>{signUpStatus}</p>}
                </div>
            )}

        </div>
    )
};

export default OpportunitySignUp;