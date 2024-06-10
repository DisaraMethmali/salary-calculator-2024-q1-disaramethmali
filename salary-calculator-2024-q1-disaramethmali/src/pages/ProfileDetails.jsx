import React, { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfileDetails = ({ employeeId }) => { // Pass the employeeId as a prop
  const navigate = useNavigate();

  const handleLeave = () => {
    // Navigate to the leave form with the employeeId as a parameter in the URL
    navigate(`/pages/leaveForm`);
  };


  return (
    <Container>
      <Typography variant="h3" style={{marginBottom: '16px', fontWeight: 'bold'}}>
        Profile Details
      </Typography>
      <Box style={{border: '1px solid #ddd', padding: '16px', margin: '16px auto', width: '50%'}}>
        <Typography variant="body1">
          Name: Disara
        </Typography>
        <Typography variant="body1">
          NIC: <strong>2001851029931</strong>
        </Typography>
        <Typography variant="body1">
          Employee ID:EM001
        </Typography>
        <Typography variant="body1">
          Gender: <strong>Female</strong>
        </Typography>
        <Typography variant="body1">
          Date of Birth: <strong>2001/12/16</strong>
        </Typography>
        <Typography variant="body1">
          Position: <strong>HR Manager</strong>
        </Typography>
        <Typography variant="body1">
          Work Experience: <strong>Over 5 years</strong>
        </Typography>
        <Typography variant="body1">
          Address: <strong>No. 24, Main Street, Colombo</strong>
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          style={{marginTop: '16px'}}
          onClick={handleLeave}
        >
         Take a Leave
        </Button>
      </Box>
    </Container>
  );
};

export default ProfileDetails;
