import "./FlareDisplay.css";
import {PopOverGraphs} from "../../inner_content/popover.js";
import { TimeConverter } from "../../inner_content/LowerContentComponents/CMECenter/useCMEPredictions.js";
import {useSpaceWeather} from "../../fetching-service/FetchingFunction/FetchingDataLogic.js";


function FlareDisplay() {
  const [,,,, FlareData, LatestFlareData] = useSpaceWeather();
    const FlareFlux =
    FlareData?.[FlareData?.length - 1]?.flux ?? null;
    const LatestFlareClass =
    LatestFlareData?.[LatestFlareData.length - 1]?.max_class ?? null;
    let twentyFourHourMaxFlux;
    try {
      twentyFourHourMaxFlux = FlareData?.reduce((max, item) => (item.flux > max ? item.flux : max), 0) ?? "";
    } catch (error) {
            twentyFourHourMaxFlux = 1e-8; 
    }
  
  function XrayToGOESClass(flux) {
    if (flux >= 1e-4) {
      return "X";
    } else if (flux >= 1e-5) {
      return "M";
    } else if (flux >= 1e-6) {
      return "C";
    } else if (flux >= 1e-7) {
      return "B";
    } else if (flux >= 1e-8) {
      return "A";
    }
  }
  function FlareColor(flux) {
    if (flux >= 1e-4) {
      return "red";
    } else if (flux >= 1e-5) {
      return "orange";
    } else if (flux >= 1e-6) {
      return "yellow";
    } else if (flux >= 1e-7) {
      return "green";
    } 
  }




  return (
    <div className="FlareDisplay">
      
      <div className="FlareTitle">
        <img src={require("./bolt_boost_56dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.png")} style={{ width: "56px", height: "56px", alignSelf: "center", marginRight: "10px" }} />
      </div>
      <div className="FlareData">
        <div className="FlareValue" style={{ color: FlareColor(FlareFlux) }}>
          <PopOverGraphs 
          DisplayString={"Current X-Rays:" + XrayToGOESClass(FlareFlux) + (FlareFlux ? FlareFlux.toExponential(2) : "NaN").split("e")[0]}
          PopOverString={"Place Flare Graph here!"}
          PopOverStringStyling={{ color: "darkgray" }}
          />
        </div>
        <div className="FlareValue" style={{ color: FlareColor(LatestFlareClass) }}>
          Latest Flare: {LatestFlareClass ? LatestFlareClass : "NaN"}
        </div>
        <div className="FlareValue" style={{ color: FlareColor(twentyFourHourMaxFlux) }}>
          24h Max.: {XrayToGOESClass(twentyFourHourMaxFlux) + (twentyFourHourMaxFlux ? twentyFourHourMaxFlux.toExponential(2) : "NaN").split("e")[0]}
        </div>
      </div>
    </div>
  );
}

export function setFlareAlert(flareParameter) {
  if (flareParameter === undefined || NaN) {
    return("Info: Flare Data currently unavailable");
  }
}

export default FlareDisplay;
