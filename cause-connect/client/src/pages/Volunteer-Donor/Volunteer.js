import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../../assets/css/VolunteerOpp.css';
import { db } from "../../Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";


const volunteerOpportunities = collection(db, "volunteerPosting");

const FilterPanel = ({ onApplyFilter, onResetFilters }) => {
  // States for filter criteria
  const [causes, setCauses] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');

 
   // Handle cause checkbox change
   const handleCauseChange = (event) => {
    if (event.target.checked) {
      setCauses([...causes, event.target.value]);
    } else {
      setCauses(causes.filter(cause => cause !== event.target.value));
    }
  };


  // Call onApplyFilter with the current state when the Filter button is clicked
  const handleFilterClick = () => {
    onApplyFilter({ causes, fromDate, toDate, city, zipcode });
  };

  const handleClearClick = () => {
    setCauses([]);
    setFromDate('');
    setToDate('');
    setCity('');
    setZipcode('');
    onResetFilters();
  };

  const causeTypes = ['food', 'healthcare', 'library', 'environment', 'shelters', 'education', 'religious', 'other'];

  return (
    <div className="filter-panel">
      <div>
      <h1 className="filter-title">Filter Options</h1>
      {/* Cause filter */}
        <label><b>Cause Type:</b><br></br>
        {causeTypes.map(cause => (
            <div key={cause}>
              <input
                type="checkbox"
                id={cause}
                name="cause"
                value={cause}
                checked={causes.includes(cause)}
                onChange={handleCauseChange}
              />
              <label htmlFor={cause}>{" " + cause[0].toUpperCase() + cause.substring(1)}</label>
            </div>
          ))}
        </label><br></br>
        
        {/* Date filter */}
        <label><b>Date:</b><br></br>
          <label htmlFor="from-date">From</label><br></br>
            <input
              type="date"
              id="from-date"
              value={fromDate}
              onChange={e => setFromDate(e.target.value)}
          /><br></br><br></br>

          <label htmlFor="to-date">To</label><br></br>
            <input
              type="date"
              id="to-date"
              value={toDate}
              onChange={e => setToDate(e.target.value)}
            />
        </label><br></br><br></br>

        {/* Location filter */}
        <label><b>Location:</b><br></br></label>
          <label>
            Please enter a city: <br></br>
            <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}/><br></br>
          </label><br></br>
          <label>
            Please enter a zipcode: <br></br>
              <input
                type="text"
                value={zipcode}
                onChange={e => setZipcode(e.target.value)}/>
          </label><br></br><br></br>
          
         
      </div><br></br>
      <button className="filter-button" onClick={handleFilterClick}>Filter</button>
      <button className="clear-button" onClick={handleClearClick}>Clear</button>
    </div>
  );
};

const Volunteer = () => {
  const[filteredOpportunities, setFilteredOpportunities] = useState([])

  let fetchedData = query(volunteerOpportunities);

  const fetchOpportunities = async (filters = {}) => {
    try{
      if(Object.keys(filters).length){
        if(filters.cause_type){
          fetchedData = query(fetchedData, where("cause_type", "==", filters.cause_type));
        }

        if(filters.fromDate){
          fetchedData = query(fetchedData, where("fromDate", "<=", filters.fromDate));
        }

        if(filters.toDate){
          fetchedData = query(fetchedData, where("toDate", ">=", filters.toDate));
        }

        if(filters.city){
          fetchedData = query(fetchedData, where("city", "==", filters.city));
        }

        if(filters.zipcode){
          fetchedData = query(fetchedData, where("zipcode", "==", filters.zipcode));
        }
      }

      const queryResult = await getDocs(volunteerOpportunities);
      const opportunities = queryResult.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
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
    <div >
      <h1 className="page-text">Explore volunteering opportunities below!</h1>
      <div className='page-layout'>
        <div className="card-container">
          {filteredOpportunities.map((opportunity) => (
            <div className="card" key={opportunity.id}>
              <div className="card-content">
                <div className="wrapper-heading">
                  <h2 className="card-title">{opportunity.title}</h2>
                </div>
                
                <div className="wrapper">
                  <p className="location" >{opportunity.locationName}</p>
                  <p className="city-state">{opportunity.city}, {opportunity.state}</p>
                </div>
                
                <p className="date"><b>Date: </b>{opportunity.date}</p>
                <p className="time"><b>Time: </b>{opportunity.startTime}-{opportunity.endTime}</p>
                <p>{opportunity.description}</p>
                <p className="spots">{opportunity.availableSlots} out of {opportunity.totalSpots} spots open</p>
                
              </div>
              <Link to={`opportunitySignUp/${opportunity.id}`} state={{opportunity: opportunity}} >
                <button className="signup-button">Sign up</button>
              </Link>
            </div>
          ))}
        </div>
        <div>
          <FilterPanel onApplyFilter={filterOpportunities} onResetFilters={resetFilters}/>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
