import React from 'react';

type RevenueCardProps = {
    revenue: string,
    lastMonth: string,
    lastWeek: string
}

const RevenueCard: React.FC<RevenueCardProps> = ({ revenue, lastMonth, lastWeek }) => (
  <div className="card">
    <h2>Revenue</h2>
    <p>BDT {revenue}</p>
    <div className="bar-chart"> {/* Placeholder for the bar chart */}
      <p>Last 30 days: {lastMonth}</p>
      <p>Last Week: {lastWeek}</p>
    </div>
  </div>
);

export default RevenueCard;
