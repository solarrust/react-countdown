export default function balanceTime(timeObject) {
  if (!('minutes' in timeObject) || !('seconds' in timeObject)) throw new Error('The object does not contain the required keys!')
  if (timeObject.minutes < 60 && timeObject.seconds < 60) return timeObject

  let restSecs = 0,
    restMins = 0;

  while (timeObject.seconds >= 60) {
    timeObject.seconds -= 60;
    restSecs++;
  }

  while (timeObject.minutes >= 60) {
    timeObject.minutes -= 60;
    restMins++;
  }

  return {
    hours: timeObject.hours + restMins,
    minutes: timeObject.minutes + restSecs,
    seconds: timeObject.seconds,
  };
}
