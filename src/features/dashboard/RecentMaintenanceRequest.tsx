import React from 'react';

interface MaintenanceRequest {
  type: string;
  status: string;
  location: string;
}

interface RecentMaintenanceRequestsProps {
  requests: MaintenanceRequest[];
}

const RecentMaintenanceRequestComponent: React.FC<RecentMaintenanceRequestsProps> = ({ requests }) => (
  <div className="bg-white h-full p-4 rounded-md shadow-xl">
    <h2 className="text-lg font-mediun text-secondary-dark">Recent Maintenance Requests</h2>
    {requests.map((request, index) => (
      <div key={index}>
        <p>{request.type} - {request.status}</p>
        <p>{request.location}</p>
      </div>
    ))}
  </div>
);

export default RecentMaintenanceRequestComponent;
