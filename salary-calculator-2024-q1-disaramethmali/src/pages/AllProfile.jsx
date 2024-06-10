// Main component where all employee profiles are rendered
import React from 'react';
import EmployeeProfile from './EmployeeProfile';

const MainComponent = () => {
    // Sample data for 50 employees
    const employees = [
        { id: 1, name: 'Employee 1', leaveHistory: [/* leave history for Employee 1 */] },
        { id: 2, name: 'Employee 2', leaveHistory: [/* leave history for Employee 2 */] },
        // Add data for other employees
    ];

    return (
        <div>
            {employees.map((employee) => (
                <EmployeeProfile key={employee.id} employee={employee} />
            ))}
        </div>
    );
};

export default MainComponent;
