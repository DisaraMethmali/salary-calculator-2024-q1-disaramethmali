import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomizedTables from '../components/table';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TableCard from '../components/tablecards';
import axios from 'axios';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Calendar from 'react-calendar'; // Importing react-calendar

function LeaveDetails() {
    const [leaves, setLeaves] = useState([]);
    const [nextLeaveId, setNextLeaveId] = useState(1);
    const [leaveId, setLeaveId] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        axios.get("http://localhost:5000/leave")
            .then(result => {
                const databaseLeaves = result.data;
                const mergedLeaves = mergeLeaves(databaseLeaves);
                setLeaves(mergedLeaves);
                if (mergedLeaves.length > 0) {
                    const lastLeaveId = parseInt(mergedLeaves[mergedLeaves.length - 1].id.replace("L", ""));
                    setNextLeaveId(lastLeaveId + 1);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const mergeLeaves = (databaseLeaves) => {
        const mergedLeaves = [...staticLeaves];
        mergedLeaves.push(...databaseLeaves);
        return mergedLeaves;
    };

    const staticLeaves = [
        {
            id: 1,
            employeeId: "EMP05",
            employeeName: "John Doe",
            leaveType: "Medical",
            reason: "Medical treatment",
            startDate: "2022-10-01",
            endDate: "2022-10-20",
            status: "Pending"
        },
        {
            id: 2,
            employeeId: "EMP002",
            employeeName: "Jane Smith",
            leaveType: "Casual",
            reason: "Family vacation",
            startDate: "2022-10-05",
            endDate: "2022-10-07",
            status: "Approved"
        },
    ];

    const calculateDeduction = (leaveType, numLeaves) => {
        const maxMedicalLeaves = 15;
        const maxCasualLeaves = 20;
        const deductionRate = 2500;

        let excessLeaves = 0;
        if (leaveType === 'MedicalDays' && numLeaves > maxMedicalLeaves) {
            excessLeaves = numLeaves - maxMedicalLeaves;
        } else if (leaveType === 'CasualDays' && numLeaves > maxCasualLeaves) {
            excessLeaves = numLeaves - maxCasualLeaves;
        }

        return excessLeaves * deductionRate;
    };

    const leaveCounts = leaves.reduce((acc, leave) => {
        const leaveDuration = Math.abs(new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24);
        if (!acc[leave.employeeId]) {
            acc[leave.employeeId] = {
                totalLeaves: 0,
                totalDays: 0,
            };
        }
        if (!acc[leave.employeeId][leave.leaveType]) {
            acc[leave.employeeId][leave.leaveType] = 0;
        }
        acc[leave.employeeId][leave.leaveType]++;
        acc[leave.employeeId][leave.leaveType + "Days"] = (acc[leave.employeeId][leave.leaveType + "Days"] || 0) + leaveDuration;
        acc[leave.employeeId].totalLeaves++;
        acc[leave.employeeId].totalDays += leaveDuration;
        return acc;
    }, {});

    const handleLeaveStatusChange = (id, status, buttonClicked) => {
        setButtonsDisabled(prevState => ({
            ...prevState,
            [buttonClicked]: true
        }));

        axios.put(`http://localhost:5000/leave/${id}`, { status })
            .then(response => {
                setLeaves(prevLeaves => prevLeaves.map(leave => {
                    if (leave._id === id) {
                        return { ...leave, status };
                    }
                    return leave;
                }));

                toast(status === "Approved" ? "Leave Approved" : "Leave Rejected", { type: "info" });
            })
            .catch(error => {
                console.error('Error updating leave status:', error);
                toast("Error updating leave status", { type: "error" });
            })
            .finally(() => {
                setButtonsDisabled(prevState => ({
                    ...prevState,
                    [buttonClicked]: false
                }));
            });
    };

    const [showTable1, setShowTable1] = useState(true);

    return (
        <Box sx={{ marginLeft: '12rem', marginTop: '50px' }}>
            <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '32px', fontWeight: 'bold', fontFamily: 'Poppins' }}>
                Leave Details
            </Typography>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    padding: '1rem',
                }}
            >
                <Button
                    variant="outlined"
                    startIcon={<ArrowForwardIcon />}
                    onClick={() => setShowTable1(!showTable1)}
                >
                    Table 1
                </Button>
            </Box>
            {showTable1 ? (
                <TableCard>
                    <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '18px', fontWeight: 'bold' }}>
                        Leave Summary
                    </Typography>
                    <CustomizedTables
                        headers={[
                            "Employee ID",
                            "Employee Name",
                            "Medical Leave Days",
                            "Casual Leave Days",
                            "Total Leave Days",
                            "Deduction"
                        ]}
                        rows={Object.keys(leaveCounts).map(employeeId => ({
                            "Employee ID": employeeId,
                            "Employee Name": leaves.find(leave => leave.employeeId === employeeId)?.employeeName || '',
                            "Medical Leave Days": leaveCounts[employeeId]["MedicalDays"] || 0,
                            "Casual Leave Days": leaveCounts[employeeId]["CasualDays"] || 0,
                            "Total Leave Days": leaveCounts[employeeId].totalDays,
                            "Deduction": calculateDeduction("MedicalDays", leaveCounts[employeeId]["MedicalDays"] || 0) + calculateDeduction("CasualDays", leaveCounts[employeeId]["CasualDays"] || 0)
                        }))}
                    />
                </TableCard>
            ) : (
                <TableCard>
                    <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '18px', fontWeight: 'bold' }}>
                        Leaves
                    </Typography>
                    <CustomizedTables
                        headers={[
                            "Leave ID",
                            "Employee ID",
                            "Employee Name",
                            "Leave Type",
                            "Reason",
                            "Start Date",
                            "End Date",
                            "Status",
                            "Action",
                        ]}
                        rows={leaves.length > 0 ? leaves.map((leave, index) => ({
                            "Leave ID": `L${(index + 1).toString().padStart(3, "0")}`,
                            "Employee ID": leave.employeeId,
                            "Employee Name": leave.employeeName,
                            "Leave Type": leave.leaveType,
                            "Reason": leave.reason,
                            "Start Date": leave.startDate.split('T')[0],
                            "End Date": leave.endDate.split('T')[0],
                            "Status": leave.status,
                            "Action": (
                                <div>
                                    {leave.status === 'Pending' && (
                                        <>
                                            <IconButton
                                                onClick={() => handleLeaveStatusChange(leave._id, "Approved", "approveButton")}
                                                style={{ color: 'green' }}
                                                disabled={buttonsDisabled.approveButton}
                                            >
                                                <TaskAltIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleLeaveStatusChange(leave._id, "Rejected", "rejectButton")}
                                                style={{ color: 'red' }}
                                                disabled={buttonsDisabled.rejectButton}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </div>
                            )
                        })) : [{ "No Data": "No Data" }]}
                    />
                </TableCard>
            )}
            
            <ToastContainer />
        </Box>
    );
}

export default LeaveDetails;
