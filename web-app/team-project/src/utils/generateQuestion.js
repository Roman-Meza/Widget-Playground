function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function getMaximumNumber(difficulty) {
  switch (difficulty) {
    case "Easy":
      return 10;
    case "Medium":
      return 50;
    case "Hard":
      return 100;
    default:
      return 10;
  }
}

function generateWrongAnswers(correctAnswer) {
  const answers = new Set([correctAnswer]);

  while (answers.size < 4) {
    const difference = randomNumber(-10, 10);

    if (difference === 0) {
      continue;
    }

    answers.add(Math.max(0, correctAnswer + difference));
  }

  return shuffleArray(Array.from(answers));
}

export function generateQuestion(settings) {
  const maxNumber = getMaximumNumber(settings.difficulty);
  const operations = ["Addition", "Subtraction", "Multiplication", "Division"];
  const operation = settings.operation === "Mixed"
    ? operations[randomNumber(0, operations.length - 1)]
    : settings.operation;

  let number1 = randomNumber(1, maxNumber);
  let number2 = randomNumber(1, maxNumber);
  let correctAnswer = 0;
  let symbol = "";

  switch (operation) {
    case "Addition":
      correctAnswer = number1 + number2;
      symbol = "+";
      break;
    case "Subtraction":
      if (number2 > number1) {
        [number1, number2] = [number2, number1];
      }
      correctAnswer = number1 - number2;
      symbol = "-";
      break;
    case "Multiplication":
      correctAnswer = number1 * number2;
      symbol = "×";
      break;
    case "Division": {
      const divisor = randomNumber(1, maxNumber);
      const answer = randomNumber(1, maxNumber);
      number1 = divisor * answer;
      number2 = divisor;
      correctAnswer = answer;
      symbol = "÷";
      break;
    }
  }

  return {
    text: `${number1} ${symbol} ${number2} = ?`,
    correctAnswer,
    options: generateWrongAnswers(correctAnswer),
  };
}