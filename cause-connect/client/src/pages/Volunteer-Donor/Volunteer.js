import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/VolunteerOpp.css";
import { db, auth } from "../../Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const volunteerOpportunities = collection(db, "volunteerPosting");

const FilterPanel = ({ onApplyFilter, onResetFilters }) => {
  // States for filter criteria
  const [causes, setCauses] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");

  // Handle cause checkbox change
  const handleCauseChange = (event) => {
    if (event.target.checked) {
      setCauses([...causes, event.target.value]);
    } else {
      setCauses(causes.filter((cause) => cause !== event.target.value));
    }
  };

  // Call onApplyFilter with the current state when the Filter button is clicked
  const handleFilterClick = () => {
    onApplyFilter({ causes, fromDate, toDate, city, zipcode });
  };

  const handleClearClick = () => {
    setCauses([]);
    setFromDate("");
    setToDate("");
    setCity("");
    setZipcode("");
    onResetFilters();
  };

  const causeTypes = [
    "food",
    "healthcare",
    "environment",
    "humanitarian aid",
    "animals",
    "education",
    "religious",
    "library",
    "youth",
    "other",
  ];

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
    <div className="vol-filter-panel">
      <div>
        <h1 className="vol-filter-title">Filter Options</h1>
        {/* Cause filter */}
        <label>
          <b>Cause Type:</b>
          <br></br>
          {causeTypes.map((cause) => (
            <div key={cause}>
              <input
                type="checkbox"
                id={cause}
                name="cause"
                value={cause}
                checked={causes.includes(cause)}
                onChange={handleCauseChange}
              />
              <label htmlFor={cause}>
                {" " + cause[0].toUpperCase() + cause.substring(1)}
              </label>
            </div>
          ))}
        </label>
        <br></br>

        {/* Date filter */}
        <label>
          <b>Date:</b>
          <br></br>
          <label htmlFor="from-date">From</label>
          <br></br>
          <input
            type="date"
            id="from-date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <br></br>
          <br></br>

          <label htmlFor="to-date">To</label>
          <br></br>
          <input
            type="date"
            id="to-date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </label>
        <br></br>
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
      <button className="vol-filter-button" onClick={handleFilterClick}>
        Filter
      </button>
      <button className="vol-clear-button" onClick={handleClearClick}>
        Clear
      </button>
    </div>
  );
};

function capitalizeWords(input) {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

const Volunteer = () => {
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);

  const fetchOpportunities = async (filters = {}) => {
    try {
      let fetchedData = volunteerOpportunities;

      if (filters.causes && filters.causes.length > 0) {
        fetchedData = query(
          fetchedData,
          where("causeType", "in", filters.causes)
        );
      }

      if (filters.toDate && filters.fromDate) {
        fetchedData = query(
          fetchedData,
          where("date", "<=", filters.toDate),
          where("date", ">=", filters.fromDate)
        );
      } else if (filters.toDate) {
        fetchedData = query(fetchedData, where("date", "<=", filters.toDate));
      } else if (filters.fromDate) {
        fetchedData = query(fetchedData, where("date", ">=", filters.fromDate));
      }

      if (filters.city) {
        fetchedData = query(fetchedData, where("city", "==", filters.city));
      }

      if (filters.zipcode) {
        fetchedData = query(
          fetchedData,
          where("zipcode", "==", filters.zipcode)
        );
      }

      const queryResult = await getDocs(fetchedData);
      const opportunities = queryResult.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFilteredOpportunities(opportunities);
    } catch (error) {
      console.error("Error in retrieving volunteer opportunities: ", error);
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
    <div className="vol-page">
      <div className="vol-page-title">Welcome to CauseConnect!</div>
      <h1 className="vol-page-text">Explore volunteer opportunities!</h1>
      <div className="vol-page-layout">
        <div className="vol-card-container">
          {filteredOpportunities.map((opportunity) => (
            <div className="vol-card" key={opportunity.id}>
              <div className="vol-card-content">
                <div className="vol-wrapper-heading">
                  <h2 className="vol-card-title">{opportunity.title}</h2>
                </div>

                <div className="vol-wrapper">
                  <p className="vol-location">{opportunity.locationName}</p>
                  <p className="vol-city-state">
                    {capitalizeWords(opportunity.city)}, {opportunity.state}
                  </p>
                </div>

                <p className="vol-date">
                  <b>Date: </b>
                  {opportunity.date}
                </p>
                <p className="vol-time">
                  <b>Time: </b>
                  {opportunity.startTime}-{opportunity.endTime}
                </p>
                <p>{opportunity.description}</p>
                <p className="vol-spots">
                  {opportunity.availableSlots} out of {opportunity.totalSpots}{" "}spots open
                </p>
              </div>
              <Link to={`opportunitySignUp/${opportunity.id}`} state={{ opportunity: opportunity }}>
                <button className="vol-signup-button">Sign up</button>
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

export default Volunteer;
