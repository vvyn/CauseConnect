import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { db } from "../../Firebase";
import { collection, onSnapshot, addDoc, doc, updateDoc, getDoc, arrayRemove } from "firebase/firestore";

const causeTypes = [
  'Animals',
  'Education',
  'Environment',
  'Food',
  'Healthcare',
  'Humanitarian aid',
  'Library',
  'Religious',
  'Youth',
  'Other',
];

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
  fontWeight: 'bold',
  backgroundColor: '#FEEFC3',
  color: 'black',
});

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: '#FFF7E6',
  },
});

const ViewButton = styled(Button)({
  backgroundColor: '#FFA726',
  color: 'white',
  margin: '5px',
  '&:hover': {
    backgroundColor: '#FB8C00',
  },
});

const RemoveButton = styled(Button)({
  backgroundColor: '#FF4C4C',
  color: 'white',
  margin: '5px',
  marginLeft: '25px',
  '&:hover': {
    backgroundColor: '#E00000',
  },
});

function capitalizeWords(input) {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

const VolunteerPostingCard = ({ title, location, city, state, date, time, endTime, description, spots, totalSpots, onViewEdit }) => (
  <CustomCard>
    <CardContent>
      <Typography variant="h5" component="div" style={{ color: '#ffa600'}}>{title}</Typography>
      <Typography variant="subtitle1" component="div" style={{ color: '#ffa600' }}>{location}</Typography>
      <Typography variant="subtitle1" component="div" style={{ color: '#ffa600' }}>{capitalizeWords(city)}, {state.toUpperCase()}</Typography>
      <Typography variant="body1" style={{ marginTop: '20px' }}><span style={{ fontWeight: 'bold' }}>Date:</span> {date}</Typography>
      <Typography variant="body1" style={{ marginTop: '20px' }}><span style={{ fontWeight: 'bold' }}>Time:</span> {time} - {endTime}</Typography>
      <Typography variant="body2" style={{ marginTop: '20px' }}>{description}</Typography>
      <Typography variant="body1" style={{ marginTop: '20px', color: '#ffa600'}}>{spots} of {totalSpots} spots open</Typography>
      <CustomButton onClick={onViewEdit}>View/Edit</CustomButton>
    </CardContent>
  </CustomCard>
);

const SignUpTable = ({ postingId, users, onRemove }) => (
  <TableContainer component={Paper} style={{ width: '80vw' }}>
    <Table aria-label="sign-ups table">
      <TableHead>
        <TableRow>
          <StyledTableCell>User</StyledTableCell>
          <StyledTableCell style={{ width: '30%' }}>Email</StyledTableCell>
          <StyledTableCell style={{ width: '30%' }}>Remove Volunteer</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user, index) => (
          <StyledTableRow key={user.id}>
            <TableCell component="th" scope="row">
              {user.name}
            </TableCell>
            <TableCell>
              {user.email}
            </TableCell>
            <TableCell>
              <RemoveButton onClick={() => onRemove(postingId, user.id, index)}>X</RemoveButton>
            </TableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const VolunteerPostings = () => {
  const [postings, setPostings] = useState([]);
  const [selectedPosting, setSelectedPosting] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserDetails = async (userIds) => {
    const userPromises = userIds.map(async (userId) => {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        return { id: userId, name: `${userData.firstName} ${userData.lastName}`, email: userData.email };
      } else {
        console.log("No such user!");
        return null;
      }
    });
    return Promise.all(userPromises);
  };

  useEffect(() => {
    const fetchUsersForSelectedPosting = async () => {
      if (selectedPosting?.signups) {
        setIsLoading(true);
        const userDetails = await fetchUserDetails(selectedPosting.signups);
        setUsers(userDetails.filter(user => user !== null));
        setIsLoading(false);
      } else {
        setUsers([]);
      }
    };
  
    fetchUsersForSelectedPosting();
  }, [selectedPosting]);
  
  
  const isValidForm = () => {
    return (
      selectedPosting.title && selectedPosting.causeType &&
      selectedPosting.location && selectedPosting.address &&
      selectedPosting.city && selectedPosting.state &&
      selectedPosting.zipCode && selectedPosting.date &&
      selectedPosting.time && selectedPosting.endTime &&
      selectedPosting.hours && selectedPosting.description 
      && selectedPosting.totalSpots
    );
  };

  const handleViewEdit = posting => {
    setSelectedPosting(posting);
    setEditMode(false);
  };

  const handleAddNew = () => {
    setSelectedPosting({
      title: '',
      causeType: '',
      location: '', 
      address: '', 
      city: '', 
      state: '', 
      zipCode: '', 
      date: '', 
      startTime: '', 
      endTime: '',
      hours: '', 
      description: '', 
      spots: '', 
      totalSpots: '' 
    });
    setEditMode(true);
  };  
  
  const handleEdit = () => {
    if (!selectedPosting) {
      handleAddNew();
    } else {
      setEditMode(true);
    }
  };  

  const handleCancel = () => {
    setSelectedPosting(null);
    setEditMode(false);
  };

  const handleChange = (e, field) => {
    setSelectedPosting({...selectedPosting, [field]: e.target.value});
  };

  function formatTime24to12(time24) {
    const [hour24, minute] = time24.split(':');
    const hour12 = hour24 % 12 || 12;
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minute} ${ampm}`;
  } 

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "volunteerPosting"), (snapshot) => {
      const postData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        address: doc.data().locationAddr,
        date: doc.data().date,
        time: doc.data().startTime,
        endTime: doc.data().endTime,
        spots: doc.data().availableSlots,
        totalSpots: doc.data().totalSpots,
        location: doc.data().locationName,
        zipCode: doc.data().zipcode
      }));
      setPostings(postData);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    try{
      const dbRef = collection(db, "volunteerPosting");
      let docRef;
      const formattedStartTime = formatTime24to12(selectedPosting.time);
      const formattedEndTime = formatTime24to12(selectedPosting.endTime);
      
      if (selectedPosting && selectedPosting.id) {
        docRef =doc(db, "volunteerPosting", selectedPosting.id);
        await updateDoc(docRef, {
          title: selectedPosting.title,
          causeType: selectedPosting.causeType,
          locationAddr: selectedPosting.address,
          locationName: selectedPosting.location,
          city: capitalizeWords(selectedPosting.city),
          state: selectedPosting.state,
          zipcode: selectedPosting.zipCode,
          date: selectedPosting.date,
          hours: selectedPosting.hours,
          description: selectedPosting.description,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          totalSpots: selectedPosting.totalSpots,
          availableSlots: selectedPosting.spots,
        });
      } else {
        docRef = await addDoc(dbRef, {
          title: selectedPosting.title,
          causeType: selectedPosting.causeType,
          locationAddr: selectedPosting.address,
          locationName: selectedPosting.location,
          city: capitalizeWords(selectedPosting.city),
          state: selectedPosting.state,
          zipcode: selectedPosting.zipCode,
          date: selectedPosting.date,
          hours: selectedPosting.hours,
          description: selectedPosting.description,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          totalSpots: selectedPosting.totalSpots, 
          availableSlots: selectedPosting.totalSpots,
          signups: []
        });
      }

      console.log("Document written with ID: ", docRef.id);
      setEditMode(false);
      setSelectedPosting(null);
    } catch (e) {
      console.error("Error adding/updating document: ", e);
    }
    alert('Volunteering opportunity saved!');

    
  };

  const handleRemoveUser = async (postingId, userId, index) => {

    const postingRef = doc(db, "volunteerPosting", postingId);

    await updateDoc(postingRef, {
      signups: arrayRemove(userId)
    });
  
    const userRef = doc(db, "users", userId);
  
    await updateDoc(userRef, {
      volunteerSummary: arrayRemove(postingId)
    });
  
    setUsers(prev => prev.filter((_, i) => i !== index));
  
    console.log("User removed from signups and posting removed from volunteerSummary: ", userId);
  };
  
  return (
    <PageLayout>
    <div>
      {editMode ? (
        <div style ={{ paddingLeft: '23px' }}>
          <PageTitle style={{ paddingLeft: '0px' }}>{selectedPosting && selectedPosting.date ? "Edit Volunteer Activity" : "Add Volunteer Activity"}</PageTitle>
          <form>
            <TextField required label="Title" value={selectedPosting ? selectedPosting.title : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'title')} />
            <FormControl required style={{ width: '210px'}} margin="normal">
              <InputLabel id="causeType">Cause Type</InputLabel>
              <Select
                labelId="causeType"
                value={selectedPosting ? selectedPosting.causeType : ''}
                label="causeType"
                onChange={e => handleChange(e, 'causeType')}
              >
                {causeTypes.map((causeType, index) => (
                  <MenuItem key={index} value={causeType}>{causeType}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField required label="Location" value={selectedPosting ? selectedPosting.location : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'location')} />
            <TextField required label="Address" value={selectedPosting ? selectedPosting.address : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'address')} />
            <TextField required label="City" value={selectedPosting ? capitalizeWords(selectedPosting.city) : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'city')} />
            <TextField required label="State (Abbreviation only)" value={selectedPosting ? selectedPosting.state.toUpperCase() : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'state')} />
            <TextField required label="Zip Code" value={selectedPosting ? selectedPosting.zipCode : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'zipCode')} />
            <TextField required label="Date" type="date" value={selectedPosting ? selectedPosting.date : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'date')} InputLabelProps={{ shrink: true,}}/>
            <TextField required label="Start Time" type="time" value={selectedPosting ? selectedPosting.time : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'time')} InputLabelProps={{ shrink: true,}}/>
            <TextField required label="End Time" type="time" value={selectedPosting ? selectedPosting.endTime : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'endTime')} InputLabelProps={{ shrink: true,}}/>
            <TextField required label="Hour(s)" value={selectedPosting ? selectedPosting.hours : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'hours')} />
            <TextField required label="Description" value={selectedPosting ? selectedPosting.description : ''} style={{ width: '500px', display: 'block' }} margin="normal" multiline rows={4} onChange={e => handleChange(e, 'description')} />
            <TextField required label="# of Volunteers Required" type="number" value={selectedPosting ? selectedPosting.totalSpots : ''} style={{ width: '700px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'totalSpots')} />
            <Button variant="contained" style={{ marginRight: '20px', marginTop: '10px', marginBottom: '10px' }} color="primary" onClick={handleSave} disabled={!isValidForm()}>Save</Button>
            <Button variant="outlined" style={{ marginTop: '10px', marginBottom: '10px' }} color="secondary" onClick={handleCancel}>Cancel</Button>
          </form>
        </div>
      ) : selectedPosting ? (
        <div style ={{ paddingLeft: '23px' }}>
          <PageTitle style={{ paddingLeft: '0px' }}>Volunteer Activity Details</PageTitle>
          <Typography variant="h5"><strong>{selectedPosting.title}</strong></Typography>
          <Typography variant="subtitle1"><strong>Location:</strong> {selectedPosting.location}</Typography>
          <Typography variant="body1"><strong>Address:</strong> {`${selectedPosting.address ? selectedPosting.address + ', ' : ''}${selectedPosting.city ? capitalizeWords(selectedPosting.city) + ', ' : ''}${selectedPosting.state ? selectedPosting.state.toUpperCase() + ', ' : ''}${selectedPosting.zipCode ? selectedPosting.zipCode : ''}`}</Typography>
          <Typography variant="body1"><strong>Date:</strong> {selectedPosting.date}</Typography>
          <Typography variant="body1"><strong>Time:</strong> {selectedPosting.time} - {selectedPosting.endTime}</Typography>
          <Typography variant="body1"><strong>Hour(s):</strong> {selectedPosting.hours}</Typography>
          <Typography variant="body1"><strong>Description:</strong> {selectedPosting.description}</Typography>
          <Typography variant="body1"><strong>Spots Open:</strong> {selectedPosting.spots} of {selectedPosting.totalSpots}</Typography>
          <Button variant="contained" style={{ backgroundColor: 'orange', color: 'white', marginTop: '20px', marginBottom: '20px' }} onClick={handleEdit}>
            Edit Info
          </Button>
          <SignUpTable postingId={selectedPosting?.id} users={users} onRemove={handleRemoveUser} />
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