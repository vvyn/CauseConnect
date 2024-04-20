import React, { useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import '../../assets/css/VolunteerOpp.css';

const OpportunitySignUp = () => {
    const { id } = useParams();
    const location = useLocation();
    const { opportunity } = location.state || {};

    const [signUpStatus, setSignUpStatus] = useState('');
    const [availableSpots, setAvailableSpots] = useState(opportunity.total_spots);

    const updateSignUpStatus = () => {
        if (availableSpots > 0){
            setAvailableSpots(availableSpots - 1);
            setSignUpStatus('Successfully signed up!')
        } else {
            setSignUpStatus('Sorry, there are no spots available')
        }
    }

    return (
        <div>
            {opportunity && (
                <div>
                    <h2 className='opp-title'>{opportunity.title}</h2>
                    <p className='opp-text'><b>Location:</b><br></br>{opportunity.location}</p>
                    <p className='opp-text'>ADD ADDRESS FIELD HERE{opportunity.address}</p>
                    
                    <p className='opp-text'>{opportunity.city_state}</p>


                    <p className='opp-text'><b>Date:</b><br></br>{opportunity.date}</p>
                    <p className='opp-text'><b>Time:</b><br></br>{opportunity.start_time} - {opportunity.end_time}</p>
                    <p className='opp-text'><b>Description:</b><br></br>{opportunity.description}</p>

                    <p className='opp-text'><b>Availability: </b>{availableSpots} out of {opportunity.total_spots} open</p>
                    
                    <button className='opp-signup-button' onClick={updateSignUpStatus} >Sign Up</button>
                    {signUpStatus && <p className='opp-signup-status'>{signUpStatus}</p>}
                </div>
            )}

        </div>
    )
};

export default OpportunitySignUp;