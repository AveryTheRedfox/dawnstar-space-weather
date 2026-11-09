import { Gauge, gaugeClasses } from "@mui/x-charts";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { KpIndexGraph } from "../../inner_content/Graphs.js";
import { PopOverGraphs } from "../../inner_content/popover.js";
import "./KpIndex.css";
import { useSpaceWeather } from "../../fetching-service/FetchingFunction/FetchingDataLogic.js";
import { useState } from "react";

function KpCalculation() {
  const [SolarWind, IntMag, KpIndex, Alerts, Flare, LatestFlare, Enlil, Ovation, HPIData, ForecastData, SunspotData, CMEData, MagnetopauseData, hp30, hp60, loading] = useSpaceWeather();
  const [dataSource, setDataSource] = useState("Kp-Index");

  if(!loading) {


  const KpIndexValues = KpIndex?.map((i) => i.Kp);
  const TimeTag = KpIndex?.map((i) => i?.time_tag);
  const hp30Values = JSON.parse(hp30);
  const hp30IndexValues = hp30Values.Hp30;
  const hp30TimeTag = hp30Values.datetime;
  const hp60Values = JSON.parse(hp60);
  const hp60IndexValues = hp60Values.Hp60;
  const hp60TimeTag = hp60Values.datetime;
const values = {
  "Kp-Index": {
    dataSource: "Kp-Index",
    values: KpIndexValues,
    timeTag: TimeTag,
    slicingLength: 31,
  },
  "Hp30-Index": {
    dataSource: "Hp30-Index",
    values: hp30IndexValues,
    timeTag: hp30TimeTag,
    slicingLength: 3 * 31,
  },
  "Hp60-Index": {
    dataSource: "Hp60-Index",
    values: hp60IndexValues,
    timeTag: hp60TimeTag,
    slicingLength: 3 * 31,
  }
};

  const currentvalue = values[dataSource]?.values?.[values[dataSource].values.length - 1] ?? "loading...";
  const currentime = values[dataSource]?.timeTag?.[values[dataSource].timeTag.length - 1] ?? "loading...";

  let AnglePosition = [
    [0, 0],
    [0.33, 3.33],
    [0.66, 6.66],
    [1, 10],
    [1.33, 13.33],
    [1.66, 16.66],
    [2, 20],
    [2.33, 23.33],
    [2.66, 26.66],
    [3, 30],
    [3.33, 33.33],
    [3.66, 36.66],
    [4, 40],
    [4.33, 43.33],
    [4.66, 46.66],
    [5, 50],
    [5.33, 53.33],
    [5.66, 56.66],
    [6, 60],
    [6.33, 63.33],
    [6.66, 66.66],
    [7, 70],
    [7.33, 73.33],
    [7.66, 76.66],
    [8, 80],
    [8.33, 83.33],
    [8.66, 86.66],
    [9, 100],
  ];

  let KpAngle = 0;
  for (let i = 0; i < AnglePosition.length; i++) {
    if (
      currentvalue >= AnglePosition[i][0] &&
      currentvalue < AnglePosition[i + 1][0]
    ) {
      KpAngle = AnglePosition[i][1];
      break;
    }
  }

  function KpTimeRangeTimeConverter(TimeTag) {
    const monthsOfYear = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dec",
    ];
    const date = new Date(TimeTag);
    const hours = date.getHours();
    const hourRange = hours + 3;
    const minutes = date.getMinutes();
    const dayOfWeek = date.getDate();
    const month = date.getMonth();
    return `${monthsOfYear[month]} ${dayOfWeek} ${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")} - ${hourRange
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  }

  let StormLevel =
    currentvalue < 4
      ? ""
      : currentvalue >= 4 && currentvalue < 5
      ? "Active Conditions"
      : currentvalue >= 5 && currentvalue < 6
      ? "G1 Minor Storm"
      : currentvalue >= 6 && currentvalue < 7
      ? "G2 Moderate Storm"
      : currentvalue >= 7 && currentvalue < 8
      ? "G3 Strong Storm"
      : currentvalue >= 8 && currentvalue < 9
      ? "G4 Severe Storm"
      : currentvalue >= 9
      ? "G5 Extreme Storm"
      : "";

  let StormColor =
    currentvalue < 4
      ? "#00fd15"
      : currentvalue >= 4 && currentvalue < 5
      ? "#eeff00"
      : currentvalue >= 5 && currentvalue < 6
      ? "#ca722a"
      : currentvalue >= 6 && currentvalue < 7
      ? "#ff6600"
      : currentvalue >= 7 && currentvalue < 8
      ? "#cf4d1a"
      : currentvalue >= 8 && currentvalue < 9
      ? "#6b1644"
      : currentvalue >= 9
      ? "#8B008B#"
      : "gray";



  return (
    <div className="KpIndexDisplay">
      <div className="KpIndexHeader">
      <div className="indexSelector">
        <button className="index-selector" onClick={() => setDataSource("Kp-Index")}>  <div class="index-label">Kp-Index</div></button>
        <button className="index-selector" onClick={() => setDataSource("Hp60-Index")}> <div class="index-label">Hp60-Index</div></button>
        <button className="index-selector" onClick={() => setDataSource("Hp30-Index")}> <div class="index-label">Hp30-Index</div></button>
      </div>
        <PopOverGraphs
          DisplayString={dataSource}
          PopOverString={<KpIndexGraph dataKey={[values[dataSource].values, values[dataSource].timeTag, values[dataSource].dataSource, values[dataSource].slicingLength]} />}
          DisplayStringStyling={{ color: "darkgray", textDecorationStyle: "solid", alignItems: "center", justifyContent: "center", textAlign: "center", fontSize: "1.5vw"}}
        />
      </div>
      <Gauge
        value={KpAngle}
        startAngle={-90}
        endAngle={90}
        innerRadius={"60%"}
        outerRadius={"100%"}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 30,
            fontFamily: 'Roboto',
            transform: 'translate(0px, -30px)',
            fill: '#ffffff',
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: StormColor,
          },
        }}
        text={() => "Kp" + `${currentvalue !== undefined ? currentvalue : "-"}`}
      />
      <div style={{ fontSize: "0.7vw" }}>
        Time: {currentime ?? "loading..."} UTC
      </div>
    </div>
  );
  }
}

export default KpCalculation; //Export der Komponente
