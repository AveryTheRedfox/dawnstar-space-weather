import React, { useMemo, useRef, useContext, useLayoutEffect, useState, Suspense, useEffect } from 'react';
import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import { Bounds, Html, OrbitControls, Text, useBounds } from '@react-three/drei';
import CameraControls from 'camera-controls'
import { Line } from '@react-three/drei';
import { Geometry, Base, Subtraction } from '@react-three/csg';
import { SphereGeometry, TextureLoader } from 'three';
import { meanAnomalyCalculation, argumentOfPerihelion, convertToRadians, eccentricAnomalyCalculation } from './App3DBackgroundHelperFunctions';
import CMEData from '../DONKI_M2M_CME_DATASET/cme_testing_data.json'
import { useSpaceWeather } from '../fetching-service/FetchingFunction/FetchingDataLogic.js';
import { useControls } from 'leva';
import "./App3DBackground.css";
import { EPHEMERIS_DATA } from './Ephemeris-Data';
import  {getJulianCenturiesSinceJ2000}  from './App3DBackgroundHelperFunctions';
import { getLivePlanetElements, ComputePlanetPosition } from './BackgroundPlanetCalculations.js';
import { createAuroraGlobeInstance } from '../inner_content/LowerContentComponents/AuroraPanel/lowerContentAurora.js';
import ComputeCMEPosition from './CMECalculations.js';
import ThreeGlobe from 'three-globe';

CameraControls.install({ THREE });


//Initializing System Time
export const SYSTEM_START_TIME = Date.now() / 1000;

const degToRad = (deg) => (deg * Math.PI) / 180;


function SolarSystemMapper() {
const [SolarWind, IntMag, KpIndex, Alerts, Flare, LatestFlare, Enlil, Ovation, HPIData, ForecastData, SunspotData, CMEData, loading] = useSpaceWeather();


const {CME_Count, isEarthDirected, useDBM} = useControls({CME_Count: 100, isEarthDirected: false})


    const textureMap = useLoader(TextureLoader, require('../resources/euvi_aia304_2012_carrington_print.jpg'));

    if(!loading) {
        console.log(CMEData);

const cmeData = CMEData.filter((i) => i.cmeAnalyses?.[0]?.longitude != null);
const cmeDataLength = CMEData?.length;



const auroraCoordinates = Ovation?.coordinates;
const AuroraGlobe = ( auroraCoordinates ) => {
  const globeRef = useRef();

  const globeInstance = useMemo(() => {
    return createAuroraGlobeInstance(auroraCoordinates);
  }, [auroraCoordinates]);

  // Keep your custom globe self-rotation intact
  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.2;
    }
  });



  return (
    <ComputePlanetPosition planet={EPHEMERIS_DATA.EARTH}>
      <group scale={[0.0008, 0.0008, 0.0008]}>
        <primitive ref={globeRef} object={globeInstance} />
      </group>
    </ComputePlanetPosition>
  );
};
    const RenderEarthDirectedCMEs = () => {
        const LatMin = -35;
        const LatMax = 35;
        const LonMin = -35;
        const LonMax = 35;
      if(!loading) return (
            <>
            {cmeData
            .map(item => ({
                ...item,
                cmeAnalyses: (item.cmeAnalyses || []).filter(analysis =>
                    analysis.latitude !== null &&
                    analysis.longitude !== null &&
                    analysis.latitude >= LatMin &&
                    analysis.latitude <= LatMax &&
                    analysis.longitude >= LonMin &&
                    analysis.longitude <= LonMax
                )
            })).filter(item => item.cmeAnalyses.length > 0)
            .map((item, index) => {
                const validAnalysis = item.cmeAnalyses[0]
                return <ComputeCMEPosition 
                useDBM={useDBM}
                key={item.activityID || index}
                speed={validAnalysis?.speed}
                latitude={validAnalysis?.latitude}
                longitude={validAnalysis?.longitude}
                halfAngle={validAnalysis?.halfAngle}
                eruptionDate={validAnalysis?.time21_5}
                ambientSolarWind={300}
                />
            })
            }
            </>
        )
    }

    const RenderCMEPositions = () => {
        return (
            <>
                {cmeData.slice((CMEData.length - 1) - CME_Count).filter(i => i.cmeAnalyses[0].longitude || [] !== null).map((item, index) => {
                    return <ComputeCMEPosition
                    key={item.id || index}
                    speed={cmeData[index].cmeAnalyses[0].speed} 
                    latitude={cmeData[index].cmeAnalyses[0].latitude}
                    longitude={cmeData[index].cmeAnalyses[0].longitude}
                    halfAngle={cmeData[index].cmeAnalyses[0].halfAngle}
                    eruptionDate={cmeData[index].cmeAnalyses[0].time21_5}
                    isDBMused={useDBM}
                    ambientSolarWind={300}
                    />
                })}
            </>
        )
    }



function LoadingScreen() {
    return (
        <Html>
        <div 
        style={{
            height: '20vh',
            width: '10vw',
            background: 'transparent',
            backgroundColor: '#2d2d325e',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            top: '50%',
            left: '50%',
        }}
        >Loading CME Data...</div>
        </Html>
    )
}

function SelectToZoom({children}) {
    const api = useBounds()
    return (
        <group onClick={(e) => (e.stopPropagation(), e.delta <= 1 && api.refresh(e.object).fit())}>{children}</group>
    )
}

    return (
        <Canvas>
            <Suspense fallback={<LoadingScreen/>}>
            <color attach="background" args={['#020205']} />
                <ambientLight intensity={2}/>
                <pointLight position={[0, 0, 0]} intensity={1.5} />
                <OrbitControls makeDefault/>
                <Bounds fit clip observe margin={1.2} key={isEarthDirected ? true : false}>
                <SelectToZoom>
                    
                <mesh>
                    <meshStandardMaterial color="#dbc609" map={textureMap}/>
                    <sphereGeometry args={[0.05, 32, 32]}/>
                    <ambientLight intensity={0.5} color={"#cac300"}/>
                </mesh>
                
                    <AuroraGlobe coordinates={auroraCoordinates}/>
                <ComputePlanetPosition planet={EPHEMERIS_DATA.MARS}/>
                <ComputePlanetPosition planet={EPHEMERIS_DATA.VENUS}/>
                <ComputePlanetPosition planet={EPHEMERIS_DATA.MERCURY}/>
                <ComputePlanetPosition planet={EPHEMERIS_DATA.JUPITER}/>
                {isEarthDirected === false ? <RenderCMEPositions useDBM={useDBM}/> : <RenderEarthDirectedCMEs useDBM={useDBM}/>}
                </SelectToZoom>
                </Bounds>
            </Suspense>
        </Canvas>
    )
    }
}

export default function App3DBackground() {
    return (
        <div className="App3DBackground" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
            <SolarSystemMapper>
            </SolarSystemMapper>
        </div>
    );
}
