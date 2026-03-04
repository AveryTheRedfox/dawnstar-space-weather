
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
} else if (IMFBz >= 0) {
    BzDirection = '#00fd15';
}
let IMFBzColor = '';
if (IMFBz < -5) {
    BzBorderColor = '#d63f24';
}   else if (IMFBz < -10) {
    BzBorderColor = '#c03105';
} else if (IMFBz < -20) {
    BzBorderColor = '#8b0000';
} else {
    BzBorderColor = 'gray';
}

let IMFBtColor = '';
if (IMFBt < 10) {
    IMFBtColor = '#ffffff';
}   else if (IMFBz < 20) {
    IMFBtColor = '#ff8c00';
} else if (IMFBz < 30) {
    IMFBtColor = '#c05904';
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
        <img src={require('./rcs/explore_72dp_EFEFEF_FILL0_wght400_GRAD0_opsz48.png')}
        style={{
            "marginRight": "5px",
        }}
        />
        <div style={{"display": "flex", "flexDirection": "column", "alignContent": "flex-start"}}>
        <div style={{"alignContent": "center", "display": "flex", "flexDirection": "row"}}>IMF Bt: <div style={{"color": IMFBtColor, "marginLeft": "10px"}}>{Math.round(IMFBt*100)/100}</div> nT </div> 
        <div style={{"alignContent": "center", "right": "10px", "display": "flex", "flexDirection": "row", }}>IMF Bz: <div style={{"color": BzDirection, "marginLeft": "10px"}}>{Math.round(IMFBz*100)/100}</div> nT </div>
        </div>
    </div>
    )
}



export default IntMagDisplay;
