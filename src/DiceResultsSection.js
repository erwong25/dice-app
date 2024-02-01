export default function DiceResultsSection(result) {
  return (
    result.length !== 0 && (
      <p>
        <ul>
          {[...result.keys()].map((k) => (
            <li key={k}>
              You rolled {result.get(k).length}d{k} and got{" "}
              {/* uhh what why is that {" "} at the end? when i delete it and save the auto formatting adds it backa*/}
              {result.get(k).join(", ")}
            </li>
          ))}
        </ul>
      </p>
    )
  );
}
