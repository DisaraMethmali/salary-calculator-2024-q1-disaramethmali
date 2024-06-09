import React from 'react';
import { SalaryProvider } from './context/SalaryContext';
import SalaryCalculator from './components/SalaryCalculator';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle `
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #e0e0e0;
  }
`;

const App = () => {
    return (
       <SalaryProvider>
      <GlobalStyle />
      <SalaryCalculator />
  </SalaryProvider>
    );
};

export default App;