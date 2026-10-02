
import "./lowerContentButtons.css";
import {useState} from "react";
import {useEffect} from "react";
import AuroraComponent from "./AuroraPanel/lowerContentAurora.js";
import ProtonPanel from "./SolarProtonPanel/SolarProtons.js";
import SunspotPanel from "./SunspotPanel/lowerContentSunspots.js";
import SolarFarsidePanel from "./lowerContentFarside/lowerContentFarside.js";
import { MagnetometerData } from "./lowerContentMag/lowerContentMag.js";


function ContentButtons(dataKey) {
  const [activeButton, setActiveButton] = useState(null);
  const toggleView = (view) => {
    setActiveButton(current => current === view ? null : view);
  };


  return (
    <div className="LowerContent">
        <div className="Buttons">
            <button onClick={() => toggleView(1)} className="LowerContentButton">Solar Protons</button>
            <button onClick={() => toggleView(2)} className="LowerContentButton">Solar Farside</button>
            <button onClick={() => toggleView(3)} className="LowerContentButton">Sunspots</button>
            <button onClick={() => toggleView(4)} className="LowerContentButton">Aurora</button>
            <button onClick={() => toggleView(5)} className="LowerContentButton">Magnetometer</button>
        </div>
        <div className="ToggledContent">
            {activeButton === 1 && <ProtonPanel className="ToggledComponent"/>}
            {activeButton === 2 && <SolarFarsidePanel className="ToggledContent"/>}
            {activeButton === 3 && <SunspotPanel data={dataKey?.dataKey?.[4]} className="ToggledContent"/>}
            {activeButton === 4 && <AuroraComponent className="ToggledContent" dataKey={[dataKey?.dataKey?.[1]?.text, dataKey?.dataKey?.[3], dataKey?.dataKey?.[2]?.text, dataKey?.dataKey?.[4]]}/>}
            {activeButton === 5 && <MagnetometerData className="ToggledContent"/>}
        </div>
    </div>
  );
}

export default ContentButtons;