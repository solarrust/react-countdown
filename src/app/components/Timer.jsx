import {useState, useEffect, useRef} from 'react'
import Input from './Input'
import Button from './Button'
import timeBalancer from '../modules/timeBalancer.js'
const TIMER_STATE = {
  RUNNING: 'running',
  PAUSED: 'paused',
  STOPPED: 'stopped'
}

const TIMER_CLASS = {
  [TIMER_STATE.RUNNING]: '_run',
  [TIMER_STATE.PAUSED]: '_paused',
  [TIMER_STATE.STOPPED]: ''
}

function timeToSecs(object) {
  return Number((object.hours * 60 * 60) + (object.minutes * 60) + (object.seconds))
}

export default function Timer() {
  const [timerState, setTimerState] = useState(TIMER_STATE.STOPPED)

  const [timerTime, setTimerTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 10,
  })

  let [timeLeft, setTimeLeft] = useState(timeToSecs(timerTime))
  let timerInterval = useRef(null)

  const disabled = timerState !== TIMER_STATE.STOPPED

  useEffect(() => {
    if(timeLeft <= 0) {
      stopTimer()
    }
  }, [timeLeft])

  function stopInterval() {
    clearInterval(timerInterval.current)
  }

  function updateTimeLeft() {
    const newTimeLeft = timeToSecs(timerTime)
    setTimeLeft(newTimeLeft)
    document.documentElement.style.setProperty("--timer-duration", newTimeLeft)
  }

  function onChange(value, type) {
    setTimerTime(prev => timeBalancer({...prev, [type]: value}))
  }

  function onStart() {
    if (timerState === TIMER_STATE.RUNNING) return

    if (timerState === TIMER_STATE.STOPPED) {
      updateTimeLeft()
    }

    setTimerState(TIMER_STATE.RUNNING)

    timerInterval.current = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000);
  }

  function onPause() {
    setTimerState(TIMER_STATE.PAUSED)
    stopInterval()
  }

  function stopTimer() {
    setTimerState(TIMER_STATE.STOPPED)
    updateTimeLeft()
    stopInterval()
  }
  return (
    <form className={`timer ${TIMER_CLASS[timerState]}`}>
      <div className="timer__inputs">
        <Input type='hours' value={timerTime.hours} onChange={onChange} disabled={disabled} />
        <Input type='minutes' value={timerTime.minutes} onChange={onChange} disabled={disabled} />
        <Input type='seconds' value={timerTime.seconds} onChange={onChange} disabled={disabled} />
      </div>
      <div className="timer__left">{timeLeft} sec left</div>
      <div className="timer__buttons">
        <Button action="pause" onClick={onPause} />
        <Button action="start" onClick={onStart} />
        <Button action="stop" onClick={stopTimer} />
      </div>
    </form>
  )
}