import { MouseHoverPopoverCME } from "../../popover";
import { useCMEPredictions } from "./useCMEPredictions";
import { Slider } from '@mui/material';
import { useState } from "react";
import { useEffect } from "react";



function CMEPredictions(dataKey) {
  const [CMEThreshold, setCMEThreshold] = useState(0.7);
  const { sortedImpacts } = useCMEPredictions(CMEThreshold, dataKey);

  let CMEArrival = "";
  if (!sortedImpacts.length) {
     CMEArrival = <div>No CME Arrivals Expected</div>
  } else {
    CMEArrival = <div className="PredictedCMEs">
        <div>
         <div>Predicted CME arrivals</div>
           
         <ul>
        {sortedImpacts.map((e, i) => (
          <li key={i}>
            {e.time}
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
    "borderRadius": "10px",
    "width": "100%",
    "height": "100%",
    "position": "relative",

    }}>

      <div className="CMEData" style={{
        "maxWidth": "20vw",
      }}>
           <MouseHoverPopoverCME 
           DisplayString='CME Observations' 
           PopOverString={<div>The CME Observations Panel will, with data from the WSA-Enlil Model, calculate the arrival of CMEs. <br/>The time displayed is the estimated arrival time and <br/> the ΔDensity is the largest positive change in density found for that CME </div>}
           PopOverStringStyling={{"fontSize": "3.6vh", "textDecoration": "dashed"}}
           />
      <div style={{    "border": "2px solid gray",
    "borderRadius": "10px", "minWidth": "400px", "paddingLeft": "15px", "paddingRight": "15px"}}>
      <Slider
        value={CMEThreshold}
        min={0.1}
        max={2.0}
        step={0.1}
        onChange={(_, value) => setCMEThreshold(value)}

      />
      Current CME Threshold: {CMEThreshold}
      </div>
        <div style={{
          "fontSize": "3.6vh",
        }}>
          {CMEArrival}
          </div>
      </div>
      <div className="CMEForecastImages" style={{
        "marginLeft": "auto",
      }}>
        <div style= {{"alignContent": "end", "top": "0px", "right": "0px", "display": "flex", "flexDirection": "row"}}>
        <div className="LascoCoronagraphs" style={{"alignContent": "flex-start", "display": "flex", "flexDirection": "column", "marginBottom": "0px"}}>
        <MouseHoverPopoverCME 
          DisplayString={<img style={{"width": "120px", "height": "120px"}} src={'https://services.swpc.noaa.gov/images/animations/lasco-c2/latest.jpg'}/>} 
          PopOverString={<img src={'https://services.swpc.noaa.gov/images/animations/lasco-c2/latest.jpg'}/>}/>
        <MouseHoverPopoverCME 
          DisplayString={<img style={{"width": "120px", "height": "120px"}} src={'https://services.swpc.noaa.gov/images/animations/lasco-c3/latest.jpg'}/>} 
          PopOverString={<img src={'https://services.swpc.noaa.gov/images/animations/lasco-c3/latest.jpg'}/>}/>
        </div>
            <div className="Coronagraphs" style={{"alignContent": "flex-start", "display": "flex", "flexDirection": "column"}}>
              <MouseHoverPopoverCME 
          DisplayString={<img style={{"width": "120px", "height": "120px"}} src={'https://services.swpc.noaa.gov/images/animations/ccor1-diff/latest.jpg'}/>} 
          PopOverString={<img style={{"width": "640px", "height": "640px"}} src={'https://services.swpc.noaa.gov/images/animations/ccor1-diff/latest.jpg'}/>}/>
        <MouseHoverPopoverCME 
          DisplayString={<img style={{"width": "120px", "height": "120px"}} src={'https://services.swpc.noaa.gov/images/animations/ccor1/latest.jpg'}/>} 
          PopOverString={<img style={{"width": "640px", "height": "640px"}} src={'https://services.swpc.noaa.gov/images/animations/ccor1/latest.jpg'}/>}/>
            </div>
        <MouseHoverPopoverCME 
          DisplayString={<img style={{"width": "384px", "height": "250px"}} src={'https://services.swpc.noaa.gov/images/animations/enlil/latest.jpg'}/>} 
          PopOverString={<img style={{}} src={'https://services.swpc.noaa.gov/images/animations/enlil/latest.jpg'}/>}/>
            </div>
        <div></div>
      </div>
    </div>
  );
}

export default CMEPredictions;