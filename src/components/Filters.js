import React, { useState } from 'react';

const Filters = ({ schedules, onFilterChange }) => {
  const [filters, setFilters] = useState({ plotFilter: '', statusFilter: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const uniquePlots = [...new Set(schedules.map((schedule) => schedule.plot))];

  return (
    <div className="filters">
      <label>
        Filter by Plot:
        <select name="plotFilter" onChange={handleChange}>
          <option value="">All</option>
          {uniquePlots.map((plot) => (
            <option key={plot} value={plot}>
              {plot}
            </option>
          ))}
        </select>
      </label>
      <label>
        Filter by Status:
        <select name="statusFilter" onChange={handleChange}>
          <option value="">All</option>
          <option value="Done">Done</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
        </select>
      </label>
    </div>
  );
};

export default Filters;
