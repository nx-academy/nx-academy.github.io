import "../styles/quiz.css";
import { useState, useEffect } from "react";

function Component({ slug }) {
  let [quizData, setQuizData] = useState(null);
  let [questionNumber, setQuestionNumber] = useState(0);
  let [answer, setAnswer] = useState(null);
  let [isAnswerSubmit, setIsAnswerSubmit] = useState(false);
  let [score, setScore] = useState(0)
  let [isQuizFinished, setIsQuizFinished] = useState(false)

  console.log(slug)

  useEffect(() => {
    async function getQuizData() {
      const res = await fetch(`/quiz/${slug}.json`);
      const quizData = await res.json();

      setQuizData(quizData.data);
    }

    getQuizData();
  }, []);

  function onSelectAnswer(selectedAnswer) {
    if (isAnswerSubmit) return

    setAnswer(selectedAnswer);
  }

  function onSubmitAnswer() {
    setIsAnswerSubmit(true)

    if (quizData[questionNumber].answer === answer) {
      console.log("=====");
      console.log("Bonne réponse");
      console.log("=====");
      setScore(score + 1)
    } else {
      console.log("=====");
      console.log("Mauvaise réponse");
      console.log("=====");
    }
  }

  function handleNextQuestion() {
    if (questionNumber + 1 === quizData.length) {
      setIsQuizFinished(true)
    } else {
      setQuestionNumber(questionNumber + 1)
      setIsAnswerSubmit(false)
    }
  }

  if (!quizData) return null

  if (isQuizFinished) {
    return (
      <div className="finished-quiz-wrapper">
        <p className="finished-quiz-title">C'est terminé !</p>
        <p className="finished-quiz-score">Vous avez obtenu: {score} sur {quizData.length}</p>
        <div>
          <a href="/">Faire un autre quiz</a>
          <a href="/quiz">Refaire le quiz</a>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-wrapper">
      {quizData && quizData.length && (
        <div>
          <p className="question-indicator">
            Question {questionNumber + 1} sur {quizData.length}
          </p>
          <p className="question">{quizData[questionNumber].question}</p>
          <ul className="questions-wrapper">
            {quizData[questionNumber].options.map((option) => (
              <li
                className={`answer ${option === answer ? "active" : ""} ${answer === quizData[questionNumber].answer && option === answer && isAnswerSubmit  ? "correct-answer" : ""} ${answer !== quizData[questionNumber].answer && option === answer && isAnswerSubmit  ? "wrong-answer" : ""}`}
                onClick={() => onSelectAnswer(option)}
                key={option}
              >
                {option}
              </li>
            ))}
          </ul>
          {isAnswerSubmit ? (
            <button onClick={() => handleNextQuestion()} className="submit-answer-btn">
              {
                questionNumber + 1 === quizData.length ? "Voir votre score" : "Question suivante"
              }
            </button>
          ) : (
            <button
              onClick={() => onSubmitAnswer()}
              className="submit-answer-btn"
            >
              Valider
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Component;
