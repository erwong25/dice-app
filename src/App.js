// @flow

import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import DiceResultsSection from "./DiceResultsSection";
import NumDiceRoll from "./NumDiceRoll.js";
import * as React from "react";
import SpellsButtons from "./SpellsButtons.js";
import AddNewSpell from "./AddNewSpell.js";
import DeleteSpell from "./DeleteSpell.js";

function App(): React.Node {
  const [diceSize, setDiceSize] = useState("");
  const [error, setError] = useState(null);
  const [spellError, setSpellError] = useState(null);
  const [removalError, setRemovalError] = useState(null);
  const [status, setStatus] = useState("typing");
  const [result, setResult] = useState(new Map<number, Array<number>>());
  const [cookie, setCookie] = useState("");
  const [newSpell, setNewSpell] = useState("");
  const [newDice, setNewDice] = useState("");
  const [removeSpell, setRemoveSpell] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [spells, setSpells] = useState(
    new Map([
      ["sleep", "5d8"],
      ["cloud of daggers", "2d4"],
      ["eldritch blast", "1d10"],
      ["dissonant whispers", "3d6"],
    ])
  );

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

  function spellSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      setSpells(AddNewSpell(newSpell, newDice, spells));
      setSpellError(null);
      setStatus("typing");
    } catch (err) {
      setStatus("typing");
      setSpellError(err);
    }
  }

  function spellRemoval(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      setSpells(DeleteSpell(removeSpell, spells));
      setRemovalError(null);
      setStatus("typing");
    } catch (err) {
      setStatus("typing");
      setRemovalError(err);
    }
  }

  function handleTextareaChange(e: SyntheticInputEvent<HTMLInputElement>) {
    setDiceSize(e.target.value);
  }

  function handleSpellareaChange(e: SyntheticInputEvent<HTMLInputElement>) {
    setNewSpell(e.target.value);
  }

  function handleDiceareaChange(e: SyntheticInputEvent<HTMLInputElement>) {
    setNewDice(e.target.value);
  }

  function handleRemovalareaChange(e: SyntheticInputEvent<HTMLInputElement>) {
    setRemoveSpell(e.target.value);
  }

  function handleSearchareaChange(e: SyntheticInputEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  document.cookie = "name=oeschger; SameSite=None; Secure";
  document.cookie = "favorite_food=tripe; SameSite=None; Secure";

  function showCookies() {
    setCookie(document.cookie);
  }

  function clearOutputCookies() {
    setCookie("");
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
          <p>
            {" "}
            {/* spellsbuttons */}
            {[...spells.keys()].map(
              (k) =>
                k.includes(searchValue) && (
                  <div>
                    <button
                      onClick={() => {
                        setDiceSize(spells.get(k));
                      }}
                    >
                      {k}
                    </button>
                    <br />
                  </div>
                )
            )}
          </p>
          <form>
            Search:{""}
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchareaChange}
              disabled={status === "submitting"}
            />
          </form>
          <p>Add a new spell</p>
          <form onSubmit={spellSubmit}>
            Spell name:{" "}
            <input
              type="text"
              value={newSpell}
              onChange={handleSpellareaChange}
              disabled={status === "submitting"}
            />
            <br />
            Dice rolled:{" "}
            <input
              type="text"
              value={newDice}
              onChange={handleDiceareaChange}
              disabled={status === "submitting"}
            />
            <br />
            {newDice !== "" && newSpell !== "" ? (
              <button
                type="submit"
                disabled={
                  newDice.length === 0 ||
                  newSpell.length === 0 ||
                  status === "submitting"
                }
              >
                Add Spell
              </button>
            ) : (
              <br />
            )}
            {spellError !== null && (
              <p className="Error">{spellError.message}</p>
            )}
          </form>
          <form onSubmit={spellRemoval}>
            Remove spell:{" "}
            <input
              type="text"
              value={removeSpell}
              onChange={handleRemovalareaChange}
              disabled={status === "submitting"}
            />
            {removeSpell !== "" && (
              <button
                type="submit"
                disabled={removeSpell.length === 0 || status === "submitting"}
              >
                Remove Spell
              </button>
            )}
            {removalError !== null && (
              <p className="Error">{removalError.message}</p>
            )}
          </form>
          <button onClick={showCookies}>Show cookies</button>
          <br />
          <button onClick={clearOutputCookies}>Clear</button>
          {cookie}
        </header>
      </div>
    </>
  );
}

//Login, Profiles, DB
//Upcasting (button for upcasting, how much it changes dice (take XdY and add value to Y), level of spell (limit how much it can be cast to higher level))
//Sorting Spells by alphabetical order (create new Map, add spells to map in alphabetical order, save new map)
//Hide/show spells section (only manual input visible by default)

//added search function

export default App;
