import { useState } from "react";

import { firstQuiz } from "../data/quiz";

export default function Component() {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const firstQuestion = firstQuiz[0];

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

    if (selectedAnswer === firstQuestion.answer) {
      console.log("Ok, let's go!");
    } else {
      console.log("Nope!");
    }
  }

  return (
    <div>
      <div>
        <p>Question 1 sur 10</p>
        <p>{firstQuestion.question}</p>
      </div>
      <ul>
        {firstQuestion.options.map((option) => (
          <li onClick={() => onSelectOption(option)} key={option}>
            {option}
          </li>
        ))}

        <li onClick={() => onValidateAnswer()}>Valider la réponse</li>
      </ul>
    </div>
  );
}
