const Notify = ({ status, word, reset }) => {
	if (!status) return;

	return (
		<div className="game__notification">
			<p>You {status}!</p>
			<p>The word was: {word}</p>
			<button
				className="game__notification-button"
				onClick={reset}
			>
				Try Again? 👀
			</button>
		</div>
	);
};

export default Notify;
