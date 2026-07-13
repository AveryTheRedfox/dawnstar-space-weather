import { PopOverGraphs } from "../../inner_content/popover";
import { WindSpeedGraph } from "../../inner_content/Graphs";
import { DensityGraph } from "../../inner_content/Graphs";
import { TemperatureGraph } from "../../inner_content/Graphs";
import { useState } from "react";
import "./SolarWindDisplay.css";

function WindSpeedCalculation(dataKey) {
  const [dataSource, setDataSource] = useState("ACE");
  const [activeButton, setActiveButton] = useState(null);


  const toggleView = (view) => {
    setActiveButton(current => current === view ? null : view);
  };


  let WindSpeedArray = dataKey?.dataKey?.map((i) => i?.proton_speed) ?? [];
  let DensityArray = dataKey?.dataKey?.map((i) => i?.proton_density) ?? [];
  let TemperatureArray = dataKey?.dataKey?.map((i) => i?.proton_temperature) ?? [];
  let TimeTags = dataKey?.dataKey?.map((i) => i?.time_tag) ?? [];
  let ACEDataArray = dataKey?.dataKey?.map((i) => i?.source === "ACE" ? i : null).filter(i => i !== null) ?? [];
  let IMAPDataArray = dataKey?.dataKey?.map((i) => i?.source === "IMAP" ? i : null).filter(i => i !== null) ?? [];
  let SOLAR1DataArray = dataKey?.dataKey?.map((i) => i?.source === "SOLAR1" ? i : null).filter(i => i !== null) ?? [];

  let ACEData = {
    Density: ACEDataArray?.map((i) => i?.proton_density) ?? [],
    Speed: ACEDataArray?.map((i) => i?.proton_speed) ?? [],
    Temperature: ACEDataArray?.map((i) => i?.proton_temperature) ?? [],
    TimeTags: ACEDataArray?.map((i) => i?.time_tag) ?? [],
  };
  let IMAPData = {
    Density: IMAPDataArray?.map((i) => i?.proton_density) ?? [],
    Speed: IMAPDataArray?.map((i) => i?.proton_speed) ?? [],
    Temperature: IMAPDataArray?.map((i) => i?.proton_temperature) ?? [],
      TimeTags: IMAPDataArray?.map((i) => i?.time_tag) ?? [],
  };
  let SOLAR1Data = {
    Density: SOLAR1DataArray?.map((i) => i?.proton_density) ?? [],
    Speed: SOLAR1DataArray?.map((i) => i?.proton_speed) ?? [],
    Temperature: SOLAR1DataArray?.map((i) => i?.proton_temperature) ?? [],
    TimeTags: SOLAR1DataArray?.map((i) => i?.time_tag) ?? [],
  };

  let WindSpeed = WindSpeedArray?.[0];
  let Density = DensityArray?.[0];
  let Temperature = TemperatureArray?.[0];

  let WindSpeedColor =
    WindSpeed < 400
      ? "#00fd15"
      : WindSpeed >= 400 && WindSpeed < 500
      ? "#eeff00"
      : WindSpeed >= 500 && WindSpeed < 700
      ? "#ff8c00"
      : WindSpeed >= 700
      ? "#c05904"
      : "gray";

  let DensityColor =
    Density < 10
      ? "#00fd15"
      : Density >= 10 && Density < 20
      ? "#eeff00"
      : Density >= 20 && Density < 40
      ? "#ff8c00"
      : Density >= 40 && Density < 60
      ? "#c05904"
      : Density >= 60
      ? "#ffffff"
      : "gray";

  let TemperatureColor =
    Temperature < 20000
      ? "#00fd15"
      : Temperature >= 20000 && Temperature < 100000
      ? "#eeff00"
      : Temperature >= 100000 && Temperature < 500000
      ? "#ff9c00"
      : Temperature >= 500000
      ? "#c05904"
      : "gray";

  let WindSpeedDisplay = 
  WindSpeed < 400
    ? "Low"
    : WindSpeed >= 400 && WindSpeed < 500
    ? "Elevated"
    : WindSpeed >= 500 && WindSpeed < 700
    ? "High"
    : WindSpeed >= 700
    ? "Very High"
    : "Unknown";
  
  let DensityDisplay =
  Density < 10
    ? "Low"
    : Density >= 10 && Density < 20
    ? "Elevated"
    : Density >= 20 && Density < 40
    ? "High"
    : Density >= 40 && Density < 60
    ? "Very High"
    : "Unknown";

let TemperatureDisplay =
  Temperature < 20000
    ? "Low"
    : Temperature >= 20000 && Temperature < 100000
    ? "Elevated"
    : Temperature >= 100000 && Temperature < 500000
    ? "High"
    : Temperature >= 500000
    ? "Very High"
    : "Unknown";


function DisplayActiveSolarWindSource() {
  const [dataSource, setDataSource] = useState("ACE");

  let activegraphs = [];
  let activeDisplayData = [];
  let currentlySelectedButtonStyle = {
    backgroundColor: "#c05904",
    color: "white",
  };
  let ACEstyleSelected = {};
  let IMAPstyleSelected = {};
  let SOLAR1styleSelected = {};

  if (dataSource === "ACE") {
    activeDisplayData = [ACEData.Speed[0], ACEData.Density[0], ACEData.Temperature[0]];
    activegraphs = [<WindSpeedGraph dataKey={[ACEData.Speed, ACEData.TimeTags]} />, <TemperatureGraph dataKey={[ACEData.Temperature, ACEData.TimeTags]} />, <DensityGraph dataKey={[ACEData.Density, ACEData.TimeTags]} />];
    ACEstyleSelected = currentlySelectedButtonStyle;
  } else if (dataSource === "IMAP") {
    activeDisplayData = [IMAPData.Speed[0], IMAPData.Density[0], IMAPData.Temperature[0]];
    activegraphs = [<WindSpeedGraph dataKey={[IMAPData.Speed, IMAPData.TimeTags]} />, <TemperatureGraph dataKey={[IMAPData.Temperature, IMAPData.TimeTags]} />, <DensityGraph dataKey={[IMAPData.Density, IMAPData.TimeTags]} />];
    IMAPstyleSelected = currentlySelectedButtonStyle;
  } else if (dataSource === "SOLAR1") {
    activeDisplayData = [SOLAR1Data.Speed[0], SOLAR1Data.Density[0], SOLAR1Data.Temperature[0]];
    activegraphs = [<WindSpeedGraph dataKey={[SOLAR1Data.Speed, SOLAR1Data.TimeTags]} />, <TemperatureGraph dataKey={[SOLAR1Data.Temperature, SOLAR1Data.TimeTags]} />, <DensityGraph dataKey={[SOLAR1Data.Density, SOLAR1Data.TimeTags]} />];
    SOLAR1styleSelected = currentlySelectedButtonStyle;
  }

  return (
    <div className="SolarDataContent">
      <div className="sourceButtonContainer">
        <button className="source-button" style={ACEstyleSelected} onClick={() => setDataSource("ACE")}>ACE</button>
        <button className="source-button" style={IMAPstyleSelected} onClick={() => setDataSource("IMAP")}>IMAP</button>
        <button className="source-button" style={SOLAR1styleSelected} onClick={() => setDataSource("SOLAR1")}>SOLAR1</button>
      </div>
        <div className="SolarWindDataDisplays">
          <div className="ContainerDisplay">
            <img className="SolarWindContextImage" src={require("./air_56dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.png")} />
            <div className="InnerContentDisplay">
            <PopOverGraphs
            DisplayString={"Wind Speed:"}
            PopOverString={
              activegraphs[0]
            }
            PopOverStringStyling={{ "color": "darkgray", "textDecorationStyle": "dashed" }}
            />
            <div style={{ color: WindSpeedColor }}>{activeDisplayData[0]} km/s</div>
            <div style={{ color: WindSpeedColor }}>{WindSpeedDisplay}</div>
          </div>
          </div>
      <div className="ContainerDisplay">
        <img className="SolarWindContextImage" src={require("./rainy_snow_56dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.png")} />
        <div className="InnerContentDisplay">
          <PopOverGraphs
            DisplayString={"Density:"}
            PopOverString={activegraphs[2]}
            PopOverStringStyling={{ color: "darkgray" }}
          />{" "}
          <div style={{ color: DensityColor }}>{activeDisplayData[1]} p/cm3</div>
          <div style={{ color: DensityColor }}>{DensityDisplay}</div>
        </div>
      </div>
      <div className="ContainerDisplay">
        <img className="SolarWindContextImage" src={require("./device_thermostat_56dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.png")} />
        <div className="InnerContentDisplay">
          <PopOverGraphs
            DisplayString={"Temperature:"}
            PopOverString={
              activegraphs[1]
            }
            PopOverStringStyling={{ color: "darkgray" }}
          />
          <div style={{ color: TemperatureColor }}>{Math.round((activeDisplayData[2] * 100) / 1000) / 100} kK</div>
          <div style={{ color: TemperatureColor }}>{TemperatureDisplay}</div>
        </div>
      </div>
    </div>
  </div>
  );
}


  return (
    <div className="SolarWindDataDisplays">
      <DisplayActiveSolarWindSource/>
    </div>
  );
}

export default WindSpeedCalculation;
