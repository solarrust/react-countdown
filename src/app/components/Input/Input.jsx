export default function Input({ type, value, onChange, disabled }) {
  function changeHandler(event) {
    if (disabled) return;
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
        data-testid="input"
      />
      <span className="input-text">{type}</span>
    </label>
  );
}
