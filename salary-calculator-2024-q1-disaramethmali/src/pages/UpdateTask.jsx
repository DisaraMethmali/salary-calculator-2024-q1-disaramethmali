import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CustomTextField from '../components/textfield'; 
import '../styles/createEm.css';
import em1 from '../assets/em1.png';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

function UpdateTask() {
    const { id } = useParams();
    const [taskID, setTaskID] = useState('');
    const [taskinfo, setTaskinfo] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data and update state
    axios.get(`http://localhost:5000/getTask/${id}`)

      .then(result => {
       console.log(result)
       setTaskID(result.data.taskID);
        setTaskinfo(result.data.taskinfo);
        setEmployeeId(result.data.employeeId);
        setEmployeeName(result.data.employeeName);
        setDescription(result.data.description);
        setStatus(result.data.status);
      })
      .catch(err => console.log(err));
  }, [id]);

  const updateTask = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:5000/updateTask/${id}`, { taskID, taskinfo, employeeId, employeeName, description, status})
      .then(result => {
        console.log(result);
        navigate('/pages/task');
      })
      .catch(err => console.log(err));
  };
  return (
    <Box
      height={500}
      width={1000}
      my={4}
      display="flex"
      marginLeft="220px"
      alignItems="center"
      gap={2}
      p={2}
      sx={{ bgcolor: '#E7F1F7'}}
    >
      <img src={em1} alt="Employee" className="em1" style={{ width: '400px', height: '400px' }} />
      <Box>
      <Typography variant="h5" style={{ marginBottom: '20px', fontWeight: 'bold', fontStyle: 'poppins' }}>
         Update Task
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
    <IconButton onClick={() => navigate('/pages/task')} color="inherit">
        <CloseIcon />
    </IconButton>
</Box>

        <form onSubmit={updateTask}>
          <CustomTextField
            id="taskID"
            label="Task ID"
            variant="outlined"
            value={taskID}
            onChange={(e) => setTaskID(e.target.value)}
            fullWidth
            className="custom-textfield"
            margin="normal"
            disabled={id ? true : false} // Disable editing of taskId when updating
          />
          <CustomTextField
            id="taskinfo"
            label="Task"
            variant="outlined"
            value={taskinfo}
            onChange={(e) => setTaskinfo(e.target.value)}
            fullWidth
            margin="normal"
            className="custom-textfield"
          />
          <CustomTextField
            id="employeeId"
            label="Employee ID"
            variant="outlined"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            fullWidth
            margin="normal"
          />
         <CustomTextField
            id="employeeName"
            label="Employee Name"
            variant="outlined"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            fullWidth
            margin="normal"
            className="custom-textfield"
          />
          <CustomTextField
            id="description"
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          
          <FormControl fullWidth sx={{ marginTop: '20px', position: 'relative', width: '400px',marginLeft: '50px',}}>
  <InputLabel htmlFor="status" sx={{ position: 'absolute', top: '-10px', right: '-1500px', padding: '0 5px', zIndex: 1,width:'100px '}}>Status</InputLabel>
  <Select
    labelId="status-label"
    id="status"
    value={status}
    onChange={(e) => setStatus(e.target.value)}
    variant="outlined"
    fullWidth
    margin="dense"
    label="Status"
    sx={{
      '& .MuiInputLabel-outlined': {
        transform: 'translate(14px, 12px) scale(1)',
      },
      '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        transform: 'translate(14px, -5px) scale(0.75)',
      },
      '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
      },
      '& .MuiOutlinedInput-input': {
        py: '15px',
      },
      borderRadius: '15px',
     
      
    }}
  >
    <MenuItem value="In progress">In Progress</MenuItem>
    <MenuItem value="Completed">Completed</MenuItem>
  </Select>
</FormControl>
          <Button
            type="submit"
            variant="contained"
            color="success"
            style={{ marginTop: '10px' }}
          >
            {id ? 'Update Task' : 'Add Task'}
          </Button>
        </form>
      </Box>
    </Box>
  );

}
export default UpdateTask;