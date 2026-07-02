
import {useState, useEffect} from "react";
import "./lowerContentAurora.css";
import { HPIGraph } from "../../Graphs";
import { split } from "three/src/nodes/tsl/TSLCore.js";

function AuroraComponent(dataKey) {

function DestructHPIData(data) {
     data = dataKey?.dataKey?.[0];

     let threeDayForecastData = dataKey?.dataKey?.[2]
     .split("\n")
     .slice(16)
     .splice(1)
     .toString()
     .split(" ")
     .filter((i) => i != "")
     .splice(0, 32);

const perChunk = 4 // items per chunk    

const inputArray = threeDayForecastData;

const result = inputArray.reduce((resultArray, item, index) => { 
  const chunkIndex = Math.floor(index/perChunk)

  if(!resultArray[chunkIndex]) {
    resultArray[chunkIndex] = [] // start a new chunk
  }

  resultArray[chunkIndex].push(item)

  return resultArray
}, [])

console.log(result);
let threeDayGeomagneticForecastDataByDay = result;
let day1Forecast = threeDayGeomagneticForecastDataByDay.map((i) => i[1]);
let day2Forecast = threeDayGeomagneticForecastDataByDay.map((i) => i[2]);
let day3Forecast = threeDayGeomagneticForecastDataByDay.map((i) => i[3]);

console.log(day1Forecast);
        
    let threeDayForecastDates = dataKey?.dataKey?.[2]
    .split("\n")
    .slice(16)
    .splice(0, 1)
    .toString()
    .split(" ")
    .filter((i) => i != "")

    let splitHPIDataString = data.split("\n");
    let dataArray = splitHPIDataString.slice(16);

    let seperatedData = [];
    let finalDataArray = [];
    let Observation = [], Forecast = [], NorthHPI = [], SouthHPI = [];
    let slicedObservation = [], slicedForecast = [], slicedNorthHPI = [], sliceSouthHPI = [];
    let dataTypes = [
        Observation,
        Forecast,
        NorthHPI,
        SouthHPI,
    ];
    let sliceDataTypes = [
        slicedObservation,
        slicedForecast,
        slicedNorthHPI,
        sliceSouthHPI,
        threeDayForecastData,
        threeDayForecastDates,
        day1Forecast,
        day2Forecast,
        day3Forecast,
    ];
    for (let i = 0; i < dataArray.length; i++) {
        seperatedData.push(dataArray[i].split(" "));
    }
    for (let j = 0; j < seperatedData.length; j++) {
        finalDataArray.push(seperatedData[j].filter((char) => char != ""));
    }
    for (let k = 0; k < finalDataArray.length -1; k++) {
        dataTypes[0].push(finalDataArray[k][0]);
        dataTypes[1].push(finalDataArray[k][1]);
        dataTypes[2].push(finalDataArray[k][2]);
        dataTypes[3].push(finalDataArray[k][3]);
    }
    for (let l = 0; l < dataTypes[3].length; l++) {
        dataTypes[3][l] = -dataTypes[3][l];
    }
    for (let m = 0; m < dataTypes.length; m++) {
        sliceDataTypes[m] = dataTypes[m].slice((0), (dataTypes[m].length));
    }
    return(sliceDataTypes);
}    



function TwoDimensionalAuroraView() {
    let [
        Observation,
        Forecast,
        North,
        South,
        ThreeDayForecastData,
        ThreeDayForecastDates,
        day1Forecast,
        day2Forecast,
        day3Forecast,
    ] = DestructHPIData();



function convertKpValuetoClass(value) {
    if (value < 4) {
        return ""
    }  else if(value < 5) {
        return "G0"
    } else if (value < 6) {
        return "G1"
    } else if(value < 7) {
        return "G2"
    } else if(value < 8) {
        return "G3"
    } else if(value < 9) {
        return "G4" 
    } else {
        return "G5"
    }
}

console.log(day1Forecast.length);
  let NorthBackgroundColor =
    North[North.length -1] < 20
      ? "green"
      : North[North.length -1] >= 20 && North[North.length -1] < 50
      ? "yellow"
      : North[North.length -1] >= 50 && North[North.length -1] < 100
      ? "orange"
      : North[North.length -1] >= 100 && North[North.length -1] < 200
      ? "red"
      : "gray";

  let SouthBackgroundColor =
    South[South.length] > -20
      ? "green"
      : South[South.length - 1] > -50
      ? "yellow"
      : South[South.length - 1] > -100
      ? "orange"
      : South[South.length - 1] > -200
      ? "red"
      : "#ffffff";
console.log(day1Forecast);
return (
        <div className="Aurora">
            <div className="Images">
                <img className="AuroraImage" src={'https://services.swpc.noaa.gov/images/animations/ovation/north/latest.jpg'} />
                <img className="AuroraImage" src={'https://services.swpc.noaa.gov/images/animations/ovation/south/latest.jpg'} />
            </div>
            <div className="HPIGraph">
                <HPIGraph dataKey={[Observation, North, South]}/>
                <div className="HPINowcast"> Northern Hemisphere: <div className="HPILatest" style={{background: NorthBackgroundColor}}>{North[North.length -1]}GW</div></div>
                <div className="HPINowcast"> Southern Hemisphere: <div className="HPILatest" style={{background: SouthBackgroundColor}}>{South[South.length -1]}GW</div></div>
            </div>
            <div style={{"display": "flex", "flexDirection": "column", "color": "#ffffff"}}> 3-Day Forecast:
                <div style={{"display": "flex", "flexDirection": "column"}}>
                    <div style={{"marginRight": "10px"}}>{ThreeDayForecastDates[0]} {ThreeDayForecastDates[1]} {Math.max(...day1Forecast)} {convertKpValuetoClass(Math.max(...day1Forecast))}</div>
                    <div style={{"marginRight": "10px"}}>{ThreeDayForecastDates[2]} {ThreeDayForecastDates[3]} {Math.max(...day2Forecast)} {convertKpValuetoClass(Math.max(...day2Forecast))}</div>
                    <div style={{"marginRight": "10px"}}>{ThreeDayForecastDates[4]} {ThreeDayForecastDates[5]} {Math.max(...day3Forecast)} {convertKpValuetoClass(Math.max(...day3Forecast))}</div>
                </div>
                 <div>
                    </div>
            </div>
        </div>
    )
}


const [activeButton, setActiveButton] = useState(1);
const toggleView = (view) => {
    setActiveButton(current => current === view ? null : view);
  };

    return (
        <div className="Aurora">
            <div style={{"display": "flex", "flexDirection": "column"}}>
            <button onClick={() => toggleView(1)} className="AuroraButton">2D View</button>
            <button onClick={() => toggleView(2)} className="AuroraButton">3D View</button>
            </div>
            <div>
            {activeButton === 1 && <TwoDimensionalAuroraView/>}
            {activeButton === 2 && "Test"}
            </div>
        </div>
    )
}

export default AuroraComponent;