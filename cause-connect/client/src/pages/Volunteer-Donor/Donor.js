import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/DonationOpp.css";
import { db } from "../../Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const donationOpportunities = collection(db, "donationPosting");

const FilterPanel = ({ onApplyFilter, onResetFilters }) => {
  // State for filter criteria
  const [donations, setDonations] = useState([]);
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");

  // Handle donation checkbox change
  const handleDonationChange = (event) => {
    if (event.target.checked) {
      setDonations([...donations, event.target.value]);
    } else {
      setDonations(
        donations.filter((donation) => donation !== event.target.value));
    }
  };

  // Call onApplyFilter with the current state when the Filter button is clicked
  const handleFilterClick = () => {
    onApplyFilter({ donations, city, zipcode });
  };

  const handleClearClick = () => {
    setDonations([]);
    setCity("");
    setZipcode("");
    onResetFilters();
  };

  const donaTypes = ['food', 'healthcare', 'environment', 'humanitarian aid', 'animals', 'education', 'religious', 'library', 'youth', 'other'];


  return (
    <div className="filter-panel">
      <div>
        <h1 className="filter-title">Filter Options</h1>
        {/* Donation filter */}
        <label>
          <b>Donation Type:</b>
          <br></br>
          {donaTypes.map((donation) => (
            <div key={donation}>
              <input
                type="checkbox"
                id={donation}
                name="donation"
                value={donation}
                checked={donations.includes(donation)}
                onChange={handleDonationChange}
              />
              <label htmlFor={donation}>
                {" " + donation[0].toUpperCase() + donation.substring(1)}
              </label>
            </div>
          ))}
        </label>
        <br></br>

        {/* Location filter */}
        <label>
          <b>Location:</b>
          <br></br>
        </label>
        <label>
          Please enter a city: <br></br>
          <input
            type="text"
            value={city.toLowerCase()}
            onChange={(e) => setCity(e.target.value)}
          />
          <br></br>
        </label>
        <br></br>
        <label>
          Please enter a zipcode: <br></br>
          <input
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
        </label>
        <br></br>
        <br></br>
      </div>
      <br></br>
      <button className="filter-button" onClick={handleFilterClick}>
        Filter
      </button>
      <button className="clear-button" onClick={handleClearClick}>
        Clear
      </button>
    </div>
  );
};

const Donor = () => {
  const[filteredOpportunities, setFilteredOpportunities] = useState([])

  const fetchOpportunities = async (filters = {}) => {
    try{
      let fetchedData = donationOpportunities;

        if(filters.donations && filters.donations.length > 0){
          fetchedData = query(fetchedData, where("donaType", "in", filters.donations));
        }

        if(filters.city){
          fetchedData = query(fetchedData, where("city", "==", filters.city));
        }

        if(filters.zipcode){
          fetchedData = query(fetchedData, where("zipcode", "==", filters.zipcode));
        }

      const queryResult = await getDocs(fetchedData);
      const opportunities = queryResult.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setFilteredOpportunities(opportunities);
    } catch (error) {
      console.error("Error in retrieving donation opportunities: ", error);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const filterOpportunities = (filters) => {
    fetchOpportunities(filters);
  };

  const resetFilters = () => {
    fetchOpportunities();
  };


  return (
    <div className="don-page">
      <div className="page-title">Welcome to CauseConnect!</div>
      <h1 className="page-text">Explore donation opportunities!</h1>
      <div className="page-layout">
        <div className="card-container">
          {filteredOpportunities.map((opportunity) => (
            <div className="card" key={opportunity.id}>
              <div className="card-content">
                <div className="wrapper-heading">
                  <h2>{opportunity.title}</h2>
                </div>

                <div className="wrapper">
                  <p className="location">{opportunity.location}</p>
                  <p className="city-state">{opportunity.city[0].toUpperCase() + opportunity.city.substring(1)}, {opportunity.state}</p>
                </div>
                
                <p>{opportunity.description}</p>
              </div>
              <Link
                to={`donationDetails/${opportunity.id}`}
                state={{ opportunity: opportunity }}
              >
                <button className="donate-button">Donate here</button>
              </Link>
            </div>
          ))}
        </div>
        <div>
          <FilterPanel
            onApplyFilter={filterOpportunities}
            onResetFilters={resetFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default Donor;
