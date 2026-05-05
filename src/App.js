
import KpCalculation from "./fetching-service/KpIndexDisplay/KpIndexDisplay.js";
import WindSpeedCalculation from "./fetching-service/SolarWindDisplay/SolarWindDisplay.js";
import IntMagDisplay from "./fetching-service/ImfDisplay/ImfDisplay.js";
import AlertsDisplay from "./fetching-service/AlertsDisplay/AlertsDisplay.js";
import FlareDisplay from "./fetching-service/FlareDisplay/FlareDisplay.js";
import SolarImages from "./inner_content/solar_images";
import CMEPredictions from "./inner_content/CME_Predictions/predictions";
import { ComponentEvents } from "./components/ComponentEvents.js";
//import KpIndexChart from "./inner_content/Charts.js"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';

function App() {

return(
<div className='Content'>
    <div className='TitleAndData'>
        <KpCalculation className="ContentCard"/>
        <WindSpeedCalculation className="ContentCard"/>
        <IntMagDisplay className="ContentCard"/>
        <FlareDisplay className="ContentCard"/>
    </div>
    <div className='InnerContent'>
        <AlertsDisplay className='alertsandadvisorybar'style={{
            "minHeight": "50px",
        }}/>
        <div className='cmeandsun' style={{
            "minHeight": "450px",
            "color": "white", 
        }}>
            <SolarImages/>
            <CMEPredictions/> 
            <ComponentEvents/>
        </div>  
    </div>
</div>
)
}

export default App;
