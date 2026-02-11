
import TitleAndTime from "./title_bar_elements/titleandtime";
import KpCalculation from "./fetching-service/kp-index-fetching";
import WindSpeedCalculation from "./fetching-service/solar_wind_fetching";
import ImfCalculation from "./fetching-service/imf-fetching";

function App() {
    return(
<div className='Content' style= {{
    "display": "flex",
    "flexDirection": "row"
}}>
    <div className='TitleAndData' style={{
    "height": "1080px",
    "width": "200px",
    "marginLeft": "0px",
    "marginRight": "0px"
    }}>
        <TitleAndTime/>
        <WindSpeedCalculation/>
        <div className='magnetometer'/>
        <KpCalculation/>
        <ImfCalculation/>
        <div className='solar_flares'/>
    </div>
    <div className='inner_content'>
        <div className='alertsandadvisorybar'/>
        <div className='cmeandsun'>
            <div className='CME AdvisoryArrival'/> 
            <div className='SunspotsandSolarImages'/>
        </div>  
    </div>
</div>
)
}

export default App;
