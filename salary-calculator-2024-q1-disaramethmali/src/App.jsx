import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SalaryCalculator from './context/salarycalcultor';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SalaryCalculator />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
