import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Statistics from './components/Statistics';
import Button from './components/Button';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let statistics = null

  let all =  good + neutral + bad

  if(all !== 0) {
  statistics = {
      good,
      neutral,
      bad,
      all,
      average: (good - bad) / all,
      positive: (good * 100) / all + " %"
    }
  }

  return (
    <div>
      <h3>give feedback</h3>
      <Button
        onClick={() => setGood(good + 1)}
        text={"good"}
      />
      <Button
        onClick={() => setNeutral(neutral + 1)}
        text={"neutral"}
      />
      <Button
        onClick={() => setBad(bad + 1)}
        text={"bad"}
      />
      <h3>statistics</h3>
      <Statistics statistics={statistics} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)