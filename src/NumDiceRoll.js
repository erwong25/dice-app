import roll from "./dice";

export default function numDiceRoll(diceSize, result) {
  let parseDice = diceSize.split("d");
  let shouldError = parseDice.some((i) => {
    let ret = !Number.isInteger(parseInt(i));
    return ret;
  });
  if (shouldError) {
    throw new Error("Not a valid roll");
  }
  //   if (parseDice.length === 2) {
  //     for (let i = 0; i < parseDice[0]; i++) {
  //       if (result.has(parseDice[1])) {
  //         result.get(parseDice[1]).push(roll(parseDice[1]));
  //       } else {
  //         result.set(parseDice[1], [roll(parseDice[1])]);
  //       }
  //     }
  //     return new Map(result);
  //   } else if (parseDice.length === 1) {
  //     if (result.has(parseDice[0])) {
  //       result.get(parseDice[0]).push(roll(parseDice[0]));
  //     } else {
  //       result.set(parseDice[0], [roll(parseDice[0])]);
  //     }
  //     return new Map(result);
  //   }
  // }
  if (parseDice.length === 2) {
    for (let i = 0; i < parseDice[0]; i++) {
      console.log();
      let oldResult = result.get(parseDice[1]) ?? [];
      result.set(parseDice[1], oldResult.push(roll(parseDice[1])));
    }
    return new Map(result);
  } else if (parseDice.length === 1) {
    let oldResult = result.get(parseDice[0]) ?? [];
    result.set(parseDice[1], oldResult.push(roll(parseDice[0])));
    return new Map(result);
  }
}
