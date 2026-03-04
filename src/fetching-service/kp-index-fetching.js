
import { Gauge, gaugeClasses} from '@mui/x-charts';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import FetchingApi from './FetchingFunction';



function KpCalculation() {
  
const [SolarWind, IntMag, KpIndex] = FetchingApi();
const currentvalue = KpIndex?.[350]?.kp_index;
const currentime = KpIndex?.[350]?.time_tag;

//Array mit den Kp-Index Werten und den entsprechenden Winkelpositionen für die Gauge
let AnglePosition = [
  [0, 0], [0.33, 3.33], [0.66, 6.66], [1, 10], [1.33, 13.33], 
  [1.66, 16.66], [2, 20], [2.33, 23.33], [2.66, 26.66], [3, 30], 
  [3.33, 33.33], [3.66, 36.66], [4, 40], [4.33, 43.33], [4.66, 46.66], [5, 50], 
  [5.33, 53.33], [5.66, 56.66], [6, 60], [6.33, 63.33], [6.66, 66.66], 
  [7, 70], [7.33, 73.33], [7.66, 76.66], [8, 80], 
  [8.33, 83.33], [8.66, 86.66], [9, 100]
];
//Bestimmung der Winkelposition für die aktuelle Kp-Index Wert, um die Gauge entsprechend zu positionieren
let KpAngle = 0;
for (let i = 0; i < AnglePosition.length; i++) {
  if (currentvalue >= AnglePosition[i][0] && currentvalue < AnglePosition[i+1][0]) {
    KpAngle = AnglePosition[i][1];
    break;
  }
}
//Bestimmung der aktuellen geomagnetischen Sturmstärke und entsprechende Farbcodierung für die Gauge
let StormLevel = '';

if (currentvalue >= 4 && currentvalue < 5) {
  StormLevel = 'Active Conditions';
} else if (currentvalue >= 5 && currentvalue < 6) {
  StormLevel = 'G1 Minor Storm';
} else if (currentvalue >= 6 && currentvalue < 7) {
  StormLevel = 'G2 Moderate Storm';
} else if (currentvalue >= 7 && currentvalue < 8) {
  StormLevel = 'G3 Strong Storm';
} else if (currentvalue >= 8 && currentvalue < 9) {
  StormLevel = 'G4 Severe Storm';
} else if (currentvalue >= 9) {
  StormLevel = 'G5 Extreme Storm';
}
//Bestimmung der aktuellen geomagnetischen Sturmstärke und entsprechende Farbcodierung für die Gauge
let StormColor = '';

if (currentvalue < 4) {
  StormColor = '#00fd15';
} else if (currentvalue >= 4 && currentvalue < 5) {
  StormColor = '#eeff00';
} else if (currentvalue >= 5 && currentvalue < 6) {
  StormColor = '#d89c6b';
} else if (currentvalue >= 6 && currentvalue < 7) {
  StormColor = '#FF0000';
} else if (currentvalue >= 7 && currentvalue < 8) {
  StormColor = '#8B0000';
} else if (currentvalue >= 8 && currentvalue < 9) {
  StormColor = '#6b1644';
} else if (currentvalue >= 9) {
  StormColor = '#8B008B#';
}

return(
    <div style={{"position": "relative", 
    "display": "flex", 
    "flexDirection": "column", 
    "alignItems": "center", 
    "fontFamily": 'Roboto', 
    "color": "#ccc9dc",
    "border": "2px solid gray",
    "height": "33%",
    "borderRadius": "10px",}}>
    <div style={{"fontSize": "36px",}}>Kp-Index:</div>
    <div style={{"fontSize": "12px",}}>Time: {currentime ?? 'loading...'}</div>
  <Gauge
  value={KpAngle}
  startAngle={-90}
  endAngle={90}
  innerRadius={"60%"}
  outerRadius={"100%"}
  sx={{
    [`& .${gaugeClasses.valueText}`]: {
      fontSize: 54,
      fontFamily: 'Roboto',
      transform: 'translate(0px, -33px)',
      fill: '#8B008B#',
    },
        [`& .${gaugeClasses.valueArc}`]: {
      fill: StormColor,
    },
  }}
  text={() => "Kp" + `${currentvalue}`}
/>
  <div style={{"position": "relative", "paddingBottom": "10px"}}>{StormLevel}</div>
  <div style={{"position": "relative", "bottom": "10px", "fontSize": "16px", "color": "darkgray"}}>Data Source: NOAA SWPC</div>
</div>
)
  //Dynamisches Display der Messwerte, mit Error Handling 
}


export default KpCalculation; //Export der Komponente




