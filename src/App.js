// @flow

import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import DiceResultsSection from "./DiceResultsSection";
import numDiceRoll from "./NumDiceRoll.js";
import * as React from "react";
import SpellsButtons from "./SpellsButtons.js";
import addNewSpell from "./AddNewSpell.js";
import deleteSpell from "./DeleteSpell.js";
import upcast from "./Upcast.js";

function App(): React.Node {
  const [diceSize, setDiceSize] = useState("");
  const [error, setError] = useState(null);
  const [spellError, setSpellError] = useState(null);
  const [removalError, setRemovalError] = useState(null);
  const [upcastError, setUpcastError] = useState(null);
  const [status, setStatus] = useState("typing");
  const [result, setResult] = useState(new Map<number, Array<number>>());
  const [cookie, setCookie] = useState("");
  const [newSpell, setNewSpell] = useState("");
  const [newDice, setNewDice] = useState("");
  const [newSpellLevel, setNewSpellLevel] = useState("");
  const [newUpcastDice, setNewUpcastDice] = useState("");
  const [spellToRemove, setSpellToRemove] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [spellSelected, setSpellSelected] = useState("");
  const [upcastLevel, setUpcastLevel] = useState("");
  const [spells, setSpells] = useState(
    new Map([
      ["sleep", ["5d8", 1, "2d8"]],
      ["cloud of daggers", ["4d4", 2, "2d4"]],
      ["eldritch blast", ["1d10", 0, "1d10"]],
      ["dissonant whispers", ["3d6", 1, "1d6"]],
    ])
  );

  function handleSubmit(e: Event) {
    e.preventDefault();
    setStatus("submitting");
    let numDice = spells.has(diceSize) ? spells.get(diceSize)[0] : diceSize;
    try {
      setResult(numDiceRoll(numDice, result)); //either returns result or throws error
      setError(null);
      setStatus("typing");
    } catch (err) {
      console.log(diceSize);
      setStatus("typing");
      setError(err);
    }
  }

  function spellSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      setSpells(
        addNewSpell(newSpell, newDice, newSpellLevel, newUpcastDice, spells)
      );
      spellSort();
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
      setSpells(deleteSpell(spellToRemove, spells));
      setRemovalError(null);
      setStatus("typing");
    } catch (err) {
      setStatus("typing");
      setRemovalError(err);
    }
  }

  function handleUpcast(e: SyntheticInputEvent<HTMLInputElement>) {
    e.preventDefault();
    try {
      setUpcastLevel(upcast(spells, upcastLevel, spellSelected));
      setUpcastError(null);
      setStatus("typing");
    } catch (err) {
      setStatus("typing");
      setUpcastError(err);
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
    setSpellToRemove(e.target.value);
  }

  function handleSearchareaChange(e: SyntheticInputEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  function handleSpelllevelareaChange(
    e: SyntheticInputEvent<HTMLInputElement>
  ) {
    setNewSpellLevel(e.target.value);
  }

  function handleUpcastdiceareaChange(
    e: SyntheticInputEvent<HTMLInputElement>
  ) {
    setNewUpcastDice(e.target.value);
  }

  function spellSort() {
    setSpells(new Map([...spells.entries()].sort()));
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
          <form>
            <input
              type="text"
              value={diceSize}
              onChange={handleTextareaChange}
              disabled={status === "submitting"}
            />
            {spellSelected !== "" && (
              <button onClick={handleUpcast}>Upcast</button>
            )}
            {upcastLevel !== "" && (
              <p>
                {spellSelected} upcast to level {upcastLevel}
              </p>
            )}
            {upcastError !== null && <p>{upcastError.message}</p>}
            <br />
            <button
              onClick={handleSubmit}
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
                        setDiceSize(spells.get(k)[0]);
                        setSpellSelected(k);
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
            Spell level:{" "}
            {/* I want to make this a dropdown, seems like bootstrap is popular option */}
            <input
              type="text"
              value={newSpellLevel}
              onChange={handleSpelllevelareaChange}
              disabled={status === "submitting"}
            />
            <br />
            Upcast additional dice:{" "}
            <input
              type="text"
              value={newUpcastDice}
              onChange={handleUpcastdiceareaChange}
              disabled={status === "submitting"}
            />
            <br />
            {newDice !== "" &&
            newSpell !== "" &&
            newSpellLevel !== "" &&
            newUpcastDice !== "" ? (
              <button
                type="submit"
                disabled={
                  newDice.length === 0 ||
                  newSpell.length === 0 ||
                  newSpellLevel.length === 0 ||
                  newUpcastDice.length === 0 ||
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
              value={spellToRemove}
              onChange={handleRemovalareaChange}
              disabled={status === "submitting"}
            />
            {spellToRemove !== "" && (
              <button
                type="submit"
                disabled={spellToRemove.length === 0 || status === "submitting"}
              >
                Remove Spell
              </button>
            )}
            {removalError !== null && (
              <p className="Error">{removalError.message}</p>
            )}
          </form>
          <button onClick={spellSort}>Sort spells</button>
          <button onClick={showCookies}>Show cookies</button>
          <br />
          <button onClick={clearOutputCookies}>Clear</button>
          {cookie}
        </header>
      </div>
    </>
  );
}

//

//Login, Profiles, DB
//Add extra values(level, upcast dice amount)
//---need to add extra values for new spells as well
//Upcasting (button for upcasting, how much it changes dice (take XdY and add value to Y), level of spell (limit how much it can be cast to higher level))
//Hide/show spells section (only manual input visible by default)
//Too many different state variable for error messages, consolidate to 1, have 2nd value to determine which section error is displayed

//Upcast does not change dice yet, need to implement
//HandleSubmit broken after changing value to array
//resetting the upcast

export default App;
