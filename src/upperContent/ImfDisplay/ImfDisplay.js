import useFetchingApi from "../../fetching-service/FetchingFunction/FetchingFunction.js";
import { PopOverGraphs } from "../../inner_content/popover.js";
import { IMFBtGraph } from "../../inner_content/Graphs.js";
import { IMFBzGraph } from "../../inner_content/Graphs.js";
import "./ImfDisplay.css";

function IntMagDisplay(dataKey) {
  const IMFDataArray = dataKey?.dataKey;

  const IMFBt = IMFDataArray?.[0]?.bt;
  const IMFBz = IMFDataArray?.[0]?.bz_gsm;
  const times = IMFDataArray?.[0]?.time_tag;

  let BzDirection = "";
  let BzArrow = {};
  let BzBorderColor = "";

  if (IMFBz < 0) {
    BzDirection = "#FF0000";
  } else if (IMFBz >= 0) {
    BzDirection = "#00fd15";
  }
  let IMFBzColor = "";
  if (IMFBz < -5) {
    BzBorderColor = "#d63f24";
  } else if (IMFBz < -10) {
    BzBorderColor = "#c03105";
  } else if (IMFBz < -20) {
    BzBorderColor = "#8b0000";
  } else {
    BzBorderColor = "gray";
  }

  let IMFBtColor = "";
  if (IMFBt < 10) {
    IMFBtColor = "#ffffff";
  } else if (IMFBz < 20) {
    IMFBtColor = "#ff8c00";
  } else if (IMFBz < 30) {
    IMFBtColor = "#c05904";
  }

  return (
    <div
      className="IntMagDisplay"
      style={{ border: `2px solid ${BzBorderColor}` }}
    >
      <img src={require("./explore_56dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.png")} style={{ width: "56px", height: "56px" }} />
      <div className="IntMagData">
        <div className="IMFBt">
          <PopOverGraphs
            DisplayString={"IMF Bt:"}
            PopOverString={<IMFBtGraph dataKey={[IMFDataArray]} />}
            PopOverStringStyling={{ color: "darkgray" }}
          />
          <div style={{ color: IMFBtColor, marginLeft: "10px", height: "100%", alignSelf: "center" }}>
            {Math.round(IMFBt * 100) / 100}nT
          </div>
        </div>
        <div className="IMFBz">
          <PopOverGraphs
            DisplayString={"IMF Bz:"}
            PopOverString={<IMFBzGraph dataKey={[IMFDataArray]} />}
            PopOverStringStyling={{ color: "darkgray" }}
          />
          <div style={{ color: BzDirection, marginLeft: "10px", height: "100%", alignSelf: "center" }}>
            {Math.round(IMFBz * 100) / 100}nT
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntMagDisplay;
