import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button clickHandler={()=>{setGood(good+1)}} text="good"/>
      <Button clickHandler={()=>{setNeutral(neutral+1)}} text="neutral"/>
      <Button clickHandler={()=>{setBad(bad+1)}} text="bad"/>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good+bad+neutral} />
      <StatisticLine text="average" value={(good-bad)/(good+bad+neutral)} />
      <StatisticLine text="positive" value={`${ good*100 / (good+bad+neutral) }%`} />
    </div>
  )
}

const Button = ({clickHandler, text}) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}

export default App