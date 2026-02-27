import FetchingApi from "./FetchingFunction";
import Marquee from "react-fast-marquee";

function AlertsDisplay() {

const [SolarWind, IntMag, KpIndex, Alerts] = FetchingApi();  
let AlertTitle = Alerts?.message ?? null;

function line() {
    if (AlertTitle === null) {
        return AlertTitle = "Loading...";
    } else {
    return AlertTitle.split('\n');
    }
}


return(
    <div style={{
        "display": "flex",
        "padding": "10px",
        "border": "2px solid gray",
        "borderRadius": "10px",
        "fontFamily": 'Roboto',
        "color": "#ccc9dc",
    }}>
        <marquee direction="left" gradient="true">
        <div>*** {line(AlertTitle)[4]} | {line(AlertTitle)[6]} | {line(AlertTitle)[7]} ***</div>
        </marquee>
    </div>
)
}

export default AlertsDisplay;