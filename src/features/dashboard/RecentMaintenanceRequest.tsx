import React from 'react';
import maintainanceImg from '../../assets/images/plumbing.webp';

interface MaintenanceRequest {
  type: string;
  status: string;
  location: string;
}

interface RecentMaintenanceRequestsProps {
  requests: MaintenanceRequest[];
}

const RecentMaintenanceRequestComponent: React.FC<RecentMaintenanceRequestsProps> = ({ requests }) => (
  <div className="bg-white flex flex-col gap-3 h-full p-4 rounded-md shadow-xl">
    <h2 className="text-lg font-mediun text-secondary-dark">Recent Maintenance Requests</h2>
    {requests.map((request, index) => (
      <div key={index} className='flex items-center justify-between p-2 rounded-lg bg-primary hover:bg-primary-dark hover:bg-opacity-30'>
        <img src={maintainanceImg} alt='maintenance' className='w-10 rounded-md h-10' />
        <p className='font-light text-gray-600'>{request.type} </p>
        <div className='flex flex-col'>
        <p> {request.status}</p>
        <p className='font-light text-gray-600'>{request.location}</p>
        </div>
      </div>
    ))}
  </div>
);

export default RecentMaintenanceRequestComponent;
