import "../styles/quiz.css";
import { useState, useEffect } from "react";

function Component() {
  let [quizData, setQuizData] = useState(null);
  let [questionNumber, setQuestionNumber] = useState(0)
  let [answer, setAnswer] = useState(null);

  useEffect(() => {
    async function getQuizData() {
      const res = await fetch("/data/testQuiz.json");
      const quizData = await res.json();

      setQuizData(quizData.data);
    }

    getQuizData();
  }, []);

  function onSelectAnswer(selectedAnswer) {
    setAnswer(selectedAnswer);
  }

  function onSubmitAnswer() {
    if (quizData[0].answer === answer) {
      console.log("=====")
      console.log("Bonne réponse")
      console.log("=====")
    } else {
      console.log("=====")
      console.log("Mauvaise réponse")
      console.log("=====")
    }
  }

  return (
    <div className="quiz-wrapper">
      {quizData && quizData.length && (
        <div>
          <h2>Question: {quizData[0].question}</h2>
          <ul className="questions-wrapper">
            {quizData[0].options.map((option) => (
              <li
                className={`question ${option === answer ? "active" : ""}`}
                onClick={() => onSelectAnswer(option)}
                key={option}
              >
                {option}
              </li>
            ))}
          </ul>
          <button onClick={() => onSubmitAnswer()} className="submit-answer-btn">Soumettre votre réponse</button>
        </div>
      )}
    </div>
  );
}

export default Component;
