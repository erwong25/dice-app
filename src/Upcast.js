export default function upcast(spells, upcastLevel, spellSelected) {
  let spellLevel = spells.get(spellSelected)[1];
  if (upcastLevel === 9 || spellLevel === 9) {
    throw new Error("Already at max level, cannot be upcast");
  } else {
    return upcastLevel === "" ? spellLevel : upcastLevel + 1;
  }
}
