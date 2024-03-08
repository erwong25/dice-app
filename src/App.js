// @flow

import logo from "./logo.svg";
import "./App.css";
import roll from "./dice.js";
import { useState } from "react";
import DiceResultsSection from "./DiceResultsSection";
import NumDiceRoll from "./NumDiceRoll.js";
import * as React from "react";
import SpellsButtons from "./SpellsButtons.js";

function App(): React.Node {
  const [diceSize, setDiceSize] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("typing");
  const [result, setResult] = useState(new Map<number, Array<number>>());
  const [cookie, setCookie] = useState("");
  const [spells, setSpells] = useState(
    new Map([
      ["sleep", "5d8"],
      ["cloud of daggers", "2d4"],
    ])
  );

  //how to parse 2d8 instead of single number
  //  let diceSizeInt = parseInt(diceSize); only takes a single number
  // let shouldError = diceSizeInt <= 0 || isNaN(diceSizeInt); also only works if it is a single number
  // resolve this issue by building it around an array instead of single number
  // first thing is to take the input and turn it into an array
  // it also has to split using the d
  // find some way to make sure it works even if the d is in the middle of a word, should be fine since other things wont be numbers

  //hard code map
  //generate buttons for each spell in map

  function handleSubmit(e: Event) {
    e.preventDefault();
    setStatus("submitting");
    let NumDice = spells.has(diceSize) ? spells.get(diceSize) : diceSize;
    try {
      setResult(NumDiceRoll(NumDice, result)); //either returns result or throws error
      setError(null);
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

  document.cookie = "name=oeschger; SameSite=None; Secure";
  document.cookie = "favorite_food=tripe; SameSite=None; Secure";

  function showCookies() {
    setCookie(document.cookie);
  }

  function clearOutputCookies() {
    setCookie("");
  }

  function SpelltoForm(k) {
    // console.log("currentvalue", k);
    // document.getElementById("currentSize").value = k;
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <p>How many sides?</p>
          <form onSubmit={handleSubmit}>
            <input
              id="currentSize"
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
          {/* {SpellsButtons(spells)} */}
          <p>
            {[...spells.keys()].map((k) => (
              <div>
                <button>{k}</button>
                <br />
              </div>
            ))}
          </p>
          <button onClick={showCookies}>Show cookies</button>
          <br />
          <button onClick={clearOutputCookies}>Clear</button>
          {cookie}
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
