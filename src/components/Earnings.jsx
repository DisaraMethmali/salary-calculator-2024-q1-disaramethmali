import React, { useContext, useState } from 'react';
import { SalaryContext } from '../context/SalaryContext';
import styled from 'styled-components';

const EarningsContainer = styled.div`
    margin-bottom: 20px;
`;

const Earnings = () => {
    const { state, dispatch } = useContext(SalaryContext);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [isEpf, setIsEpf] = useState(false);

    const addEarning = () => {
        dispatch({ type: 'ADD_EARNING', payload: { title, amount: parseFloat(amount), isEpf } });
        setTitle('');
        setAmount('');
        setIsEpf(false);
    };

    return (
        <EarningsContainer>
            <h3>Earnings</h3>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
            />
            <label>
                <input
                    type="checkbox"
                    checked={isEpf}
                    onChange={() => setIsEpf(!isEpf)}
                />
                EPF/ETF
            </label>
            <button onClick={addEarning}>Add New Allowance</button>
            <ul>
                {state.earnings.map((earning, index) => (
                    <li key={index}>
                        {earning.title}: {earning.amount} - EPF: {earning.isEpf ? 'Yes' : 'No'}
                        <button onClick={() => dispatch({ type: 'REMOVE_EARNING', payload: index })}>Remove</button>
                    </li>
                ))}
            </ul>
        </EarningsContainer>
    );
};

export default Earnings;

