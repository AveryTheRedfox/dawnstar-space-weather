import { MouseHoverPopoverCME } from "../popover";
import { useCMEPredictions } from "./useCMEPredictions";



function CMEPredictions() {
  const { impacts, maxDiff, CMEThreshold } = useCMEPredictions();
  let CMEArrival = "";
  if (!impacts.length) {
     CMEArrival = <div>No CME Arrivals Expected</div>
  } else {
    CMEArrival = <div className="PredictedCMEs">
        <div>
         <div>Predicted CME arrivals</div>
           
         <ul>
        {impacts.map((e, i) => (
          <li key={i}>
            {e.time}: Δdensity = {e.diff.toFixed(2)}
          </li>
        ))}
         </ul>
       </div>
      </div>
  }

  return (
    <div className="CMECenter" style={{
      "display": "flex",
      "alignContent": "flex-start",
      "flexDirection": "row",
      "justifyContent": "flex-end",
      "marginRight": "20px",   
      "color": "#ccc9dc",
    "border": "2px solid gray",
    "borderRadius": "10px"
    }}>
      <div className="CMEData">
           <MouseHoverPopoverCME 
           DisplayString='CME Observations' 
           PopOverString={<div>The CME Observations Panel will, with data from the WSA-Enlil Model, calculate the arrival of CMEs. <br/>The time displayed is the estimated arrival time and <br/> the ΔDensity is the largest positive change in density found for that CME </div>}
           PopOverStringStyling={{"fontSize": "42px", "textDecoration": "underline"}}
           />
        <div>Current Threshold: {CMEThreshold} </div>
        <div>{CMEArrival}</div>
      </div>
      <div className="CMEForecastImages" style={{
        "marginLeft": "auto",
      }}>
        <div style= {{"alignContent": "end", "top": "0px", "right": "0px", "display": "flex", "flexDirection": "row"}}>
           <div className="LascoCoronagraphs" style={{"alignContent": "flex-start", "display": "flex", "flexDirection": "column"}}>
              <img style={{"width": "200px", "height": "200px","marginRight": "0px", "marginTop": "0px"}} src={'https://services.swpc.noaa.gov/images/animations/lasco-c2/latest.jpg'} />
              <img style={{"width": "200px", "height": "200px","marginRight": "0px", "marginTop": "0px"}} src={'https://services.swpc.noaa.gov/images/animations/lasco-c3/latest.jpg'}/>
            </div>
            <div className="Coronagraphs" style={{"alignContent": "flex-start", "display": "flex", "flexDirection": "column"}}>
              <img style={{"width": "200px", "height": "200px","marginRight": "0px", "marginTop": "0px"}} src={'https://services.swpc.noaa.gov/images/animations/ccor1-diff/latest.jpg'} />
              <img style={{"width": "200px", "height": "200px","marginRight": "0px", "marginTop": "0px"}} src={'https://services.swpc.noaa.gov/images/animations/ccor1/latest.jpg'}/>
            </div>
            <img src={'https://services.swpc.noaa.gov/images/animations/enlil/latest.jpg'} 
            style={{"width": "633px","marginRight": "5px", "marginTop": "0px"}}>
              </img>
            </div>
        <div></div>
      </div>
    </div>
  );
}

export default CMEPredictions;