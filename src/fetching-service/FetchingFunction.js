
import { useState } from "react";
import { useEffect } from "react";

function FetchingApi() {

const [SolarWind, setSolarWind] = useState();
const [IntMag, setIntMag] = useState();
const [KpIndex, setKpIndex] = useState();
const [Alerts, setAlerts] = useState();
const [Flare, setFlare] = useState();
const [LatestFlare, setLatestFlare] = useState();
const [Enlil, setEnlil] = useState();
useEffect(() => {

async function FetchAll() {
    try {
        const [windResponse, imfResponse, kpResponse, alertsResponse, flareResponse, latestFlareResponse, enlilResponse] = await Promise.all([
            fetch('https://services.swpc.noaa.gov/json/rtsw/rtsw_wind_1m.json'),
            fetch('https://services.swpc.noaa.gov/json/ace/mag/ace_mag_1h.json'),
            fetch('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json'),
            fetch('https://services.swpc.noaa.gov/products/alerts.json'),
            fetch('https://services.swpc.noaa.gov/json/goes/primary/xrays-6-hour.json'),
            fetch('https://services.swpc.noaa.gov/json/goes/primary/xray-flares-latest.json'),
            fetch('https://services.swpc.noaa.gov/json/enlil_time_series.json'),

        ]);
        const [windResult, imfResult, kpResult, alertsResult, flareResult, latestFlareResult, enlilResult] = await Promise.all([
            windResponse.json(),
            imfResponse.json(),
            kpResponse.json(),
            alertsResponse.json(),
            flareResponse.json(),
            latestFlareResponse.json(),
            enlilResponse.json()
        ]);
        setSolarWind(windResult[0]);
        setIntMag(imfResult[1]);
        setKpIndex(kpResult);
        setAlerts(alertsResult[0], alertsResult[1]);
        setFlare(flareResult);
        setLatestFlare(latestFlareResult?.[0]?.max_class);
        setEnlil(enlilResult);
    } catch (error) {
        console.error("Error fetching all data:", error);
    }
    
}
FetchAll();
const interval = setInterval(() => {FetchAll();}, 60000);
}, []);
return [SolarWind, IntMag, KpIndex, Alerts, Flare, LatestFlare, Enlil];
}

export default FetchingApi;