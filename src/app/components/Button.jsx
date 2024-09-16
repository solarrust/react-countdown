export default function Button({action, onClick}) {
  return (
    <button
      className={`timer__button _${action}`}
      type="button"
      onClick={onClick}
    >
      {action}
    </button>
  )
}