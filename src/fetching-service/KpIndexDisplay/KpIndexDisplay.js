import { Gauge, gaugeClasses } from "@mui/x-charts";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { KpIndexGraph } from "../../inner_content/Graphs.js";
import { PopOverGraphs } from "../../inner_content/popover.js";
import "./KpIndex.css";

function KpCalculation(dataKey) {
  const currentvalue = dataKey?.dataKey?.[dataKey?.dataKey?.length - 1]?.Kp;
  const currentime = dataKey?.dataKey?.[dataKey?.dataKey?.length - 1]?.time_tag;

  const KpIndex = dataKey?.dataKey?.map((i) => i.Kp);
  const TimeTag = dataKey?.dataKey?.map((i) => i?.time_tag);

  //Array mit den Kp-Index Werten und den entsprechenden Winkelpositionen für die Gauge
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
  //Bestimmung der Winkelposition für die aktuelle Kp-Index Wert, um die Gauge entsprechend zu positionieren
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
  //Bestimmung der aktuellen geomagnetischen Sturmstärke und entsprechende Farbcodierung für die Gauge

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
      ? "#d89c6b"
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
      <div style={{ fontSize: "36px" }}>
        <PopOverGraphs
          DisplayString={"Kp-Index:"}
          PopOverString={<KpIndexGraph dataKey={[KpIndex, TimeTag]} />}
          PopOverStringStyling={{ color: "darkgray" }}
        />
      </div>
      <div style={{ fontSize: "12px" }}>
        Time: {KpTimeRangeTimeConverter(currentime) ?? "loading..."} UTC
      </div>
      <Gauge
        value={KpAngle}
        startAngle={-90}
        endAngle={90}
        innerRadius={"60%"}
        outerRadius={"100%"}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: "5vh",
            fontFamily: "Roboto",
            transform: "translate(0px, -33px)",
            fill: "#8B008B#",
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: StormColor,
          },
        }}
        text={() => "Kp" + `${currentvalue !== undefined ? currentvalue : "-"}`}
      />
      <div className="StormLevel">{StormLevel}</div>
      <div className="DataSource">Data Source: NOAA SWPC</div>
    </div>
  );
}

export default KpCalculation; //Export der Komponente
