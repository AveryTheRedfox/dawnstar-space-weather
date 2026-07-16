
import "./lowerContentAurora.css";
import { HPIGraph } from "../../Graphs";
import { split } from "three/src/nodes/tsl/TSLCore.js";
import  AuroraGlobe  from "./lowerContentAuroraGlobe";
import {useState, useEffect, useRef, useMemo} from 'react';
import Globe from 'react-globe.gl';
import { MeshLambertMaterial, AdditiveBlending, DoubleSide } from 'three'

import localEarthImage from './BlackMarble_2016_01deg.jpg';

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

function AuroraGlobe(dataKey) {
const globeRef = useRef();
const [loading, setLoading] = useState(false);

console.log(dataKey?.dataKey?.coordinates);

useEffect(() => {
    if (globeRef.current) {
        globeRef.current.controls().autoRotate = true;
        globeRef.current.controls().autoRotateSpeed = 0.5;
    }
}, []);

const auroraData = useMemo(() => {
    if (!dataKey) return;

const rawCoordinates = Array.isArray(dataKey?.dataKey) 
    ? dataKey?.dataKey
    : (dataKey?.dataKey?.coordinates || []);

    const processed = [];
    const len = rawCoordinates.length;

    for (let i = 0; i < len; i++) {
      const point = rawCoordinates[i];
      const weight = point[2];

      // Aggressive Filter: NOAA coordinates are mostly 0. 
      // Filtering items <= 10 drops data points from 65,000 to ~5,000 items instantly!
      if (weight > 10) {
        const lng = point[0];
        processed.push({
          lng: lng > 180 ? lng - 360 : lng,
          lat: point[1],
          weight: weight,
        });
      }
    }
    return processed;

}, [dataKey]);

  const getTileColor = (d) => {
    const alpha = d.weight;
    if (d.weight > 70) return `rgba(255, 50, 50, ${alpha})`;    // Strong (Red)
    if (d.weight > 30) return `rgba(50, 255, 100, ${alpha})`;   // Medium (Bright Green)
    return `rgba(0, 200, 50, ${alpha * 0.4})`;                 // Weak (Faint Green)
  };

console.log(auroraData);

  return (
    <div style={{     display: 'inline-block',
    width: '100%', 
    height: '100%', 
    background: '#000011', 
    borderRadius: '8px', 
    overflow: 'hidden' }}>
      <Globe
        ref={globeRef}
        width={1000}
        height={600}
        globeImageUrl={localEarthImage}
        atmosphereColor="rgba(0, 255, 100, 0.35)"
        atmosphereDropoffRadius={0.15}
        
        hexBinPointsData={auroraData}
        hexBinPointLat={d => d.lat}
        hexBinPointLng={d => d.lng}
        hexBinPointWeight={d => d.weight}
        
        // Resolution & Unmerging Options
        hexBinResolution={3.5} // Try 4 for wide hex blocks, 5 for tiny honeycombs
        hexBinMerge={false}           
        hexRadius={3} // Closes up the remaining space gaps cleanly             
        hexAltitude={0.05}          
        
        // 1. REPAIRED TOP COLOR ACCESSOR
        hexTopColor={({ points }) => {
          const avgWeight = points.reduce((sum, p) => sum + p.weight, 0) / points.length;
          if (avgWeight > 70) return 'rgba(255, 0, 50, 0.8)';
          if (avgWeight > 30) return 'rgba(229, 255, 0, 0.82)';
          return 'rgba(0, 150, 50, 0.8)';
        }}

        // 2. REPAIRED SIDE COLOR ACCESSOR
        hexSideColor={({ points }) => {
          const avgWeight = points.reduce((sum, p) => sum + p.weight, 0) / points.length;
          if (avgWeight > 70) return 'rgba(255, 0, 50, 0.3)';
          if (avgWeight > 30) return 'rgba(0, 255, 100, 0.2)';
          return 'rgba(0, 150, 50, 0.1)';
        }}

        // 3. REPAIRED THREE.JS MATERIAL ACCESSSOR
        hexMaterial={({ points }) => {
          const avgWeight = points.reduce((sum, p) => sum + p.weight, 0) / points.length;
          const alpha = avgWeight / 100;
          
          let hexColor = 0x009632; 
          if (avgWeight > 70) hexColor = 0xff0032; 
          else if (avgWeight > 30) hexColor = 0x00ff64; 

          return new MeshLambertMaterial({
            color: hexColor,
            transparent: true,
            opacity: avgWeight > 70 ? alpha : alpha * 0.5,
            blending: AdditiveBlending,
            depthWrite: false,
            side: DoubleSide
          });
        }}
      />
    </div>
  );
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
            <div style={{
                maxHeight: "inherit"
            }}>
            {activeButton === 1 && <TwoDimensionalAuroraView/>}
            {activeButton === 2 && <div><AuroraGlobe dataKey={dataKey?.dataKey?.[1]} style={{
                maxHeight: "100%",
            }}/></div>}
            </div>
        </div>
    )
}

export default AuroraComponent;