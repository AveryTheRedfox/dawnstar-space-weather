
import 'reactjs-popup/dist/index.css'


import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

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
    <div style={{"margin-bottom": "-19px"}}>
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
            <MouseHoverPopoverCME DisplayString={<img src={solarImages[8]}  style={{"width": "8.8vw", "height": "8.8vw"}}></img>} PopOverString={<img style={{"width": "70vh", "height": "70vh"}}src={solarImages [8]}></img>}></MouseHoverPopoverCME>
        </div>
    );



    

}

export default SolarImages;