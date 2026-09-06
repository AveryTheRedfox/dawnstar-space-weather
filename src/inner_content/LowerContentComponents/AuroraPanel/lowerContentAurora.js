
import "./lowerContentAurora.css";
import { HPIGraph } from "../../Graphs";
import { split } from "three/src/nodes/tsl/TSLCore.js";
import {useState, useEffect, useRef, useMemo} from 'react';
import Globe from 'react-globe.gl';
import ThreeGlobe from "three-globe";
import { MeshLambertMaterial, AdditiveBlending, DoubleSide, BoxGeometry, Mesh } from 'three';
import { useSpaceWeather } from "../../../fetching-service/FetchingFunction/FetchingDataLogic.js";
import hpifallbackdata from "./hpifallbackdata.txt";
import localEarthImage from './BlackMarble_2016_01deg.jpg';


export function createAuroraGlobeInstance(rawCoordinates = []) {
  const processedData = [];
  const len = rawCoordinates.length;

  for (let i = 0; i < len; i++) {
    const point = rawCoordinates[i];
    
    if (point && point[2] !== undefined) {
      const weight = point[2];

      if (weight > 5) {
        const lng = point[0];
        processedData.push({
          lng: lng > 180 ? lng - 360 : lng,
          lat: point[1],
          weight: weight,
        });
      }
    }
  }

  const globe = new ThreeGlobe()
    .globeImageUrl(localEarthImage)
    .atmosphereColor('rgba(0, 255, 100, 0.35)')
    .atmosphereAltitude(0.15) 
    
    .hexBinPointsData(processedData)
    .hexBinPointLat(d => d.lat)
    .hexBinPointLng(d => d.lng)
    .hexBinPointWeight(d => d.weight)
    .hexBinResolution(3)
    .hexMargin(0.2)
    
    .hexAltitude(({ points }) => {
      const avgWeight = points.reduce((sum, p) => sum + p.weight, 0) / points.length;
      return avgWeight * 0.002; // Tweaked scale multiplier for visual pop
    })
    
    .hexTopColor(({ points }) => {
      const avgWeight = points.reduce((sum, p) => sum + p.weight, 0) / points.length;
      if (avgWeight > 70) return 'rgba(255, 0, 50, 0.8)';
      if (avgWeight > 30) return 'rgba(229, 255, 0, 0.82)';
      return 'rgba(0, 150, 50, 0.8)';
    })
    
    .hexSideColor(({ points }) => {
      const avgWeight = points.reduce((sum, p) => sum + p.weight, 0) / points.length;
      if (avgWeight > 70) return 'rgba(255, 0, 50, 0.3)';
      if (avgWeight > 30) return 'rgba(0, 255, 100, 0.2)';
      return 'rgba(0, 150, 50, 0.1)';
    });

  return globe;
}



function AuroraComponent(dataKey) {

    const [,,,,,,,Ovation, HPIData, ForecastData] = useSpaceWeather();

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

let threeDayGeomagneticForecastDataByDay = result;
let day1Forecast = threeDayGeomagneticForecastDataByDay.map((i) => i[1]);
let day2Forecast = threeDayGeomagneticForecastDataByDay.map((i) => i[2]);
let day3Forecast = threeDayGeomagneticForecastDataByDay.map((i) => i[3]);

        
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

function forecastColor(value) {

  let StormColor =
    value < 4
      ? "#10871a"
      : value >= 4 && value < 5
      ? "#eeff00"
      : value >= 5 && value < 6
      ? "#ca722a"
      : value >= 6 && value < 7
      ? "#ff6600"
      : value >= 7 && value < 8
      ? "#cf4d1a"
      : value >= 8 && value < 9
      ? "#6b1644"
      : value >= 9
      ? "#8B008B#"
      : "gray";
      return StormColor;
}

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
            <div style={{"display": "flex", "flexDirection": "column", "color": "#ffffff", "border": "2px solid gray", "maxHeight": "30vh", "padding": "10px", "minWidth": "inherit"}}> 3-Day Forecast:
                <div style={{"display": "flex", "flexDirection": "column"}}>
                    <div style={{"marginTop": "20px", display: "flex", flexDirection: "row"}}>{ThreeDayForecastDates[0]} {ThreeDayForecastDates[1]}: <div style={{background: forecastColor(Math.max(...day1Forecast)), color: "#000000", maxWidth: "5vw", textAlign: "center", border: "1px solid #000000", borderRadius: "5px", marginLeft: "10px"}}>{Math.max(...day1Forecast)}</div> {convertKpValuetoClass(Math.max(...day1Forecast))}</div>
                    <div style={{"marginTop": "20px", display: "flex", flexDirection: "row"}}>{ThreeDayForecastDates[2]} {ThreeDayForecastDates[3]}: <div style={{background: forecastColor(Math.max(...day2Forecast)), color: "#000000", maxWidth: "5vw", textAlign: "center", border: "1px solid #000000", borderRadius: "5px", marginLeft: "10px"}}>{Math.max(...day2Forecast)}</div> {convertKpValuetoClass(Math.max(...day2Forecast))}</div>
                    <div style={{"marginTop": "20px", display: "flex", flexDirection: "row"}}>{ThreeDayForecastDates[4]} {ThreeDayForecastDates[5]}: <div style={{background: forecastColor(Math.max(...day3Forecast)), color: "#000000", maxWidth: "5vw", textAlign: "center", border: "1px solid #000000", borderRadius: "5px", marginLeft: "10px"}}>{Math.max(...day3Forecast)}</div> {convertKpValuetoClass(Math.max(...day3Forecast))}</div>
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
            <div style={{
                maxHeight: "inherit"
            }}>
            {activeButton === 1 && <TwoDimensionalAuroraView/>}
            {activeButton === 2 && <div></div>}
            </div>
        </div>
    )
}

export default AuroraComponent;