import "./FlareDisplay.css";

function FlareDisplay(dataKey) {
  const FlareFlux =
    dataKey?.dataKey?.[0]?.[dataKey?.dataKey?.[0].length - 1]?.flux ?? null;
  const LatestFlareClass =
    dataKey?.dataKey?.[1]?.[dataKey?.dataKey?.[1].length - 1]?.max_class ??
    null;
  const NewestFlare = "";
  let FluxArray = [];
  let twoHourMaximum = 0;

  function LatestFlareClassToDisplay(NewestFlare) {
    if (LatestFlareClass === null) {
      return (NewestFlare = "In Progress");
    } else {
      return (NewestFlare = LatestFlareClass);
    }
  }

  for (let i = 1; i < dataKey?.dataKey?.[0]?.length; i++) {
    FluxArray.push(dataKey?.dataKey?.[0]?.[i]?.flux);
  }
  twoHourMaximum = Math.max(...FluxArray);

  function FlarevalueToGoesClass(FlareFlux) {
    if (FlareFlux < 2e-8) {
      return (
        <div style={{ color: "#0f7718", paddingLeft: "5px" }}> A0.00 </div>
      );
    } else if (FlareFlux < 1e-7) {
      return (
        <div style={{ color: "#0f7718", paddingLeft: "5px" }}>
          {"A" + (FlareFlux / 1e-8).toFixed(2)}
        </div>
      );
    } else if (FlareFlux < 1e-6) {
      return (
        <div style={{ color: "#00fd15", paddingLeft: "5px" }}>
          {"B" + (FlareFlux / 1e-7).toFixed(2)}
        </div>
      );
    } else if (FlareFlux < 1e-5) {
      return (
        <div style={{ color: "#eeff00", paddingLeft: "5px" }}>
          {"C" + (FlareFlux / 1e-6).toFixed(2)}
        </div>
      );
    } else if (FlareFlux < 1e-4) {
      return (
        <div style={{ color: "#ff8c00", paddingLeft: "5px" }}>
          {"M" + (FlareFlux / 1e-5).toFixed(2)}
        </div>
      );
    } else {
      return (
        <div style={{ color: "#c41616", paddingLeft: "5px" }}>
          {"X" + (FlareFlux / 1e-4).toFixed(2)}
        </div>
      );
    }
  }

  function HighestTwoHourMaximumToGOESClass(twoHourMaximum) {
    if (twoHourMaximum < 2e-8) {
      return <div style={{ color: "#0f7718", paddingLeft: "5px" }}>A0.00</div>;
    } else if (twoHourMaximum < 1e-7) {
      return (
        <div style={{ color: "#0f7718", paddingLeft: "5px" }}>
          {"A" + (twoHourMaximum / 1e-8).toFixed(2)}
        </div>
      );
    } else if (twoHourMaximum < 1e-6) {
      return (
        <div style={{ color: "#00fd15", paddingLeft: "5px" }}>
          {"B" + (twoHourMaximum / 1e-7).toFixed(2)}
        </div>
      );
    } else if (twoHourMaximum < 1e-5) {
      return (
        <div style={{ color: "#eeff00", paddingLeft: "5px" }}>
          {"C" + (twoHourMaximum / 1e-6).toFixed(2)}
        </div>
      );
    } else if (twoHourMaximum < 1e-4) {
      return (
        <div style={{ color: "#ff8c00", paddingLeft: "5px" }}>
          {"M" + (twoHourMaximum / 1e-5).toFixed(2)}
        </div>
      );
    } else {
      return (
        <div style={{ color: "#e60a0a", paddingLeft: "5px" }}>
          {"X" + (twoHourMaximum / 1e-4).toFixed(2)}
        </div>
      );
    }
  }

  return (
    <div className="FlareDisplay">
      
      <div className="FlareTitle">
        <img src={require("./bolt_boost_56dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.png")} style={{ width: "56px", height: "56px", alignSelf: "center", marginRight: "10px" }} />
      </div>
      <div className="FlareData">
        <div className="FlareValue">
          Current X-Ray Flux: {FlarevalueToGoesClass(FlareFlux)}
        </div>
        <div className="FlareValue">
          Latest Flare: {LatestFlareClassToDisplay(NewestFlare)}
        </div>
        <div className="FlareValue">
          24h Maximum: {HighestTwoHourMaximumToGOESClass(twoHourMaximum)}
        </div>
      </div>
    </div>
  );
}

export default FlareDisplay;
