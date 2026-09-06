
import 'reactjs-popup/dist/index.css'
import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import {useSpaceWeather} from "../fetching-service/FetchingFunction/FetchingDataLogic.js";
import {useEffect } from 'react';
import SunspotPanel from './LowerContentComponents/SunspotPanel/lowerContentSunspots.js';
import { Script } from 'node:vm';

function MouseHoverPopoverCME({DisplayString, PopOverString, PopOverStringStyling}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);



  return (
    <div style={{"marginBottom": "-19px"}}>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        style={{"fontSize": "inherit"}}
      >
        {DisplayString}
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: 'none' }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}> {PopOverString}</Typography>
      </Popover>
    </div>
  );
}


function SolarImages() {

let solarImages = [
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0193.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0304.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0171.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0131.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0094.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0211.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_211193171.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_HMIBC.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_HMIIC.jpg',
];


function DisplayActiveRegions(width, height) {


    const [,,,,,,,,,,SunspotData] = useSpaceWeather();
    let rawSunspotData = SunspotData;


if (!SunspotData) {
  return rawSunspotData = "";
}

  const regex = /([0-9]{4} [SN][0-9]{2}[WE][0-9]{2}   [0-9]{3}  [0-9]{4} [A-Z][a-z]{2}  [0-9]{2}   [0-9]{2} ([a-zA-Z-]{1,16}))/g;



  const filteredSunspots = rawSunspotData?.text?.split("\n").map(line => line.match(regex)).filter(line => line !== null) || [];

  const numbers = filteredSunspots.map((i) => i.toString().substring(0, 4));
  const locations = filteredSunspots.map(line => line.toString().substring(5, 12));
  const areas = filteredSunspots.map(line => line.toString().substring(18, 24));
  const numberofspots = filteredSunspots.map(line => line.toString().substring(33, 36));
  const magneticclasses = filteredSunspots.map(line => line.toString().substring(37, 55));

  console.log(numbers, locations);

//N04W69

const convertLocationToCoordinate = (location) => {
  // Extract directions and numbers based on string positions
  const latDir = location.charAt(0);           // "N" or "S"
  const latVal = parseFloat(location.substring(1, 3)); // "04" -> 4
  const lonDir = location.charAt(3);           // "W" or "E"
  const lonVal = parseFloat(location.substring(4));    // "69" -> 69

  // Apply math signs based on hemisphere
  const xDeg = lonDir === "W" ? -lonVal : lonVal;
  const yDeg = latDir === "S" ? -latVal : latVal;

  const rMax = 90; // Set your max coordinate limit here

  // Calculate percentage positions
  const xPercent = 50 + (xDeg * (50 / rMax));
  const yPercent = 50 - (yDeg * (50 / rMax));

  return { x: xPercent, y: yPercent };
};


const { x, y } = convertLocationToCoordinate(locations[1]);
console.log(x,y);
return (
  /* 2. Relative container holding your background circle */
  <div style={{"width": "75vh", "height": "75vh"}}>
  <img src={''} style={{"width": "inherit", "height": "inherit"}}/>
  <div 
    className="map-container" 
    style={{ 
      position: "relative", 
      width: {width}, 
      height: {height},
    }}
  > 

        <div
          style={{
            position: "absolute",
            left: `${x}%`,
            top: `${y}%`,
            transform: "translate(-50%, -50%)",
            fontWeight: "bold",
            fontSize: "10px",
            
          }}
        >
          {numbers[0]}
        </div>  
  </div>
</div>
)}

    return (
      <div style={{
            "flexDirection": "row",
            "verticalAlign": "top",
            "display": "flex",
             "marginTop": "0px",
             "maxWidth": "80vw",
             "alignContent": "space-between",
             "justifyContent": "space-between",
             "marginBottom": "0.1vw",
            }}>
              
            <MouseHoverPopoverCME DisplayString={<img src={solarImages[0]}  style={{"width": "8.8vw", "height": "8.8vw"}}></img>} PopOverString={<img style={{"width": "70vh", "height": "70vh"}}src={solarImages [0]}></img>}></MouseHoverPopoverCME>
            <MouseHoverPopoverCME DisplayString={<img src={solarImages[1]}  style={{"width": "8.8vw", "height": "8.8vw"}}></img>} PopOverString={<img style={{"width": "70vh", "height": "70vh"}}src={solarImages [1]}></img>}></MouseHoverPopoverCME>
            <MouseHoverPopoverCME DisplayString={<img src={solarImages[2]}  style={{"width": "8.8vw", "height": "8.8vw"}}></img>} PopOverString={<img style={{"width": "70vh", "height": "70vh"}}src={solarImages [2]}></img>}></MouseHoverPopoverCME>
            <MouseHoverPopoverCME DisplayString={<img src={solarImages[3]}  style={{"width": "8.8vw", "height": "8.8vw"}}></img>} PopOverString={<img style={{"width": "70vh", "height": "70vh"}}src={solarImages [3]}></img>}></MouseHoverPopoverCME>
            <MouseHoverPopoverCME DisplayString={<img src={solarImages[4]}  style={{"width": "8.8vw", "height": "8.8vw"}}></img>} PopOverString={<img style={{"width": "70vh", "height": "70vh"}}src={solarImages [4]}></img>}></MouseHoverPopoverCME>
            <MouseHoverPopoverCME DisplayString={<img src={solarImages[5]}  style={{"width": "8.8vw", "height": "8.8vw"}}></img>} PopOverString={<img style={{"width": "70vh", "height": "70vh"}}src={solarImages [5]}></img>}></MouseHoverPopoverCME>
            <MouseHoverPopoverCME DisplayString={<img src={solarImages[6]}  style={{"width": "8.8vw", "height": "8.8vw"}}></img>} PopOverString={<img style={{"width": "70vh", "height": "70vh"}}src={solarImages [6]}></img>}></MouseHoverPopoverCME>
            <MouseHoverPopoverCME DisplayString={<img src={solarImages[7]}  style={{"width": "8.8vw", "height": "8.8vw"}}></img>} PopOverString={<img style={{"width": "70vh", "height": "70vh"}}src={solarImages [7]}></img>}></MouseHoverPopoverCME>
            <MouseHoverPopoverCME DisplayString={<img src={solarImages[8]}  style={{"width": "8.8vw", "height": "8.8vw"}}></img>} PopOverString={<DisplayActiveRegions/>}></MouseHoverPopoverCME>
        </div>
    );

}

export default SolarImages;