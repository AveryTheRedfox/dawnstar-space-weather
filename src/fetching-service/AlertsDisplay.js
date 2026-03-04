import FetchingApi from "./FetchingFunction";
import Marquee from "react-fast-marquee";
import { useCMEPredictions } from "../inner_content/CME_Predictions/useCMEPredictions";

function AlertsDisplay() {

const [SolarWind, IntMag, KpIndex, Alerts, LatestFlare] = FetchingApi();  


let CustomMessage = "No Significant Space Weather Detected";
let AlertTitle = Alerts?.message ?? null;
let CMEAlertsMessage = "";
 const {impacts} = useCMEPredictions();
 let nextArrival = impacts[0]?.time ?? "N/A";



    console.log(nextArrival);

    if (impacts.length < 1) {
        CMEAlertsMessage = "";
    } else {
        CMEAlertsMessage = "*** Coronal Mass Ejection detected | Estimated Arrival: " + `${nextArrival}`;
    }



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
        "width": "inherit",
        "border": "2px solid gray",
        "borderRadius": "10px",
        "fontFamily": 'Roboto',
        "color": "#ccc9dc",
    }}>
        <Marquee direction="left" speed="100">
        <div>*** {line(AlertTitle)[4]} | {line(AlertTitle)[6]} | {line(AlertTitle)[7]} {CMEAlertsMessage} *** {CustomMessage}</div>
        </Marquee>
    </div>
)
}

export default AlertsDisplay;