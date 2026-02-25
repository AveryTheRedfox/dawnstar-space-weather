
import { Gauge, gaugeClasses} from '@mui/x-charts';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import FetchingApi from './FetchingFunction';



function KpCalculation() {
  
const [SolarWind, IntMag, KpIndex] = FetchingApi();
const currentvalue = KpIndex?.[357]?.kp_index ?? null;
const currentime = KpIndex?.[357]?.time_tag ?? null;
console.log(currentvalue);

let KpAngle = 100/currentvalue;



return(
  <div style={{"position": "relative", "display": "flex", "flexDirection": "column", "alignItems": "center", fontFamily: 'Roboto', "color": "white"}}>
    <div>Kp-Index: {currentvalue ?? 'loading...'}</div>
    <div>Time: {currentime ?? 'loading...'}</div>
  <Gauge
  value={KpAngle}
  startAngle={-90}
  endAngle={90}
  innerRadius={"70%"}
  outerRadius={"100%"}
  sx={{
    [`& .${gaugeClasses.valueText}`]: {
      fontSize: 30,
      fontFamily: 'Roboto',
      transform: 'translate(0px, -30px)',
    },
  }}
  text={({KpAngle}) => `${currentvalue}`}
/>
  </div>
)
  //Dynamisches Display der Messwerte, mit Error Handling 
}


export default KpCalculation; //Export der Komponente




