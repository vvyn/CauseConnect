import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/DonationOpp.css";

const donationOpportunities = [
  {
    id: 1,
    dona_type: "education",
    title: "Undergraduate Scholarships",
    location: "North Texas Scholarship Society",
    city_state: "Richardson, TX",
    description: "Scholarships for incoming undergraduate students.",
  },
  {
    id: 2,
    dona_type: "healthcare",
    title: "Medical Supplies for Hospitals",
    location: "Baylor White",
    city_state: "Frisco, TX",
    description:
      "All proceeds go towards new medical supplies for the hospital.",
  },
  {
    id: 3,
    dona_type: "environment",
    title: "Wildlife Potection",
    location: "Dallas Park",
    city_state: "Dallas, TX",
    description:
      "All proceeds go towards the wildlife conservation force of Dallas Park.",
  },
  {
    id: 4,
    dona_type: "library",
    title: "lib",
    location: "Richardson Library",
    city_state: "Richardson, TX",
    description: "Library funding for new books.",
  },
  {
    id: 5,
    dona_type: "disaster_relief",
    title: "Rebuilding Communities Affected by Disasters",
    location: "Richardson",
    city_state: "Richardson, TX",
    description: "Rebuilding communities affected by disasters.",
  },
  {
    id: 6,
    dona_type: "shelters",
    title: "Shelter and care for stray animals",
    location: "Richardson Animal Shelter",
    city_state: "Richardson, TX",
    description:
      "All proceeds go to animal shelter supplies for dogs, cats, bunnies.",
  },
  {
    id: 7,
    dona_type: "human_rights",
    title: "blah blah blah",
    location: "Richardson Center",
    city_state: "Richardson, TX",
    description: "Human rights!",
  },
  {
    id: 8,
    dona_type: "mental_health",
    title: "Local Counseling Services",
    location: "Somewhere",
    city_state: "Richardson, TX",
    description: "Addition of mental health counseling services.",
  },
  {
    id: 9,
    dona_type: "community",
    title: "Community Development",
    location: "Richardson Community",
    city_state: "Richardson, TX",
    description:
      "Infrastructure project #1: New school building on 15th street.",
  },
  // add other opportunities
];

const FilterPanel = ({ onApplyFilter, onResetFilters }) => {
  const [donations, setDonations] = useState([]);
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [location, setLocation] = useState(""); // Define location state
  const [distance, setDistance] = useState(""); // Define distance state

  // Handle donation checkbox change
  const handleDonationChange = (event) => {
    if (event.target.checked) {
      setDonations([...donations, event.target.value]);
    } else {
      setDonations(
        donations.filter((donation) => donation !== event.target.value)
      );
    }
  };

  // Call onApplyFilter with the current state when the Filter button is clicked
  const handleFilterClick = () => {
    onApplyFilter({ donations, city, zipcode });
  };

  const handleClearClick = () => {
    setDonations([]);
    setLocation("");
    setDistance("");
    onResetFilters();
  };

  const donaTypes = [
    "community",
    "healthcare",
    "mental_health",
    "environment",
    "shelters",
    "education",
    "disaster_relief",
    "human_rights",
    "other",
  ];

  return (
    <div className="filter-panel">
      <div>
        <h1 className="filter-title">Filter Options</h1>
        {/* Donation filter */}
        <label>
          <b>Donation Type:</b>
          <br />
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
        <br />

        {/* Location filter */}
        <label>
          <b>Location:</b>
          <br />
          <label>
            Please enter your city:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <br />
          <label>
            Please enter your zipcode:
            <input
              type="text"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="distance">Distance from your location:</label>
          <br />
          <select
            id="distance"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          >
            <option value="5">5 miles</option>
            <option value="10">10 miles</option>
            <option value="15">15 miles</option>
            <option value="20">20 miles</option>
            <option value="50">50 miles</option>
          </select>
        </label>
        <br />
        <button className="filter-button" onClick={handleFilterClick}>
          Filter
        </button>
        <button className="clear-button" onClick={handleClearClick}>
          Clear
        </button>
      </div>
    </div>
  );
};

const Donor = () => {
  const [filteredOpportunities, setFilteredOpportunities] = useState(
    donationOpportunities
  );

  const filterOpportunities = (filters) => {
    const filtered = donationOpportunities.filter((opportunity) => {
      const donationMatch =
        !filters.donations.length ||
        filters.donations.includes(opportunity.dona_type);
      const locationMatch =
        !filters.location || opportunity.city_state.includes(filters.location);

      return donationMatch && locationMatch;
    });
    setFilteredOpportunities(filtered);
  };

  const resetFilters = () => {
    setFilteredOpportunities(donationOpportunities);
  };

  return (
    <div>
      <div className="page-title">Welcome to CauseConnect!</div>
      <h1 className="page-text">Explore donation opportunities below!</h1>
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
                  <p className="city-state">{opportunity.city_state}</p>
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
