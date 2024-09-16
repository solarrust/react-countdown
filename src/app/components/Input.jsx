export default function Input({type, value, onChange, disabled}) {
  function changeHandler(event) {
    onChange(Number(event.target.value), type)
  }

  return (
    <label className="timer__label">
      <input
        className="timer__number"
        type="number"
        min="0"
        value={value}
        onChange={changeHandler}
        disabled={disabled}
      />
      <span className="timer__text">{type}</span>
    </label>
  )
}