export default function DiceResultsSection(result) {
  return (
    result.length !== 0 && (
      <p>
        <ul>
          {[...result.keys()].map((k) => (
            <li key={k}>
              You rolled {result.get(k).length}d{k} and got{" "}
              {result.get(k).join(", ")}
              {console.log(result)}
            </li>
          ))}
        </ul>
      </p>
    )
  );
}
