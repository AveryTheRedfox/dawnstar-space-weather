import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Line } from '@react-three/drei';
import { Geometry, Base, Subtraction } from '@react-three/csg';
import { SphereGeometry } from 'three';
import { meanAnomalyCalculation, argumentOfPerihelion, convertToRadians, eccentricAnomalyCalculation } from './App3DBackgroundHelperFunctions';
import CME_BASE_DATA from './DONKI_M2M_CME_DATASET/cme_testing_data.json'
import { useSpaceWeather } from './fetching-service/FetchingFunction/FetchingDataLogic';

const EPHEMERIS_DATA = {
    "MERCURY": {
        a_base: 0.38709893, a_dot: 0.00000000,
        e_base: 0.20563069, e_dot: 0.00002040,
        i_base: 7.00487,    i_dot: -0.005941,
        L_base: 252.25084,  L_dot: 149472.67411,
        w_base: 77.45645,   w_dot: 0.15901,
        omega_base: 48.33167, omega_dot: -0.12532,
        color: "#525252"
    },
    "VENUS": {
        a_base: 0.72333199, a_dot: 0.00000000,
        e_base: 0.00677323, e_dot: -0.00004776,
        i_base: 3.39471,    i_dot: -0.000788,
        L_base: 181.97973,  L_dot: 58517.81538,
        w_base: 131.53298,  w_dot: 0.00213,
        omega_base: 76.68069, omega_dot: -0.27769,
        color: "#a58721"
    },
    "EARTH": {
        a_base: 1.00000011, a_dot: -0.00000005,
        e_base: 0.01671022, e_dot: -0.00003804,
        i_base: 0.00005,    i_dot: -0.015218,
        L_base: 100.46435,  L_dot: 35999.37244,
        w_base: 102.94719,  w_dot: 0.32327,
        omega_base: -11.26064, omega_dot: -0.41321,
        color: "#0d98d9"
    },
    "MARS": {
        a_base: 1.52366231, a_dot: -0.00000072,
        e_base: 0.09341233, e_dot: 0.00011902,
        i_base: 1.85061,    i_dot: -0.007248,
        L_base: 355.45332,  L_dot: 19140.30268,
        w_base: 336.04084,  w_dot: 0.44375,
        omega_base: 49.57854, omega_dot: -0.29257,
        color: "#a14b09"
    },
    "JUPITER": {
        a_base: 5.20336301, a_dot: 0.00060737,
        e_base: 0.04839266, e_dot: -0.00012880,
        i_base: 1.30530,    i_dot: -0.004150,
        L_base: 34.40438,   L_dot: 3034.74612,
        w_base: 14.75385,   w_dot: 0.19152,
        omega_base: 100.55615, omega_dot: 0.20404,
        color: "#9f670e"
    }
};
 


const SYSTEM_START_TIME = Date.now() / 1000;
function getJulianCenturiesSinceJ2000(timeWarpFactor) {
    const realTimeNow = Date.now() / 1000;
    timeWarpFactor = 1;
    const realSecondsElapsed = realTimeNow - SYSTEM_START_TIME;
    const simulatedSecondsElapsed = realSecondsElapsed * timeWarpFactor;
    const totalSimulatedSeconds = SYSTEM_START_TIME + simulatedSecondsElapsed;
    const julianDate = (totalSimulatedSeconds / 86400) + 2440587.5;
    return (julianDate - 2451545.0) / 36525;
}
function getLivePlanetElements(planetBaseData) {
    // Add a timeWarpFactor (e.g., 500000) inside your centuries tracker 
    // so you can actually watch them move in real-time!
    const T = getJulianCenturiesSinceJ2000(1); 

    const a = planetBaseData.a_base + (planetBaseData.a_dot * T);
    const e = planetBaseData.e_base + (planetBaseData.e_dot * T);
    const i = planetBaseData.i_base + (planetBaseData.i_dot * T);
    const L = planetBaseData.L_base + (planetBaseData.L_dot * T);
    const w_bar = planetBaseData.w_base + (planetBaseData.w_dot * T);
    const omega = planetBaseData.omega_base + (planetBaseData.omega_dot * T);

    let meanAnomaly = (L - w_bar) % 360;
    if (meanAnomaly < 0) meanAnomaly += 360;

    let argPerihelion = (w_bar - omega) % 360;
    if (argPerihelion < 0) argPerihelion += 360;

    return {
        a, e, 
        i: i * (Math.PI / 180),
        omega: omega * (Math.PI / 180),
        argumentOfPerihelion: argPerihelion * (Math.PI / 180),
        meanAnomalyRadians: meanAnomaly * (Math.PI / 180)
    };
}


const degToRad = (deg) => (deg * Math.PI) / 180;

function ComputeCMEPosition({cme_index}) {
    const [,,,,,,,,,,,CMEData] = useSpaceWeather();
    const current_cme = cme_index;
    const icmeref = useRef();
    function getLiveCMEElements({ longitude, latitude, speed, eruptionDate, currentSimulationDate, cme_index}) {
    const elapsedMilliseconds = currentSimulationDate - eruptionDate;
    const elapsedHours = elapsedMilliseconds / (1000 * 60 * 60); 
    if (elapsedHours < 0) {
        return { x_pos: 0, y_pos: 0, z_pos: 0 };
    }
    const distanceKm = speed * elapsedHours;
    const SCALING_FACTOR = 0.000000020; 
    const outward_position = distanceKm * SCALING_FACTOR;
    const phi = degToRad(longitude);   
    const theta = degToRad(latitude);  
    const x = outward_position * Math.cos(theta) * Math.cos(phi);
    const z = outward_position * Math.cos(theta) * Math.sin(phi);
    const y = 0; 
    return {
        x_pos: x,
        y_pos: y,
        z_pos: z,
    };
}

    console.log(CME_BASE_DATA[CME_BASE_DATA.length - current_cme].cmeAnalyses[0].time21_5);
    const eruptionDate = new Date(CME_BASE_DATA[CME_BASE_DATA.length - cme_index].cmeAnalyses[0].time21_5); 
    const speedKmPerHour = CME_BASE_DATA[CME_BASE_DATA.length - 2].cmeAnalyses[0].speed * 3600; 

    useFrame(() => {
        if (!icmeref.current) return;

        const currentSimulationDate = new Date(); 
        const liveCMEElements = getLiveCMEElements({
            longitude: CME_BASE_DATA[CME_BASE_DATA.length - cme_index].cmeAnalyses[0].longitude, 
            latitude: CME_BASE_DATA[CME_BASE_DATA.length - cme_index].cmeAnalyses[0].latitude, 
            speed: speedKmPerHour, 
            eruptionDate: eruptionDate,
            currentSimulationDate: currentSimulationDate
        });
        icmeref.current.position.set(
            liveCMEElements.x_pos, 
            liveCMEElements.y_pos, 
            liveCMEElements.z_pos
        );
    });

    return (
        <mesh ref={icmeref}>
            <sphereGeometry args={[(CME_BASE_DATA[CME_BASE_DATA.length - cme_index].cmeAnalyses[0].halfAngle * 2) / 2000, 32, 32]} />
            <meshBasicMaterial color="crimson" transparent opacity={0.5}/>
        </mesh>
    );
}

export function ComputePlanetPosition({ planet }) {
    const planetRef = useRef();

    // Fix static line angles to read from live/base J2000 settings safely
    const base_omega = convertToRadians(planet.omega_base);
    const base_perh = convertToRadians(planet.w_base - planet.omega_base);
    const base_i = convertToRadians(planet.i_base);

    const staticOrbitPoints = useMemo(() => {
        const points = [];
        const segments = 128;
        const a = planet.a_base;
        const e = planet.e_base;

        for (let k = 0; k <= segments; k++) {
            const E = (k / segments) * Math.PI * 2;
            const x_orbital = a * (Math.cos(E) - e);
            const y_orbital = a * Math.sqrt(1 - e * e) * Math.sin(E);
            points.push([x_orbital, 0, y_orbital]); 
        }
        return points;
    }, [planet]);

    useFrame(() => {
        if (!planetRef.current) return;

        // Dynamic planet data injection fixed here:
        const liveElements = getLivePlanetElements(planet);
        
        const E = eccentricAnomalyCalculation(liveElements.meanAnomalyRadians, liveElements.e);
        
        const x_orbital = liveElements.a * (Math.cos(E) - liveElements.e);
        const y_orbital = liveElements.a * Math.sqrt(1 - liveElements.e * liveElements.e) * Math.sin(E);
        
    if (planet.L_base ? planet.L_base === 100.46435 : planet.L === 100.5) { // Isolates Earth only to prevent spam
    }
        planetRef.current.position.set(x_orbital, 0, y_orbital);
    });
    return (
        <group rotation={[0, -base_omega, 0]}>
            <group rotation={[-base_i, 0, 0]}>
                <group rotation={[0, -base_perh, 0]}>
                    <Line points={staticOrbitPoints} color="#48cae4" lineWidth={1} opacity={0.3} transparent />
                    <mesh ref={planetRef}>
                        <sphereGeometry args={[0.04, 16, 16]} />
                        <meshStandardMaterial color={planet.color} />
                    </mesh>
                </group>
            </group>
        </group>
    );
}

function SolarSystemMapper() {
    const cmeData = CME_BASE_DATA;
    const RenderCMEPositions = () => {
        if(!cmeData) return;
        return (
            <>
                {cmeData.slice(100).map((item, index) => {
                    return <ComputeCMEPosition key={item.id || index} cme_index={index + 1}/>
                })}
            </>
        )
    };

    return (
        <Canvas camera={{ position: [0, 2.5, 3], fov: 50 }}>
                <ambientLight intensity={0.6}/>
                <pointLight position={[0, 0, 0]} intensity={1.5} />
                <color attach="background" args={['#020205']} />
                
                <OrbitControls enableDamping />

                <mesh>
                    <meshBasicMaterial color="#dbc609"/>
                    <sphereGeometry args={[0.05, 32, 32]}/>
                </mesh>
                <ComputePlanetPosition planet={EPHEMERIS_DATA.EARTH}/>
                <ComputePlanetPosition planet={EPHEMERIS_DATA.MARS}/>
                <ComputePlanetPosition planet={EPHEMERIS_DATA.VENUS}/>
                <ComputePlanetPosition planet={EPHEMERIS_DATA.MERCURY}/>
                <ComputePlanetPosition planet={EPHEMERIS_DATA.JUPITER}/>
                <RenderCMEPositions/>
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
