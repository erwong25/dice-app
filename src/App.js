// @flow

import logo from "./logo.svg";
import "./App.css";
import roll from "./dice.js";
import { useState } from "react";
import DiceResultsSection from "./DiceResultsSection";
import React from "react";

function App(): React.Node {
  const [diceSize, setDiceSize] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");
  const [result, setResult] = useState(new Map<number, Array<number>>());

  function handleSubmit(e: Event) {
    e.preventDefault();
    setStatus("submitting");
    let diceSizeInt = parseInt(diceSize);
    let shouldError = diceSizeInt <= 0 || isNaN(diceSizeInt);
    try {
      if (shouldError) {
        throw new Error("Not a valid number");
      }
      else if (result.has(diceSizeInt)) {
        let resultUpdate = result;
        resultUpdate.get(diceSizeInt).push(rollDice(diceSizeInt));
        setResult(new Map(resultUpdate));
      } else {
        let resultUpdate = result;
        result.set(diceSizeInt, [rollDice(diceSizeInt)]);
        setResult(new Map(resultUpdate));
      }
      setStatus("typing");
    } catch (err) {
      setStatus("typing");
      setError(err);
    }
  }

  function handleTextareaChange(e: SyntheticInputEvent<HTMLInputElement>) {
    setDiceSize(e.target.value);
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <p>How many sides?</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={diceSize}
              onChange={handleTextareaChange}
              disabled={status === "submitting"}
            />
            <br />
            <button
              type="submit"
              disabled={diceSize.length === 0 || status === "submitting"}
            >
              Submit
            </button>
            {error !== null && <p className="Error">{error.message}</p>}
            {DiceResultsSection(result)}
          </form>
        </header>
      </div>
    </>
  );
}

function rollDice(diceSize: String): number {
    return roll(diceSize);
}

//presets
//  display names of presets
//  multiple dice
//  adding presets
//sums

//conversion to flow
//

export default App;
