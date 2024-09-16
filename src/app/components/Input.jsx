import {useState, useEffect} from 'react'

export default function Input({type, timerTime, setTimerTime, timerState}) {
  function changeHandler(event) {
    setTimerTime(prev => ({...prev, [type]: Number(event.target.value)}))
  }

  return (
    <label className="timer__label">
      <input className="timer__number" type="number" min="0" value={timerTime[type]} onChange={changeHandler} disabled={timerState.isRun || timerState.isPaused} />
      <span className="timer__text">{type}</span>
    </label>
  )
}