import FetchingApi from "./FetchingFunction";

function FlareDisplay() {
const [, , , , Flare, LatestFlare] = FetchingApi();  

const FlareFlux = Flare?.[711]?.flux ?? null;
const LatestFlareClass = LatestFlare ?? null;
const NewestFlare = ""
let FluxArray = [];
let twoHourMaximum = 0;

console.log(FluxArray);
console.log("Flare Flux:", FlareFlux);
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

console.log(twoHourMaximum);

function FlarevalueToGoesClass(FlareFlux) {
    
    if (FlareFlux < 2e-8) {
        return (<div style={{"color": "#0f7718", "paddingLeft": "5px"}}>GOES Eclipse</div>);
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
        return (<div style={{"color": "#c03105", "paddingLeft": "5px"}}>{ 'X' + (FlareFlux / 1e-4).toFixed(2)}</div>);
    }
}


function HighestTwoHourMaximumToGOESClass(twoHourMaximum) {
    
    if (twoHourMaximum < 2e-8) {
        return (<div style={{"color": "#0f7718", "paddingLeft": "5px"}}>GOES Eclipse</div>);
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
        return (<div style={{"color": "#c03105", "paddingLeft": "5px"}}>{ 'X' + (twoHourMaximum / 1e-4).toFixed(2)}</div>);
    }
}


return(
    <div style={{"display": "flex","paddingTop": "10px","border": "2px solid gray","borderRadius": "10px","fontFamily": 'Roboto', "flexDirection": "column"}}>
        <div className="FlareTitle" style={{"display": "flex", "flexDirection": "row", "paddingLeft": "10px"}}>
            <img src={require('./rcs/electric_bolt_72dp_EFEFEF_FILL1_wght400_GRAD0_opsz48.png')} style={{"marginRight": "5px", "width": "72px", "height": "72px", "alignContent": "center"}}/> 
            <div style={{"alignContent": "center"}}> Solar Flares:</div>
        </div>
        <div className="FlareData" style={{"display": "flex", "flexDirection": "column", "paddingLeft": "10px", "marginTop": "5px"}}>
            <div style={{"alignContent": "flex-start","display": "flex", }}>Current Flux:  {FlarevalueToGoesClass(FlareFlux)}</div>
            <div style={{"alignContent": "flex-start","display": "flex", }}>Latest Flare:  {LatestFlareClassToDisplay(NewestFlare)}</div>
            <div style={{"alignContent": "flex-start","display": "flex", }}>2h Max.: {HighestTwoHourMaximumToGOESClass(twoHourMaximum)}</div>
        </div>
    </div>
)
}




export default FlareDisplay;