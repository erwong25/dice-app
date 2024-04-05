export default function deleteSpell(removeSpell, spells) {
  let shouldRemovalError = !spells.has(removeSpell);
  if (shouldRemovalError) {
    throw new Error("Spell does not exist");
  } else {
    let spellsUpdate = spells;
    spellsUpdate.delete(removeSpell);
    return new Map(spellsUpdate);
  }
}
