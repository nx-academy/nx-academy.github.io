import { useState } from "react";

import "../styles/quiz.css";
import { firstQuiz } from "../data/quiz";

export default function Component() {
  let [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("");

  function onSelectOption(option: string) {
    console.log("=====");
    console.log(option);
    console.log("=====");

    setSelectedAnswer(option);
  }

  function onValidateAnswer() {
    console.log("===");
    console.log(selectedAnswer);
    console.log("===");

    if (selectedAnswer.length) {
      if (selectedAnswer === firstQuiz[currentQuestion].answer) {
        console.log("Ok, let's go!");
        setCurrentQuestion(currentQuestion + 1)
      } else {
        console.log("Nope!");
      }
    }
  }

  return (
    <div className="quiz-wrapper">
      <div className="question-wrapper">
        <p className="question-number">Question 1 sur 10</p>
        <p className="current-question">{firstQuiz[currentQuestion].question}</p>
      </div>
      <ul className="answers-wrapper">
        {firstQuiz[currentQuestion].options.map((option) => (
          <li
            className={`answer-btn ${selectedAnswer === option ? "active" : ""}`}
            onClick={() => onSelectOption(option)}
            key={option}
          >
            {option}
          </li>
        ))}

        <li className="validation-btn" onClick={() => onValidateAnswer()}>
          Valider la réponse
        </li>
      </ul>
    </div>
  );
}
