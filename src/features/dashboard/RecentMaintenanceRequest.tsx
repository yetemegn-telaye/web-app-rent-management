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
  <div className="card">
    <h2>Recent Maintenance Requests</h2>
    {requests.map((request, index) => (
      <div key={index}>
        <p>{request.type} - {request.status}</p>
        <p>{request.location}</p>
      </div>
    ))}
  </div>
);

export default RecentMaintenanceRequestComponent;
