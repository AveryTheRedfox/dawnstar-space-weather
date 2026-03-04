// src/inner_content/CME_Predictions/useCMEPredictions.js
import { useState, useEffect } from "react";
import FetchingApi from "../../fetching-service/FetchingFunction";

export function useCMEPredictions() {
  const [, , , , , , Enlil] = FetchingApi();    // only need Enlil here

  const [impacts, setImpacts] = useState([]);
  const [maxDiff, setMaxDiff] = useState(0);

  useEffect(() => {
    if (!Array.isArray(Enlil) || Enlil.length === 0) return;
    const compressed = Enlil.slice(0, 1406);
    const everyTenth = compressed.filter((_, idx) => idx % 18 === 17);

    const diffs = everyTenth
      .map((entry, idx) => {
        const cur = entry?.earth_particles_per_cm3 ?? 0;
        const nxt = everyTenth[idx + 1]?.earth_particles_per_cm3 ?? 0;
        return {
          time: everyTenth[idx + 1]?.time_tag || "unknown",
          diff: cur - nxt,
        };
      })
      .slice(0, -1);

      let CMEThreshold = 1;


    const events = [];
    for (let i = 1; i < diffs.length - 1; i++) {
      if (diffs[i].diff > CMEThreshold && diffs[i].diff > diffs[i - 1].diff && diffs[i].diff > diffs[i + 1].diff) {
        events.push(diffs[i]);
      }
    }

    setImpacts(events);
    setMaxDiff(events.length ? Math.max(...events.map((e) => e.diff)) : 0);
  }, [Enlil]);

  return { impacts, maxDiff };
}