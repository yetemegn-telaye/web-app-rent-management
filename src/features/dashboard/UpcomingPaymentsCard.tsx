import React from 'react';

type UpcomingPaymentsCardProps = {
    revenue: string,
    lastMonth: string,
    lastWeek: string
}

const UpcomingPaymentsCard: React.FC<UpcomingPaymentsCardProps> = ({ revenue, lastMonth, lastWeek }) => (
  <div className="bg-white shadow-lg rounded-md p-4">
    <h2 className="text-lg font-mediun text-secondary-dark">Upcoming Payments</h2>
    
    <div className="my-4 flex justify-between px-2"> 
    <div className='flex justify-between gap-12 my-2 items-center'>
        <div className='flex flex-col text-gray-500 font-light text-sm'>
        <p>office 00f01</p>
        <p>Total: 30,000 ETB</p>
        </div>
        <div className='flex flex-col items-center'>
        <p className='text-secondary-dark font-light'> pending ...</p>
        <p className='text-secondary-dark font-light'> 20/04/2024</p>
        </div>
        
      </div>
      <div className='h-15 w-0 border border-gray-600 border-opacity-25'>

      </div>
      <div className='flex justify-between my-2 gap-12 items-center'>
        <div className='flex flex-col text-gray-500 font-light text-sm'>
        <p>office 00f01</p>
        <p>Total: 30,000 ETB</p>
        </div>
        <div className='flex flex-col items-center'>
        <p className='text-secondary-dark font-light'> pending ...</p>
        <p className='text-secondary-dark font-light'> 20/04/2024</p>
        </div>
      </div>
      {/* <p>Last 30 days: {lastMonth}</p>
      <p>Last Week: {lastWeek}</p> */}
    </div>
  </div>
);

export default UpcomingPaymentsCard;
