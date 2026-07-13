
import "./lowerContentButtons.css";
import {useState} from "react";
import {useEffect} from "react";
import CMEPredictions from "./CMECenter/predictions.js";
import AuroraComponent from "./AuroraPanel/lowerContentAurora.js";
import ProtonPanel from "./SolarProtonPanel/SolarProtons.js";
import SunspotPanel from "./SunspotPanel/lowerContentSunspots.js";
import SolarFarsidePanel from "./lowerContentFarside/lowerContentFarside.js";


function ContentButtons(dataKey) {
  const [activeButton, setActiveButton] = useState(null);
  const toggleView = (view) => {
    setActiveButton(current => current === view ? null : view);
  };


  return (
    <div className="LowerContent">
        <div className="Buttons">
            <button onClick={() => toggleView(1)} className="LowerContentButton">
            CME Center
            </button>
            <button onClick={() => toggleView(2)} className="LowerContentButton">Solar Protons</button>
            <button onClick={() => toggleView(3)} className="LowerContentButton">Solar Farside</button>
            <button onClick={() => toggleView(4)} className="LowerContentButton">Sunspots</button>
            <button onClick={() => toggleView(5)} className="LowerContentButton">Aurora</button>
            <button onClick={() => toggleView(6)} className="LowerContentButton">Solar Cycle</button>
        </div>
        <div className="ToggledContent">
            {activeButton === 1 && <CMEPredictions dataKey={dataKey?.dataKey?.[0]} className="ToggledContent"/>}
            {activeButton === 2 && <ProtonPanel className="ToggledComponent"/>}
            {activeButton === 3 && <SolarFarsidePanel className="ToggledContent"/>}
            {activeButton === 4 && <SunspotPanel data={dataKey?.dataKey?.[4]} className="ToggledContent"/>}
            {activeButton === 5 && <AuroraComponent className="ToggledContent" dataKey={[dataKey?.dataKey?.[1]?.text, dataKey?.dataKey?.[3], dataKey?.dataKey?.[2]?.text]}/>}
            {activeButton === 6 && "Solar Cycle"}
        </div>
    </div>
  );
}

export default ContentButtons;