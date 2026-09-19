import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpaceWeather } from '../fetching-service/FetchingFunction/FetchingDataLogic';
import { degToRad } from 'three/src/math/MathUtils.js';
import { Line, Html } from '@react-three/drei';
import { convertToRadians } from './App3DBackgroundHelperFunctions';

    const targetDirection = new THREE.Vector3(0, 0, 0);
    const localTarget = new THREE.Vector3();

export default function ComputeCMEPosition({cme_index, useDBM, isEarthDirected}) {
    const [,,,,,,,,,,,CMEData] = useSpaceWeather();
    const correctedCMEData = CMEData.filter(i => i.cmeAnalyses[0].latitude !== null && i.cmeAnalyses[0].longitude !== null);
    const earthDirectedCMEData = CMEData.filter(i => (
            (i.cmeAnalyses[0].latitude > -30 &&
            i.cmeAnalyses[0].latitude < 30) && (
                i.cmeAnalyses[0].longitude > -30 &&
                i.cmeAnalyses[0].longitude < 30
            )));

    console.log(earthDirectedCMEData);

    const current_cme = cme_index;
    const icmeref = useRef();
    const geoRef = useRef();

    const [linePoints, setLinePoints] = useState([[0, 0, 0], [0, 0, 0]])

    function getLiveCMEElements({ longitude, latitude, speed, eruptionDate, currentSimulationDate, cme_index, halfAngle}) {
    const elapsedMilliseconds = currentSimulationDate - eruptionDate;
    const elapsedHours = elapsedMilliseconds / (1000 * 60 * 60); 
    if (elapsedHours < 0) {
        return { x_pos: 0, y_pos: 0, z_pos: 0 };
    }
    const distanceKm = speed * elapsedHours + 14971461.6825;
    const SCALING_FACTOR = 0.000000007;
    const outward_position = distanceKm * SCALING_FACTOR;
    const phi = degToRad(longitude);   
    const theta = degToRad(latitude);
    const HALF_ANGLE_RADIAN = degToRad(halfAngle);
    //Position Vector
    const x = outward_position * Math.cos(theta) * Math.cos(phi);
    const y = outward_position * Math.sin(theta);               
    const z = outward_position * Math.cos(theta) * Math.sin(phi); 

    return {
        x_pos: x,
        y_pos: y,
        z_pos: z,
    };
}



    const eruptionDate = isEarthDirected ? 
    new Date(correctedCMEData[correctedCMEData.length - cme_index].cmeAnalyses[0].time21_5)
    : new Date(earthDirectedCMEData[earthDirectedCMEData.length - cme_index].cmeAnalyses[0].time21_5); 
    const speedKmPerHour = isEarthDirected ? 
    correctedCMEData[correctedCMEData.length - cme_index].cmeAnalyses[0].speed * 3600
    : earthDirectedCMEData[earthDirectedCMEData.length - cme_index].cmeAnalyses[0].speed * 3600; 
    const BACKGROUND_SOLAR_WIND = 430 * 3600; 
    const GAMMA = 0.5 * (10 ** -7);

    const theta = correctedCMEData[correctedCMEData.length - cme_index].cmeAnalyses[0].latitude;
    const phi = correctedCMEData[correctedCMEData.length - cme_index].cmeAnalyses[0].longitude; 
    const DBM_SPEED = (START_VELOCITY, TRAVEL_TIME) => {
        const DELTA_VELOCITY = START_VELOCITY - BACKGROUND_SOLAR_WIND;

        if(DELTA_VELOCITY > 0) {
            return BACKGROUND_SOLAR_WIND + 
            DELTA_VELOCITY / (1 + GAMMA * DELTA_VELOCITY * TRAVEL_TIME)
        } else if (DELTA_VELOCITY < 0) {
            return BACKGROUND_SOLAR_WIND +
            DELTA_VELOCITY / (1 - GAMMA * DELTA_VELOCITY * TRAVEL_TIME)
        } else return BACKGROUND_SOLAR_WIND; 
    }
    function isDBMused() {
        if(useDBM === true) {
            return Math.round(DBM_SPEED(speedKmPerHour, (new Date() - eruptionDate) / 3600000));
        } else {
            return speedKmPerHour;
        }
    }

    useFrame(() => {
        if (!icmeref.current || !geoRef.current) return;

        const currentSimulationDate = new Date(); 

        const liveCMEElements = 
            getLiveCMEElements({
            longitude: correctedCMEData[correctedCMEData.length - cme_index].cmeAnalyses[0].longitude, 
            latitude: correctedCMEData[correctedCMEData.length - cme_index].cmeAnalyses[0].latitude, 
            speed: useDBM ? DBM_SPEED(speedKmPerHour, eruptionDate) : speedKmPerHour, 
            eruptionDate: eruptionDate,
            currentSimulationDate: currentSimulationDate,
            halfAngle: correctedCMEData[correctedCMEData.length - cme_index].cmeAnalyses[0].halfAngle,
        })


        icmeref.current.position.set(
            liveCMEElements.x_pos, 
            liveCMEElements.y_pos, 
            liveCMEElements.z_pos
        );

        localTarget.copy(targetDirection);
        icmeref.current.worldToLocal(localTarget);
        geoRef.current.lookAt(localTarget);
        geoRef.current.rotateX(Math.PI / 2)

        setLinePoints([
            [0, 0, 0],
            [localTarget.x, localTarget.y, localTarget.z]
        ])
    });

    function CMEColorEarthDirected() {
        if(isEarthDirected === true) {
            return "#c88032"
        } else {
            return "#047579"
        }
    }

    return (
        <group ref={icmeref}>
            {/* HTML label sits safely on the root container, isolated from cone rotations */}
             <Line points={linePoints} color="cyan" lineWidth={1.5} />
            <Html distanceFactor={1}>
                <div className="unselectable">
                    {"Nbr.: " + cme_index}
                    <br />
                    {"Vnow: " + Math.round(isDBMused() / 3600) + " km/s fast"}
                    <br />
                    {"D: " + 
                    ((DBM_SPEED(speedKmPerHour, (new Date() - eruptionDate / 3600000))) /
                    (new Date() - eruptionDate / 3600000) * 
                    Math.tan(convertToRadians(correctedCMEData[correctedCMEData.length - cme_index].cmeAnalyses[0].halfAngle))) * 700000}
                    <br />
                    {"Distance: " + (Math.sqrt((icmeref.current?.position.x ** 2) + (icmeref.current?.position.y ** 2) + (icmeref.current?.position.z ** 2)) * 1000) / 1000}
                    <br/>
                    {"Lat: " + correctedCMEData[correctedCMEData.length - cme_index].cmeAnalyses[0].latitude + " Lon: " + correctedCMEData[correctedCMEData.length - cme_index].cmeAnalyses[0].longitude}
                </div>
            </Html>
            <mesh ref={geoRef}>
                <coneGeometry args={[((DBM_SPEED(speedKmPerHour, (new Date() - eruptionDate / 3600000))) /
                    (new Date() - eruptionDate / 3600000) * 
                    Math.tan(convertToRadians(correctedCMEData[correctedCMEData.length - cme_index].cmeAnalyses[0].halfAngle))) * 700000, 0.05, 32]} rotateX={Math.PI}/>
                <meshBasicMaterial color={CMEColorEarthDirected(correctedCMEData[correctedCMEData.length - cme_index]?.cmeAnalyses[0]?.enlilList[0]?.isEarthMinorImpact)} transparent opacity={0.5} />
            </mesh>
        </group>
    )
}