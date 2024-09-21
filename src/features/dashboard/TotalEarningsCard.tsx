import React from 'react';

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
    <div className="mt-4 flex items-center justify-center">
      {/* Placeholder for the pie chart */}
      <svg viewBox="0 0 36 36" className="w-24 h-24">
        <path d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none" stroke="#4ade80" strokeWidth="4" strokeDasharray="60,40" />
        <path d="M18 2.0845
          a 15.9155 15.9155 0 0 0 0 31.831
          a 15.9155 15.9155 0 0 0 0 -31.831"
          fill="none" stroke="#60a5fa" strokeWidth="4" strokeDasharray="40,60" strokeDashoffset="25" />
      </svg>
      <div className="absolute">
        <p className="text-sm text-gray-600">Office rents: {officeRents}%</p>
        <p className="text-sm text-gray-600">Commercial rents: {commercialRents}%</p>
      </div>
    </div>
  </div>
);

export default TotalEarningsCard;
