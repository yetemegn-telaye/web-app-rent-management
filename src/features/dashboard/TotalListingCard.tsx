import React from 'react';

type TotalListingsCardProps = {
    total: number,
    offices: number,
    commercial: number
}

const TotalListingsCard: React.FC<TotalListingsCardProps> = ({ total, offices, commercial }) => (
  <div className="flex flex-col justify-between bg-white rounded-lg shadow p-6">
    <h2 className="text-lg font-mediun text-secondary-dark">Total Listings</h2>
    <div className="mt-4">
      <p className="text-md font-medium text-secondary-light">{total} Listings</p>
      <div className="flex justify-between font-light mt-2">
        <p className="text-sm text-gray-600">{offices} Offices</p>
        <p className="text-sm text-gray-600">{commercial} Commercial</p>
      </div>
    </div>
  </div>
);

export default TotalListingsCard;
