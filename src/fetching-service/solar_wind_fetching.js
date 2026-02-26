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
            "padding": "10px",
            "border": "2px solid gray",
            "borderRadius": "10px",
            
        }}>
            <img src={require('./air_36dp_000000_FILL0_wght300_GRAD0_opsz40.png')}            
            style={{
                "marginRight": "5px",
            }}
            />
            <div style={{"alignContent": "center",}}>Wind Speed:<br></br> {WindSpeed} km/s</div>
            
        </div>
        <div style={{
            "display": "flex",
            "alignItems": "center",
            "padding": "10px",
            "border": "2px solid gray",
            "borderRadius": "10px",
        }}>
                <img src={require('./rainy_snow_36dp_000000_FILL0_wght400_GRAD0_opsz40.png')}       
                style={{
                    "marginRight": "5px",
            }}
            />
            <div style={{"alignContent": "center"}}>Density:<br></br> {Density} p/cm^3</div>
        </div>
                <div style={{
            "display": "flex",
            "alignItems": "center",
            "justifyContent": "space-between",
            "padding": "10px",
            "border": "2px solid gray",
            "borderRadius": "10px",
        }}>
            <img src={require('./device_thermostat_36dp_000000_FILL0_wght400_GRAD0_opsz48.png')}
            style={{
                "marginRight": "5px",
            }}
            />
             <div>Temperature: {Temperature/1000} kK </div>
        </div>
       
    </div>
)
}

export default WindSpeedCalculation;

