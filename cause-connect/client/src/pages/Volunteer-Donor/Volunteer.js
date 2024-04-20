import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../../assets/css/VolunteerOpp.css';

const volunteerOpportunities = [
  {
    id: 1,
    cause_type: 'library',
    title: 'Shelving Books',
    date: 'February 15, 2024', // should it be in this format: February 15, 2024
    start_time: '2pm',
    end_time: '4pm',
    location: 'Richardson Library',
    city: 'Richardson',
    state: 'TX',
    zip: '75080',
    total_spots: '6',
    open_spots: '6',
    description: 'Volunteers will assist in shelving books along with our librarians.'
  },
  {
    id: 2,
    cause_type: 'food',
    title: 'Food Distribution',
    date: 'February 22, 2024', // should it be in this format: February 15, 2024
    start_time: '3pm',
    end_time: '6pm',
    location: 'UTD Comet Cupboard',
    city: 'Richardson',
    state: 'TX',
    zip: '75080',
    total_spots: '5',
    open_spots: '2',
    description: 'Volunteers needed to package meals and distribute them **Must be able to lift 10 lbs.'
  },
  {
    id: 3,
    cause_type: 'environment',
    title: 'Dallas Clean-Up',
    date: '3/15/24', // should it be in this format: February 15, 2024
    start_time: '1pm',
    end_time: '5pm',
    location: 'Dallas Park',
    city: 'Dallas',
    state: 'TX',
    zip: '75045',
    total_spots: '40',
    open_spots: '15',
    description: 'Help clean up the Dallas Park community with family and friends! Volunteers needed for litter pick-up.'
  },
  {
    id: 4,
    cause_type: 'library',
    title: 'lib',
    date: '2/15/24', // should it be in this format: February 15, 2024
    start_time: '2pm',
    end_time: '4pm',
    location: 'Richardson Library',
    city: 'Richardson',
    state: 'TX',
    zip: '75056',
    total_spots: '6',
    open_spots: '4',
    description: 'Volunteers will assist in shelving books along with our librarians.'
  },
  {
    id: 5,
    cause_type: 'library',
    title: 'lib',
    date: '2/15/24', // should it be in this format: February 15, 2024
    start_time: '2pm',
    end_time: '4pm',
    location: 'Richardson Library',
    city: 'Dallas',
    state: 'TX',
    zip: '75078',
    total_spots: '6',
    open_spots: '4',
    description: 'Volunteers will assist in shelving books along with our librarians.'
  },
  {
    id: 6,
    cause_type: 'education',
    title: 'edu',
    date: '2/15/24', // should it be in this format: February 15, 2024
    start_time: '2pm',
    end_time: '4pm',
    location: 'Richardson Library',
    city: 'Frisco',
    state: 'TX',
    zip: '75025',
    total_spots: '6',
    open_spots: '4',
    description: 'Volunteers will assist in shelving books along with our librarians.'
  },
  {
    id: 7,
    cause_type: 'other',
    title: 'other',
    date: '2/15/24', // should it be in this format: February 15, 2024
    start_time: '2pm',
    end_time: '4pm',
    location: 'Richardson Library',
    city: 'Allen',
    state: 'TX',
    zip: '75080',
    total_spots: '6',
    open_spots: '4',
    description: 'Volunteers will assist in shelving books along with our librarians.'
  },
  {
    id: 8,
    cause_type: 'library',
    title: 'lib plano',
    date: '2/15/24', // should it be in this format: February 15, 2024
    start_time: '2pm',
    end_time: '4pm',
    location: 'Richardson Library',
    city: 'Plano',
    state: 'TX',
    zip: '75088',
    total_spots: '6',
    open_spots: '4',
    description: 'Volunteers will assist in shelving books along with our librarians.'
  },
  {
    id: 9,
    cause_type: 'healthcare',
    title: 'health',
    date: '2/15/24', // should it be in this format: February 15, 2024
    start_time: '2pm',
    end_time: '4pm',
    location: 'Richardson Library',
    city: 'Dallas',
    state: 'TX',
    zip: '75080',
    total_spots: '6',
    open_spots: '4',
    description: 'Volunteers will assist in shelving books along with our librarians.'
  },
  {
    id: 10,
    cause_type: 'shelters',
    title: 'bob',
    date: '2/15/24', // should it be in this format: February 15, 2024
    start_time: '2pm',
    end_time: '4pm',
    location: 'Richardson Library',
    city: 'Richardson',
    state: 'TX',
    zip: '75088',
    total_spots: '6',
    open_spots: '4',
    description: 'Volunteers will assist in shelving books along with our librarians.'
  },
  // add other opportunities
];

const FilterPanel = ({ onApplyFilter, onResetFilters }) => {
  // State for filter criteria
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
            Please enter a city: 
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}/>
          </label><br></br>
          <label>
            Please enter a zipcode: 
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
  const[filteredOpportunities, setFilteredOpportunities] = useState(volunteerOpportunities)

  const filterOpportunities = (filters) => {
    const filtered = volunteerOpportunities.filter(opportunity => {
      const causeMatch = !filters.causes.length || filters.causes.includes(opportunity.cause_type);
      const fromDateMatch = !filters.fromDate || new Date(opportunity.date) >= new Date(filters.fromDate);
      const toDateMatch = !filters.toDate || new Date(opportunity.date) <= new Date(filters.toDate);
      const cityMatch = !filters.city || opportunity.city.toLowerCase().includes(filters.city.toLowerCase());
      const zipcodeMatch = !filters.zipcode || opportunity.zip.includes(filters.zipcode);
      
      return causeMatch && fromDateMatch && toDateMatch && cityMatch && zipcodeMatch;
    });
    setFilteredOpportunities(filtered);
  };

  const resetFilters = () => {
    setFilteredOpportunities(volunteerOpportunities);
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
                  <h2>{opportunity.title}</h2>
                </div>
                
                <div className="wrapper">
                  <p className="location" >{opportunity.location}</p>
                  <p className="city-state">{opportunity.city_state}</p>
                </div>
                
                <p className="date"><b>Date: </b>{opportunity.date}</p>
                <p className="time"><b>Time: </b>{opportunity.start_time}-{opportunity.end_time}</p>
                <p>{opportunity.description}</p>
                <p className="spots">{opportunity.open_spots} out of {opportunity.total_spots} spots open</p>
                
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
