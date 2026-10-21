import {useSpaceWeather} from "../../../fetching-service/FetchingFunction/FetchingDataLogic";
import "./lowerContentMagnetosphere.css";

export default function LowerContentMagnetosphere() {

const [SolarWind, IntMag, KpIndex, Alerts, Flare, LatestFlare, Enlil, Ovation, HPIData, ForecastData, SunspotData, CMEData, MagnetopauseData, loading] = useSpaceWeather();

if(!loading) {
  console.log(MagnetopauseData);
}

let magnetopauseDataArray = MagnetopauseData.text.split("\n").slice(8, 9).toString().split(" ").filter(i => i !== "").map(i => parseFloat(i));
console.log(magnetopauseDataArray);

let geosynchronousDistance = 6.6; // in Earth radii
let WindSpeed = SolarWind?.[0]?.proton_speed ?? "loading...";
let Density = SolarWind?.[0]?.proton_density ?? "loading...";
let Temperature = SolarWind?.[0]?.proton_temperature ?? "loading...";
let bowShowCalculationData = {
    temperature: Temperature,
    density: Density,
    windSpeed: WindSpeed,
    intMag: IntMag?.[0]?.bt ?? "loading..."
}
const dynamicPressure = 1.6726e-6 * bowShowCalculationData.density * bowShowCalculationData.windSpeed ** 2; // Dynamic pressure in nPa

function calculateBowShockDistance({temperature, density, windSpeed, intMag, mp_standoff}) {
    const soundSpeed = 0.117 * Math.sqrt(temperature); // Sound speed in km/s
    const alfvenSpeed = 21.8 * intMag / Math.sqrt(density); // Alfven speed in km/s
    const magnetosonicSpeed = Math.sqrt(soundSpeed ** 2 + alfvenSpeed ** 2); // Magnetosonic speed in km/s

    const machNumber = windSpeed / magnetosonicSpeed;

    return (
        mp_standoff * (1 + 4/(3 * ((machNumber ** 2) - 1)))
    )
}
function magnetoPauseWarning() {
if (magnetopauseDataArray[0] > 9) {
    return (
        <div style={{color: "green"}}>Magnetopause is at baseline distance from Earth</div>
    )
} else if (magnetopauseDataArray[0] < 9 && magnetopauseDataArray[0] > 6.6) {
    return (
        <div style={{color: "red"}}>Warning: Moderate Compression in Progress!</div>
    )
} else if (magnetopauseDataArray[0] < 6.6) {
    return (
        <div style={{color: "red"}}>Alert: Severe Compression in Progress! <br></br> Magnetosphere currently in Geostationary Orbit.</div>
    )
} else if (magnetopauseDataArray[0] < 5) {
    return (
        <div style={{color: "orange"}}>ALERT: Extreme Compression in Progress! <br></br> Superstorm Condition Threshold Reached!</div>
    )
}
}



return (
    <div className="lower-content-magnetosphere">
        <div className="magnetopause-data-title">Magnetopause and Bow Shock Distances (in Earth Radii):</div>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <div className="magnetopause-data" style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <div>Magnetopause Distance: </div>
                <div>Bow Shock Distance: </div>
                <div className="magnetopause-data">Geosynchronous Orbit Distance:</div>
                <div className="magnetopause-data">Ram Pressure: </div>
            </div>
        </div>
        <div className="magnetopause-data-values" style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <div>{magnetopauseDataArray[0]} R_e</div>
                <div>{Math.round(calculateBowShockDistance({temperature: Temperature, density: Density, windSpeed: WindSpeed, intMag: IntMag?.[0]?.bt ?? "loading...", mp_standoff: magnetopauseDataArray[0]}) * 100) / 100} R_e</div>
                <div>{geosynchronousDistance} R_e</div>
                <div>{Math.round(dynamicPressure * 100) / 100} nPa</div>
        </div>
        </div>
            <div className="magnetopause-warning">
                {magnetoPauseWarning()}
            </div>
    </div>
)}

