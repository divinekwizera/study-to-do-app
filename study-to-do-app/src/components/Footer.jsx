
function Footer({ remaining, completed, onClearCompleted }) {
  return (
    <footer className="footer">
      <div>
        <p>{remaining} tasks remaining</p>
        <p>{completed} tasks completed</p>
      </div>

      <button onClick={onClearCompleted}>
        Clear Completed
      </button>
    </footer>
  );
}

export default Footer;
