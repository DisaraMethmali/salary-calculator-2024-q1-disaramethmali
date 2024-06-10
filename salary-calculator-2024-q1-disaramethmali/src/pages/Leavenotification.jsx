import React from 'react';
import { Snackbar } from '@mui/material';
import { useLocation } from 'react-router-dom';

const LeaveNotification = ({ employeeId }) => { // Pass the employeeId as a prop
  const location = useLocation();

  // Parse the employee ID from the URL
  const urlEmployeeId = location.pathname.split('/').pop();

  return (
    <Snackbar
      open={employeeId === urlEmployeeId} // Show the notification only if the employee ID matches the URL
      autoHideDuration={6000}
      onClose={() => {}} // No action on close
      message={`Leave ${notification?.status} for Employee ID: ${notification?.employeeId}`}
    />
  );
};

export default LeaveNotification;
