import React, { useState } from 'react'

const Counter = () => {

  const [counterValue, setCounterValue] = useState(0);
  const [inputValue, setInputValue] = useState(1);

  const subtractFromCounter =() => setCounterValue(counterValue-inputValue)
  const addToCounter =() => setCounterValue(counterValue+inputValue)



  return (
    <div>
        <h3 data-testid="title">Counter in TDD test</h3>
        <h2 data-testid="counter">{counterValue}</h2>
        <button data-testid="subtract-btn"
        onClick={subtractFromCounter}>-</button>
        <input style={{ textAlign: "center"}}
        data-testid="input"
        type="number" value={inputValue}
        onChange ={(e) => setInputValue(parseInt(e.target.value))}/>
        <button data-testid="add-btn"
        onClick={addToCounter}
        >+</button>
    </div>
  )
}

export default Counter