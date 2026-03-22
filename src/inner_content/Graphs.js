import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
import useFetchingApi from "../fetching-service/FetchingFunction";


function DestructInputData(SolarWind, IntMag) {
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

  return [WindSpeed, Density, Temperature, IMFBt, IMFBz, SolarWindTimes, IntMagTimes, IntMagSource];
}


function IMFDataHandling(data) {
  const [ , , , IMFBt, IMFBz, , IntMagTimes, IntMagSource] = data;
  const bt = [], bz = [], times = [];
  for (let i = 0; i < IntMagTimes.length; i ++) {
    if (IntMagTimes[i] && IMFBt[i] != null && IMFBz[i] != null && IntMagSource[i] == "ACE") {
      bt.push(IMFBt[i]);
      bz.push(IMFBz[i]);
      times.push(IntMagTimes[i]);
    }
  }
  return { bt, bz, times };
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

export function IMFBzGraph() {
    const [SolarWind, IntMag] = useFetchingApi();
  const inputData = DestructInputData(SolarWind, IntMag);
  const { bz, times } = IMFDataHandling(inputData);  // uData is IMFBz, xLabels is IMF times
    const margin = { right: 24 };

    return (
    <div style={{"fontSize": "24px", "backgroundColor": "#5a5858", "border": "0px"}}>Solar Wind IMF Bz in nT:
        <Box sx={{ width: 1200, height: 300}}>
            
            <LineChart
                grid={{ vertical: false, horizontal: true }}
                series={[
                    { 
                        curve: "linear",
                        data: bz, 
                        showMark: false,
                        area: true,

                    },
                    
                ]}
                xAxis={[{ scaleType: 'point', 
                    data: times, 
                    height: 28,
                }]}  // Use IMF time tags as labels
                yAxis={[{ 
                    width: 50,
                    colorMap: {
                    type: 'piecewise',
                     thresholds: [0],
                     colors: ['red', 'green'],
                },
                }]}
                margin={margin}
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

    return (
    <div style={{"fontSize": "24px", "backgroundColor": "#5a5858", "border": "0px"}}>Solar Wind IMF Bt in nT:
        <Box sx={{ width: 1200, 
                   height: 300,
                }}>
            
            <LineChart
                grid={{ vertical: false, horizontal: true }}
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
                    data: times, 
                    height: 28, 
                    
                }]}  // Use IMF time tags as labels
                yAxis={[{ width: 50,
                    colorMap: {
                    type: 'piecewise',
                     thresholds: [10, 25, 50],
                     colors: ['green', 'orange', 'red'],
                },
                }]}
                margin={margin}
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

    return (
        <div style={{"fontSize": "24px", "backgroundColor": "#5a5858", "border": "0px"}}>Solar Wind Speed in km/s:
        <Box sx={{ width: 1200, height: 300}}>
            <LineChart
                grid={{ vertical: false, horizontal: true }}
                series={[
                    { 
                        curve: "linear",
                        data: uData, 
                        showMark: false
                    },
                    
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels, height: 28 }]}  // Use Solar Wind time tags as labels
                yAxis={[{ width: 50 }]}
                margin={margin}
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

    return (
    <div style={{"fontSize": "24px", "backgroundColor": "#5a5858", "border": "0px"}}>Solar Wind Density in p/cm³:
        <Box sx={{ width: 1200, height: 300}}>
            
            <LineChart
                grid={{ vertical: false, horizontal: true }}
                series={[
                    { 
                        curve: "linear",
                        data: uData, 
                        showMark: false
                    },
                    
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels, height: 28 }]}  // Use Solar Wind time tags as labels
                yAxis={[{ width: 50 }]}
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

    return (
    <div style={{"fontSize": "24px", "backgroundColor": "#5a5858", "border": "0px"}}>Solar Wind Temperature in kiloKelvin:
        <Box sx={{ width: 1200, height: 300}}>
            
            <LineChart
                grid={{ vertical: false, horizontal: true }}
                series={[
                    { 
                        curve: "linear",
                        data: uData, 
                        showMark: false
                    },
                    
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels, height: 28 }]}  // Use Solar Wind time tags as labels
                yAxis={[{ width: 50,
                    colorMap: {
                    type: 'piecewise',
                     thresholds: [10, 25, 50],
                     colors: ['green', 'orange', 'red'],
                },
                }]}
                margin={margin}
            />
         </Box>
        </div>
    );
}