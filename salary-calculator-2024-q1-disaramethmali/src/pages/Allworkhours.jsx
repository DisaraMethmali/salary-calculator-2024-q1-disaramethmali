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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Workhour() {
    const [workHours, setWorkHours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const [showAll, setShowAll] = useState(false); 

    useEffect(() => {
        // Fetch data from the server
        axios.get("http://localhost:5000/workhour")
            .then(result => {
                console.log(result.data);
                setWorkHours(result.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false); 
            });

        // Initialize static data
        const staticData = [
            {
                workID: 1,
                employeeId: "EMP001",
                employeeName: "John Doe",
                startTime: "08:00 AM",
                endTime: "05:00 PM",
                doneWork: "6 hours",
                scheduledWork: "8 hours",
                remainingWork: "2 hours",
                OTWorkHours: "2 hours",
                wage: "$20",
            },
            {
                workID: 2,
                employeeId: "EMP002",
                employeeName: "Jane Smith",
                startTime: "09:00 AM",
                endTime: "06:00 PM",
                doneWork: "7 hours",
                scheduledWork: "8 hours",
                remainingWork: "1 hour",
                OTWorkHours: "1 hour",
                wage: "$25",
            },
        ];

        setWorkHours(staticData);
        setLoading(false);
    }, []);

    const navigate = useNavigate(); // Initialize the navigate function here

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
        
    const headers = [
        "Work ID",
        "Employee ID",
        "Employee Name",
        "Start Time",
        "End Time",
        "Done Work",
        "Scheduled Work",
        "Remaining Work",
        "OT Work Hours",
        "Wage",
        "Action",
    ];

    const handleEdit = (workID) => {
        navigate(`/pages/updateWorkhour/${workID}`);
    };

    const handleDelete = (workID) => {
        axios.delete(`http://localhost:5000/deleteWorkhour/${workID}`)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    const handleClick = () => {
        navigate('/pages/createWorkhour');
    };

    const handleSeeMore = () => {
        navigate('/pages/allWorkhour');
    };

    return (
        <Box sx={{ marginLeft: '12rem', marginTop:'50px' }}>
            <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '32px', fontWeight: 'bold' }}>
                Welcome Disara,
            </Typography>
            <TableCard>
                <Button variant="contained" color="success" onClick={handleClick} sx={{ marginBottom:'1rem',marginTop: '1rem', marginLeft: '62rem' }}>
                    Add New
                </Button>
                <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '18px' , fontWeight: 'bold'}}>
                    Work Hours
                </Typography>
                {/* Table header and buttons */}
                <CustomizedTables
                    headers={headers}
                    rows={workHours.length > 0 ? workHours.slice().map(workhour => ({
                            "Work ID": workhour.workID,
                            "Employee ID": workhour.employeeId,
                            "Employee Name": workhour.employeeName,
                            "Start Time": workhour.startTime,
                            "End Time": workhour.endTime,
                            "Done Work": workhour.doneWork,
                            "Scheduled Work": workhour.scheduledWork,
                            "Remaining Work": workhour.remainingWork,
                            "OT Work Hours": workhour.OTWorkHours,
                            "Wage": workhour.wage,
                            "Action": (
                                <div>
                                    <IconButton onClick={() => handleEdit(workhour.workID)} style={{ color: 'blue' }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(workhour.workID)} style={{ color: 'red' }}>
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

export default Workhour;
