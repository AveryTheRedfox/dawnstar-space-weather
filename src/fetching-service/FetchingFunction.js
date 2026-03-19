
import { useState } from "react";
import { useEffect } from "react";

function useFetchingApi() {

const [SolarWind, setSolarWind] = useState();
const [IntMag, setIntMag] = useState();
const [KpIndex, setKpIndex] = useState();
const [Alerts, setAlerts] = useState();
const [Flare, setFlare] = useState();
const [LatestFlare, setLatestFlare] = useState();
const [Enlil, setEnlil] = useState();
const [Ovation, setOvation] = useState();

useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function FetchAll() {
        try {
            const [windResponse, imfResponse, kpResponse, alertsResponse, flareResponse, latestFlareResponse, enlilResponse, ovationResponse] = await Promise.all([
                fetch('https://services.swpc.noaa.gov/json/rtsw/rtsw_wind_1m.json', {signal}),
                fetch('https://services.swpc.noaa.gov/json/ace/mag/ace_mag_1h.json', {signal}),
                fetch('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json', {signal}),
                fetch('https://services.swpc.noaa.gov/products/alerts.json', {signal}),
                fetch('https://services.swpc.noaa.gov/json/goes/primary/xrays-1-day.json', {signal}),
                fetch('https://services.swpc.noaa.gov/json/goes/primary/xray-flares-latest.json', {signal}),
                fetch('https://services.swpc.noaa.gov/json/enlil_time_series.json', {signal}),
                fetch('https://services.swpc.noaa.gov/json/ovation_aurora_latest.json', {signal}),
            ]);
            const [windResult, imfResult, kpResult, alertsResult, flareResult, latestFlareResult, enlilResult, ovationResult] = await Promise.all([
                windResponse.json(),
                imfResponse.json(),
                kpResponse.json(),
                alertsResponse.json(),
                flareResponse.json(),
                latestFlareResponse.json(),
                enlilResponse.json(),
                ovationResponse.json(),
            ]);
            setSolarWind(windResult);
            setIntMag(imfResult);
            setKpIndex(kpResult);
            setAlerts(alertsResult[0], alertsResult[1]);
            setFlare(flareResult);
            setLatestFlare(latestFlareResult?.[0]?.max_class);
            setEnlil(enlilResult);
            setOvation(ovationResult);
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error("Error fetching all data:", error);
            }
        }
    }

    FetchAll();
    const interval = setInterval(FetchAll, 60000);

   
    return () => {
        clearInterval(interval);
        controller.abort(); 
    };
}, []);

return [SolarWind, IntMag, KpIndex, Alerts, Flare, LatestFlare, Enlil, Ovation];
}

export default useFetchingApi;