import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  value1: number;
 value2: number;
}

const PieChart: React.FC<PieChartProps> = ({ value1, value2 }) => {
  const data = {
    labels: ['Office Rental Earnings', 'Commercial Rental Earnings'],
    datasets: [
      {
        label: 'Earnings Distribution',
        data: [value1, value2],
        backgroundColor: ['#E6822E', '#115E59'], 
        hoverBackgroundColor: ['#45a049', '#e68a00'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const, 
        labels: {
          color: '#333', 
        },
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto mt-14 ">
 
        <Pie data={data} options={options} />
     
    </div>
  );
};

export default PieChart;
