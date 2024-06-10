// LeaveContext.js
import React, { createContext, useContext, useState } from 'react';

const LeaveContext = createContext();

export const useLeaveContext = () => useContext(LeaveContext);

export const LeaveProvider = ({ children }) => {
  const [leaves, setLeaves] = useState([]); // State to manage leave data

  // Add more state and functions as needed
  
  return (
    <LeaveContext.Provider value={{ leaves, setLeaves }}>
      {children}
    </LeaveContext.Provider>
  );
};
