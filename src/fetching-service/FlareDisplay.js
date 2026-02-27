import FetchingApi from "./FetchingFunction";

function FlareDisplay() {
const [SolarWind, IntMag, KpIndex, Alerts, Flare, LatestFlare] = FetchingApi();  

const FlareFlux = Flare?.[711]?.flux;
const LatestFlareClass = LatestFlare ?? null;
const NewestFlare = ""

function LatestFlareClassToDisplay(NewestFlare) {
if (LatestFlareClass === null) {
    return (NewestFlare = "In Progress"); 
} else {
    return (NewestFlare = LatestFlareClass);
    }
}

function FlarevalueToGoesClass(FlareFlux) {
    if (FlareFlux < 1e-7) {
        return (<div style={{"color": "#0f7718", "paddingLeft": "5px"}}>{  'A' + (FlareFlux / 1e-8).toFixed(2)}</div>);
    }
    else if (FlareFlux < 1e-6) {
        return (<div style={{"color": "#00fd15", "paddingLeft": "5px"}}>{"  " + 'B' + (FlareFlux / 1e-7).toFixed(2)}</div>);
    }
    else if (FlareFlux < 1e-5) {
        return (<div style={{"color": "#eeff00", "paddingLeft": "5px"}}>{"  " + 'C' + (FlareFlux / 1e-6).toFixed(2)}</div>);
    }
    else if (FlareFlux < 1e-4) {
        return (<div style={{"color": "#ff8c00", "paddingLeft": "5px"}}>{"  " + 'M' + (FlareFlux / 1e-5).toFixed(2)}</div>);
    }
    else {
        return (<div style={{"color": "#c03105", "paddingLeft": "5px"}}>{"  " + 'X' + (FlareFlux / 1e-4).toFixed(2)}</div>);
    }
}


return(
    <div style={{"display": "flex","paddingTop": "10px","border": "2px solid gray","borderRadius": "10px","fontFamily": 'Roboto', "flexDirection": "column"}}>
        <div className="FlareTitle" style={{"display": "flex", "flexDirection": "row", "paddingLeft": "10px"}}>
            <img src={require('./rcs/bolt_36dp_EFEFEF_FILL0_wght400_GRAD0_opsz40.png')} style={{"marginRight": "5px", "width": "36px", "height": "36px"}}/> 
            <div style={{"alignContent": "center"}}> Solar Flares:</div>
        </div>
        <div className="FlareData" style={{"display": "flex", "flexDirection": "column", "paddingLeft": "10px", "marginTop": "5px"}}>
            <div style={{"alignContent": "flex-start","display": "flex"}}>Current Flux:  {FlarevalueToGoesClass(FlareFlux)}</div>
            <div style={{"alignContent": "flex-start","display": "flex"}}>Latest Flare:  {LatestFlareClassToDisplay(NewestFlare)}</div>
        </div>
    </div>
)
}




export default FlareDisplay;