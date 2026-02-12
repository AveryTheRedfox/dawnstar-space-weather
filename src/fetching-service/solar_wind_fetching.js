
import {useState, useEffect} from 'react';

function WindSpeedCalculation() {

const [Density, setDensity] = useState(null);
const [WindSpeed, setWindSpeed] = useState(null);
const [Temperature, setTemperature] = useState(null);
useEffect(() => {

async function fetchData() {
    const response = await fetch('https://services.swpc.noaa.gov/products/solar-wind/plasma-5-minute.json');
    const result = await response.json();
    setDensity([result[1][1]]);
    setWindSpeed([result[1][2]]);
    setTemperature([result[1][3]]);
    console.log(Density, WindSpeed, Temperature);

}
setTimeout(function() { fetchData(); }, 60000);
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
