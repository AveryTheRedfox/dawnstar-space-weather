
import React from "react";
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

function SolarImages() {

let solarImages = [
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_0193.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_0304.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_0171.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_0211.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_0094.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_0131.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_0335.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_HMIBC.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_HMIIC.jpg',
];

    


    return (
        <div className="solar-images-container" style={{
            "alignContent": "flex",
            "flexDirection": "row",
            "verticalAlign": "top",
            "display": "flex",
            "padding": "10px",
            "position":"relative",
             "minWidth": "73vw",
             "maxWidth": "75vw",
             "marginTop": "0px",
             "alignContent": "space-evenly",
             "justifyContent": "space-between",
             "flexWrap": "wrap",
        }}>
            {solarImages.map((image, index) => (
                          <img key={index} src={image}  style={{"width": "160px", "height": "160px"}}></img>
            ))}

        </div>
    );

}

export default SolarImages;