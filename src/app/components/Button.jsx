export default function Button({action, timerState, setTimerState}) {
  function clickHandler(event) {
    if (event.target.dataset.action === 'start' && !timerState.isRun) {
      setTimerState(prev => ({...prev, isRun: true}))
    } else if (event.target.dataset.action === 'pause' && !timerState.isPaused) {
      setTimerState(prev => ({...prev, isPaused: true}))
    } else if (event.target.dataset.action === 'start' && timerState.isPaused) {
      setTimerState(prev => ({...prev, isPaused: false}))
    } else {
      setTimerState(prev => ({...prev, isRun: false, isPaused: false}))
    }
  }

  return (
    <button className={`timer__button _${action}`} type="button" data-action={action} onClick={clickHandler}>
      {action}
    </button>
  )
}