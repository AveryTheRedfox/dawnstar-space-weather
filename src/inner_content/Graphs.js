import Box from "@mui/material/Box";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts";
import useFetchingApi from "../fetching-service/FetchingFunction/FetchingFunction";
import { flex } from "@mui/system";

function IMFDataHandling(data) {
  const IMFBz = data?.dataKey?.[0]?.map((i) => i?.bz_gsm) ?? [];
  const IMFBt = data?.dataKey?.[0]?.map((i) => i?.bt) ?? [];
  const IMFTimes = data?.dataKey?.[0]?.map((i) => i?.time_tag) ?? [];
  const IMFSource = data?.dataKey?.[0]?.map((i) => i?.source) ?? [];

  const bt = [],
    bz = [],
    times = [];
  for (let i = 0; i < IMFTimes.length; i++) {
    if (
      IMFTimes[i] &&
      IMFBt[i] != null &&
      IMFBz[i] != null &&
      IMFSource[i] == "ACE"
    ) {
      bt.push(IMFBt[i]);
      bz.push(IMFBz[i]);
      times.push(IMFTimes[i]);
    }
  }
  return { bt, bz, times, IMFSource };
}
function DataHandling(InstrumentData, TimeTags) {
  // Filter out null/undefined values based on Solar Wind data
  const filteredInstrumentData = [];
  const filteredTimeTags = [];

  for (let i = 0; i < InstrumentData?.length; i++) {
    if (InstrumentData[i] !== null && InstrumentData[i] !== undefined) {
      filteredInstrumentData.push(InstrumentData[i]);
      filteredTimeTags.push(TimeTags[i]);
    }
  }

  // Check for duplicate timestamps
  const timeSet = new Set(filteredTimeTags);

  // Remove duplicates: keep only the first occurrence of each timestamp
  const seenTimes = new Set();
  const uniqueInstrumentData = [];
  const uniqueTimeTags = [];

  for (let i = 0; i < filteredInstrumentData.length; i++) {
    if (!seenTimes.has(filteredTimeTags[i])) {
      seenTimes.add(filteredTimeTags[i]);
      uniqueInstrumentData.push(filteredInstrumentData[i]);
      uniqueTimeTags.push(filteredTimeTags[i]);
    }
  }

  return [uniqueInstrumentData, uniqueTimeTags];
}

function TimeConverter(TimeTag) {
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
  const minutes = date.getMinutes();
  const dayOfWeek = date.getDate();
  const month = date.getMonth();
  return `${monthsOfYear[month]} ${dayOfWeek} ${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

function KpTimeRangeTimeConverter(TimeTag) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

export function IMFBzGraph(dataKey) {
  const { bz, times } = IMFDataHandling(dataKey); // uData is IMFBz, xLabels is IMF times
  const IMFBz = bz?.slice(0, 256);
  const IMFTimes = times?.slice(0, 256);
  const DisplayTimes = IMFTimes.map((t) => TimeConverter(t));

  return (
    <div
      style={{
        fontSize: "24px",
        backgroundColor: "rgb(50, 50, 54)",
        border: "0px",
      }}
    >
      Interplanetary Magnetic Field Orientation (Bz):
      <Box sx={{ width: 1600, height: 400, alignContent: flex }}>
        <LineChart
          grid={{ vertical: false, horizontal: true }}
          sx={{
            width: 1600,
            height: 400,
            ".MuiChartsAxis-tickLabel": { fill: "#ffffff" },
          }}
          series={[
            {
              curve: "linear",
              data: IMFBz,
              showMark: false,
              area: true,
            },
          ]}
          xAxis={[
            {
              scaleType: "point",
              data: DisplayTimes,
              height: 75,
              tickLabelInterval: (value, index) => index % 5 === 0,
              tickLabelStyle: { angle: -45 },
            },
          ]} // Use IMF time tags as labels
          yAxis={[
            {
              width: 50,
              colorMap: {
                type: "piecewise",
                thresholds: [0],
                colors: ["red", "green"],
              },
            },
          ]}
        />
      </Box>
    </div>
  );
}
export function IMFBtGraph(dataKey) {
  const { bt, bz, times } = IMFDataHandling(dataKey); // uData is IMFBt, xLabels is IMF times
  const IMFBt = bt?.slice(0, 256);
  const IMFTimes = times?.slice(0, 256);
  const DisplayTimes = IMFTimes.map((t) => TimeConverter(t));
  return (
    <div
      style={{
        fontSize: "24px",
        backgroundColor: "rgb(50, 50, 54)",
        border: "0px",
      }}
    >
      Interplanetary Magnetic Field Strength (Bt) in NanoTesla:
      <Box sx={{ width: 1600, height: 400, alignContent: flex }}>
        <LineChart
          grid={{ vertical: false, horizontal: true }}
          sx={{
            width: 1600,
            height: 400,
            ".MuiChartsAxis-tickLabel": { fill: "#ffffff" },
          }}
          series={[
            {
              curve: "linear",
              data: IMFBt,
              showMark: false,
              area: true,
            },
          ]}
          xAxis={[
            {
              scaleType: "point",
              data: DisplayTimes,
              height: 75,
              tickLabelInterval: (value, index) => index % 5 === 0,
              tickLabelStyle: { angle: -45 },
            },
          ]} // Use IMF time tags as labels
          yAxis={[
            {
              width: 50,
              colorMap: {
                type: "piecewise",
                thresholds: [10, 25, 50],
                colors: ["green", "orange", "red"],
              },
            },
          ]}
        />
      </Box>
    </div>
  );
}
export function WindSpeedGraph(dataKey) {
  const [windSpeed, times] = DataHandling(
    dataKey?.dataKey?.[0]?.slice(0, 512),
    dataKey?.dataKey?.[1]?.slice(0, 512)
  );
  const DisplayTimes = times.map((t) => TimeConverter(t));

  return (
    <div
      style={{
        fontSize: "24px",
        backgroundColor: "rgb(50, 50, 54)",
        border: "0px",
      }}
    >
      Solar Wind Speed in km/s:
      <Box sx={{ width: 1600, height: 400, alignContent: flex }}>
        <LineChart
          grid={{ vertical: false, horizontal: true }}
          sx={{
            width: 1600,
            height: 400,
            ".MuiChartsAxis-tickLabel": { fill: "#ffffff" },
          }}
          series={[
            {
              curve: "linear",
              data: windSpeed,
              showMark: false,
              area: true,
            },
          ]}
          xAxis={[
            {
              scaleType: "point",
              data: DisplayTimes,
              height: 75,
              tickLabelInterval: (value, index) => index % 5 === 0,
              tickLabelStyle: { angle: -45 },
            },
          ]} // Use Solar Wind time tags as labels
          yAxis={[
            {
              width: 50,
              colorMap: {
                type: "piecewise",
                thresholds: [400, 500, 700, 900],
                colors: ["green", "orange", "red", "darkred"],
                min: 200,
                max: 3000,
              },
            },
          ]}
        />
      </Box>
    </div>
  );
}
export function DensityGraph(dataKey) {
  const [density, times] = DataHandling(
    dataKey?.dataKey?.[0]?.slice(0, 512),
    dataKey?.dataKey?.[1]?.slice(0, 512)
  );
  const DisplayTimes = times.map((t) => TimeConverter(t));

  return (
    <div
      style={{
        fontSize: "24px",
        backgroundColor: "rgb(50, 50, 54)",
        border: "0px",
      }}
    >
      Solar Wind Density in p/cm³:
      <Box sx={{ width: 1600, height: 400 }}>
        <LineChart
          grid={{ vertical: false, horizontal: true }}
          sx={{
            width: 1600,
            height: 400,
            ".MuiChartsAxis-tickLabel": { fill: "#ffffff" },
          }}
          series={[
            {
              curve: "linear",
              data: density,
              showMark: false,
              area: true,
            },
          ]}
          xAxis={[
            {
              scaleType: "point",
              data: DisplayTimes,
              height: 75,
              tickLabelInterval: (value, index) => index % 5 === 0,
              tickLabelStyle: { angle: -45 },
            },
          ]} // Use Solar Wind time tags as labels
          yAxis={[
            {
              width: 50,
              colorMap: {
                type: "piecewise",
                thresholds: [10, 20, 40, 60],
                colors: ["green", "orange", "red", "darkred"],
              },
            },
          ]}
          margin={10}
        />
      </Box>
    </div>
  );
}
export function TemperatureGraph(dataKey) {
  const [temperature, times] = DataHandling(
    dataKey?.dataKey?.[0]?.slice(0, 512),
    dataKey?.dataKey?.[1]?.slice(0, 512)
  );
  const temperatureOffset = temperature?.map((value, index) => value / 1000);
  const DisplayTimes = times.map((t) => TimeConverter(t));

  return (
    <div
      style={{
        fontSize: "24px",
        backgroundColor: "rgb(50, 50, 54)",
        border: "0px",
      }}
    >
      Solar Wind Temperature in kiloKelvin:
      <Box sx={{ width: 1600, height: 400 }}>
        <LineChart
          grid={{ vertical: false, horizontal: true }}
          sx={{
            width: 1600,
            height: 400,
            ".MuiChartsAxis-tickLabel": { fill: "#ffffff" },
          }}
          series={[
            {
              curve: "linear",
              data: temperatureOffset,
              showMark: false,
              area: true,
            },
          ]}
          xAxis={[
            {
              scaleType: "point",
              data: DisplayTimes,
              height: 75,
              tickLabelInterval: (value, index) => index % 5 === 0,
              tickLabelStyle: { fontSize: 12 },
              tickLabelStyle: { angle: -45 },
            },
          ]} // Use Solar Wind time tags as labels
          yAxis={[
            {
              width: 50,
              colorMap: {
                type: "piecewise",
                thresholds: [30, 200, 500, 1000],
                colors: ["green", "orange", "red", "darkred"],
              },
            },
          ]}
        />
      </Box>
    </div>
  );
}
export function KpIndexGraph(dataKey) {
  const xLabels = dataKey?.dataKey?.[1];
  const uData = dataKey?.dataKey?.[0];
  const margin = { right: 24 };
  const DailyxLabels = xLabels.slice([xLabels.length - 31], [xLabels.length]);
  const DailyuData = uData.slice([xLabels.length - 31], [uData.length]);
  const DisplayTimes = DailyxLabels.map((t) => KpTimeRangeTimeConverter(t));

  function barLabel(item, context) {
    if ((item.value ?? 0) > 4) {
      return item.value?.toString();
    }
    return null;
  }

  return (
    <div
      style={{
        fontSize: "24px",
        backgroundColor: "rgb(50, 50, 54)",
        border: "0px",
        color: "#ffffff",
      }}
    >
      Estimated Kp-Index:
      <BarChart
        grid={{ vertical: false, horizontal: true }}
        sx={{
          width: 1600,
          height: 400,
          ".MuiChartsAxis-tickLabel": { fill: "#ffffff" },
        }}
        series={[
          {
            data: DailyuData,
            showMark: false,
            barLabel,
            barLabelPlacement: "outside",
          },
        ]}
        xAxis={[
          {
            data: DisplayTimes,
            height: 150,
            tickLabelStyle: { fontSize: 12, color: "white", angle: -45 },
            tickLabelInterval: (value, index) => index % 1 === 0,
          },
        ]}
        yAxis={[
          {
            width: 75,
            colorMap: {
              type: "piecewise",
              thresholds: [4.1, 5.1, 6.1, 7.1, 8.1, 9.1],
              colors: [
                "green",
                "yellow",
                "orange",
                "orangeRed",
                "red",
                "darkred",
              ],
              min: 0,
              max: 9,
            },
          },
        ]}
        borderRadius={5}
        margin={10}
      />
    </div>
  );
}
