export const generateIrrigationSchedule = ({
  numberOfPlots,
  motorsInParallel,
  startTime,
  endTime,
  motorRuntime,
  cycleInterval,
}) => {
  const schedules = [];
  let currentStartTime = parseTime(startTime); // Convert startTime to seconds
  const endTimeInSeconds = parseTime(endTime); // Convert endTime to seconds
  const runtimeInSeconds = motorRuntime * 60; // Convert motor runtime to seconds
  const intervalInSeconds = cycleInterval * 60; // Convert cycle interval to seconds

  let plotIndex = 1;
  let motorIndex = 1;
  let index = 0;

  // Generate schedules
  while (currentStartTime + runtimeInSeconds <= endTimeInSeconds) {
    // Run motors in parallel up to the specified limit
    for (let i = 0; i < motorsInParallel && plotIndex <= numberOfPlots; i++) {
      const plotName = `D${plotIndex}`;
      const motorName = `M${motorIndex}`;

      const startTimeFormatted = formatTime(currentStartTime);
      const endTimeFormatted = formatTime(currentStartTime + runtimeInSeconds);

      schedules.push({
        index: index++,
        plot: plotName,
        startTime: startTimeFormatted,
        endTime: endTimeFormatted,
        RunBy: motorName,
      });

      // Increment to the next motor and plot
      plotIndex++;
      motorIndex = motorIndex % motorsInParallel + 1;
    }

    // Reset to first plot after all plots are scheduled in one cycle
    if (plotIndex > numberOfPlots) {
      plotIndex = 1;
      currentStartTime += intervalInSeconds; // Add interval time before the next cycle
    } else {
      currentStartTime += runtimeInSeconds; // Add runtime for parallel motors
    }
  }

  return schedules;
};

// Helper function: Convert time in HHMMSS to seconds
const parseTime = (timeStr) => {
  const hours = parseInt(timeStr.slice(0, 2), 10);
  const minutes = parseInt(timeStr.slice(2, 4), 10);
  const seconds = parseInt(timeStr.slice(4, 6), 10);
  return hours * 3600 + minutes * 60 + seconds;
};

// Helper function: Convert seconds back to HHMMSS format
const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((timeInSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
  return `${hours}${minutes}${seconds}`;
};
