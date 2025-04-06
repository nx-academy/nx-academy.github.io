import { useState } from "react"

function Component() {
    const [counter, setCounter] = useState(0)

    return (
        <div>
            <h2>Hello, React!</h2>
            <p>The counter is: {counter}</p>
            <button onClick={() => setCounter(counter + 1)}>Increment counter</button>
        </div>
    )
}

export default Component
