import useFetchingApi from "../../fetching-service/FetchingFunction/FetchingFunction.js";
import './FlareDisplay.css';

function FlareDisplay() {
const [, , , , Flare, LatestFlare] = useFetchingApi();  


const FlareFlux = Flare?.[2875]?.flux ?? null;
const LatestFlareClass = LatestFlare?.[0]?.max_class ?? null;
const NewestFlare = ""
let FluxArray = [];
let twoHourMaximum = 0;


console.log(LatestFlareClass);

function LatestFlareClassToDisplay(NewestFlare) {
if (LatestFlareClass === null) {
    return (NewestFlare = "In Progress"); 
} else {
    return (NewestFlare = LatestFlareClass);
    }
}

for (let i = 1; i < Flare?.length; i++) {
    FluxArray.push(Flare?.[i]?.flux);
}
twoHourMaximum = Math.max(...FluxArray);

function FlarevalueToGoesClass(FlareFlux) {
    
    if (FlareFlux < 2e-8) {
        return (<div style={{"color": "#0f7718", "paddingLeft": "5px"}}> A0.00 </div>);
    } else if (FlareFlux < 1e-7) {
        
        return (<div style={{"color": "#0f7718", "paddingLeft": "5px"}}>{  'A' + (FlareFlux / 1e-8).toFixed(2)}</div>);
    }
    else if (FlareFlux < 1e-6) {
        return (<div style={{"color": "#00fd15", "paddingLeft": "5px"}}>{ 'B' + (FlareFlux / 1e-7).toFixed(2)}</div>);
    }
    else if (FlareFlux < 1e-5) {
        return (<div style={{"color": "#eeff00", "paddingLeft": "5px"}}>{ 'C' + (FlareFlux / 1e-6).toFixed(2)}</div>);
    }
    else if (FlareFlux < 1e-4) {
        return (<div style={{"color": "#ff8c00", "paddingLeft": "5px"}}>{ 'M' + (FlareFlux / 1e-5).toFixed(2)}</div>);
    }
    else {
        return (<div style={{"color": "#c41616", "paddingLeft": "5px"}}>{ 'X' + (FlareFlux / 1e-4).toFixed(2)}</div>);
    }
}


function HighestTwoHourMaximumToGOESClass(twoHourMaximum) {
    
    if (twoHourMaximum < 2e-8) {
        return (<div style={{"color": "#0f7718", "paddingLeft": "5px"}}>A0.00</div>);
    } else if (twoHourMaximum < 1e-7) {
        
        return (<div style={{"color": "#0f7718", "paddingLeft": "5px"}}>{  'A' + (twoHourMaximum / 1e-8).toFixed(2)}</div>);
    }
    else if (twoHourMaximum < 1e-6) {
        return (<div style={{"color": "#00fd15", "paddingLeft": "5px"}}>{ 'B' + (twoHourMaximum / 1e-7).toFixed(2)}</div>);
    }
    else if (twoHourMaximum < 1e-5) {
        return (<div style={{"color": "#eeff00", "paddingLeft": "5px"}}>{ 'C' + (twoHourMaximum / 1e-6).toFixed(2)}</div>);
    }
    else if (twoHourMaximum < 1e-4) {
        return (<div style={{"color": "#ff8c00", "paddingLeft": "5px"}}>{ 'M' + (twoHourMaximum / 1e-5).toFixed(2)}</div>);
    }
    else {
        return (<div style={{"color": "#e60a0a", "paddingLeft": "5px"}}>{ 'X' + (twoHourMaximum / 1e-4).toFixed(2)}</div>);
    }
}


return(
    <div className="FlareDisplay">
        <div className="FlareTitle">
            <div className="FlareTitleText"> Solar Flares:</div>
        </div>
        <div className="FlareData">
            <div className="FlareValue">Current Flux:  {FlarevalueToGoesClass(FlareFlux)}</div>
            <div className="FlareValue">Latest Flare:  {LatestFlareClassToDisplay(NewestFlare)}</div>
            <div className="FlareValue">2h Max.: {HighestTwoHourMaximumToGOESClass(twoHourMaximum)}</div>
        </div>
    </div>
)
}




export default FlareDisplay;