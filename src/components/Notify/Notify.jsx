const Notify = ({ status, word, reset }) => {
  if (!status) return;

  return (
    <div className="notification">
      <p>You {status}!</p>
      <p>The word was: {word}</p>
      <button onClick={reset}>Would you like to try again?</button>
    </div>
  );
};

export default Notify;
