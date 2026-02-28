import { useCMEPredictions } from "./useCMEPredictions";

function CMEPredictions() {
  const { impacts, maxDiff } = useCMEPredictions();

  if (!impacts.length) return <div>Loading CME predictions…</div>;

  return (
    <div style={{"color": "whitesmoke"}}>
      <h4>Predicted CME arrivals</h4>
      <ul>
        {impacts.map((e, i) => (
          <li key={i}>
            {e.time}: Δdensity = {e.diff.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CMEPredictions;