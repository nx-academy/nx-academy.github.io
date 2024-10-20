import { firstQuiz } from "../data/quiz";

export default function Component() {
  const firstQuestion = firstQuiz[0];

  function onSelectOption(option: string) {
    console.log("=====")
    console.log(option)
    console.log("=====")
  }

  function onValidateAnswer() {
    console.log("===")
    console.log("===")
    console.log("===")
  }

  return (
    <div>
      <div>
        <p>Question 1 sur 10</p>
        <p>{firstQuestion.question}</p>
      </div>
      <ul>
        {firstQuestion.options.map((option) => (
          <li onClick={() => console.log(option)} key={option}>{option}</li>
        ))}

        <li onClick={() => onValidateAnswer()}>Valider la réponse</li>
      </ul>
    </div>
  );
}
