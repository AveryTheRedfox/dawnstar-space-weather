
import { useRef, useMemo, useState } from 'react';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useLoader, useFrame } from '@react-three/fiber';
import { convertToRadians } from './App3DBackgroundHelperFunctions';
import { eccentricAnomalyCalculation } from './App3DBackgroundHelperFunctions';
import { EPHEMERIS_DATA } from './Ephemeris-Data';
import {getJulianCenturiesSinceJ2000}  from './App3DBackgroundHelperFunctions';
import {getSalliteData} from './getSalliteData.js';
import { Line, Html } from '@react-three/drei';



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
    const ringRef = useRef();
    const textureMap = useLoader(TextureLoader, planet.map);
    const ringsMap = useLoader(TextureLoader, planet.rings_map);
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
        if (ringRef.current) {
           ringRef.current.position.set(x_orbital, 0, y_orbital);
    }
    });
    const [isFocused, setFocused] = useState(false);

    return (
  <group rotation={[0, -base_omega, 0]}>
    <group rotation={[-base_i, 0, 0]}>
      <group rotation={[0, -base_perh, 0]}>
        <Line points={staticOrbitPoints} color={planet.color} lineWidth={2} opacity={100} />
        <mesh 
          scale={planet.scale || [1, 1, 1]} 
          ref={planetRef} 
          onClick={(e) => {
            setFocused(true);
          }} 
          onPointerMissed={(e) => {
            setFocused(false);
          }}
        >
          {isFocused && (
            <Html distanceFactor={1}>
              <div className="unselectable">
                {"Planet: " + planet.name}
              </div>
            </Html>
          )}
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color={planet.color} map={textureMap} />
          {children}
        </mesh>

        {planet.hasRings && (
          <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.2, 0.7, 32]} />
            <meshStandardMaterial
              color={planet.color}
              map={ringsMap}
              transparent
              opacity={0.5}
              side={2}
            />
          </mesh>
        )}
      </group>
    </group>
  </group>
);
}

export function DistanceRings({ radius, color, segments = 128}) {
    const points = useMemo(() => {
        const ringPoints = [];
        for (let k = 0; k <= segments; k++) {
            const theta = (k / segments) * Math.PI * 2;
            const x = radius * Math.cos(theta);
            const z = radius * Math.sin(theta);
            ringPoints.push([x, 0, z]);
        }
        return ringPoints;
    }, [radius, segments]);

    return <Line points={points} color={color} lineWidth={1} opacity={0.5} transparent/>;
}
