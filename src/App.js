import KpCalculation from "./upperContent/KpIndexDisplay/KpIndexDisplay.js";
import WindSpeedCalculation from "./upperContent/SolarWindDisplay/SolarWindDisplay.js";
import IntMagDisplay from "./upperContent/ImfDisplay/ImfDisplay.js";
import AlertsDisplay from "./upperContent/AlertsDisplay/AlertsDisplay.js";
import FlareDisplay from "./upperContent/FlareDisplay/FlareDisplay.js";
import SolarImages from "./inner_content/solar_images";
import useFetchingApi from "./fetching-service/FetchingFunction/FetchingFunction.js";
import ContentButtons from "./inner_content/LowerContentComponents/lowerContentButtons.js";
//import KpIndexChart from "./inner_content/Charts.js"
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

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
    HPIData,
    ForecastData,
    SunspotData,
    CMEData,
  ] = useFetchingApi();
  return (
    <div className="Content">
      <div className="TitleAndData">
        <KpCalculation dataKey={KpIndex} className="ContentCard"/>
        <div className="SunAndAlerts">
          <AlertsDisplay dataKey={[Alerts, Enlil]} className="alertsandadvisorybar" style={{ minHeight: "50px",}}/>
          <SolarImages/>
          <div className="SolarData">
            <WindSpeedCalculation dataKey={SolarWind} className="ContentCard" />
            <IntMagDisplay dataKey={IntMag} className="ContentCard" />
            <FlareDisplay dataKey={[Flare, LatestFlare]} className="ContentCard"/>
          </div>
        </div>
      </div>
      <ContentButtons dataKey={[Enlil, HPIData, ForecastData, Ovation, SunspotData]} className="LowerContent"></ContentButtons>
      <div className="AppName"><img src={require("./wb_twilight_62dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.png")}/><div >Dawnstar <br></br> Space Weather</div></div>
    </div>
  );
}

export default App;