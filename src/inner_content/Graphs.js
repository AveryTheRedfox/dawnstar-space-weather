import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts';
import useFetchingApi from "../fetching-service/FetchingFunction/FetchingFunction";
import { flex } from '@mui/system';

function DestructInputData(SolarWind, IntMag, KpIndex) {
  const recentSolarWind = SolarWind?.slice(0, 512) ?? [];
  const recentIntMag = IntMag?.slice(0, 256) ?? [];

  const WindSpeed = recentSolarWind.map(i => i?.proton_speed) ?? [];
  const Density = recentSolarWind.map(i => i?.proton_density) ?? [];
  const Temperature = recentSolarWind.map(i => i?.proton_temperature) ?? [];
  const SolarWindTimes = recentSolarWind.map(i => i?.time_tag) ?? [];

  const IMFBt = recentIntMag.map(i => i?.bt) ?? [];
  const IMFBz = recentIntMag.map(i => i?.bz_gsm) ?? [];
  const IntMagTimes = recentIntMag.map(i => i?.time_tag) ?? [];
  const IntMagSource = recentIntMag.map(i => i?.source) ?? [];

  const GeoMagKp = KpIndex?.slice(0, 256) ?? [];

  return [WindSpeed, Density, Temperature, IMFBt, IMFBz, SolarWindTimes, IntMagTimes, IntMagSource, GeoMagKp];
}

function IMFDataHandling(data) {
  const [ , , , IMFBt, IMFBz, , IntMagTimes, IntMagSource] = data;
 
  const bt = [], bz = [], times = [];
  for (let i = 0; i < IntMagTimes.length; i ++) {
    if (IntMagTimes[i] && IMFBt[i] != null && IMFBz[i] != null && IntMagSource[i] == "ACE") {
      bt.push(IMFBt[i]);
      bz.push(IMFBz[i]);
      times.push(IntMagTimes[i]);
    }}
  return { bt, bz, times};
}
function DataHandling(InputData) {
    const windSpeedData = InputData[0];
    const timeData = InputData[5];  // Solar Wind TimeTags
    const DensityData = InputData[1];
    const TemperatureData = InputData[2];

    console.log(TemperatureData);
    // Filter out null/undefined values based on Solar Wind data
    const filteredWindSpeed = [];
    const filteredTimes = [];
    const filteredDensity = [];
    const filteredTemperature = [];

    for (let i = 0; i < windSpeedData.length; i++) {
        if (windSpeedData[i] !== null && windSpeedData[i] !== undefined) {
            filteredWindSpeed.push(windSpeedData[i]);
            filteredTimes.push(timeData[i]);
            filteredDensity.push(DensityData[i]);
            filteredTemperature.push(TemperatureData[i] / 1000);

        }
    }
 
    // Check for duplicate timestamps
    const timeSet = new Set(filteredTimes);

    // Remove duplicates: keep only the first occurrence of each timestamp
    const seenTimes = new Set();
    const uniqueWindSpeed = [];
    const uniqueTimes = [];
    const uniqueDensity = [];
    const uniqueTemperature = [];
    
    for (let i = 0; i < filteredWindSpeed.length; i++) {
        if (!seenTimes.has(filteredTimes[i])) {
            seenTimes.add(filteredTimes[i]);
            uniqueWindSpeed.push(filteredWindSpeed[i]);
            uniqueTimes.push(filteredTimes[i]);
            uniqueDensity.push(filteredDensity[i]);
            uniqueTemperature.push(filteredTemperature[i]);
  
        }
    }


    return [uniqueWindSpeed, uniqueTimes, uniqueDensity, uniqueTemperature];
}

function TimeConverter(TimeTag) {

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']
    const date = new Date(TimeTag);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const dayOfWeek = date.getDate();
    const month = date.getMonth();
    return `${monthsOfYear[month]} ${dayOfWeek} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
export function IMFBzGraph() {
  const [SolarWind, IntMag] = useFetchingApi();
  const inputData = DestructInputData(SolarWind, IntMag);
  const { bz, times } = IMFDataHandling(inputData);  // uData is IMFBz, xLabels is IMF times
 const margin = { right: 24 };
const DisplayTimes = times.map(t => TimeConverter(t));

    return (
    <div style={{"fontSize": "24px", "backgroundColor": "#5a5858", "border": "0px"}}>Interplanetary Magnetic Field Orientation (Bz): 
        <Box sx={{ width: 1600, height: 400, alignContent: flex}}>
            <LineChart
                grid={{ vertical: false, horizontal: true }}
                sx={{width: 1600, height: 400}}
                series={[
                    { 
                        curve: "linear",
                        data: bz, 
                        showMark: false,
                        area: true,
                    },
                ]}
                xAxis={[{ scaleType: 'point', 
                    data: DisplayTimes, 
                    height: 45,
                    tickLabelInterval: (value, index) => index % 5 === 0,
                    tickLabelStyle: {angle: -45},
                }]}  // Use IMF time tags as labels
                yAxis={[{ 
                    width: 50,
                    colorMap: {
                    type: 'piecewise',
                     thresholds: [0],
                     colors: ['red', 'green'],
                },
                }]}
            />
         </Box>
        </div>
    );
}
export function IMFBtGraph() {
  const [SolarWind, IntMag] = useFetchingApi();
  const inputData = DestructInputData(SolarWind, IntMag);
  const { bt, bz, times } = IMFDataHandling(inputData); // uData is IMFBt, xLabels is IMF times
    const margin = { right: 24 };
    const DisplayTimes = times.map(t => TimeConverter(t));

    return (
    <div style={{"fontSize": "24px", "backgroundColor": "#5a5858", "border": "0px"}}>Interplanetary Magnetic Field Strength (Bt) in NanoTesla:
        <Box sx={{ width: 1600, height: 400, alignContent: flex}}>
            <LineChart
                grid={{ vertical: false, horizontal: true }}
                sx={{width: 1600, height: 400}}
                series={[
                    { 
                        curve: "linear",
                        data: bt, 
                        showMark: false,
                        area: true,
                    },
                ]}
                xAxis={[{ 
                    scaleType: 'point', 
                    data: DisplayTimes, 
                    height: 45, 
                    tickLabelInterval: (value, index) => index % 5 === 0,
                    tickLabelStyle: {angle: -45},
                }]}  // Use IMF time tags as labels
                yAxis={[{ width: 50,
                    colorMap: {
                    type: 'piecewise',
                     thresholds: [10, 25, 50],
                     colors: ['green', 'orange', 'red'],
                },
                }]}
            />
         </Box>
        </div>
    );
}
export function WindSpeedGraph() {
    const [SolarWind, IntMag] = useFetchingApi();
    const inputData = DestructInputData(SolarWind, IntMag);
    const [uData, xLabels] = DataHandling(inputData);  // uData is speeds, xLabels is Solar Wind times
    const margin = { right: 24 };
    const DisplayTimes = xLabels.map(t => TimeConverter(t));

    return (
        <div style={{"fontSize": "24px", "backgroundColor": "#5a5858", "border": "0px"}}>Solar Wind Speed in km/s:
        <Box sx={{ width: 1600, height: 500, alignContent: flex}}>
            <LineChart
                grid={{ vertical: false, horizontal: true }}
                sx={{width: 1600, height: 500}}
                series={[
                    { 
                        curve: "linear",
                        data: uData, 
                        showMark: false,
                        area: true,
                    },
                    
                ]}
                xAxis={[{ scaleType: 'point', data: DisplayTimes, height: 60, tickLabelInterval: (value, index) => index % 5 === 0 , tickLabelStyle: {angle: -45}}]}  // Use Solar Wind time tags as labels
                yAxis={[{ width: 70, 
                    colorMap: {
                    type: 'piecewise',
                    thresholds: [400, 500, 700, 900],
                    colors: ['green', 'orange', 'red', 'darkred'],
                    min: 200,
                    max: 3000,
                },
                }]}
                height={450}
            />
        </Box>
        </div>
    );
}
export function DensityGraph() {
    const [SolarWind, IntMag] = useFetchingApi();
    const inputData = DestructInputData(SolarWind, IntMag);
    const [, xLabels, uData] = DataHandling(inputData);  // uData is density, xLabels is Solar Wind times
    const margin = { right: 24 };
    const DisplayTimes = xLabels.map(t => TimeConverter(t));

    return (
    <div style={{"fontSize": "24px", "backgroundColor": "#5a5858", "border": "0px"}}>Solar Wind Density in p/cm³:
        <Box sx={{ width: 1200, height: 300}}>
            
            <LineChart
                grid={{ vertical: false, horizontal: true }}
                series={[
                    { 
                        curve: "linear",
                        data: uData, 
                        showMark: false,
                        area: true,
                    },
                    
                ]}
                xAxis={[{ scaleType: 'point', data: DisplayTimes, height: 28, tickLabelInterval: (value, index) => index % 3 === 0 , tickLabelStyle: {angle: -45}}]}  // Use Solar Wind time tags as labels
                yAxis={[{ width: 50,
                    colorMap: {
                    type: 'piecewise',
                     thresholds: [10, 20, 40, 60],
                     colors: ['green', 'orange', 'red', 'darkred'],
                },
                }]}
                margin={margin}
            />
         </Box>
        </div>
    );
}
export function TemperatureGraph() {
    const [SolarWind, IntMag] = useFetchingApi();
    const inputData = DestructInputData(SolarWind, IntMag);
    const [, xLabels, , uData] = DataHandling(inputData);  // uData is temperature, xLabels is Solar Wind times
    const margin = { right: 24 };
    const DisplayTimes = xLabels.map(t => TimeConverter(t));

    return (
    <div style={{"fontSize": "24px", "backgroundColor": "#5a5858", "border": "0px"}}>Solar Wind Temperature in kiloKelvin:
        <Box sx={{ width: 1200, height: 300}}>
            
            <LineChart
                grid={{ vertical: false, horizontal: true }}
                series={[
                    { 
                        curve: "linear",
                        data: uData, 
                        showMark: false,
                        area: true,
                    },
                    
                ]}
                xAxis={[{ scaleType: 'point', data: DisplayTimes, height: 28, tickLabelInterval: (value, index) => index % 3 === 0, tickLabelStyle: { fontSize: 12 }, tickLabelStyle: {angle: -45} }]}  // Use Solar Wind time tags as labels
                yAxis={[{ width: 50,
                    colorMap: {
                    type: 'piecewise',
                     thresholds: [30, 200, 500, 1000],
                     colors: ['green', 'orange', 'red', 'darkred'],
                },
                }]}
                margin={margin}
            />
         </Box>
        </div>
    );
}
export function KpIndexGraph() {
    const [SolarWind, IntMag, KpIndex] = useFetchingApi();
    const inputData = DestructInputData(SolarWind, IntMag, KpIndex);
    const xLabels = inputData[8].map(i => i?.time_tag) ?? [];  // KpIndex time tags
    const uData = inputData[8].map(i => i?.Kp) ?? [];
    const margin = { right: 24 };
    console.log(xLabels);
    const DailyxLabels = xLabels.slice(0, 59);
    const DailyuData = uData.slice(0, 59);
    const DisplayTimes = DailyxLabels.map(t => TimeConverter(t));


function barLabel(item, context) {
    if((item.value ?? 0) > 4) {
        return item.value?.toString();
    }
    return null;
}

    return (
    <div style={{"fontSize": "24px", "backgroundColor": "rgb(50, 50, 54)", "border": "0px", "margin": "-5px"}}>Estimated Kp-Index:
            <BarChart
                grid={{ vertical: false, horizontal: true }}
                sx={{width: 1600, height: 400}}
                series={[
                    { 
                        data: DailyuData, 
                        showMark: false,
                        barLabel,
                        barLabelPlacement: 'outside',
                    },
                     
                ]}
                xAxis={[{ scaleType: 'band', data: DisplayTimes, height: 100, tickLabelStyle: { fontSize: 12 }, tickLabelStyle: {angle: -45} }]}  // Use Solar Wind time tags as labels
                yAxis={[{ width: 50,
                    colorMap: {
                    type: 'piecewise',
                     thresholds: [4.1, 5.1, 6.1, 7.1, 8.1 ,9.1],
                     colors: ['green', 'yellow', 'orange', 'orangeRed', 'red', 'darkred'],
                     min: 0,
                     max: 9,
                     },
                }]}
                borderRadius={5}
                margin={10}
               
            />
        </div>
    );
}
