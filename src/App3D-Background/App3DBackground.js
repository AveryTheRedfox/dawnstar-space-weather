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
import { getLivePlanetElements, ComputePlanetPosition, DistanceRings } from './BackgroundPlanetCalculations.js';
import { createAuroraGlobeInstance } from '../inner_content/LowerContentComponents/AuroraPanel/lowerContentAurora.js';
import ComputeCMEPosition from './CMECalculations.js';
import ThreeGlobe from 'three-globe';

CameraControls.install({ THREE });


//Initializing System Time
export const SYSTEM_START_TIME = Date.now() / 1000;

const degToRad = (deg) => (deg * Math.PI) / 180;


function SolarSystemMapper() {
const [SolarWind, IntMag, KpIndex, Alerts, Flare, LatestFlare, Enlil, Ovation, HPIData, ForecastData, SunspotData, CMEData, MagnetopauseData, hp30, hp60, loading] = useSpaceWeather();


const {CME_Count, isEarthDirected, showAURings, innerSystemOnly} = useControls({CME_Count: 100, isEarthDirected: false, showAURings: true, innerSystemOnly: false});


    const textureMap = useLoader(TextureLoader, require('../resources/euvi_aia304_2012_carrington_print.jpg'));

    if(!loading) {
        console.log(CMEData);

const cmeData = CMEData.filter((i) => i.cmeAnalyses?.[0]?.longitude != null);

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
      <group scale={[0.0008, 0.0008, 0.0008]} rotateX={Math.PI}>
        <primitive ref={globeRef} object={globeInstance}/>
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
                {cmeData.slice((CMEData.length - 1) - CME_Count).filter(i => i.cmeAnalyses[0].longitude !== null).map((item, index) => {
                    return <ComputeCMEPosition
                    key={item.id || index}
                    speed={cmeData[index].cmeAnalyses[0].speed} 
                    latitude={cmeData[index].cmeAnalyses[0].latitude}
                    longitude={cmeData[index].cmeAnalyses[0].longitude}
                    halfAngle={cmeData[index].cmeAnalyses[0].halfAngle}
                    eruptionDate={cmeData[index].cmeAnalyses[0].time21_5}
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
        <group onClick={(e) => (e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit())} onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}>{children}</group>
    )
}


    return (
        <Canvas camera={{near: 0.001, far: 100, fov: 65, makeDefault: true, position: [0, 0, 0]}} style={{top: 0, left: 0, width: '100%', height: '100%' }}>
            <Suspense fallback={<LoadingScreen/>}>
            <color attach="background" args={['#020205']} />
                <OrbitControls makeDefault maxDistance={15}/>
                <ambientLight intensity={2}/>
                <pointLight position={[0, 0, 0]} intensity={1.5} />
                <Bounds observe margin={2} key={isEarthDirected ? true : false}>
                <SelectToZoom>
                <group rotation={[Math.PI, 0, 0]}>   
                <mesh>
                    <meshStandardMaterial color="#dbc609" map={textureMap}/>
                    <sphereGeometry args={[0.05, 32, 32]}/>
                    <ambientLight intensity={0.5} color={"#cac300"}/>
                </mesh>
                <group>
                <AuroraGlobe coordinates={auroraCoordinates}/>
                <ComputePlanetPosition planet={EPHEMERIS_DATA.MARS}/>
                <ComputePlanetPosition planet={EPHEMERIS_DATA.VENUS}/>
                <ComputePlanetPosition planet={EPHEMERIS_DATA.MERCURY}/>
                {innerSystemOnly ? null : (
                <>
                <ComputePlanetPosition planet={EPHEMERIS_DATA.JUPITER}/>
                <ComputePlanetPosition planet={EPHEMERIS_DATA.JUPITER} scale={[5, 5, 5]}/>
                <ComputePlanetPosition planet={EPHEMERIS_DATA.SATURN} scale={[4, 4, 4]}/>
                </>
            )}
                {showAURings && (
                    <>
                        <DistanceRings radius={1} color={"#ffffff83"} />
                        <DistanceRings radius={0.5} color={"#ffffff83"} />
                        <DistanceRings radius={2} color={"#ffffff83"} />
                        <DistanceRings radius={5} color={"#ffffff83"} />
                    </>
                )}
                    </group>
                </group> 
                {isEarthDirected === false ? <RenderCMEPositions/> : <RenderEarthDirectedCMEs/>}
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
