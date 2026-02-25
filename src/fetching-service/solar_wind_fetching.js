import FetchingApi from './FetchingFunction';
import {useState, useEffect} from 'react';



function WindSpeedCalculation() {
const [SolarWind, IntMag, KpIndex] = FetchingApi(); //Dekonstruktion der Werte aus der FetchingApi Funktion
const WindSpeed = SolarWind?.wind_speed ?? null;
const Density = SolarWind?.density ?? null;
const Temperature = SolarWind?.temperature ?? null; 

return ( 
    <div>
        <div>Wind Speed: {WindSpeed} Km/s </div>
        <div>Density: {Density} p/cm^3</div>
        <div>Temperature: {Temperature/1000} kK </div>
    </div>
)
}

export default WindSpeedCalculation;

