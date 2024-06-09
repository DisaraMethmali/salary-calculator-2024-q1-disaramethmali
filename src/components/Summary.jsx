import React, { useContext } from 'react';
import { SalaryContext } from '../context/SalaryContext';
import styled from 'styled-components';

const SummaryContainer = styled.div`
    margin-top: 20px;
`;

const Summary = () => {
    const { state } = useContext(SalaryContext);

    const totalEarnings = state.basicSalary + state.earnings.reduce((acc, curr) => acc + curr.amount, 0);
    const totalEpfEarnings = state.basicSalary + state.earnings.filter(e => e.isEpf).reduce((acc, curr) => acc + curr.amount, 0);
    const grossDeductions = state.deductions.reduce((acc, curr) => acc + curr.amount, 0);
    const grossEarnings = totalEarnings - grossDeductions;
    const grossSalaryForEpf = totalEpfEarnings - grossDeductions;

    const employeeEpf = grossSalaryForEpf * state.epfRate;
    const employerEpf = grossSalaryForEpf * 0.12;
    const employerEtf = grossSalaryForEpf * state.etfRate;

    const apit = (grossEarnings * state.apitRate) - 25500;  // Using a constant for simplification
    const netSalary = grossEarnings - employeeEpf - apit;
    const costToCompany = grossEarnings + employerEpf + employerEtf;

    return (
        <SummaryContainer>
            <h3>Your Salary</h3>
            <p>Basic Salary: {state.basicSalary}</p>
            <p>Gross Earnings: {grossEarnings}</p>
            <p>Gross Deductions: {grossDeductions}</p>
            <p>Employee EPF (8%): {employeeEpf}</p>
            <p>APIT: {apit}</p>
            <p>Net Salary (Take Home): {netSalary}</p>
            <h4>Contribution from the Employer</h4>
            <p>Employer EPF (12%): {employerEpf}</p>
            <p>Employer ETF (3%): {employerEtf}</p>
            <p>CTC (Cost to Company): {costToCompany}</p>
        </SummaryContainer>
    );
};

export default Summary;