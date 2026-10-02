import KpCalculation from "./upperContent/KpIndexDisplay/KpIndexDisplay.js";
import React from "react";
import { useState } from "react";
import WindSpeedCalculation from "./upperContent/SolarWindDisplay/SolarWindDisplay.js";
import IntMagDisplay from "./upperContent/ImfDisplay/ImfDisplay.js";
import AlertsDisplay from "./upperContent/AlertsDisplay/AlertsDisplay.js";
import FlareDisplay from "./upperContent/FlareDisplay/FlareDisplay.js";
import SolarImages from "./inner_content/solar_images";
import useFetchingApi from "./fetching-service/FetchingFunction/FetchingFunction.js";
import ContentButtons from "./inner_content/LowerContentComponents/lowerContentButtons.js";
import { SpaceWeatherProvider, useSpaceWeather } from "./fetching-service/FetchingFunction/FetchingDataLogic.js";
import App3DBackground from "./App3D-Background/App3DBackground.js";
import { Button } from "@mui/material";
import ListSubheader from '@mui/material/ListSubheader'
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import AuroraComponent from "./inner_content/LowerContentComponents/AuroraPanel/lowerContentAurora.js";
import ProtonPanel from "./inner_content/LowerContentComponents/SolarProtonPanel/SolarProtons.js";
import SolarFarsidePanel from "./inner_content/LowerContentComponents/lowerContentFarside/lowerContentFarside.js";
import SunspotPanel from "./inner_content/LowerContentComponents/SunspotPanel/lowerContentSunspots.js";

import { MagnetometerData } from "./inner_content/LowerContentComponents/lowerContentMag/lowerContentMag.js";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";



function LowerContentSelectionMenu() {
  const [SolarWind, IntMag, KpIndex, Alerts, Flare, LatestFlare, Enlil, Ovation, HPIData, ForecastData, SunspotData, CMEData] = useSpaceWeather();
  
   const [activeButton, setActiveButton] = useState(null);
  const toggleView = (view) => {
    setActiveButton(current => current === view ? null : view);
  };


  return (
    <div className="LowerContent">
        <div className="Buttons">
            <button onClick={() => toggleView(2)} className="LowerContentButton">Solar Protons</button>
            <button onClick={() => toggleView(3)} className="LowerContentButton">Solar Farside</button>
            <button onClick={() => toggleView(4)} className="LowerContentButton">Sunspots</button>
            <button onClick={() => toggleView(5)} className="LowerContentButton">Aurora</button>
            <button onClick={() => toggleView(6)} className="LowerContentButton">Magnetometer</button>
            <button onClick={() => toggleView(7)} className="LowerContentButton">Magnetosphere</button>
        </div>
        <div className="ToggledContent">
            {activeButton === 2 && <ProtonPanel className="ToggledComponent"/>}
            {activeButton === 3 && <SolarFarsidePanel className="ToggledContent"/>}
            {activeButton === 4 && <SunspotPanel data={SunspotData} className="ToggledContent"/>}
            {activeButton === 5 && <AuroraComponent className="ToggledContent" dataKey={[HPIData, Ovation, ForecastData, KpIndex]}/>}
            {activeButton === 6 && <MagnetometerData className="ToggledContent"/>}
            {activeButton === 7 && <div className="ToggledContent">Work in Progress Panel to display the current state of the Magnetosphere</div>}
        </div>
    </div>
  );
}

function App() {
  return (
  <SpaceWeatherProvider>
      <div className="TitleAndData">
        <div style={{display: 'flex', flexDirection: 'column'}}>
        <KpCalculation className="ContentCard"/>
        </div>
        <div className="SunAndAlerts">
          <AlertsDisplay className="alertsandadvisorybar" style={{ minHeight: "50px",}}/>
          <div className="SolarData">
            <WindSpeedCalculation className="ContentCard" />
            <IntMagDisplay className="ContentCard" />
            <FlareDisplay className="ContentCard"/>
          </div>
        </div>
      </div>
      <LowerContentSelectionMenu/>
      <div className="AppName" style={{"fontFamily": "Roboto"}}><img className="cannot_select" src={require("./wb_twilight_62dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.png")}>
      </img>
      <div className="cannot_select">
        <div style={{fontSize: '75%'}}>Dawnstar Space Weather</div>
          <div>ATHENA-Sv1.1</div>
      </div>
          </div>
      <App3DBackground/>
    </SpaceWeatherProvider>
  );
}

export default App;