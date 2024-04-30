import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { db } from "../../Firebase";
import { addDoc, collection } from "firebase/firestore";


const PageLayout = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr min-content',
  gap: '10px',
  minHeight: '100vh',
  paddingRight: '20px',
});

const PageTitle = styled(Typography)({
  fontSize: '3.0rem',
  textAlign: 'left',
  color: '#F49630',
  paddingLeft: '23px'
});

const CardContainer = styled(Grid)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  gap: '20px',
  padding: '20px',
  alignContent: 'flex-start',
  minHeight: '0',
  height: '100%',
});

const CustomCard = styled(Card)({
  width: '325px',
  padding: '20px',
  background: '#FFF6E9',
  border: '1px solid #C19D75',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
});

const CustomButton = styled(Button)({
  width: '100%',
  padding: '10px',
  backgroundColor: 'orange',
  border: 'none',
  borderRadius: '10px',
  color: 'white',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#FB8C00',
  },
});

const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold', // Make the font bold
  backgroundColor: '#FEEFC3', // A light orange background color
  color: 'black', // Text color
});

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: '#FFF7E6', // Alternating row colors
  },
  // Hover styles can be added here if desired
});

const ViewButton = styled(Button)({
  backgroundColor: '#FFA726', // Orange background color for the button
  color: 'white', // White text color for the button
  margin: '5px', // Some margin around the button
  '&:hover': {
    backgroundColor: '#FB8C00', // Darker orange on hover
  },
});

const RemoveButton = styled(Button)({
  backgroundColor: '#FF4C4C', // Red background color for the remove button
  color: 'white', // White text color for the button
  margin: '5px', // Some margin around the button
  marginLeft: '50px',
  '&:hover': {
    backgroundColor: '#E00000', // Darker red on hover
  },
});

const VolunteerPostingCard = ({ date, time, spots, totalSpots, onViewEdit }) => (
  <CustomCard>
    <CardContent>
      <Typography variant="h5" component="div" style={{ color: '#ffa600'}}>Shelving Books</Typography>
      <Typography variant="subtitle1" component="div" style={{ color: '#ffa600' }}>Richardson Library</Typography>
      <Typography variant="subtitle1" component="div" style={{ color: '#ffa600' }}>Richardson, TX</Typography>
      <Typography variant="body1" style={{ marginTop: '20px', fontWeight: 'bold' }}>Date: {new Date(date).toLocaleDateString()}</Typography>
      <Typography variant="body2" style={{ marginTop: '20px' }}>
        Volunteers will assist in shelving books along with our librarians.
      </Typography>
      <Typography variant="body1" style={{ marginTop: '20px', color: '#ffa600'}}>
        {spots} of {totalSpots} spots open
      </Typography>
      <CustomButton onClick={onViewEdit}>View/Edit</CustomButton>
    </CardContent>
  </CustomCard>
);

const SignUpTable = ({ users, onRemove }) => (
  <TableContainer component={Paper} style={{ width: '80vw' }}>
    <Table aria-label="sign-ups table">
      <TableHead>
        <TableRow>
          <StyledTableCell>User</StyledTableCell>
          <StyledTableCell style={{ width: '30%' }}>Date/Time</StyledTableCell>
          <StyledTableCell style={{ width: '30%' }}>Profile</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user, index) => (
          <StyledTableRow key={user.id}>
            <TableCell component="th" scope="row">
              {user.name}
              <div>ID: {user.id}</div>
            </TableCell>
            <TableCell>
              {new Date(user.date).toLocaleDateString()} {new Date(user.date).toLocaleTimeString()}
            </TableCell>
            <TableCell>
              <ViewButton>View</ViewButton>
              <RemoveButton onClick={() => onRemove(index)}>X</RemoveButton>
            </TableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const VolunteerPostings = () => {
  const [selectedPosting, setSelectedPosting] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [users, setUsers] = useState([
    { name: 'John Doe', date: '2024-04-12', time: '14:00' },
    { name: 'Jane Doe', date: '2024-04-12', time: '14:00' },
  ]);
  const postings = [
    { date: '2/15/24', time: '2 pm', endTime: '4 pm', spots: 4, totalSpots: 6 },
    { date: '2/15/24', time: '2 pm', endTime: '4 pm', spots: 4, totalSpots: 6 },
    { date: '2/15/24', time: '2 pm', endTime: '4 pm', spots: 4, totalSpots: 6 },
    { date: '2/15/24', time: '2 pm', endTime: '4 pm', spots: 4, totalSpots: 6 },
    { date: '2/15/24', time: '2 pm', endTime: '4 pm', spots: 4, totalSpots: 6 },
    { date: '2/15/24', time: '2 pm', endTime: '4 pm', spots: 4, totalSpots: 6 },
  ];

  const handleViewEdit = posting => {
    setSelectedPosting(posting);
    setEditMode(false);
  };

  const handleAddNew = () => {
    setSelectedPosting({
      location: '', 
      address: '', 
      city: '', 
      state: '', 
      zipCode: '', 
      date: '', 
      startTime: '', 
      endTime: '', 
      description: '', 
      spots: '', 
      totalSpots: '' 
    });
    setEditMode(true);
  };  
  
  const handleEdit = () => {
    if (!selectedPosting) {
      handleAddNew(); // Call handleAddNew if there's no selectedPosting, implying adding a new posting
    } else {
      setEditMode(true); // Otherwise, go to edit mode directly
    }
  };  

  const handleCancel = () => {
    setSelectedPosting(null);
    setEditMode(false);
  };

  const handleChange = (e, field) => {
    setSelectedPosting({...selectedPosting, [field]: e.target.value});
  };

  const handleSave = async () => {
    try{
      const dbRef = collection(db, "volunteerPosting");

      const docRef = await addDoc(dbRef, {
        locationAddr: selectedPosting.address,
        locationName: selectedPosting.location,
        city: selectedPosting.city,
        state: selectedPosting.state,
        zipcode: selectedPosting.zipCode,
        date: selectedPosting.date,
        description: selectedPosting.description,
        startTime: selectedPosting.time,
        endTime: selectedPosting.endTime,
        totalSpots: selectedPosting.spots, 
        availableSlots: selectedPosting.spots,
      });

      console.log("Document written with ID: ", docRef.id);
      setEditMode(false);
      setSelectedPosting(null);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
    alert('Successfully created volunteering opportunity!'); // Placeholder
    
  };

  const handleRemoveUser = (index) => {
    setUsers(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <PageLayout>
    <div>
      {editMode ? (
        <div style ={{ paddingLeft: '23px' }}>
          <PageTitle style={{ paddingLeft: '0px' }}>{selectedPosting && selectedPosting.date ? "Edit Volunteer Activity" : "Add Volunteer Activity"}</PageTitle>
          <form>
            <TextField label="Location" value={selectedPosting ? selectedPosting.location : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'location')} />
            <TextField label="Address" value={selectedPosting ? selectedPosting.address : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'address')} />
            <TextField label="City" value={selectedPosting ? selectedPosting.city.toLowerCase() : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'city')} />
            <TextField label="State Initials" value={selectedPosting ? selectedPosting.state : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'state')} />
            <TextField label="Zip Code" value={selectedPosting ? selectedPosting.zipCode : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'zipCode')} />
            <TextField label="Date" type="date" value={selectedPosting ? selectedPosting.date : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'date')} InputLabelProps={{ shrink: true,}}/>
            <TextField label="Start Time" type="time" value={selectedPosting ? selectedPosting.time : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'time')} InputLabelProps={{ shrink: true,}}/>
            <TextField label="End Time" type="time" value={selectedPosting ? selectedPosting.endTime : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'endTime')} InputLabelProps={{ shrink: true,}}/>
            <TextField label="Description" value={selectedPosting ? selectedPosting.description : ''} style={{ width: '500px', display: 'block' }} margin="normal" multiline rows={4} onChange={e => handleChange(e, 'description')} />
            <TextField label="# of Volunteers Required" type="number" value={selectedPosting ? selectedPosting.spots : ''} style={{ width: '700px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'spots')} />
            <Button variant="contained" style={{ marginRight: '20px', marginTop: '10px', marginBottom: '10px' }} color="primary" onClick={handleSave}>Save</Button>
            <Button variant="outlined" style={{ marginTop: '10px', marginBottom: '10px' }} color="secondary" onClick={handleCancel}>Cancel</Button>
          </form>
        </div>
      ) : selectedPosting ? (
        <div style ={{ paddingLeft: '23px' }}>
          <PageTitle style={{ paddingLeft: '0px' }}>Volunteer Activity Details</PageTitle>
          <Typography variant="subtitle1"><strong>Location:</strong> {selectedPosting.location}</Typography>
          <Typography variant="body1"><strong>Address:</strong> {`${selectedPosting.address ? selectedPosting.address + ', ' : ''}${selectedPosting.city ? selectedPosting.city + ', ' : ''}${selectedPosting.state ? selectedPosting.state + ', ' : ''}${selectedPosting.zipCode ? selectedPosting.zipCode : ''}`}</Typography>
          <Typography variant="body1"><strong>Date:</strong> {selectedPosting.date}</Typography>
          <Typography variant="body1"><strong>Time:</strong> {selectedPosting.time} - {selectedPosting.endTime}</Typography>
          <Typography variant="body1"><strong>Description:</strong> {selectedPosting.description}</Typography>
          <Typography variant="body1"><strong>Spots Open:</strong> {selectedPosting.spots} of {selectedPosting.totalSpots}</Typography>
          <Button variant="contained" style={{ backgroundColor: 'orange', color: 'white', marginTop: '20px', marginBottom: '20px' }} onClick={handleEdit}>
            Edit Info
          </Button>
          <SignUpTable users={users} onRemove={handleRemoveUser} />
          <Button variant="outlined" style={{ marginTop: '20px' }} onClick={() => setSelectedPosting(null)}>
            Go Back
          </Button>
        </div>
        ) : (
          <>
          <div>
            <PageTitle>Your Postings</PageTitle>
            <Button variant="contained" style={{ backgroundColor: 'orange', color: 'white', marginLeft: '23px' }} onClick={handleAddNew}>+ Add</Button>
          </div>
          <CardContainer>
            {postings.map((posting, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <VolunteerPostingCard {...posting} onViewEdit={() => handleViewEdit(posting)} />
              </Grid>
            ))}
          </CardContainer>
          </>
        )}
      </div>
      </PageLayout>
    );
  };

  export default VolunteerPostings;