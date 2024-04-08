export default function addNewSpell(
  newSpell,
  newDice,
  newSpellLevel,
  newUpcastDice,
  spells
) {
  if (spells.has(newSpell)) {
    throw new Error("Spell already exists");
  }
  let shouldSpellnameError = spells.has(newSpell);
  let parseDice = newDice.split("d");
  let shouldDiceError = parseDice.some((i) => {
    let ret = !Number.isInteger(parseInt(i));
    return ret;
  });
  if (shouldDiceError) {
    throw new Error("Not a valid roll");
  }
  let spellsUpdate = spells;
  spellsUpdate.set(newSpell, [newDice, newSpellLevel, newUpcastDice]);
  return new Map(spellsUpdate);
}
