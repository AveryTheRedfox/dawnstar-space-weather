
import KpCalculation from "./fetching-service/kp-index-fetching";
import WindSpeedCalculation from "./fetching-service/solar_wind_fetching";
import IntMagDisplay from "./fetching-service/ImfDisplay";
import AlertsDisplay from "./fetching-service/AlertsDisplay";
import FlareDisplay from "./fetching-service/FlareDisplay";
import SolarImages from "./inner_content/solar_images";
import CMEPredictions from "./inner_content/CME_Predictions/predictions";
//import KpIndexChart from "./inner_content/Charts.js"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
    return(
<div className='Content' style= {{
    "display": "flex",
    "flexDirection": "row",
    "widht": "100vw",
    "height": "99vh",
    "backgroundColor": "rgb(35, 35, 39)",
    "marginLeft": "-8px",
    "marginTop": "-8px",
    "marginRight": "-20px",
    "fontFamily": 'Roboto',
}}>
    <div className='TitleAndData' style={{
    "height": "97vh",
    "width": "80vw",
    "marginLeft": "0px",
    "marginRight": "0px",
    "display": "flex",
    "flexDirection": "column",
    "alignContent": "space-evenly",
    "fontFamily": 'Roboto',
    "color": "#ccc9dc",
    "fontSize": "36px",
    }}>
        <KpCalculation className='KpIndex' style={{
            "fontFamily": 'Roboto',
        }}/>
        <WindSpeedCalculation style={{
            "fontFamily": 'Roboto',
            "height": "20%",
  
        }}/>
        <IntMagDisplay style={{
            "fontFamily": 'Roboto',
            "height": "20%"
        }}/>
        <FlareDisplay style={{
            "fontFamily": 'Roboto',
            "height": "20%"
        }}/>
    </div>
    <div className='inner_content' style={{
        "float": "right",
        "minWidth": "50vw",
        "marginRight": "0px",
        "display": "flex",
        "alignContent": "flex-start",
        "flexDirection": "column",
        "alignSelf": "auto",
        "fontSize": "32px"
    }}>
        <AlertsDisplay className='alertsandadvisorybar'style={{
            "minHeight": "50px",
        }}/>
        <div className='cmeandsun' style={{
            "minHeight": "450px",
            "color": "white", 
        }}>
            <SolarImages/>
            <CMEPredictions/> 
        </div>  
    </div>
</div>
)
}

export default App;
