import FetchingApi from './FetchingFunction';




function WindSpeedCalculation() {
const [SolarWind, IntMag, KpIndex] = FetchingApi(); //Dekonstruktion der Werte aus der FetchingApi Funktion
const WindSpeed = SolarWind?.proton_speed ?? null;
const Density = SolarWind?.proton_density ?? null;
const Temperature = SolarWind?.proton_temperature ?? null; 


return ( 
    <div>
        <div style={{
            "display": "flex",
            "alignItems": "center",
            "justifyContent": "space-between",
            "padding": "10px"
        }}>
            <img src={require('./air_36dp_000000_FILL0_wght300_GRAD0_opsz40.png')}/>
            <div>Wind Speed: {WindSpeed} Km/s </div>
            
        </div>
        <div>Density: {Density} p/cm^3</div>
        <div>Temperature: {Temperature/1000} kK </div>
    </div>
)
}

export default WindSpeedCalculation;

