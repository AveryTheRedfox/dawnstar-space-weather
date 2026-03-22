
import useFetchingApi from './FetchingFunction';
import { PopOverGraphs } from '../inner_content/popover';
import { IMFBtGraph } from '../inner_content/Graphs';
import { IMFBzGraph } from '../inner_content/Graphs';

function IntMagDisplay() {

const [ , IntMag] = useFetchingApi(); //Dekonstruktion der Werte aus der FetchingApi Funktion
const IMFBt = IntMag?.[0]?.bt;
const IMFBz = IntMag?.[0]?.bz_gsm;




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
        <div style={{"alignContent": "center", "display": "flex", "flexDirection": "row"}}>
                 <PopOverGraphs 
                            DisplayString={'IMF Bt:'} 
                            PopOverString={<IMFBtGraph/>} 
                            PopOverStringStyling={{color: 'darkgray'}}   
                        />
            <div style={{"color": IMFBtColor, "marginLeft": "10px"}}>
                {Math.round(IMFBt*100)/100}</div> nT </div> 
        <div style={{"alignContent": "center", "right": "10px", "display": "flex", "flexDirection": "row", }}>
                <PopOverGraphs 
                            DisplayString={'IMF Bz:'} 
                            PopOverString={<IMFBzGraph/>} 
                            PopOverStringStyling={{"color": "darkgray"}}   
                        />
            <div style={{"color": BzDirection, "marginLeft": "10px"}}>{Math.round(IMFBz*100)/100}</div> nT </div>
        </div>
    </div>
    )
}



export default IntMagDisplay;
