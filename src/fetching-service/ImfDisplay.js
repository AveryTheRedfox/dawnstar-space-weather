
import FetchingApi from './FetchingFunction';


function IntMagDisplay() {

const [SolarWind, IntMag, KpIndex] = FetchingApi(); //Dekonstruktion der Werte aus der FetchingApi Funktion
const IMFBt = IntMag?.bt ?? null;
const IMFBz = IntMag?.gse_bz ?? null;

let BzDirection = '';
let BzArrow = {};
let BzBorderColor = '';

if (IMFBz < 0) {
    BzDirection = '#FF0000';
    BzArrow = <img src={require('./rcs/south_east_24dp_EFEFEF_FILL0_wght400_GRAD0_opsz24.png')} style={{"width": "15px", "height": "inherit"}}/>;
} else if (IMFBz >= 0) {
    BzDirection = '#00fd15';
    BzArrow = <img src={require('./rcs/north_east_24dp_EFEFEF_FILL0_wght400_GRAD0_opsz24.png')} style={{"width": "15px", "height": "inherit"}}/>;
}

if (IMFBz < -5) {
    BzBorderColor = '#d63f24';
}   else if (IMFBz < -10) {
    BzBorderColor = '#c03105';
} else if (IMFBz < -20) {
    BzBorderColor = '#8b0000';
} else {
    BzBorderColor = 'gray';
}

return(
    <div style={{"position": "relative", 
    "display": "flex",
    "alignItems": "center",
    "border": `2px solid ${BzBorderColor}`,
    "borderRadius": "10px",
    "padding": "10px",
    "fontFamily": 'Roboto',
    "color": "#ccc9dc",
    }}>
        <img src={require('./rcs/explore_36dp_000000_FILL0_wght400_GRAD0_opsz40.png')}
        style={{
            "marginRight": "5px",
        }}
        />
        <div style={{"display": "flex", "flexDirection": "column", "alignContent": "flex-start"}}>
        <div style={{"alignContent": "center"}}>IMF Bt: {Math.round(IMFBt*100)/100} nT </div> 
        <div style={{"alignContent": "center", "right": "10px", "color": BzDirection}}>IMF Bz: {Math.round(IMFBz*100)/100} nT {BzArrow}</div>
        </div>
    </div>
    )
}



export default IntMagDisplay;
