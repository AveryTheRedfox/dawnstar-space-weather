// src/inner_content/CME_Predictions/useCMEPredictions.js
import { useState, useEffect } from "react";
import useFetchingApi from "../../../fetching-service/FetchingFunction/FetchingFunction";

export function TimeConverter(TimeTag) {
    const monthsOfMonth = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(TimeTag);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const dayOfWeek = date.getDate();
    const month = date.getMonth();
    const DayAppendage =
      dayOfWeek == 1
        ? "st"
        : dayOfWeek == 2
        ? "nd"
        : dayOfWeek == 3
        ? "rd"
        : "th";
    return `${monthsOfMonth[month]} ${dayOfWeek + DayAppendage} ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  }


export function useCMEPredictions(CMEThreshold, dataKey) {

  const [impacts, setImpacts] = useState([]);
  const [sortedImpacts, setSortedImpacts] = useState([]);



  useEffect(() => {
    if (!Array.isArray(dataKey?.dataKey) || dataKey?.dataKey.length === 0) return;
    const compressed = dataKey.dataKey;
    const everyTenth = compressed.filter((_, idx) => idx % 10 === 0);

    const diffs = everyTenth
      .map((entry, idx) => {
        const cur = entry?.earth_particles_per_cm3;
        const nxt = everyTenth[idx + 1]?.earth_particles_per_cm3;
        return {
          time: TimeConverter(everyTenth[idx + 1]?.time_tag) || "unknown",
          diff: cur - nxt,
        };
      })
      .slice(0, -1);


    let events = [];

    for (let i = 1; i < diffs.length - 1; i++) {
      if (
        diffs[i].diff > CMEThreshold &&
        diffs[i].diff > diffs[i - 1].diff &&
        diffs[i].diff > diffs[i + 1].diff
      ) {
        events.push(diffs[i]);
      }
    }
    setImpacts(events);

    function asce(a, b) {
      return a - b;
    }

    if (impacts.length != undefined) {
      setSortedImpacts(impacts.sort(asce));
    } else {
      setSortedImpacts(impacts);
    }
  }, [dataKey, CMEThreshold]);

  return { sortedImpacts };
}
