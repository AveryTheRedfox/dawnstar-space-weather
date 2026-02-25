
import { useState } from "react";
import { useEffect } from "react";

function FetchingApi() {

const [SolarWind, setSolarWind] = useState();
const [IntMag, setIntMag] = useState();
const [KpIndex, setKpIndex] = useState();

useEffect(() => {
async function WindFetching() {

    const response = await fetch('https://services.swpc.noaa.gov/json/rtsw/rtsw_wind_1m.json');
    const result = await response.json();
    setSolarWind(result[0]);
}setTimeout(function() { WindFetching(); }, 6000);

async function ImfFetching() {

    const response = await fetch('https://services.swpc.noaa.gov/json/ace/mag/ace_mag_1h.json');
    const result = await response.json();
    setIntMag(result[0]);
}setTimeout(function() { ImfFetching(); }, 6000);

async function KpFetching() {

    const response = await fetch('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json');
    const result = await response.json();
    setKpIndex(result[0]);
}setTimeout(function() { KpFetching(); }, 6000);
})

return([SolarWind, IntMag, KpIndex])
}

export default FetchingApi;