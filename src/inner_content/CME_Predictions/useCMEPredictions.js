// src/inner_content/CME_Predictions/useCMEPredictions.js
import { useState, useEffect } from "react";
import useFetchingApi from "../../fetching-service/FetchingFunction/FetchingFunction";
import IntMagDisplay from "../../fetching-service/ImfDisplay/ImfDisplay";


export function useCMEPredictions() {
  const [, , , , , , Enlil] = useFetchingApi();    // only need Enlil here

  const [impacts, setImpacts] = useState([]);


//Einstellen der Schwelle ab wann ein CME als CME angesehen wird. Schwelle ist definiert als:
// DensityCurrent[i] / DensityNext[i - 1]
  let CMEThreshold = 0.7;

  useEffect(() => {
    if (!Array.isArray(Enlil) || Enlil.length === 0) return;
    const compressed = Enlil;
    const everyTenth = compressed.filter((_, idx) => idx % 10 === 0);
    const diffs = everyTenth
      .map((entry, idx) => {
        const cur = entry?.earth_particles_per_cm3;
        const nxt = everyTenth[idx + 1]?.earth_particles_per_cm3;
        return {
          time: everyTenth[idx + 1]?.time_tag || "unknown",
          diff: cur - nxt,
        };
      })
      .slice(0, -1);

    let events = [];

    for (let i = 1; i < diffs.length - 1; i++) {
      if (diffs[i].diff > CMEThreshold && diffs[i].diff > diffs[i - 1].diff && diffs[i].diff > diffs[i + 1].diff) {
        events.push(diffs[i])
      }
    }
    setImpacts(events);
  }, [Enlil]);
  return { impacts, CMEThreshold };
  
}