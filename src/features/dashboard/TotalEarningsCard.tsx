import React from 'react';
import PieChart from '../../components/PieChart';

type TotalEarningsCardProps = {
    officeRents: number,
    commercialRents: number
}

const TotalEarningsCard: React.FC<TotalEarningsCardProps> = ({ officeRents, commercialRents }) => (
  <div className="bg-white shadow-md rounded-lg p-6 relative h-full">
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-mediun text-secondary-dark">Total Earnings</h2>
      <button className="text-sm text-primary-600 hover:text-primary-700 font-medium py-1 px-3 border border-primary-600 rounded">View Report</button>
    </div>
   
    <PieChart value1={officeRents} value2={commercialRents} />
   
  </div>
);

export default TotalEarningsCard;
