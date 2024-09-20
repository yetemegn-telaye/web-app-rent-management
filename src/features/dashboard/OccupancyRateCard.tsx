import React from 'react';

type OccupancyRateCardProps = {
    rate: number;
}

const OccupancyRateCard: React.FC<OccupancyRateCardProps>= ({ rate }) => (
  <div className="flex flex-col justify-between bg-white rounded-lg shadow p-6">
    <h2 className="text-lg font-medium text-gray-800">Occupancy Rate</h2>
    <div className='mt-4'>
        <p className="text-md font-medium text-secondary-light">{rate}% rented</p>
    </div>
   
  </div>
);

export default OccupancyRateCard;
