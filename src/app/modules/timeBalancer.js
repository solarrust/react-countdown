/**
 * @param {{ minutes: number; seconds: number; hours: number; }} timeObject
 */
export default function timeBalancer(timeObject) {
  if (timeObject.minutes < 60 && timeObject.seconds < 60) return timeObject
  if (!('minutes' in timeObject) || !('seconds' in timeObject)) throw new Error('The object does not contain the required keys!')

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
    ...timeObject,
    hours: timeObject.hours + restMins,
    minutes: timeObject.minutes + restSecs,
    seconds: timeObject.seconds,
  };
}
