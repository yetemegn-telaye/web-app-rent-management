import React from 'react';

interface TotalMaintenanceCostCardProps {
  viewReport: () => void;
}

const TotalMaintenanceCostCard: React.FC<TotalMaintenanceCostCardProps> = ({ viewReport }) => (
  <div className="card">
    <h2>Total Maintenance Cost</h2>
    <button onClick={viewReport}>View Report</button>
  </div>
);

export default TotalMaintenanceCostCard;
