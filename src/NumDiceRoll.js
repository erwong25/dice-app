import roll from "./dice";

export default function NumDiceRoll(diceSize, result) {
  let parseDice = diceSize.split("d");
  let shouldError = parseDice.some((i) => {
    let ret = !Number.isInteger(parseInt(i));
    return ret;
  });
  if (shouldError) {
    throw new Error("Not a valid roll");
  } else {
    if (parseDice.length === 2) {
      let resultUpdate = result;
      for (let i = 0; i < parseDice[0]; i++) {
        if (result.has(parseDice[1])) {
          resultUpdate.get(parseDice[1]).push(roll(parseDice[1]));
        } else {
          result.set(parseDice[1], [roll(parseDice[1])]);
        }
      }
      return new Map(resultUpdate);
    } else if (parseDice.length === 1) {
      let resultUpdate = result;
      if (result.has(parseDice[0])) {
        resultUpdate.get(parseDice[0]).push(roll(parseDice[0]));
      } else {
        result.set(parseDice[0], [roll(parseDice[0])]);
      }
      return new Map(resultUpdate);
    }
  }
}
