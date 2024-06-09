import React from 'react';
import SalaryForm from './SalaryForm';
import Earnings from './Earnings';
import Deductions from './Deductions ';
import Summary from './Summary';
import styled from 'styled-components';

const Container = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f8f8f8;
`;

const SalaryCalculator = () => {
    return ( 
        <Container>
            <SalaryForm />
            <Earnings />
            <Deductions />
            <Summary />
        </Container>
    );
};

export default SalaryCalculator;