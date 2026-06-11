import { PopOverGraphs } from "../../inner_content/popover";
import { WindSpeedGraph } from "../../inner_content/Graphs";
import { DensityGraph } from "../../inner_content/Graphs";
import { TemperatureGraph } from "../../inner_content/Graphs";
import "./SolarWindDisplay.css";

function WindSpeedCalculation(dataKey) {
  const WindSpeedArray = dataKey?.dataKey?.map((i) => i?.proton_speed) ?? [];
  const DensityArray = dataKey?.dataKey?.map((i) => i?.proton_density) ?? [];
  const TemperatureArray =
    dataKey?.dataKey?.map((i) => i?.proton_temperature) ?? [];
  const TimeTags = dataKey?.dataKey?.map((i) => i?.time_tag) ?? [];

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

  return (
    <div className="SolarWindDataDisplays">
      <div className="ContainerDisplay">
        <img src={require("./air_56dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.png")} />
        <div className="InnerContentDisplay">
          <PopOverGraphs
            DisplayString={"Wind Speed:"}
            PopOverString={
              <WindSpeedGraph dataKey={[WindSpeedArray, TimeTags]} />
            }
            PopOverStringStyling={{ color: "darkgray" }}
          />
          <div style={{ color: WindSpeedColor }}>{WindSpeed} km/s</div>
          <div style={{ color: WindSpeedColor }}>{WindSpeedDisplay}</div>
        </div>
      </div>
      <div className="ContainerDisplay">
        <img src={require("./rainy_snow_56dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.png")} />
        <div className="InnerContentDisplay">
          <PopOverGraphs
            DisplayString={"Density:"}
            PopOverString={<DensityGraph dataKey={[DensityArray, TimeTags]} />}
            PopOverStringStyling={{ color: "darkgray" }}
          />{" "}
          <div style={{ color: DensityColor }}>{Density} p/cm3</div>
          <div style={{ color: DensityColor }}>{DensityDisplay}</div>
        </div>
      </div>
      <div className="ContainerDisplay">
        <img src={require("./device_thermostat_56dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.png")} />
        <div className="InnerContentDisplay">
          <PopOverGraphs
            DisplayString={"Temperature:"}
            PopOverString={
              <TemperatureGraph dataKey={[TemperatureArray, TimeTags]} />
            }
            PopOverStringStyling={{ color: "darkgray" }}
          />
          <div style={{ color: TemperatureColor }}>{Math.round((Temperature * 100) / 1000) / 100} kK</div>
          <div style={{ color: TemperatureColor }}>{TemperatureDisplay}</div>
        </div>
      </div>
    </div>
  );
}

export default WindSpeedCalculation;
