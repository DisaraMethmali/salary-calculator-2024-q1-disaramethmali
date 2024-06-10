import React, { useState, useEffect } from 'react';
import './SalaryCalculator.css'; // Add CSS for styling
import resetImage from './reset.png';
const SalaryCalculator = () => {
  const [basicSalary, setBasicSalary] = useState(150000);
  const [earnings, setEarnings] = useState([{ title: 'Travel', amount: 10000, epf: true }]);
  const [deductions, setDeductions] = useState([{ title: 'No Pay', amount: 8000 }]);
  const [results, setResults] = useState({});

  useEffect(() => {
    calculateResults();
  }, [basicSalary, earnings, deductions]);

  const handleEarningsChange = (index, field, value) => {
    const updatedEarnings = [...earnings];
    updatedEarnings[index][field] = field === 'epf' ? value.target.checked : value;
    setEarnings(updatedEarnings);
  };

  const handleDeductionsChange = (index, field, value) => {
    const updatedDeductions = [...deductions];
    updatedDeductions[index][field] = value;
    setDeductions(updatedDeductions);
  };

  const addEarning = () => {
    setEarnings([...earnings, { title: '', amount: 0, epf: false }]);
  };

  const addDeduction = () => {
    setDeductions([...deductions, { title: '', amount: 0 }]);
  };

  const removeEarning = (index) => {
    const updatedEarnings = earnings.filter((_, i) => i !== index);
    setEarnings(updatedEarnings);
  };

  const removeDeduction = (index) => {
    const updatedDeductions = deductions.filter((_, i) => i !== index);
    setDeductions(updatedDeductions);
  };

  const calculateResults = () => {
    const totalEarnings = basicSalary + earnings.reduce((acc, curr) => acc + curr.amount, 0);
    const totalEarningsForEPF = basicSalary + earnings.filter(e => e.epf).reduce((acc, curr) => acc + curr.amount, 0);
    const grossDeduction = deductions.reduce((acc, curr) => acc + curr.amount, 0);
    const grossEarnings = totalEarnings - grossDeduction;
    const grossSalaryForEPF = totalEarningsForEPF - grossDeduction;
    const employeeEPF = grossSalaryForEPF * 0.08;
    const employerEPF = grossSalaryForEPF * 0.12;
    const employerETF = grossSalaryForEPF * 0.03;
    const APIT = grossEarnings * 0.18 - 25500;
    const netSalary = grossEarnings - employeeEPF - APIT;
    const costToCompany = grossEarnings + employerEPF + employerETF;

    setResults({
      totalEarnings,
      totalEarningsForEPF,
      grossDeduction,
      grossEarnings,
      grossSalaryForEPF,
      employeeEPF,
      employerEPF,
      employerETF,
      APIT,
      netSalary,
      costToCompany
    });
  };

  const resetForm = () => {
    setBasicSalary(0);
    setEarnings([]);
    setDeductions([]);
    setResults({});
  };

  return (
    <div class="outer-container">
    <div className="container">
    <div className="salary-calculator">
  <h2>Calculate Your Salary</h2>
  <button className="reset-button" onClick={resetForm}>
    Reset
    <img src={resetImage} alt="Reset" />
  </button>
  <div>
    <label>Basic Salary</label>
    <input
      type="number"
      value={basicSalary}
      onChange={(e) => setBasicSalary(Number(e.target.value))}
    />
  </div>
  <div>
    <h3>Earnings</h3>
    {earnings.map((earning, index) => (
      <div key={index} className="earning-item">
        <input
          type="text"
          placeholder="Title"
          value={earning.title}
          onChange={(e) => handleEarningsChange(index, 'title', e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={earning.amount}
          onChange={(e) => handleEarningsChange(index, 'amount', Number(e.target.value))}
        />
        <label>
          EPF/ETF
          <input
            type="checkbox"
            checked={earning.epf}
            onChange={(e) => handleEarningsChange(index, 'epf', e)}
          />
        </label>
        <button className="remove-button" onClick={() => removeEarning(index)}>✖</button>
      </div>
    ))}
    <button onClick={addEarning}>+Add New Earning</button>
  </div>
  <div>
    <h3>Deductions</h3>
    {deductions.map((deduction, index) => (
      <div key={index} className="deduction-item">
        <input
          type="text"
          placeholder="Title"
          value={deduction.title}
          onChange={(e) => handleDeductionsChange(index, 'title', e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={deduction.amount}
          onChange={(e) => handleDeductionsChange(index, 'amount', Number(e.target.value))}
        />
        <button className="remove-button" onClick={() => removeDeduction(index)}>✖</button>
      </div>
    ))}
    <button onClick={addDeduction}>+Add New Deduction</button>
  </div>
</div>

      <div className="results">
        <h3>Your Salary</h3>
        <div className="result-item">
          <span>Basic Salary:</span>
          <span>{basicSalary?.toFixed(2)}</span>
        </div>
        <div className="result-item">
          <span>Gross Earning:</span>
          <span>{results?.totalEarnings?.toFixed(2)}</span>
        </div>
        <div className="result-item">
          <span>Gross Deduction:</span>
          <span>{results?.grossDeduction?.toFixed(2)}</span>
        </div>
        <div className="result-item">
          <span>Employee EPF (8%):</span>
          <span>{results?.employeeEPF?.toFixed(2)}</span>
        </div>
        <div className="result-item">
          <span>APIT:</span>
          <span>{results?.APIT?.toFixed(2)}</span>
        </div>
        <div className="result-item">
          <span>Net Salary (Take Home):</span>
          <span>{results?.netSalary?.toFixed(2)}</span>
        </div>
        <h4>Contribution from the Employer</h4>
        <div className="result-item">
          <span>Employer EPF (12%):</span>
          <span>{results?.employerEPF?.toFixed(2)}</span>
        </div>
        <div className="result-item">
          <span>Employer ETF (3%):</span>
          <span>{results?.employerETF?.toFixed(2)}</span>
        </div>
        <div className="result-item">
          <span>CTC (Cost to Company):</span>
          <span>{results?.costToCompany?.toFixed(2)}</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SalaryCalculator;
