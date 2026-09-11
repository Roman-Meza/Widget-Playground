import { useState } from "react";
import { Link } from 'react-router-dom';
import "./mathquiz.css";

import Home from "./components/Home";
import GameSetup from "./components/GameSetup";
import Quiz from "./components/Quiz";
import Results from "./components/Results";



function mathquiz() {
  const [screen, setScreen] = useState("home");

  const [settings, setSettings] = useState({
    playerName: "",
    difficulty: "Easy",
    operation: "Addition",
  });

  const [result, setResult] = useState({
    correct: 0,
  });

  return (
    <div className="mathbody">
      {screen === "home" && (
        <Home onStart={() => setScreen("setup")} />
      )}

      {screen === "setup" && (
        <GameSetup
          settings={settings}
          setSettings={setSettings}
          onStart={() => setScreen("quiz")}
          onHome={() => setScreen("home")}
        />
      )}

      {screen === "quiz" && (
        <Quiz
          settings={settings}
          onFinish={(gameResult) => {
            setResult(gameResult);
            setScreen("results");
          }}
        />
      )}

      {screen === "results" && (
        <Results
          result={result}
          onPlayAgain={() => setScreen("setup")}
          onHome={() => setScreen("home")}
        />
      )}
      <br></br><Link to="/">
          <button type="button" className="counter">
            Return to Home
          </button>
        </Link>
    </div>
  );
}

export default mathquiz;