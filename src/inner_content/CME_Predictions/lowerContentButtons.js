
import "./lowerContentButtons.css";
import {useState} from "react";
import {useEffect} from "react";
import CMEPredictions from "./predictions.js";

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
            <button onClick={() => toggleView(3)} className="LowerContentButton">Geomagnetic Forecast</button>
            <button onClick={() => toggleView(4)} className="LowerContentButton">Sunspots</button>
            <button onClick={() => toggleView(5)} className="LowerContentButton">Aurora</button>
            <button onClick={() => toggleView(6)} className="LowerContentButton">Solar Cycle</button>
        </div>
        <div className="ToggledContent">
            {activeButton === 1 && <CMEPredictions dataKey={dataKey?.dataKey?.[0]} className="ToggledContent"/>}
            {activeButton === 2 && "Solar Protons"}
            {activeButton === 3 && "CME Geomagnetic Forecast"}
            {activeButton === 4 && "Sunspots"}
            {activeButton === 5 && "Aurora"}
            {activeButton === 6 && "Solar Cycle"}
        </div>
    </div>
  );
}

export default ContentButtons;