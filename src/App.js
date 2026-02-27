
import KpCalculation from "./fetching-service/kp-index-fetching";
import WindSpeedCalculation from "./fetching-service/solar_wind_fetching";
import IntMagDisplay from "./fetching-service/ImfDisplay";
import AlertsDisplay from "./fetching-service/AlertsDisplay";
import FlareDisplay from "./fetching-service/FlareDisplay";
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
    "border": "3px, solid, pink",
    "backgroundColor": "rgb(35, 35, 39)",
    "marginLeft": "-8px",
    "marginTop": "-11px",
    "marginRight": "-20px",
    "fontFamily": 'Roboto',
}}>
    <div className='TitleAndData' style={{
    "height": "97vh",
    "width": "200px",
    "minWidth": "200px",
    "marginLeft": "0px",
    "marginRight": "0px",
    "display": "flex",
    "flexDirection": "column",
    "alignContent": "space-evenly",
    "border": "3px, solid, black",
    "fontFamily": 'Roboto',
    "color": "#ccc9dc"

    }}>
        <KpCalculation className='KpIndex' style={{
            "fontFamily": 'Roboto',
            "height": "20%",
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
        "minWidth": "78vw",
        "width": "auto",
        "marginRight": "0px",
        "display": "flex",
        "alignContent": "flex-start",
        "flexDirection": "column",
        "alignSelf": "auto",
        "border": "3px, solid, black",
    }}>
        <AlertsDisplay className='alertsandadvisorybar'style={{
            "minHeight": "50px",
            "border": "2px, solid, black",
        }}/>
        <div className='cmeandsun' style={{
            "alignContent": "space-evenly",
            "minHeight": "450px",
            "border": "3px, solid, black",
        }}>
            <div className='CME AdvisoryArrival'/> 
            <div className='SunspotsandSolarImages'/>
        </div>  
    </div>
</div>
)
}

export default App;
