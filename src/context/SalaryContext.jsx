import React, { createContext, useReducer } from 'react';

const SalaryContext = createContext();

const initialState = {
    basicSalary: 0,
    earnings: [],
    deductions: [],
    epfRate: 0.08,
    etfRate: 0.03,
    apitRate: 0.18,
};

const salaryReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BASIC_SALARY':
            return {...state, basicSalary: action.payload };
        case 'ADD_EARNING':
            return {...state, earnings: [...state.earnings, action.payload] };
        case 'REMOVE_EARNING':
            return {...state, earnings: state.earnings.filter((_, index) => index !== action.payload) };
        case 'ADD_DEDUCTION':
            return {...state, deductions: [...state.deductions, action.payload] };
        case 'REMOVE_DEDUCTION':
            return {...state, deductions: state.deductions.filter((_, index) => index !== action.payload) };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};

const SalaryProvider = ({ children }) => {
    const [state, dispatch] = useReducer(salaryReducer, initialState);

    return ( 
        <SalaryContext.Provider value={{ state, dispatch }}>
        {children}
    </SalaryContext.Provider>
    );
};

export { SalaryContext, SalaryProvider };