
import { useState } from "react";
import { useEffect } from "react";

function FetchingApi() {

const [SolarWind, setSolarWind] = useState();
const [IntMag, setIntMag] = useState();
const [KpIndex, setKpIndex] = useState();
const [Alerts, setAlerts] = useState();
const [Flare, setFlare] = useState();
const [LatestFlare, setLatestFlare] = useState();

useEffect(() => {
async function WindFetching() {
    try {
        const response = await fetch('https://services.swpc.noaa.gov/json/rtsw/rtsw_wind_1m.json');
        const result = await response.json();
        setSolarWind(result[0]);
    } catch (error) {
        console.error("Error", error);
    }
}setTimeout(function() { WindFetching(); }, 6000);

async function ImfFetching() {
    try {
    const response = await fetch('https://services.swpc.noaa.gov/json/ace/mag/ace_mag_1h.json');
    const result = await response.json();
    setIntMag(result[1]);
    } catch (error) {
        console.error("Error", error);
    }
}setTimeout(function() { ImfFetching(); }, 6000);

async function KpFetching() {
    try {
    const response = await fetch('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json');
    const result = await response.json();
    setKpIndex(result);
    } catch (error) {
        console.error("Error", error);
    }
}setTimeout(function() { KpFetching(); }, 6000);

async function AlertsFetching() {
    try {
    const response = await fetch('https://services.swpc.noaa.gov/products/alerts.json');
    const result = await response.json(); 
    setAlerts(result[0]);
    } catch (error) {
        console.error("Error", error);
    }
}setTimeout(function() { AlertsFetching(); }, 6000);

async function FlareFetching() {
    try {   
    const response = await fetch('https://services.swpc.noaa.gov/json/goes/primary/xrays-6-hour.json');
    const result = await response.json(); 
    setFlare(result);
    } catch (error) {
        console.error("Error", error);
    }
}setTimeout(function() { FlareFetching(); }, 6000);

async function LatestFlateFetching() {
    try {
        const response = await fetch('https://services.swpc.noaa.gov/json/goes/primary/xray-flares-latest.json');
        const result = await response.json();
        setLatestFlare(result[0].max_class); 
        console.log(result);
    } catch (error) {
        console.error("Error", error);
    }
}setTimeout(function() { LatestFlateFetching(); }, 6000);
});


return([SolarWind, IntMag, KpIndex, Alerts, Flare, LatestFlare]);
}

export default FetchingApi;