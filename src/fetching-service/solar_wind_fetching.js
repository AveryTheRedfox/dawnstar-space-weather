import useFetchingApi from './FetchingFunction';
import { PopOverGraphs } from '../inner_content/popover';
import { WindSpeedGraph } from '../inner_content/Graphs';
import { DensityGraph } from '../inner_content/Graphs';



function WindSpeedCalculation() {
const [SolarWind, IntMag, KpIndex] = useFetchingApi(); //Dekonstruktion der Werte aus der FetchingApi Funktion
let WindSpeed = SolarWind?.[0].proton_speed ?? null;
let Density = SolarWind?.[0].proton_density ?? null;
let Temperature = SolarWind?.[0].proton_temperature ?? null; 

let WindSpeedColor = ''; 
if (WindSpeed < 400) {
    WindSpeedColor = "#00fd15";
}   else if (WindSpeed >= 400 && WindSpeed < 500) {
    WindSpeedColor = '#eeff00';
} else if (WindSpeed >= 500 && WindSpeed < 700) {
    WindSpeedColor = '#ff8c00';
} else if (WindSpeed >= 700) {
    WindSpeedColor = '#c05904';
}

let DensityColor = '';
if (Density < 10) {
    DensityColor = '#00fd15';
}   else if (Density < 20) {
    DensityColor = '#eeff00';
} else if (Density < 40) {
    DensityColor = '#ff8c00';
} else if (Density < 60) {
    DensityColor = '#c05904';
} else {
    DensityColor = '#ffffff';
}
let TemperatureColor = '';
if (Temperature < 20000) {
    TemperatureColor = '#00fd15';
} else if (Temperature <= 100000) {
    TemperatureColor = '#eeff00';
} else if (Temperature <= 500000) {
    TemperatureColor = '#ff9c00'; 
} else {
    TemperatureColor = '#c05904'; 
}


return ( 
    <div>
        <div style={{
            "display": "flex",
            "alignItems": "center",
            "padding": "10px",
            "border": "2px solid gray",
            "borderRadius": "10px",
            
        }}>
            <img src={require('./rcs/air_72dp_EFEFEF_FILL0_wght400_GRAD0_opsz48.png')}            
            style={{
                "marginRight": "5px",
            }}
            />
            <div style={{"alignContent": "center",}}>
            <PopOverGraphs 
                DisplayString={'Wind Speed:'} 
                PopOverString={<WindSpeedGraph/>} 
                PopOverStringStyling={{"color": "darkgray"}}
                
            />
            <div style={{"color": WindSpeedColor}}>{WindSpeed} km/s</div></div>
            
        </div>
        <div style={{
            "display": "flex",
            "alignItems": "center",
            "padding": "10px",
            "border": "2px solid gray",
            "borderRadius": "10px",
        }}>
                <img src={require('./rcs/rainy_snow_72dp_EFEFEF_FILL0_wght400_GRAD0_opsz48.png')}       
                style={{
                    "marginRight": "5px",
            }}
            />
            <div style={{"alignContent": "center"}}>           
                <PopOverGraphs 
                DisplayString={'Density'} 
                PopOverString={<DensityGraph/>} 
                PopOverStringStyling={{"color": "darkgray"}}
                
            /> <div style={{"color": DensityColor}}>{Density} p/cm3</div></div>
        </div>
                <div style={{
            "display": "flex",
            "alignItems": "left",
            "padding": "10px",
            "border": "2px solid gray",
            "borderRadius": "10px",
        }}>
            <img src={require('./rcs/device_thermostat_72dp_EFEFEF_FILL0_wght400_GRAD0_opsz48.png')}
            style={{
                "marginRight": "10px",
                "width": "72px",
                "height": "72px",
                "align": "center"
            }}
            />
             <div style={{"alignContent": "center"}}>Temperature:<br></br> <div style={{"color": TemperatureColor}}>{Temperature/1000} kK</div></div>
        </div>
       
    </div>
)
}

export default WindSpeedCalculation;

