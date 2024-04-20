import React, { useState } from 'react';
import '../../assets/css/VolunteerOpp.css';

const volunteerOpportunities = [
  {
    id: 1,
    cause_type: 'library',
    title: 'Shelving Books',
    date: '2/15/24', // should it be in this format: February 15, 2024
    start_time: '2pm',
    end_time: '4pm',
    location: 'Richardson Library',
    city_state: 'Richardson, TX',
    total_spots: '6',
    open_spots: '4',
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
    city_state: 'Richardson, TX',
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
    city_state: 'Dallas, TX',
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
    city_state: 'Richardson, TX',
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
    city_state: 'Richardson, TX',
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
    city_state: 'Richardson, TX',
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
    city_state: 'Richardson, TX',
    total_spots: '6',
    open_spots: '4',
    description: 'Volunteers will assist in shelving books along with our librarians.'
  },
  {
    id: 8,
    cause_type: 'library',
    title: 'lib',
    date: '2/15/24', // should it be in this format: February 15, 2024
    start_time: '2pm',
    end_time: '4pm',
    location: 'Richardson Library',
    city_state: 'Richardson, TX',
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
    city_state: 'Richardson, TX',
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
    city_state: 'Richardson, TX',
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
  // NEED TO FIGURE OUT LOCATION FILTER
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('');

 
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
    onApplyFilter({ causes, fromDate, toDate, location, distance });
  };

  const handleClearClick = () => {
    setCauses([]);
    setFromDate('');
    setToDate('');
    setLocation('');
    setDistance('');
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
          Please enter your zipcode: <input name="myInput" />
          </label><br></br><br></br>
        <label htmlFor="distance">Distance from your location:</label><br></br>
          <select id="distance" value={distance} onChange={e => setDistance(e.target.value)}>
            <option value="5">5 miles</option>
            <option value="10">10 miles</option>
            <option value="15">15 miles</option>
            <option value="20">20 miles</option>
            <option value="50">50 miles</option>
          </select>
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
      const locationMatch = !filters.location || opportunity.city_state.includes(filters.location);
      
      return causeMatch && fromDateMatch && toDateMatch && locationMatch;
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
                  <div className="circle"></div>
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
              <button className="signup-button">Sign up</button>
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
