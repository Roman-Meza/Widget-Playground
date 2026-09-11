function GameSetup({ settings, setSettings, onStart, onHome }) {
  const handleStart = () => {
    if (settings.playerName.trim() === "") {
      alert("Please enter your name before starting the quiz.");
      return;
    }

    onStart();
  };

  return (
    <div className="card setup-card">
      <button className="close-button" onClick={onHome} aria-label="Return to home">
        ×
      </button>

      <h1>Game Setup</h1>

      <div className="form-group">
        <label>Player Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={settings.playerName}
          onChange={(event) => setSettings({ ...settings, playerName: event.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Difficulty</label>
        <select
          value={settings.difficulty}
          onChange={(event) => setSettings({ ...settings, difficulty: event.target.value })}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="form-group">
        <label>Operation</label>
        <select
          value={settings.operation}
          onChange={(event) => setSettings({ ...settings, operation: event.target.value })}
        >
          <option value="Addition">Addition</option>
          <option value="Subtraction">Subtraction</option>
          <option value="Multiplication">Multiplication</option>
          <option value="Division">Division</option>
          <option value="Mixed">Mixed</option>
        </select>
      </div>

      <button onClick={handleStart}>Begin Quiz</button>
    </div>
  );
}

export default GameSetup;