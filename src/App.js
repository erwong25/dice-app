import logo from './logo.svg';
import './App.css';
import roll from './dice.js';
import { useState } from 'react';
import genDisplay from './displayDice';

function App() {
  const [diceSize, setDiceSize] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');
  const [result, setResult] = useState(new Map(
    [
      ['5', [3]],
      ['8', [4, 5]]
    ]
  )); 

// setResult(
//   if(result.has(diceSize)){
//     result.get(diceSize).push(rollDice)
//   }else{
//     result.set(diceSize, [rollDice])
//   }
// )

// setResult([
//   ...result,
//   {
//     sizeRolled: diceSize,
//     resultRolled: await rollDice(diceSize)}
// ])

//   for(let i = 0; i < inputString.length; i++){
//     let char = inputString[i]
//         if(charMap.has(char)){
//            charMap.get(char).push(i)  
//         }else{
//            charMap.set(char, [i])
//         }
// }

// ******  update Map code found online (does this work? and how does it work)*******
// const updateMap = (k,v) => {
//   setMyMap(new Map(myMap.set(k,v)));
// }

//Does 54-60 look good? Is there a better way?


async function handleSubmit(e) {
  e.preventDefault();
  setStatus('submitting');
  try {
    if(result.has(diceSize)){
      let resultUpdate = result;
      resultUpdate.get(diceSize).push(await rollDice(diceSize));
    setResult(new Map(resultUpdate))
  }else{
      let resultUpdate = result;
      result.set(diceSize, [await rollDice(diceSize)]);
    setResult(new Map(resultUpdate))
  };
    setStatus('typing');
  } catch (err) {
    setStatus('typing');
    setError(err);
  }
}

function handleTextareaChange(e) {
  setDiceSize(e.target.value);
}

  return (
    <>
      <div className="App">
      <header className="App-header">
      <p>
        How many sides?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={diceSize}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={
          diceSize.length === 0 ||
          status === 'submitting'
        }>
          Submit
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
        {result !== ([]) &&
          <p>
            <ul>
              {[...result.keys()].map(k => (
                <li key={k}>You rolled {result.get(k).length}d{k} and got {result.get(k).toString()}</li>
              ))}
            </ul>
            {/* {result.map((results) => {
            return <li> You rolled a {result.get(results)} and got a {result.get(results)}</li>
            })} */}
          </p>
        }
      </form>
      </header>
    </div>
    </>
  );
}

function rollDice(diceSize) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let diceSizeInt = parseInt(diceSize)
      let shouldError = diceSizeInt <= 0 || isNaN(diceSizeInt)
      if (shouldError) {
        reject(new Error('Not a valid number'));
      } else {
        let ret = roll(diceSizeInt)
        resolve(ret);
      }
    }, 1500);
  });
}

// function makeText(result) {
  // const resultText = [] 
  // for 
// }


export default App;

