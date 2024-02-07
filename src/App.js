// @flow

import logo from "./logo.svg";
import "./App.css";
import roll from "./dice.js";
import { useState } from "react";
import DiceResultsSection from "./DiceResultsSection";
import * as React from "react";

function App(): React.Node {
  const [diceSize, setDiceSize] = useState("");
  const [joinDice, setJoinDice] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");
  const [result, setResult] = useState(new Map<number, Array<number>>());

  //how to parse 2d8 instead of single number
  //  let diceSizeInt = parseInt(diceSize); only takes a single number
  // let shouldError = diceSizeInt <= 0 || isNaN(diceSizeInt); also only works if it is a single number
  // resolve this issue by building it around an array instead of single number
  // first thing is to take the input and turn it into an array
  // it also has to split using the d
  // find some way to make sure it works even if the d is in the middle of a word, should be fine since other things wont be numbers

  function handleSubmit(e: Event) {
    e.preventDefault();
    setStatus("submitting");
    setJoinDice(diceSize.split("d"));
    let parseDice = diceSize.split("d");
    // shouldError should be true if any of the elements in the array are not numbers
    let shouldError = parseDice.some((i) => {
      let ret = !Number.isInteger(parseInt(i));
      console.log(i, ret);
      return ret;
    });
    console.log("shouldError:", shouldError);
    //arrow function, need to understand the syntax better (structure, which part means what, maybe when to use it?)
    //setParseDice is async or parseDice is async so its not updating before the rest of the code goes through
    //need to call the split somewhere else probably
    //implement for loop, where do i start the loop? do i do it before try or do it inside that around the if/else part
    try {
      if (shouldError) {
        throw new Error("Not a valid number");
      } else {
        setError(null);
      }

      if (parseDice.length == 2) {
        for (let i = 0; i < parseDice[0]; i++) {
          if (result.has(parseDice[1])) {
            let resultUpdate = result;
            resultUpdate.get(parseDice[1]).push(roll(parseDice[1]));
            setResult(new Map(resultUpdate));
          } else {
            let resultUpdate = result;
            result.set(parseDice[1], [roll(parseDice[1])]);
            setResult(new Map(resultUpdate));
          }
        }
      }
      if (parseDice.length == 1) {
        if (result.has(parseDice[0])) {
          let resultUpdate = result;
          resultUpdate.get(parseDice[0]).push(roll(parseDice[0]));
          setResult(new Map(resultUpdate));
        } else {
          let resultUpdate = result;
          result.set(parseDice[0], [roll(parseDice[0])]);
          setResult(new Map(resultUpdate));
        }
      }
      setStatus("typing");
    } catch (err) {
      setStatus("typing");
      setError(err);
    }
  }

  // function handleSubmit(e: Event) {
  //   e.preventDefault();
  //   setStatus("submitting");
  //   if (diceSize.includes("d")) {
  //     setResult(
  //       new Map([
  //         ["5", [3]],
  //         ["8", [4, 5]],
  //       ])
  //     );
  //     setStatus("typing");
  //   } else {
  //     let diceSizeInt = parseInt(diceSize);
  //     let shouldError = diceSizeInt <= 0 || isNaN(diceSizeInt);
  //     try {
  //       if (shouldError) {
  //         throw new Error("Not a valid number");
  //       } else {
  // let resultUpdate = result;
  // result.has(diceSizeInt)
  //   ? resultUpdate.get(diceSizeInt).push(roll(diceSize))
  //   : result.set(diceSizeInt, [roll(diceSize)]);
  // setResult(new Map(resultUpdate));
  //       }
  //       setStatus("typing");
  //     } catch (err) {
  //       setStatus("typing");
  //       setError(err);
  //     }
  //   }
  // }

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
              //what value={diceSize} mean? I think its saying that the value SHOULD be the value of diceSize but it isn't mandating anything
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
            {joinDice.join(", ")}
          </form>
        </header>
      </div>
    </>
  );
}

//presets
//  display names of presets
//  multiple dice
//  adding presets
//sums

//be able to understand XdY as X dice Y times
//be able to accept d (since its NaN) and then split the 2 values and utilize them

export default App;
