import KpCalculation from "./fetching-service/KpIndexDisplay/KpIndexDisplay.js";
import WindSpeedCalculation from "./fetching-service/SolarWindDisplay/SolarWindDisplay.js";
import IntMagDisplay from "./fetching-service/ImfDisplay/ImfDisplay.js";
import AlertsDisplay from "./fetching-service/AlertsDisplay/AlertsDisplay.js";
import FlareDisplay from "./fetching-service/FlareDisplay/FlareDisplay.js";
import SolarImages from "./inner_content/solar_images";
import CMEPredictions from "./inner_content/CME_Predictions/predictions";
import useFetchingApi from "./fetching-service/FetchingFunction/FetchingFunction.js";
import ContentButtons from "./inner_content/CME_Predictions/lowerContentButtons.js";
//import KpIndexChart from "./inner_content/Charts.js"
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import { use } from "react";

function App() {
  const [
    SolarWind,
    IntMag,
    KpIndex,
    Alerts,
    Flare,
    LatestFlare,
    Enlil,
    Ovation,
    KirunaMagData,
  ] = useFetchingApi();
  return (
    <div className="Content">
      <div className="TitleAndData">
        <KpCalculation dataKey={KpIndex} className="ContentCard"/>
        <div className="SunAndAlerts">
          <AlertsDisplay dataKey={Alerts} className="alertsandadvisorybar" style={{ minHeight: "50px",}}/>
          <SolarImages/>
          <div className="SolarData" style={{display: "flex", flexDirection: "row"}}>
            <WindSpeedCalculation dataKey={SolarWind} className="ContentCard" />
            <IntMagDisplay dataKey={IntMag} className="ContentCard" />
            <FlareDisplay dataKey={[Flare, LatestFlare]} className="ContentCard"/>
          </div>
        </div>
      </div>
      <ContentButtons dataKey={[Enlil]} className="LowerContent"></ContentButtons>
    </div>
  );
}

export default App;