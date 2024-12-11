import React from 'react';

const StatusBadge = ({ status }) => {
  const statusClass = {
    Pending: 'status-pending',
    'In Work': 'status-in-work',
    'On Vacation': 'status-on-vacation',
  };

  return <span className={`status-badge ${statusClass[status]}`}>{status}</span>;
};

export default StatusBadge;
