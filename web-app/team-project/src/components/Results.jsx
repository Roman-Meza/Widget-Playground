function Results({ result, onPlayAgain, onHome }) {
  return (
    <div className="card results">
      <h1>Game Over!</h1>
      <p className="results-message">You made a mistake.</p>
      <p className="score-label">Operations Solved</p>
      <div className="final-score">{result.correct}</div>

      <div className="result-buttons">
        <button onClick={onPlayAgain}>Play Again</button>
        <button className="secondary-button" onClick={onHome}>Home</button>
      </div>
    </div>
  );
}

export default Results;