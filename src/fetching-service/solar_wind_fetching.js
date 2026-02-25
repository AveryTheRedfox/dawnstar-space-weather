
import {useState, useEffect} from 'react';



function WindSpeedCalculation() {

const [Density, setDensity] = useState(null);
const [WindSpeed, setWindSpeed] = useState(null);
const [Temperature, setTemperature] = useState(null);
useEffect(() => {

async function fetchData() {
    const response = await fetch('https://services.swpc.noaa.gov/json/rtsw/rtsw_wind_1m.json');
    const result = await response.json();
        if (result == undefined || result == null) {
       setDensity("No Data");
       setWindSpeed("No Data");
       setTemperature("No Data");
        } else {
    setDensity([result[0].proton_density]);
    setWindSpeed([result[0].proton_speed]);
    setTemperature([result[0].proton_temperature]);
    console.log(Density, WindSpeed, Temperature);
        }
}
setTimeout(function() { fetchData(); }, 6000);
});


return ( 
    <div>
        <div>Wind Speed: {WindSpeed} Km/s </div>
        <div>Density: {Density} p/cm^3</div>
        <div>Temperature: {Temperature/1000} kK </div>
    </div>
)
}

export default WindSpeedCalculation;

