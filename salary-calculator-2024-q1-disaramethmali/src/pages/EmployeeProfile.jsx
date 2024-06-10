// EmployeeProfile.js
import React from 'react';
import { Box, Typography } from '@mui/material'; 
import { useTaskContext } from './TaskContext'; // Import the context

function EmployeeProfile() {
  const { tasks } = useTaskContext(); // Access tasks from context

  return (
    <Box sx={{ marginLeft: '12rem', marginTop:'50px' }}>
      <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '32px', fontWeight: 'bold' }}>
        Employee Profile
      </Typography>
      {/* Employee details and task list */}
      <Box sx={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc' }}>
        <Typography variant="h6">Employee Name: John Doe</Typography>
        <Typography variant="body1">Employee ID: EMP001</Typography>
        {/* Render task list */}
        <Typography variant="h6">Task List</Typography>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {task.name} - {task.status}
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
}

export default EmployeeProfile;
