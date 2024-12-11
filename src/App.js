import React, { useState } from 'react';
import InputForm from './components/InputForm';
import IrrigationTable from './components/IrrigationTable';
import { generateIrrigationSchedule } from './utils/irrigationLogic';

const App = () => {
  const [schedules, setSchedules] = useState([]);

  const handleGenerateSchedule = (data) => {
    const newSchedule = generateIrrigationSchedule(data);
    setSchedules(newSchedule);
  };

  return (
    <div>
      <header>Irrigation Management System</header>
      <div className="container">
        <InputForm generateSchedule={handleGenerateSchedule} />
        <IrrigationTable schedules={schedules} />
      </div>
    </div>
  );
};

export default App;
