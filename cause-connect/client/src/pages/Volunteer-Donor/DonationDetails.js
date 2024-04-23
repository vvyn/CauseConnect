import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../assets/css/DonationOpp.css';

const DonationDetails = () => {
  const location = useLocation();
  const { opportunity } = location.state || {};

  return (
    <div>
      {opportunity && (
        <div>
          <h2 className='donation-title'>{opportunity.title}</h2>
          <p className='donation-text'><b>Location:</b><br />{opportunity.location}</p>
          <p className='donation-text'><b>Description:</b><br />{opportunity.description}</p>

          <text>poop</text>
          {/* Add other fields as needed */}
        </div>
      )}
    </div>
  );
};

export default DonationDetails;