import { useState } from "react";
import useFetchingApi from "../../fetching-service/FetchingFunction/FetchingFunction.js";
import Marquee from "react-fast-marquee";
import { useCMEPredictions } from "../../inner_content/LowerContentComponents/CMECenter/useCMEPredictions.js";
import { MouseHoverPopoverCME } from "../../inner_content/popover.js";
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

function AlertsDisplay(dataKey) {
  const [timeMode, setTimeMode] = useState("utc");
  const isUtc = timeMode === "utc";
  const formatTime = isUtc ? UTCTime : LocalTime;

function TimeConverter(TimeTag) {
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


  let CustomMessage = "";
  let AlertTitle = dataKey?.dataKey?.[0]?.message ?? null;
  const { sortedImpacts } = useCMEPredictions(0.7, dataKey.dataKey[1]);

console.log(dataKey?.dataKey?.[1]);

  let nextArrivals = [];

  for (let i = 0; i < sortedImpacts.length; i++) {
    nextArrivals.push(sortedImpacts[i]);
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
      <MouseHoverPopoverCME 
      PopOverString={<div>In this Dashboard you can hover over most static text like "Wind Speed" or "Density" to get Graphs for the specified data". <br></br> Some others also feature a small description text
      <br></br> <b>All data currently displayed is provided by the Space Weather Prediction Center, and this page is not affiliated with them in any way!</b> </div>}
      DisplayString={<img src={require("./info_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png")} style={{"border": "2px solid gray", "borderRadius": "10px"}}/>}/>
      <Marquee direction="left" speed="100" className="Marquee">
        {line(AlertTitle)[4]} &nbsp; | &nbsp; {line(AlertTitle)[6]} &nbsp;{" "}
        {line(AlertTitle)[7]}&nbsp; *** &nbsp; {CMEAlertsMessage} &nbsp;{" "}
        {CustomMessage}
      </Marquee>
    </div>
  );
}

export default AlertsDisplay;
