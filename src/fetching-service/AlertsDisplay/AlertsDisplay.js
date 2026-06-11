import { useState } from "react";
import useFetchingApi from "../../fetching-service/FetchingFunction/FetchingFunction.js";
import Marquee from "react-fast-marquee";
import { useCMEPredictions } from "../../inner_content/CME_Predictions/useCMEPredictions";
import "./AlertsDisplay.css";

function UTCTime(TimeTag) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(TimeTag);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const dayOfWeek = date.getUTCDay();
  return `${daysOfWeek[dayOfWeek]} ${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

function LocalTime(TimeTag) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(TimeTag);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const dayOfWeek = date.getDay();
  return `${daysOfWeek[dayOfWeek]} ${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

function AlertsDisplay(dataKey, enlilData) {
  const [timeMode, setTimeMode] = useState("utc");
  const isUtc = timeMode === "utc";
  const formatTime = isUtc ? UTCTime : LocalTime;

  let CustomMessage = "";
  let AlertTitle = dataKey?.dataKey?.message ?? null;
  const { sortedImpacts } = useCMEPredictions();

  console.log(useCMEPredictions());

  let nextArrivals = [];

  for (let i = 0; i < sortedImpacts.length; i++) {
    nextArrivals.push(sortedImpacts[i]?.time);
  }

  let CMEAlertsMessage =
    sortedImpacts.length < 1
      ? ""
      : "*** Coronal Mass Ejection(s) detected | Estimated Arrival(s): " +
        `${nextArrivals}`;

  function line() {
    if (AlertTitle === null) {
      return (AlertTitle = "Loading...");
    } else {
      return AlertTitle.split("\n");
    }
  }

  console.log(sortedImpacts);

  return (
    <div className="AlertsDisplay">
      <button
        className="TimeButton"
        onClick={() =>
          setTimeMode((prev) => (prev === "utc" ? "local" : "utc"))
        }
      >
        {isUtc
          ? UTCTime(new Date()) + " UTC"
          : LocalTime(new Date()) + " GMT+2"}
      </button>
      <Marquee direction="left" speed="100" className="Marquee">
        {line(AlertTitle)[4]} &nbsp; | &nbsp; {line(AlertTitle)[6]} &nbsp;{" "}
        {line(AlertTitle)[7]}&nbsp; *** &nbsp; {CMEAlertsMessage} &nbsp;{" "}
        {CustomMessage}
      </Marquee>
    </div>
  );
}

export default AlertsDisplay;
