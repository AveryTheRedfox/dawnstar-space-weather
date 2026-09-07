import KpCalculation from "./upperContent/KpIndexDisplay/KpIndexDisplay.js";
import WindSpeedCalculation from "./upperContent/SolarWindDisplay/SolarWindDisplay.js";
import IntMagDisplay from "./upperContent/ImfDisplay/ImfDisplay.js";
import AlertsDisplay from "./upperContent/AlertsDisplay/AlertsDisplay.js";
import FlareDisplay from "./upperContent/FlareDisplay/FlareDisplay.js";
import SolarImages from "./inner_content/solar_images";
import useFetchingApi from "./fetching-service/FetchingFunction/FetchingFunction.js";
import ContentButtons from "./inner_content/LowerContentComponents/lowerContentButtons.js";
import { SpaceWeatherProvider } from "./fetching-service/FetchingFunction/FetchingDataLogic.js";
import App3DBackground from "./App3DBackground.js";
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
  <SpaceWeatherProvider>
      <div className="TitleAndData">
        <KpCalculation className="ContentCard"/>
        <div className="SunAndAlerts">
          <AlertsDisplay className="alertsandadvisorybar" style={{ minHeight: "50px",}}/>
          <div className="SolarData">
            <WindSpeedCalculation className="ContentCard" />
            <IntMagDisplay className="ContentCard" />
            <FlareDisplay className="ContentCard"/>
          </div>
        </div>
      </div>
      <div className="AppName" style={{"fontFamily": "Roboto"}}><img src={require("./wb_twilight_62dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.png")}></img>Dawnstar<br/> Space Weather</div>
      <App3DBackground/>
    </SpaceWeatherProvider>
  );
}

export default App;