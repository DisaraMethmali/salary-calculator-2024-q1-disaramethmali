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
import CloseIcon from '@mui/icons-material/Close';

function Task() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
  
    
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
            setLoading(false); // Set loading to false on error as well
        });
    }, []);
    const [dataList, setDataList] = useState([
        {
        },
        {
          
        },
    ]);
    
    
        
    const headers = [
        "Task ID",
        "Task",
        "Employee ID",
        "Employee Name",
        "Description",
        "Status",
        "Action",
    ];

   
    const handleEdit = (id) => {
        navigate(`/pages/updateTask/${id}`);
    };

    const handleDelete = (id) => {
        axios.delete('http://localhost:5000/deleteTask/'+id)
        .then(res=>{
            console.log(res);
            window.location.reload();
        })
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
        // Show notification
        toast.info(`Task completed ${employeeId}`);
    };

    return (
        
        <Box sx={{ marginLeft: '12rem', marginTop:'50px' }}>
            <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '32px', fontWeight: 'bold' }}>
                Welcome Disara,
            </Typography>

            <Box
    sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        padding: '1rem',
        zIndex: 999,
    }}
>
    <IconButton onClick={() => navigate('/pages/task')} color="inherit">
        <CloseIcon />
    </IconButton>
</Box>


            <TableCard>
                <Button variant="contained" color="success" onClick={handleClick} sx={{ marginBottom:'1rem',marginTop: '1rem', marginLeft: '62rem' }}>
                    Add New
                </Button>
                <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '18px' , fontWeight: 'bold'}}>
                    Tasks
                </Typography>
                {/* Table header and buttons */}
                <CustomizedTables
                    headers={headers}
                    rows={dataList.length > 0 ? dataList.slice().map(task => ({
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
                
            </TableCard>

            {/* Notification container */}
            <ToastContainer />
        </Box>
    );
}

export default Task;
