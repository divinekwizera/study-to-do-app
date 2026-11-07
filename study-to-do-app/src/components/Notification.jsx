
function Notification({ notification, onClose }) {
  return (
    <div className={`notification ${notification.type}`}>
      <span>{notification.message}</span>
      <button onClick={onClose} aria-label="Close notification">
        ×
      </button>
    </div>
  );
}

export default Notification;
