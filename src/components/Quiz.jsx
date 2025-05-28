import { useState, useEffect, useRef } from "react";

import "../styles/quiz.css";
import { suffleQuestions } from "../utils/suffleQuestions";

function Component({ slug }) {
  const clickAudioRef = useRef(null);
  const successAudioRef = useRef(null);
  const errorAudioRef = useRef(null);

  let [quizData, setQuizData] = useState(null);
  let [questionNumber, setQuestionNumber] = useState(0);
  let [answer, setAnswer] = useState(null);
  let [isAnswerSubmit, setIsAnswerSubmit] = useState(false);
  let [score, setScore] = useState(0);
  let [isQuizFinished, setIsQuizFinished] = useState(false);

  useEffect(() => {
    if (clickAudioRef.current) {
      clickAudioRef.current.load();
    }

    if (successAudioRef.current) {
      successAudioRef.current.load();
    }

    if (errorAudioRef.current) {
      errorAudioRef.current.load();
    }
  }, []);

  useEffect(() => {
    async function getQuizData() {
      const res = await fetch(`/quiz/${slug}.json`);
      const { data } = await res.json();

      const shuffledQuiz = suffleQuestions(data);
      setQuizData(shuffledQuiz);
    }

    getQuizData();
  }, []);

  function onSelectAnswer(selectedAnswer) {
    if (isAnswerSubmit) return;
    if (selectedAnswer === answer) return;

    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play();
    }

    setAnswer(selectedAnswer);
  }

  function onSubmitAnswer() {
    if (!answer) return;
    setIsAnswerSubmit(true);

    // Right answer
    if (quizData[questionNumber].answer === answer) {
      if (successAudioRef.current) {
        successAudioRef.current.currentTime = 0;
        successAudioRef.current.play();
      }

      setScore(score + 1);
    } else {
      errorAudioRef.current.currentTime = 0;
      errorAudioRef.current.play();
    }
  }

  function handleNextQuestion() {
    setAnswer(null);

    if (questionNumber + 1 === quizData.length) {
      setIsQuizFinished(true);
    } else {
      setQuestionNumber(questionNumber + 1);
      setIsAnswerSubmit(false);
    }
  }

  if (!quizData) return null;

  if (isQuizFinished) {
    return (
      <div className="finished-quiz-wrapper">
        <p className="finished-quiz-title">C'est terminé !</p>
        <p className="finished-quiz-score">
          Vous avez obtenu : {score} sur {quizData.length}
        </p>
        <div className="finished-quiz-btns">
          <a className="redo-quiz" href={`/quiz/${slug}`}>
            Refaire le quiz
          </a>
          <a className="go-back" href="/quiz">
            Faire un autre quiz
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-wrapper">
      <audio ref={clickAudioRef} style={{ display: "none" }}>
        <source src="/sounds/click.mp3" type="audio/mpeg" />
        <source src="/sounds/click.ogg" type="audio/ogg" />
      </audio>
      <audio ref={successAudioRef} style={{ display: "none" }}>
        <source src="/sounds/success.mp3" type="audio/mpeg" />
        <source src="/sounds/success.ogg" type="audio/ogg" />
      </audio>
      <audio ref={errorAudioRef} style={{ display: "none" }}>
        <source src="/sounds/error.mp3" type="audio/mpeg" />
        <source src="/sounds/error.ogg" type="audio/ogg" />
      </audio>
      {quizData && quizData.length && (
        <div className="quiz-inner-container">
          <div className="question-wrapper">
            <p className="question-indicator">
              Question {questionNumber + 1} sur {quizData.length}
            </p>
            <p className="question">{quizData[questionNumber].question}</p>
            {isAnswerSubmit && (
              <>
                {answer === quizData[questionNumber].answer ? (
                  <p className="explanation-title explanation-title-right">
                    Bonne réponse !
                  </p>
                ) : (
                  <p className="explanation-title explanation-title-wrong">
                    Mauvaise réponse !
                  </p>
                )}
                <p className="explanation">
                  {quizData[questionNumber].explanation}
                </p>
              </>
            )}
          </div>
          <div className="options-container">
            <ul className="options-wrapper">
              {quizData[questionNumber].options
                .map((option) => (
                <li
                  className={`answer ${option === answer ? "active" : ""} ${answer === quizData[questionNumber].answer && option === answer && isAnswerSubmit ? "correct-answer" : ""} ${answer !== quizData[questionNumber].answer && option === answer && isAnswerSubmit ? "wrong-answer" : ""}`}
                  onClick={() => onSelectAnswer(option)}
                  key={option}
                >
                  {option}
                </li>
              ))}
            </ul>
            {isAnswerSubmit ? (
              <button
                onClick={() => handleNextQuestion()}
                className="submit-answer-btn"
              >
                {questionNumber + 1 === quizData.length
                  ? "Voir votre score"
                  : "Question suivante"}
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
        </div>
      )}
    </div>
  );
}

export default Component;
