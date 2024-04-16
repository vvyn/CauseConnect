import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

const VolunteerPostingCard = ({ date, time, spots, totalSpots, onSelect }) => (
  <Card>
    <CardContent>
    <Typography variant="h5" style={{ color: 'orange' }}>
        Shelving Books
      </Typography>
      <Typography variant="subtitle1">Richardson Library</Typography>
      <Typography variant="subtitle1">Richardson, TX</Typography>
      <Typography variant="body1">Date: {date}</Typography>
      <Typography variant="body1">Time: {time}</Typography>
      <Typography variant="body1">
        Volunteers will assist in shelving books along with our librarians.
      </Typography>
      <Typography variant="body1">
        {spots} of {totalSpots} spots open
      </Typography>
      <Button variant="contained" style={{ backgroundColor: 'orange', color: 'white' }} onClick={onSelect}>
        View/Edit
      </Button>
    </CardContent>
  </Card>
);

const VolunteerPostings = () => {
  const [selectedPosting, setSelectedPosting] = useState(null);
  const postings = [
    { date: '2/15/24', time: '2pm-4pm', spots: 4, totalSpots: 6 },
    { date: '2/15/24', time: '2pm-4pm', spots: 4, totalSpots: 6 },
    { date: '2/15/24', time: '2pm-4pm', spots: 4, totalSpots: 6 },
    { date: '2/15/24', time: '2pm-4pm', spots: 4, totalSpots: 6 },
    { date: '2/15/24', time: '2pm-4pm', spots: 4, totalSpots: 6 },
    { date: '2/15/24', time: '2pm-4pm', spots: 4, totalSpots: 6 },
  ];

  const handleSelect = posting => {
    setSelectedPosting(posting);
  };

  return (
    <div>
    {selectedPosting ? (
        <div>
          <Typography variant="h4" style={{ color: 'orange' }}>Volunteer Activity Details</Typography>
          <Typography variant="subtitle1"><strong>Location:</strong> Richardson Library, Richardson, TX</Typography>
          <Typography variant="body1"><strong>Date:</strong> {selectedPosting.date}</Typography>
          <Typography variant="body1"><strong>Time:</strong> {selectedPosting.time}</Typography>
          <Typography variant="body1">
            <strong>Description:</strong> Volunteers will assist in shelving books along with our librarians.
          </Typography>
          <Typography variant="body1">
            <strong>Availability:</strong> {selectedPosting.spots} of {selectedPosting.totalSpots}
          </Typography>
          <Button onClick={() => setSelectedPosting(null)} style={{ marginTop: 20 }}>
            Go Back
          </Button>
        </div>
      ) : (
        <>
        <div>
        <Typography variant="h4" style={{ color: 'orange' }}>Your Postings</Typography>
        <Button variant="contained" style={{ backgroundColor: 'orange', color: 'white' }}>+ Add</Button>
        <Button variant="contained" style={{ backgroundColor: 'orange', color: 'white' }}>Filter</Button>
      </div>
        <Grid container spacing={4}>
          {postings.map((posting, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <VolunteerPostingCard {...posting} onSelect={() => handleSelect(posting)} />
            </Grid>
          ))}
        </Grid>
        </>
      )}
    </div>
  );
};

export default VolunteerPostings;