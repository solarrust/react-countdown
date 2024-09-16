import {useState, useEffect, useLayoutEffect} from 'react'
import Input from './Input'
import Button from './Button'

export default function Timer() {
  const [timerTime, setTimerTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 10,
  })

  const [timerState, setTimerState] = useState({
    isRun: false,
    isPaused: false
  })

  let timerInterval
  let [timeLeft, setTimeLeft] = useState(timeToSecs(timerTime))

  useEffect(() => {
    if (timerState.isRun && !timerState.isPaused) {
      timerInterval = setInterval(() => {
        if(timeLeft <= 0) {
          setTimerState(prev => ({...prev, isRun: false}))
          setTimeLeft(timeToSecs(timerTime))
          clearInterval(timerInterval)
          return
        }

        let newTimeLeft = timeLeft - 1

        setTimeLeft(newTimeLeft)
        console.log(timeLeft)
      }, 1000);
    }

    if (!timerState.isRun && !timerState.isPaused) {
      setTimeLeft(timeToSecs(timerTime))
    }

    return () => clearInterval(timerInterval);
  }, [timerTime, timerState, timeLeft])

  useEffect(() => {
    timeBalancer()
    document.documentElement.style.setProperty("--timer-duration", timeToSecs(timerTime))

    setTimeLeft(timeToSecs(timerTime))
  }, [timerTime])

  function timeBalancer() {
    if (timerTime.seconds >= 60) {
      setTimerTime(prev => ({...prev, 'minutes': timerTime.minutes++, 'seconds': timerTime.seconds - 60}))
    } else if (timerTime.minutes >= 60) {
      setTimerTime(prev => ({...prev, 'hours': timerTime.hours++, 'minutes': timerTime.minutes - 60}))
    }
  }

  function timeToSecs(object) {
    return Number((object.hours * 60 * 60) + (object.minutes * 60) + (object.seconds))
  }

  return (
    <form className={`timer ${timerState.isRun ? '_run' : ''} ${timerState.isPaused ? '_paused' : ''}`}>
      <div className="timer__inputs">
        <Input type={'hours'} timerTime={timerTime} setTimerTime={setTimerTime} timerState={timerState} />
        <Input type={'minutes'} timerTime={timerTime} setTimerTime={setTimerTime} timerState={timerState} />
        <Input type={'seconds'} timerTime={timerTime} setTimerTime={setTimerTime} timerState={timerState} />
      </div>
      <div className="timer__left">{timeLeft} sec left</div>
      <div className="timer__buttons">
        <Button action="pause" timerState={timerState} setTimerState={setTimerState} />
        <Button action="start" timerState={timerState} setTimerState={setTimerState} />
        <Button action="stop" timerState={timerState} setTimerState={setTimerState} />
      </div>
    </form>
  )
}