export default function timeBalancer(prev) {
  let restSecs = 0,
    restMins = 0;

  if (prev.seconds >= 60) {
    while (prev.seconds >= 60) {
      prev.seconds -= 60;
      restSecs++;
    }
  }

  if (prev.minutes >= 60) {
    while (prev.minutes >= 60) {
      prev.minutes -= 60;
      restMins++;
    }
  }

  return {
    ...prev,
    hours: prev.hours + restMins,
    minutes: prev.minutes + restSecs,
    seconds: prev.seconds,
  };
}
