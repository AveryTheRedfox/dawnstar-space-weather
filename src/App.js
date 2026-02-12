
import TitleAndTime from "./title_bar_elements/titleandtime";
import KpCalculation from "./fetching-service/kp-index-fetching";
import WindSpeedCalculation from "./fetching-service/solar_wind_fetching";
import ImfCalculation from "./fetching-service/imf-fetching";

function App() {
    return(
<div className='Content' style= {{
    "display": "flex",
    "flexDirection": "row",
    "widht": "100vw",
    "height": "98vh",
    "border": "3px, solid, pink"
}}>
    <div className='TitleAndData' style={{
    "height": "97vh",
    "width": "200px",
    "minWidth": "200px",
    "marginLeft": "0px",
    "marginRight": "0px",
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "flex-start",
    "border": "3px, solid, black",
    }}>
        <TitleAndTime/>
        <WindSpeedCalculation/>
        <div className='magnetometer'/>
        <KpCalculation/>
        <ImfCalculation/>
        <div className='solar_flares'/>
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
        <div className='alertsandadvisorybar'style={{
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
