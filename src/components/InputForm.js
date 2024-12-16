import React, { useState } from 'react';

const InputForm = ({ generateSchedule }) => {
  const [formData, setFormData] = useState({
    numberOfPlots: '',
    motorsInParallel: '',
    startTime: '',
    endTime: '',
    motorRuntime: '',
    cycleInterval: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateSchedule(formData);
  };

  return (
    <div className="form-wrapper">
      <h2>Configure Irrigation System</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="numberOfPlots" placeholder="Number of Plots" onChange={handleChange} required />
        <input type="number" name="motorsInParallel" placeholder="Motors in Parallel" onChange={handleChange} required />
        <input type="text" name="startTime" placeholder="Start Time (HHMMSS)" onChange={handleChange} required />
        <input type="text" name="endTime" placeholder="End Time (HHMMSS)" onChange={handleChange} required />
        <input type="number" name="motorRuntime" placeholder="Motor Runtime (Minutes)" onChange={handleChange} required />
        <input type="number" name="cycleInterval" placeholder="Cycle Interval (Minutes)" onChange={handleChange} required />
        <button type="submit">Generate Schedule</button>
      </form>
    </div>
  );
};

export default InputForm;
