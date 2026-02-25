
import TitleAndTime from "./title_bar_elements/titleandtime";
import KpCalculation from "./fetching-service/kp-index-fetching";
import WindSpeedCalculation from "./fetching-service/solar_wind_fetching";
import TestObject from "./fetching-service/ImfDisplay";

function App() {
    return(
<div className='Content' style= {{
    "display": "flex",
    "flexDirection": "row",
    "widht": "100vw",
    "height": "99vh",
    "border": "3px, solid, pink",
    "backgroundColor": "rgba(46, 46, 61, 0.74)",
    "marginLeft": "-8px",
    "marginTop": "-11px",
    "marginRight": "-20px",
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

    }}>
        <TitleAndTime style={{
            "size": "20%",
            "height": "20vh"
        }}/>
        <WindSpeedCalculation style={{
            "height": "20%"
        }}/>
        <KpCalculation style={{
            "height": "20%"
        }}/>
        <TestObject style={{
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
