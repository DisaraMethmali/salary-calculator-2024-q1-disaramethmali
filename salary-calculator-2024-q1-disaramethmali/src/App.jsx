import React from 'react';
import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom';
import Task from './pages/Task';
import Employee from './pages/Employee';
import CreateEmployee from './pages/CreateEmployee';
import UpdateEmployee from './pages/UpdateEmployee';
import Dash from './pages/Dash';
import CreateTask from './pages/CreateTask';
import UpdateTask from './pages/UpdateTask';
import AllTask from './pages/AllTask';
import AllEmployee from './pages/AllEmployee';
import Workhour from './pages/Workhour';
import CreateWork from './pages/CreateWork';
import Report from './pages/Report';
import Ereport from './pages/Ereport';
import Cart from './pages/Cart';
import ProfileDetails from './pages/ProfileDetails';
import LeaveDetails from './pages/LeaveDetails';
import LeaveForm from './pages/LeaveFrom';
import QRCodeScanner from './pages/QRCodeScanner';
import MyComponent from './pages/MyComponent';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Logout';
function App() {
  const user = localStorage.getItem("token");
  return (
 
      <Router>
        <div>
          <Routes>
            <Route path="/pages/task" element={<Task />} /> 
            <Route path="/pages" element={<Employee />} /> 
            <Route path="/pages/createEmployee" element={<CreateEmployee />} />
            <Route path="/pages/updateEmployee/:id" element={<UpdateEmployee />} />
            <Route path="/pages/dash" element={<Dash />} />
            <Route path="/pages/createTask" element={<CreateTask />} />
            <Route path="/pages/updateTask/:id" element={<UpdateTask />} />
            <Route path="/pages/allTask/" element={<AllTask />} />
            <Route path="/pages/allEmployee/" element={<AllEmployee />} />
            <Route path="/pages/workhour" element={<Workhour />} /> 
            <Route path="/pages/creatework" element={<CreateWork />} /> 
            <Route path="/pages/report" element={<Report />} /> 
            <Route path="/pages/ereport" element={< Ereport />} /> 
            <Route path="/pages/cart" element={<Cart />} /> 
            
            <Route path="/pages/leavedetails" element={<LeaveDetails/>}/>
        
       
          <Route path="/pages/profile" element={<ProfileDetails />} />
          <Route path="/pages/leaveform" element={<LeaveForm />} />
      <Route path="pages/MyComponent" element={<MyComponent/>}/>
      <Route path="pages/QRCodeScanner" element={<QRCodeScanner/>}/>
      {user && <Route path="/pages/main"  element={<Main />} />}
			<Route path="/pages/signup"  element={<Signup />} />
			<Route path="/pages/login"  element={<Login />} />
			<Route path="/pages/e" element={<Navigate replace to="/login" />} />
          </Routes>
        </div>
      </Router>
    
  );
}

export default App;
