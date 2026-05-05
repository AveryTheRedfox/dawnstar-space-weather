import useFetchingApi from "../../fetching-service/FetchingFunction/FetchingFunction.js";
import { PopOverGraphs } from '../../inner_content/popover';
import { WindSpeedGraph } from '../../inner_content/Graphs';
import { DensityGraph } from '../../inner_content/Graphs';
import { TemperatureGraph } from '../../inner_content/Graphs';
import './SolarWindDisplay.css';



function WindSpeedCalculation() {
const [SolarWind, IntMag, KpIndex] = useFetchingApi(); //Dekonstruktion der Werte aus der FetchingApi Funktion
let WindSpeed = SolarWind?.[1].proton_speed ?? null;
let Density = SolarWind?.[1].proton_density ?? null;
let Temperature = SolarWind?.[1].proton_temperature ?? null; 

let WindSpeedColor = 
WindSpeed < 400 ? '#00fd15' :
WindSpeed >= 400 && WindSpeed < 500 ? '#eeff00' :
WindSpeed >= 500 && WindSpeed < 700 ? '#ff8c00' :
WindSpeed >= 700 ? '#c05904' : 'gray';

let DensityColor = 
Density < 10 ? '#00fd15' :
Density >= 10 && Density < 20 ? '#eeff00' :
Density >= 20 && Density < 40 ? '#ff8c00' :
Density >= 40 && Density < 60 ? '#c05904' :
Density >= 60 ? '#ffffff' : 'gray';

let TemperatureColor = 
Temperature < 20000 ? '#00fd15' :
Temperature >= 20000 && Temperature < 100000 ? '#eeff00' :
Temperature >= 100000 && Temperature < 500000 ? '#ff9c00' :
Temperature >= 500000 ? '#c05904' : 'gray';

return ( 
    <div className="SolarWindDataDisplays">
        <div className="ContainerDisplay">
            <div className="InnerContentDisplay">
            <PopOverGraphs 
                DisplayString={'Wind Speed:'} 
                PopOverString={<WindSpeedGraph/>} 
                PopOverStringStyling={{"color": "darkgray"}}
                
            />
            <div style={{"color": WindSpeedColor}}>{WindSpeed} km/s</div></div>
            
        </div>
        <div className="ContainerDisplay">
            <div className="InnerContentDisplay">           
                <PopOverGraphs 
                DisplayString={'Density:'} 
                PopOverString={<DensityGraph/>} 
                PopOverStringStyling={{"color": "darkgray"}}
                
            /> <div style={{"color": DensityColor}}>{Density} p/cm3</div></div>
        </div>
        <div className="ContainerDisplay">
             <div className="InnerContentDisplay">
                 <PopOverGraphs 
                DisplayString={'Temperature:'} 
                PopOverString={<TemperatureGraph/>} 
                PopOverStringStyling={{"color": "darkgray"}}   
            />
                <div style={{"color": TemperatureColor}}>{Temperature/1000} kK</div></div>
        </div>
       
    </div>
)
}

export default WindSpeedCalculation;

