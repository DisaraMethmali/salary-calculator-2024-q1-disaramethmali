import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomTextField from '../components/textfield'; 
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import em1 from '../assets/em1.png';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

function CreateWork() {
  const [workID, setWorkID] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [doneWork, setDoneWork] = useState('');
  const [scheduledWork, setScheduledWork] = useState('');
  const [remainingWork, setRemainingWork] = useState('');
  const [OTWorkHours, setOTWorkHours] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/createWorkhour", {
        workID,
        employeeId,
        employeeName,
        startTime,
        endTime,
        doneWork,
        scheduledWork,
        remainingWork,
        OTWorkHours,
        
      })
      .then(result => {
        console.log(result);
        navigate('/pages/Workhour');
      })
      .catch(err => console.log(err));
  };

  return (
    <Box
      height={700}
      width={1000}
      my={4}
      display="flex"
      marginLeft="220px"
      alignItems="center"
      gap={2}
      p={2}
      sx={{ bgcolor: '#E7F1F7'}}
    >
        
         <Box>
        <Typography variant="h5" style={{ marginBottom: '20px', fontWeight: 'bold', fontStyle: 'poppins' }}>
          Create Work Hour
        </Typography>
        <Box
    sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        padding: '2rem',
        zIndex: 999,
        marginRight:'17rem'
    }}
>
    <IconButton onClick={() => navigate('/pages/Workhour')} color="inherit">
        <CloseIcon />
    </IconButton>
</Box>

        <form onSubmit={handleSubmit}>
          <CustomTextField
            id="workID"
            label="Work ID"
            variant="outlined"
            value={workID}
            onChange={(e) => setWorkID(e.target.value)}
            fullWidth
            className="custom-textfield"
            margin="normal"
          />
          <CustomTextField
            id="employeeId"
            label="Employee ID"
            variant="outlined"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            fullWidth
            className="custom-textfield"
            margin="normal"
          />
          <CustomTextField
            id="employeeName"
            label="Employee Name"
            variant="outlined"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            fullWidth
            className="custom-textfield"
            margin="normal"
          />
          <CustomTextField
            id="startTime"
            label="Start Time"
            variant="outlined"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            fullWidth
            className="custom-textfield"
            margin="normal"
          />
          <CustomTextField
            id="endTime"
            label="End Time"
            variant="outlined"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            fullWidth
            className="custom-textfield"
            margin="normal"
          />
          <CustomTextField
            id="doneWork"
            label="Done Work"
            variant="outlined"
            value={doneWork}
            onChange={(e) => setDoneWork(e.target.value)}
            fullWidth
            className="custom-textfield"
            margin="normal"
          />
          <CustomTextField
            id="scheduledWork"
            label="Scheduled Work"
            variant="outlined"
            value={scheduledWork}
            onChange={(e) => setScheduledWork(e.target.value)}
            fullWidth
            className="custom-textfield"
            margin="normal"
          />
          <CustomTextField
            id="remainingWork"
            label="Remaining Work"
            variant="outlined"
            value={remainingWork}
            onChange={(e) => setRemainingWork(e.target.value)}
            fullWidth
            className="custom-textfield"
            margin="normal"
          />
          <CustomTextField
            id="OTWorkHours"
            label="OT Work Hours"
            variant="outlined"
            value={OTWorkHours}
            onChange={(e) => setOTWorkHours(e.target.value)}
            fullWidth
            className="custom-textfield"
            margin="normal"
          />
          
          
          <Button
            type="submit"
            variant="contained"
            color="success"
            style={{ marginTop: '60px' }}
          >
            Create Work Hour
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default CreateWork;
