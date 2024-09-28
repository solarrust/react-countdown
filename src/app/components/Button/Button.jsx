export default function Button({ action, onClick }) {
  return (
    <button className={`button _${action}`} type="button" onClick={onClick}>
      {action}
    </button>
  );
}
