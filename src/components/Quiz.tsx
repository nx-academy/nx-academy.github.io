import { useState } from "react";

import "../styles/quiz.css";
import { firstQuiz } from "../data/quiz";

export default function Component() {
  let [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  let [isAnswerValidated, setIsAnswerValidated] = useState(false);

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
      setIsAnswerValidated(true);
    }
  }

  function onMoveToNextQuestion() {
    setIsAnswerValidated(false);
    setSelectedAnswer("");
    setCurrentQuestion(currentQuestion + 1);
  }

  return (
    <div className="quiz-wrapper">
      <div className="question-wrapper">
        <p className="question-number">Question 1 sur 10</p>
        <p className="current-question">
          {firstQuiz[currentQuestion].question}
        </p>
      </div>
      {isAnswerValidated ? (
        <div>
          {selectedAnswer === firstQuiz[currentQuestion].answer ? (
            <p>C'est correct !</p>
          ) : (
            <div>
              <p>C'est faux !</p>
              <p>La bonne réponse était </p>
              <p>{firstQuiz[currentQuestion].answer}</p>
            </div>
          )}

          <p onClick={() => onMoveToNextQuestion()} className="validation-btn">
            Passer à la prochaine question
          </p>
        </div>
      ) : (
        <ul className="answers-wrapper">
          {firstQuiz[currentQuestion].options.map((option) => (
            <li
              className={`answer-btn ${
                selectedAnswer === option ? "active" : ""
              }`}
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
      )}
    </div>
  );
}
