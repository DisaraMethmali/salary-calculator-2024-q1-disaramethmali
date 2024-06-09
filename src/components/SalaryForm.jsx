import React, { useContext, useState } from 'react';
import { SalaryContext } from '../context/SalaryContext';
import styled from 'styled-components';

const FormContainer = styled.div`
    margin-bottom: 20px;
`;

const SalaryForm = () => {
    const { state, dispatch } = useContext(SalaryContext);
    const [basicSalary, setBasicSalary] = useState(state.basicSalary);

    const updateBasicSalary = () => {
        dispatch({ type: 'SET_BASIC_SALARY', payload: parseFloat(basicSalary) });
    };

    const resetForm = () => {
        dispatch({ type: 'RESET' });
        setBasicSalary(0);
    };

    return (
        <FormContainer>
            <h3>Calculate Your Salary</h3>
            <input
                type="number"
                value={basicSalary}
                onChange={(e) => setBasicSalary(e.target.value)}
                onBlur={updateBasicSalary}
                placeholder="Basic Salary"
            />
            <button onClick={resetForm}>Reset</button>
        </FormContainer>
    );
};

export default SalaryForm;
