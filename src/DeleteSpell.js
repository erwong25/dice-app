export default function deleteSpell(spellToRemove, spells) {
  if (!spells.has(spellToRemove)) {
    throw new Error("Spell does not exist");
  }
  let spellsUpdate = spells;
  spellsUpdate.delete(spellToRemove);
  return new Map(spellsUpdate);
}
