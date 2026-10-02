
import { useRef, useMemo } from 'react';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useLoader, useFrame } from '@react-three/fiber';
import { convertToRadians } from './App3DBackgroundHelperFunctions';
import { eccentricAnomalyCalculation } from './App3DBackgroundHelperFunctions';
import { Line } from '@react-three/drei';
import { EPHEMERIS_DATA } from './Ephemeris-Data';
import {getJulianCenturiesSinceJ2000}  from './App3DBackgroundHelperFunctions';


const degToRad = (deg) => (deg * Math.PI) / 180;


export function getLivePlanetElements(planetBaseData) {
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



export function ComputePlanetPosition({ planet, zoomToView, children }) {
    const planetRef = useRef();
    const textureMap = useLoader(TextureLoader, planet.map);
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
                        <meshStandardMaterial color={planet.color} map={textureMap}/>
                        {children}
                    </mesh>
                </group>
            </group>
        </group>
    );
}
