import { useState } from "react";

import "../styles/quiz.css";
import { firstQuiz } from "../data/quiz";

export default function Component() {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  let [currentQuestion, setCurrentQuestion] = useState(0);
  let [isAnswerValidated, setIsAnswerValidated] = useState(false);
  let [score, setScore] = useState(0)

  function onValidateAnswer() {
    if (selectedAnswer.length) {
      setIsAnswerValidated(true);
    }

    if (selectedAnswer === firstQuiz[currentQuestion].answer) {
      setScore(score + 1)
    }
  }

  function onMoveToNextQuestion() {
    setIsAnswerValidated(false);
    setSelectedAnswer("");
    setCurrentQuestion(currentQuestion + 1);
  }


  if (currentQuestion === firstQuiz.length) {
    return (
      <div className="score-wrapper">
        <p>Le quiz est terminé.</p>
        <p>Votre score est de</p>
        <p>{score}</p>
        <p>sur {firstQuiz.length}</p>
      </div>
    )
  }

  return (
    <div className="quiz-wrapper">
      <div className="question-wrapper">
        <p className="question-number">Question {currentQuestion + 1} sur {firstQuiz.length}</p>
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

          <p>
            {firstQuiz[currentQuestion].explaination}
          </p>

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
              onClick={() => setSelectedAnswer(option)}
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
