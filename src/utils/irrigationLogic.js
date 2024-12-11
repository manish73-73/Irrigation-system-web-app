export const generateIrrigationSchedule = (data) => {
    const {
      numberOfPlots,
      motorsInParallel,
      startTime,
      endTime,
      motorRuntime,
      cycleInterval,
    } = data;
  
    const schedules = [];
    const totalTime = parseInt(endTime) - parseInt(startTime);
    const motorRunTimeInSeconds = motorRuntime * 60;
    const cycleIntervalInSeconds = cycleInterval * 60;
  
    let currentTime = parseInt(startTime);
    let motorIndex = 0;
  
    const formatTime = (time) => {
      const hours = Math.floor(time / 10000).toString().padStart(2, '0');
      const minutes = Math.floor((time % 10000) / 100).toString().padStart(2, '0');
      const seconds = (time % 100).toString().padStart(2, '0');
      return `${hours}${minutes}${seconds}`;
    };
  
    for (let i = 0; i < Math.ceil(totalTime / (motorRunTimeInSeconds + cycleIntervalInSeconds)); i++) {
      for (let plotIndex = 0; plotIndex < numberOfPlots; plotIndex++) {
        if (motorIndex >= motorsInParallel) {
          currentTime += motorRunTimeInSeconds + cycleIntervalInSeconds;
          motorIndex = 0;
        }
  
        schedules.push({
          index: schedules.length,
          plot: `D${plotIndex + 1}`,
          startTime: formatTime(currentTime),
          endTime: formatTime(currentTime + motorRunTimeInSeconds),
          RunBy: `M${(motorIndex % motorsInParallel) + 1}`,
        });
  
        motorIndex++;
      }
    }
  
    return schedules;
  };
  