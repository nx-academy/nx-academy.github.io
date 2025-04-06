import { useState, useEffect } from "react"

function Component() {
    const [quizData, setQuizData] = useState(null)

    useEffect(() => {
        async function getQuizData() {
            const res = await fetch("/data/testQuiz.json")
            const quizData = await res.json()

            setQuizData(quizData.data)
        }

        getQuizData()
    }, [])

    console.log("====")
    console.log(quizData)
    console.log("====")

    return (
        <div>
            <h2>Hello, React!</h2>
            {
                quizData.length && (
                    <div>
                        <h3>Question: {quizData[0].question}</h3>
                        <ul>
                            {
                                quizData[0].options.map(option => (
                                    <li key={option}>{option}</li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default Component
