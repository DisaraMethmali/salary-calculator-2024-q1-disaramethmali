/*import React, { useState } from "react";
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
function CreateTask() {
  const [taskID, setTaskID] = useState('');
  const [taskinfo, setTaskinfo] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/createTask", {
        taskID,
        taskinfo,
        employeeId,
        employeeName,
        description,
        status
      })
      .then(result => {
        console.log(result);
        navigate('/pages/Task');
      })
      .catch(err => console.log(err));
  };

  return (
    <Box
      height={600}
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
          Create Tasks
        </Typography>
   
        <form onSubmit={handleSubmit}>
          <CustomTextField
            id="taskID"
            label="Task ID"
            variant="outlined"
            value={taskID}
            onChange={(e) => setTaskID(e.target.value)}
            fullWidth
            className="custom-textfield"
            margin="normal"
          />
          <CustomTextField
            id="taskinfo"
            label="Task"
            variant="outlined"
            value={taskinfo}
            onChange={(e) => setTaskinfo(e.target.value)}
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
            id="description"
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            className="custom-textfield"
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
    <MenuItem value="in progress">In Progress</MenuItem>
    <MenuItem value="completed">Completed</MenuItem>
  </Select>
</FormControl>


     
          <Button
            type="submit"
            variant="contained"
            color="success"
            style={{ marginTop: '60px' }}
          >
            Create Task
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default CreateTask;
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomizedTables from '../components/table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; 
import { Box, Typography, TablePagination } from '@mui/material';
import BgCards from "../components/bgcards";
import AssignmentIcon from '@mui/icons-material/Assignment';
import TableCard from '../components/tablecards';
import axios from 'axios';

function Task() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const [showAll, setShowAll] = useState(false); 
    useEffect(() => {
        axios.get("http://localhost:5000/task")
        .then(result => {
            console.log(result.data);
            // Set the dataList state with the fetched data
            setDataList(result.data);
            setLoading(false); // Set loading to false when data is fetched
        })
        .catch(err => {
            console.log(err);
            setLoading(false); 
            // Set loading to false on error as well
        });
        axios.put(`http://localhost:5000/updateTaskStatus/${taskID}`, { status: newStatus })
        .then(res => {
            console.log(res.data);
            // Show notification
            toast.info(`Task completed ${employeeId}`);
        })
        .catch(err => console.log(err));

        
    }, []);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
        
    const headers = [
        "Task ID",
        "Task",
        "Employee ID",
        "Employee Name",
        "Description",
        "Status",
        "Action",
    ];

    const [dataList, setDataList] = useState([
        {
        },
        {
          
        },
    ]);
    const filterTasksByStatus = (status) => {
        return dataList.filter(task => task.status === status);
    };
    const handleAddTask = (e) => {
        e.preventDefault();
    
    
        // Add the new user to the state
        setTasks((prevTasks) => [...prevTasks, newTask]);
    
        // Clear the form fields
        e.target.reset();
      };
    const handleEdit = (id) => {
        navigate(`/pages/updateTask/${id}`);
    };

    const handleDelete = (id) => {
        axios.delete('http://localhost:5000/deleteTask/'+id)
        .then(res=>{console.log(res)
        window.location.reload()})
        .catch(err=>console.log(err))
    };

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/pages/createTask');
    };

    const handleStatusChange = (taskID, newStatus, employeeId) => {
        const updatedDataList = dataList.map(task => {
            if (task.taskID === taskID) {
                return { ...task, status: newStatus };
            }
            return task;
        });
        setDataList(updatedDataList);
    
        // Save the updated task status to localStorage
        localStorage.setItem(`task_${taskID}_status`, newStatus);
        
        // Show notification
        toast.info(`Task completed ${employeeId}`);
    
    };
    const handleSeeMore = () => {
        navigate('/pages/allTask');
    };
    return (
        
        <Box sx={{ marginLeft: '12rem', marginTop:'50px' }}>
            <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '32px', fontWeight: 'bold' }}>
                Welcome Disara,
            </Typography>

           
            <Box sx={{ display: 'fixed' ,width:'100px',marginLeft: '-15rem',marginTop:'10px'}}>

            <BgCards>
                    <Typography variant="body1" sx={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'Poppins' }}>
                        All Tasks
                        <IconButton size="small" color="inherit">
                            <AssignmentIcon />
                        </IconButton>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '16px', fontFamily: 'Poppins' }}>
                        {dataList.length}
                    </Typography>
                </BgCards>
                <BgCards>
                    <Typography variant="body1" sx={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'Poppins' }}>
                        In Progress Tasks
                        <IconButton size="small" color="inherit">
                            <AssignmentIcon />
                        </IconButton>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '16px', fontFamily: 'Poppins' }}>
                        {filterTasksByStatus('In progress').length}
                    </Typography>
                </BgCards>
                <BgCards>
                    <Typography variant="body1" sx={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'Poppins' }}>
                        Completed Tasks
                        <IconButton size="small" color="inherit" >
                            <AssignmentIcon />
                        </IconButton>
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '16px', fontFamily: 'Poppins' }}>
                        {filterTasksByStatus('Completed').length}
                    </Typography>
                </BgCards>
</Box>



            <TableCard>
            <Button variant="contained" color="success" onClick={handleClick} sx={{ marginBottom:'1rem',marginTop: '1rem', marginLeft: '62rem' }}>
Add New
</Button>
<Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '18px' , fontWeight: 'bold'}}>
Tasks
</Typography>
                {/* Table header and buttons *//*}
                <CustomizedTables
                   headers={headers}
                   rows={dataList.length > 0 ? dataList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(task => ({
                        "Task ID": task.taskID,
                        "Task": task.taskinfo,
                        "Employee ID": task.employeeId,
                        "Employee Name": task.employeeName,
                        "Description": task.description,
                        "Status": task.status,
                        "Action": (
                            <div>
                                {task.status !== "Completed" && (
                                    <IconButton onClick={() => handleStatusChange(task.taskID, "Completed", task.employeeId)} style={{ color: 'green' }}>
                                    <AssignmentIcon />
                                </IconButton>
                                
                                )}
                                <IconButton onClick={() => handleEdit(task._id)} style={{ color: 'blue' }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(task._id)} style={{ color: 'red' }}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        )
                    })) : [{ "No Data": "No Data" }]}
                />
                <TablePagination
    rowsPerPageOptions={[2, 5, 10]}
    component="div"
    count={dataList.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    nextIconButtonProps={{
        onClick: () => handleChangePage(null, page + 1),
        disabled: page >= Math.ceil(dataList.length / rowsPerPage) - 1,
    }}
    backIconButtonProps={{
        onClick: () => handleChangePage(null, page - 1),
        disabled: page === 0,
    }}
/>
{!showAll && (
                    <Box sx={{ marginTop: '1rem', textAlign: 'center' }}>
                        <Button variant="contained" color="primary" onClick={handleSeeMore}>
    See More
</Button>

                    </Box>
                )}
           
            </TableCard>
/*
            {/* Notification container *//*}
           /* <ToastContainer />
        </Box>
    );
}

export default Task;*/
