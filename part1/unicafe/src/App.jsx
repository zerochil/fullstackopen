import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={()=>{setGood(good+1)}}>good</button>
      <button onClick={()=>{setNeutral(neutral+1)}}>neutral</button>
      <button onClick={()=>{setBad(bad+1)}}>bad</button>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good+bad+neutral}</p>
      <p>average {(good-bad)/(good+bad+neutral)}</p>
      <p>positive {good*100/(good+bad+neutral)}%</p>
    </div>
  )
}

export default App