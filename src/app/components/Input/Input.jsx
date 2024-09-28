export default function Input({ type, value, onChange, disabled }) {
  function changeHandler(event) {
    onChange(Number(event.target.value), type);
  }

  return (
    <label className="input-label">
      <input
        className="input"
        type="number"
        min="0"
        value={value}
        onChange={changeHandler}
        disabled={disabled}
      />
      <span className="input-text">{type}</span>
    </label>
  );
}
