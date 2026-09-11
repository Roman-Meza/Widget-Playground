import { useState } from "react";
import { generateQuestion } from "../utils/generateQuestion";

function Quiz({ settings, onFinish }) {
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [question, setQuestion] = useState(() => generateQuestion(settings));

  const handleAnswer = (answer) => {
    if (answer === question.correctAnswer) {
      setScore((currentScore) => currentScore + 1);
      setQuestionNumber((currentQuestion) => currentQuestion + 1);

      let nextQuestion = generateQuestion(settings);
      let attempts = 0;

      while (nextQuestion.text === question.text && attempts < 10) {
        nextQuestion = generateQuestion(settings);
        attempts++;
      }

      setQuestion(nextQuestion);
    } else {
      onFinish({ correct: score });
    }
  };

  return (
    <div className="card">
      <div className="quiz-header">
        <span>{settings.playerName}</span>
        <span>Operation {questionNumber}</span>
        <span>Score: {score}</span>
      </div>

      <p className="quiz-info">
        {settings.difficulty} {" • "} {settings.operation}
      </p>

      <div className="question">
        <p className="question-label">Solve the operation</p>
        <h2>{question.text}</h2>
      </div>

      <div className="answers">
        {question.options.map((answer) => (
          <button key={answer} onClick={() => handleAnswer(answer)}>
            {answer}
          </button>
        ))}
      </div>

      <p className="endurance-message">Keep going until you make a mistake!</p>
    </div>
  );
}

export default Quiz;