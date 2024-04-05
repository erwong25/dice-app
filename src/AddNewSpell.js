export default function addNewSpell(
  newSpell,
  newDice,
  newSpellLevel,
  newUpcastDice,
  spells
) {
  let shouldSpellnameError = spells.has(newSpell);
  let parseDice = newDice.split("d");
  let shouldDiceError = parseDice.some((i) => {
    let ret = !Number.isInteger(parseInt(i));
    return ret;
  });
  if (shouldDiceError) {
    throw new Error("Not a valid roll");
  } else if (shouldSpellnameError) {
    throw new Error("Spell already exists");
  } else {
    let spellsUpdate = spells;
    spellsUpdate.set(newSpell, [newDice, newSpellLevel, newUpcastDice]);
    return new Map(spellsUpdate);
  }
}
