import React, { useMemo, useRef, useContext, useLayoutEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Html, OrbitControls, Text } from '@react-three/drei';
import { Line } from '@react-three/drei';
import { Geometry, Base, Subtraction } from '@react-three/csg';
import { SphereGeometry, TextureLoader } from 'three';
import * as THREE from 'three'
import { meanAnomalyCalculation, argumentOfPerihelion, convertToRadians, eccentricAnomalyCalculation } from './App3DBackgroundHelperFunctions';
import CMEData from '../DONKI_M2M_CME_DATASET/cme_testing_data.json'
import { useSpaceWeather } from '../fetching-service/FetchingFunction/FetchingDataLogic.js';
import { useControls } from 'leva';
import "./App3DBackground.css";
import { EPHEMERIS_DATA } from './Ephemeris-Data';
import  {getJulianCenturiesSinceJ2000}  from './App3DBackgroundHelperFunctions';
import { getLivePlanetElements, ComputePlanetPosition } from './BackgroundPlanetCalculations.js';
import ComputeCMEPosition from './CMECalculations.js';



//Initializing System Time
export const SYSTEM_START_TIME = Date.now() / 1000;

const degToRad = (deg) => (deg * Math.PI) / 180;





function SolarSystemMapper() {
    const [SolarWind, IntMag, KpIndex, Alerts, Flare, LatestFlare, Enlil, Ovation, HPIData, ForecastData, SunspotData, CMEData] = useSpaceWeather();
    const cmeData = CMEData;
    const earthDirectedCMEData = CMEData?.filter(i => i.cmeAnalyses[0].longitude != null).filter(i => i.cmeAnalyses[0].latitude != null).filter(i => 
    i.cmeAnalyses[0].latitude > -30
    ).filter(i => 
        i.cmeAnalyses[0].latitude < 30
    ).filter(i =>
        i.cmeAnalyses[0].longitude > -30
    ).filter(i => 
        i.cmeAnalyses[0].longitude < 30
    )

    console.log(earthDirectedCMEData);
            // i.cmeAnalyses[0].latitude < 30 &&
            //     i.cmeAnalyses[0].longitude > -30 &&
            //     i.cmeAnalyses[0].longitude < 30

    console.log(earthDirectedCMEData);
    const {CME_Count, isEarthDirected, useDBM} = useControls({CME_Count: 30, isEarthDirected: false, useDBM: true})
        const textureMap = useLoader(TextureLoader, require('../resources/euvi_aia304_2012_carrington_print.jpg'));

    const RenderEarthDirectedCMEs = () => {
      if(!cmeData) return
      else {
        return (
            <>
            {earthDirectedCMEData.slice(earthDirectedCMEData.length - CME_Count).map((item, index) => {
                return <ComputeCMEPosition 
                useDBM={useDBM}
                key={item.id || index} 
                cme_index={index + 1}
                />
            })}
            </>
        )
    }
}
    const RenderCMEPositions = () => {
        if(!cmeData) return
        else {
        return (
            <>
                {cmeData.slice(cmeData.length - CME_Count).filter(i => i.cmeAnalyses[0].longitude !== null).map((item, index) => {
                    return <ComputeCMEPosition key={item.id || index} cme_index={index + 1} useDBM={useDBM}/>
                })}
            </>
        )
    }
};

    return (
        <Canvas camera={{ position: [10, 5, 0], fov: 50, up: [0, -1, 0] }}>
            <Suspense>
                <ambientLight intensity={2}/>
                <pointLight position={[0, 0, 0]} intensity={1.5} />
                <color attach="background" args={['#020205']} />
                <axesHelper/>
                <OrbitControls/>
                <mesh>
                    <meshStandardMaterial color="#dbc609" map={textureMap}/>
                    <sphereGeometry args={[0.05, 32, 32]}/>
                    <ambientLight intensity={0.5} color={"#cac300"}/>
                </mesh>
                <ComputePlanetPosition planet={EPHEMERIS_DATA.EARTH}/>
                <ComputePlanetPosition planet={EPHEMERIS_DATA.MARS}/>
                <ComputePlanetPosition planet={EPHEMERIS_DATA.VENUS}/>
                <ComputePlanetPosition planet={EPHEMERIS_DATA.MERCURY}/>
                <ComputePlanetPosition planet={EPHEMERIS_DATA.JUPITER}/>
                {isEarthDirected === false ? <RenderCMEPositions useDBM={useDBM}/> : <RenderEarthDirectedCMEs useDBM={useDBM}/>}
                </Suspense>
        </Canvas>
    )
}

export default function App3DBackground() {
    return (
        <div className="App3DBackground" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
            <SolarSystemMapper>
            </SolarSystemMapper>
        </div>
    );
}
