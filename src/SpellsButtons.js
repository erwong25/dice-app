export default function SpellsButtons(spells) {
  return (
    <p>
      {[...spells.keys()].map((k) => (
        <div>
          <button>{k}</button>
          <br />
        </div>
      ))}
    </p>
  );
}
