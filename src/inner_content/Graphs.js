import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';

import useFetchingApi from "../fetching-service/FetchingFunction";

function DestructInputData(SolarWind, IntMag) {
    // Take only the first 100 entries (newest, since array is newest-first)
    const recentSolarWind = SolarWind?.slice(0, 256) ?? [];
    const recentIntMag = IntMag?.slice(0, 128) ?? [];
    
    let WindSpeed = recentSolarWind.map(item => item?.proton_speed) ?? [];
    let Density = recentSolarWind.map(item => item?.proton_density) ?? [];
    let Temperature = recentSolarWind.map(item => item?.proton_temperature) ?? []; 
    const IMFBt = recentIntMag.map(item => item?.bt) ?? [];
    const IMFBz = recentIntMag.map(item => item?.gse_bz) ?? [];
    const TimeTags = recentSolarWind.map(item => item?.time_tag) ?? [];  // Extract time tags
    return [WindSpeed, Density, Temperature, IMFBt, IMFBz, TimeTags]; 
}

function DataHandling(InputData) {
    const windSpeedData = InputData[0];
    const timeData = InputData[5];
    
    // Filter out null/undefined values
    const filteredWindSpeed = [];
    const filteredTimes = [];
    
    for (let i = 0; i < windSpeedData.length; i++) {
        if (windSpeedData[i] !== null && windSpeedData[i] !== undefined) {
            filteredWindSpeed.push(windSpeedData[i]);
            filteredTimes.push(timeData[i]);
        }
    }
    
    // Check for duplicate timestamps
    const timeSet = new Set(filteredTimes);

    // Remove duplicates: keep only the first occurrence of each timestamp
    const seenTimes = new Set();
    const uniqueWindSpeed = [];
    const uniqueTimes = [];
    
    for (let i = 0; i < filteredWindSpeed.length; i++) {
        if (!seenTimes.has(filteredTimes[i])) {
            seenTimes.add(filteredTimes[i]);
            uniqueWindSpeed.push(filteredWindSpeed[i]);
            uniqueTimes.push(filteredTimes[i]);
        }
    }
    return [uniqueWindSpeed, uniqueTimes];
}

export function WindSpeedGraph() {
    const [SolarWind, IntMag] = useFetchingApi();
    const inputData = DestructInputData(SolarWind, IntMag);
    const [uData, xLabels] = DataHandling(inputData);  // uData is speeds, xLabels is times
    const margin = { right: 24 };

    return (
        <Box sx={{ width: 1200, height: 300}}>
            <LineChart
                series={[
                    { 
                        curve: "linear",
                        data: uData, 
                        label: 'Wind Speed',
                        showMark: false
                    },
                    
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels, height: 28 }]}  // Use time tags as labels
                yAxis={[{ width: 50 }]}
                margin={margin}
            />
        </Box>
    );
}

export function DensityGraph() {
    const [SolarWind, IntMag] = useFetchingApi();
    const inputData = DestructInputData(SolarWind, IntMag);
    const [uData, xLabels] = DataHandling(inputData);  // uData is speeds, xLabels is times
    const margin = { right: 24 };

    return (
        <Box sx={{ width: 1200, height: 300}}>
            <LineChart
                series={[
                    { 
                        curve: "linear",
                        data: uData, 
                        label: 'Density',
                        showMark: false
                    },
                    
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels, height: 28 }]}  // Use time tags as labels
                yAxis={[{ width: 50 }]}
                margin={margin}
            />
        </Box>
    );
}