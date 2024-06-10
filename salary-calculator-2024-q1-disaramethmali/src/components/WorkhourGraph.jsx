import React from 'react';
import { BarChart} from '@mui/x-charts';

const WorkhourGraph = ({ totalWorkHours, doneWorkHours, remainingWorkHours, otWorkHours }) => {
  const data = [{
    name: 'Work Hours',
    total: totalWorkHours,
    done: doneWorkHours,
    remaining: remainingWorkHours,
    ot: otWorkHours,
  }];

  const barKeys = ['total', 'done', 'remaining', 'ot'];

  return (
    <BarChart width={600} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      
      
    </BarChart>
  );
};

// Function to get fill color based on index
const getFillColor = (index) => {
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e'];
  return colors[index % colors.length];
};

export default WorkhourGraph;
