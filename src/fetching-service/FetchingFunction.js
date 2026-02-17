import {useEffect, useState} from 'react';




function SolarDataFetching() {

const [IMFBt, setIMFBt] = useState();
const [IMFBz, setIMFBz] = useState();
const [Density, setDensity] = useState();
const [WindSpeed, setWindSpeed] = useState();
const [Temperature, setTemperature] = useState();
const [KpIndex, setKpIndex] = useState();

async function fetchdata() {
const imffetch = await fetch('https://services.swpc.noaa.gov/json/dscovr/dscovr_mag_1s.json');
const speedfetch = await fetch('https://services.swpc.noaa.gov/json/rtsw/rtsw_wind_1m.json');
const kpfetch = await fetch('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json');
const imfresult = await imffetch.json();
const speedresult = await speedfetch.json();
const kpresult = await kpfetch.json(); 

    setIMFBt([imfresult[0].bt])
    setIMFBz([imfresult[0].bz_gse])
    setDensity([speedresult[0].proton_density])
    setWindSpeed([speedresult[0].proton_speed])
    setTemperature([speedresult[0].proton_temperature])
    setKpIndex([kpresult[350].kp_index])
        
    } setTimeout(function() { fetchdata(); }, 6000);
 
}

export default SolarDataFetching; 

 