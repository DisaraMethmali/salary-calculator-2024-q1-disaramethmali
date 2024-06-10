import React, { useState } from 'react';

const SalaryCalculator = () => {
  const [basicSalary, setBasicSalary] = useState(150000);
  const [allowances, setAllowances] = useState([{ title: 'Travel', amount: 10000, epf: true }]);
  const [deductions, setDeductions] = useState([{ title: 'No Pay', amount: 8000 }]);

  const handleAllowanceChange = (index, field, value) => {
    const updatedAllowances = [...allowances];
    updatedAllowances[index][field] = field === 'epf' ? value.target.checked : value;
    setAllowances(updatedAllowances);
  };

  const handleDeductionChange = (index, field, value) => {
    const updatedDeductions = [...deductions];
    updatedDeductions[index][field] = value;
    setDeductions(updatedDeductions);
  };

  const addAllowance = () => {
    setAllowances([...allowances, { title: '', amount: 0, epf: false }]);
  };

  const addDeduction = () => {
    setDeductions([...deductions, { title: '', amount: 0 }]);
  };

  const removeAllowance = (index) => {
    const updatedAllowances = allowances.filter((_, i) => i !== index);
    setAllowances(updatedAllowances);
  };

  const removeDeduction = (index) => {
    const updatedDeductions = deductions.filter((_, i) => i !== index);
    setDeductions(updatedDeductions);
  };

  return (
    <div>
      <h2>Calculate Your Salary</h2>
      <button onClick={() => window.location.reload()}>Reset</button>
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
        {allowances.map((allowance, index) => (
          <div key={index}>
            <input
              type="text"
              value={allowance.title}
              onChange={(e) => handleAllowanceChange(index, 'title', e.target.value)}
            />
            <input
              type="number"
              value={allowance.amount}
              onChange={(e) => handleAllowanceChange(index, 'amount', Number(e.target.value))}
            />
            <label>
              EPF/ETF
              <input
                type="checkbox"
                checked={allowance.epf}
                onChange={(e) => handleAllowanceChange(index, 'epf', e)}
              />
            </label>
            <button onClick={() => removeAllowance(index)}>Remove</button>
          </div>
        ))}
        <button onClick={addAllowance}>Add New Allowance</button>
      </div>
      <div>
        <h3>Deductions</h3>
        {deductions.map((deduction, index) => (
          <div key={index}>
            <input
              type="text"
              value={deduction.title}
              onChange={(e) => handleDeductionChange(index, 'title', e.target.value)}
            />
            <input
              type="number"
              value={deduction.amount}
              onChange={(e) => handleDeductionChange(index, 'amount', Number(e.target.value))}
            />
            <button onClick={() => removeDeduction(index)}>Remove</button>
          </div>
        ))}
        <button onClick={addDeduction}>Add New Deduction</button>
      </div>
    </div>
  );
};

export default SalaryCalculator;
