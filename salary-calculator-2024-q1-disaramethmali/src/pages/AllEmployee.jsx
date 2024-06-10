import React, { useState, useEffect } from "react";
import CustomizedTables from '../components/table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; 
import '../styles/createEm.css'
import { Box, Typography } from '@mui/material'; 
import BgCards from "../components/bgcards";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TableCard from '../components/tablecards';
import '../styles/createEm.css'
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Report from '../pages/Report'; // Import the Report component
import Esidebar from "../components/esidebar";
import TablePagination from '@mui/material/TablePagination';

/*const calculateTotalSalary = (user) => {
    const epfRate = 0.08; // Assuming EPF rate is 8%
    const bonusRate = 0.1; // 10% bonus

    const basicSalary = user.basicSalary || 0;
    const epfDeduction = basicSalary * epfRate;
    const bonus = basicSalary * bonusRate;

    return basicSalary - epfDeduction + bonus;
};
*/
function AllEmployee() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);
    const [showAll, setShowAll] = useState(false); 
    useEffect(() => {
        axios.get("http://localhost:5000")
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
    

    const calculateTotalSalary = (employee) => {
      const epfRate = 0.08; // Assuming EPF rate is 8%
      const bonusRate = 0.1; // 10% bonus
  
      const basicSalary = employee.basicSalary || 0;
      const epfDeduction = basicSalary * epfRate;
      const bonus = basicSalary * bonusRate;
  
      return basicSalary - epfDeduction + bonus;
    };
  
    // Sample data list state with one employee
    const [dataList, setDataList] = useState([
        {
            
            
        }
    ]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleAddEmployee = (e) => {
        e.preventDefault();
    
    
        // Add the new user to the state
        setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    
        // Clear the form fields
        e.target.reset();
      };
    // Sample handle edit function
    const handleEdit = (id) => {
        navigate(`/pages/updateEmployee/${id}`);
    };
    
    
    const handleSeeMore = () => {
        navigate('/pages/allEmployee');
    };
    // Sample handle delete function
    const handleDelete = (id) => {
        axios.delete('http://localhost:5000/deleteEmployee/'+id)
        .then(res=>{console.log(res)
        window.location.reload()})
        .catch(err=>console.log(err))
    };
    

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/pages/createEmployee');
    };

    // Define headers outside of any function to make it accessible throughout the component
    const headers = [
        "Employee ID",
        "Employee Name",
        "Position",
        "Contact Number",
        "Email",
        "Basic Salary",
        "Total Salary",
        "Action",
    ];

    return (
        
     
    


        <Box sx={{ marginLeft: '12rem',marginTop:'50px' }}>
            <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '32px', fontWeight: 'bold' ,fontFamily: 'Poppins'}}>
  Welcome Disara,
</Typography>
<MyComponent employeeIds={employeeId} /> 
<Box
    sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        padding: '1rem',
        zIndex: 999,
    }}
>
    <IconButton onClick={() => navigate('/pages')} color="inherit">
        <CloseIcon />
    </IconButton>
</Box>
                  
            <TableCard>
            <Typography variant="h5" sx={{ marginLeft: '1rem', fontSize: '18px' , fontWeight: 'bold'}}>
 Employee
</Typography>
            <Button variant="contained" color="success" onClick={handleClick} sx={{ marginBottom:'1rem',marginTop: '1rem', marginLeft: '62rem' }}>
    Add New
</Button>

            
           
                <CustomizedTables
                    headers={headers}
                    rows={dataList.length > 0 ? dataList.slice().map(employee => ({
                        "Employee ID": employee.employeeId,
                        "Employee Name": employee.employeeName,
                        "Position": employee.position,
                        "Contact Number": employee.contactNumber,
                        "Email": employee.email,
                        "Basic Salary": employee.basicSalary,
                        "Total Salary": calculateTotalSalary(employee),
                        "Action": (
                            <div>
                               <IconButton onClick={() => handleEdit(employee._id)} style={{ color: 'blue' }}>
                                    
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(employee._id)} style={{ color: 'red' }}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        )
                    })) : [{ "No Data": "No Data" }]}
                />
             
                </TableCard>
                 {/* Your existing code */}
            {/* Render the Report component and pass the employees data */}
            <Report employees={employees} />
            </Box>
           
       
    );
}

export default AllEmployee;
