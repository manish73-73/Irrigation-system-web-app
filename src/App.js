import React, { useState } from 'react';
import InputForm from './components/InputForm';
import IrrigationTable from './components/IrrigationTable';
import Filters from './components/Filters';
import { generateIrrigationSchedule } from './utils/irrigationLogic';

const App = () => {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);

  const handleGenerateSchedule = (data) => {
    const newSchedule = generateIrrigationSchedule(data);
    setSchedules(newSchedule);
    setFilteredSchedules(newSchedule);
  };

  const handleFilterChange = (filters) => {
    const { plotFilter, statusFilter } = filters;
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).replace(/:/g, '');

    let filtered = schedules;

    if (plotFilter) {
      filtered = filtered.filter((schedule) => schedule.plot === plotFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter((schedule) => {
        if (statusFilter === 'Done') return schedule.endTime < currentTime;
        if (statusFilter === 'In Progress') return schedule.startTime <= currentTime && schedule.endTime >= currentTime;
        if (statusFilter === 'Pending') return schedule.startTime > currentTime;
        return true;
      });
    }

    setFilteredSchedules(filtered);
  };

  return (
    <div>
      <header>Irrigation Management System</header>
      <div className="container">
        <InputForm generateSchedule={handleGenerateSchedule} />
        <Filters schedules={schedules} onFilterChange={handleFilterChange} />
        <IrrigationTable schedules={filteredSchedules} />
      </div>
    </div>
  );
};

export default App;
