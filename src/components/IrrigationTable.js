import React from 'react';

const IrrigationTable = ({ schedules }) => {
  return (
    <div className="table-wrapper">
      <h2>Irrigation Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Plot</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Run By</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.index}>
              <td>{schedule.index}</td>
              <td>{schedule.plot}</td>
              <td>{schedule.startTime}</td>
              <td>{schedule.endTime}</td>
              <td>{schedule.RunBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IrrigationTable;
