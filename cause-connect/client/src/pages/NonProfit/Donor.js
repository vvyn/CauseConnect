import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import { db } from "../../Firebase";
import { collection, onSnapshot, addDoc, doc, updateDoc } from "firebase/firestore";

const donaTypes = [
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

const ViewButton = styled(Button)({
  backgroundColor: '#FFA726',
  color: 'white',
  margin: '5px',
  '&:hover': {
    backgroundColor: '#FB8C00',
  },
});

const DonationPostingCard = ({ title, donaType, location, city, state, goal, description, onViewEdit }) => (
  <CustomCard>
    <CardContent>
      <Typography variant="h5" component="div" style={{ color: '#ffa600'}}>{title}</Typography>
      <Typography variant="subtitle1" component="div" style={{ color: '#ffa600' }}>{location}</Typography>
      <Typography variant="subtitle1" component="div" style={{ color: '#ffa600' }}>{city}, {state}</Typography>
      <Typography variant="body1" style={{ marginTop: '20px', fontWeight: 'bold' }}>Goal: ${goal}</Typography>
      <Typography variant="body2" style={{ marginTop: '20px' }}>{description}</Typography>
      <CustomButton onClick={onViewEdit}>Edit</CustomButton>
    </CardContent>
  </CustomCard>
);

const DonationPostings = () => {
  const [postings, setPostings] = useState([]);
  const [selectedPosting, setSelectedPosting] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const isValidForm = () => {
    return (
      selectedPosting.title && selectedPosting.donaType &&
      selectedPosting.location && selectedPosting.city && 
      selectedPosting.state && selectedPosting.goal &&
      selectedPosting.description
    );
  };

  const handleViewEdit = posting => {
    setSelectedPosting(posting);
    setEditMode(true);
  };

  const handleAddNew = () => {
    setSelectedPosting({
      title: '',
      donaType: '',
      location: '', 
      city: '', 
      state: '', 
      goal: '', 
      description: '',
    });
    setEditMode(true);
  };  
  
  const handleEdit = () => {
    if (!selectedPosting) {
      handleAddNew();
    } else {
      handleViewEdit(selectedPosting);
    }
  };  

  const handleCancel = () => {
    setSelectedPosting(null);
    setEditMode(false);
  };

  const handleChange = (e, field) => {
    setSelectedPosting({...selectedPosting, [field]: e.target.value});
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "donationPosting"), (snapshot) => {
      const postData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostings(postData);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    try{
      const dbRef = collection(db, "donationPosting");
      let docRef;

      if (selectedPosting && selectedPosting.id) {
        docRef =doc(db, "donationPosting", selectedPosting.id);
        await updateDoc(docRef, {
          title: selectedPosting.title,
          donaType: selectedPosting.donaType,
          location: selectedPosting.location,
          city: selectedPosting.city,
          state: selectedPosting.state,
          goal: selectedPosting.goal,
          description: selectedPosting.description,
        });
      } else {
        docRef = await addDoc(dbRef, {
            title: selectedPosting.title,
            donaType: selectedPosting.donaType,
            location: selectedPosting.location,
            city: selectedPosting.city,
            state: selectedPosting.state,
            goal: selectedPosting.goal,
            description: selectedPosting.description,
        });
      }

      console.log("Document written with ID: ", docRef.id);
      setEditMode(false);
      setSelectedPosting(null);
    } catch (e) {
      console.error("Error adding/updating document: ", e);
    }
    alert('Donation campaign saved!');

  };

  return (
    <PageLayout>
    <div>
      {editMode ? (
        <div style ={{ paddingLeft: '23px' }}>
          <PageTitle style={{ paddingLeft: '0px' }}>{selectedPosting && selectedPosting.id ? "Edit Donation Posting" : "Add Donation Posting"}</PageTitle>
          <form>
            <TextField required label="Title" value={selectedPosting ? selectedPosting.title : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'title')} />
            <FormControl required style={{ width: '210px'}} margin="normal">
              <InputLabel id="donaType">donaType</InputLabel>
              <Select
                labelId="donaType"
                value={selectedPosting ? selectedPosting.donaType : ''}
                label="donaType"
                onChange={e => handleChange(e, 'donaType')}
              >
                {donaTypes.map((donaType, index) => (
                  <MenuItem key={index} value={donaType}>{donaType}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField required label="Location" value={selectedPosting ? selectedPosting.location : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'location')} />
            <TextField required label="City" value={selectedPosting ? selectedPosting.city : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'city')} />
            <TextField required label="State (Abbreviation only)" value={selectedPosting ? selectedPosting.state : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'state')} />
            <TextField required label="Goal" value={selectedPosting ? selectedPosting.goal : ''} style={{ width: '500px', display: 'block' }} margin="normal" onChange={e => handleChange(e, 'goal')} />
            <TextField required label="Description" value={selectedPosting ? selectedPosting.description : ''} style={{ width: '500px', display: 'block' }} margin="normal" multiline rows={4} onChange={e => handleChange(e, 'description')} />
            <Button variant="contained" style={{ marginRight: '20px', marginTop: '10px', marginBottom: '10px' }} color="primary" onClick={handleSave} disabled={!isValidForm()}>Save</Button>
            <Button variant="outlined" style={{ marginTop: '10px', marginBottom: '10px' }} color="secondary" onClick={handleCancel}>Cancel</Button>
          </form>
        </div>
      ) : selectedPosting ? (
        <div style ={{ paddingLeft: '23px' }}>
          <PageTitle style={{ paddingLeft: '0px' }}>Volunteer Activity Details</PageTitle>
          <Typography variant="h5"><strong>{selectedPosting.title}</strong></Typography>
          <Typography variant="subtitle1"><strong>Location:</strong> {selectedPosting.location}</Typography>
          <Typography variant="body1"><strong>Date:</strong> {selectedPosting.date}</Typography>
          <Typography variant="body1"><strong>Description:</strong> {selectedPosting.description}</Typography>
          <Button variant="contained" style={{ backgroundColor: 'orange', color: 'white', marginTop: '20px', marginBottom: '20px' }} onClick={handleEdit}>
            Edit Info
          </Button>
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
                <DonationPostingCard {...posting} onViewEdit={() => handleViewEdit(posting)} />
              </Grid>
            ))}
          </CardContainer>
          </>
        )}
      </div>
      </PageLayout>
    );
  };

  export default DonationPostings;