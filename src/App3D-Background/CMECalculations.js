import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { degToRad } from 'three/src/math/MathUtils.js';
import { Line, Html } from '@react-three/drei';
import { convertToRadians } from './App3DBackgroundHelperFunctions';



    const targetDirection = new THREE.Vector3(0, 0, 0);
    const localTarget = new THREE.Vector3();

    export class coronalMassEjection {

        constructor(speed, latitude, longitude, halfAngle, eruptionDate, isDBMused, ambientSolarWind) {
            this.speed = speed;
            this.latitude = latitude;
            this.longitude = longitude;
            this.halfAngle = halfAngle;
            this.eruptionDate = new Date(eruptionDate);
            this.isDBMused = isDBMused;
            this.ambientSolarWind = ambientSolarWind;
        }
        calculateSpeed(speed, ambientSolarWind, eruptionDate) {
            const dragParameters = {
                very_fast: 0.10 * (10 ** -7),
                fast:      0.15 * (10 ** -7),
                median:    0.20 * (10 ** -7),
                slow:      0.30 * (10 ** -7),
            }
            if(speed > 1500) {
                return (this.dragBasedFormula(dragParameters.very_fast, speed , ambientSolarWind, eruptionDate))
            } else if (speed < 1500) {
                return (this.dragBasedFormula(dragParameters.fast, speed , ambientSolarWind, eruptionDate))
            } else if (speed < 1000) {
                return(this.dragBasedFormula(dragParameters.median, speed , ambientSolarWind, eruptionDate))
            } else if (speed < 600) {
                return(this.dragBasedFormula(dragParameters.slow, speed , ambientSolarWind, eruptionDate))
            } else {
                return(this.dragBasedFormula(dragParameters.slow, speed , ambientSolarWind, eruptionDate))
            }
        }
        getPosition() {
            const currentSimulationDate = new Date();
            const elapsedHours = (currentSimulationDate - this.eruptionDate) / (3600000);
            const SCALING_FACTOR = 0.000000007;
            const distanceKm = (this.calculateSpeed(this.speed, this.ambientSolarWind, new Date(this.eruptionDate)) * 3600 * elapsedHours) / 149597871;
            const phi = degToRad(this.longitude);   
            const theta = degToRad(this.latitude);
            const x = distanceKm * Math.cos(theta) * Math.cos(phi);
            const y = distanceKm * Math.sin(theta);               
            const z = distanceKm * Math.cos(theta) * Math.sin(phi); 
            if (elapsedHours < 0) {
                return { x_pos: 0, y_pos: 0, z_pos: 0 };
            } else return {
                x_pos: x,
                y_pos: y,
                z_pos: z,
            }
        }
        dragBasedFormula(dragParameter, initialSpeed, ambientSolarWind, eruptionDate) {
            const currentSimulationDate = new Date();
            const elapsedHours = (currentSimulationDate - this.eruptionDate) / (1000 * 60 * 60);
            if (initialSpeed > ambientSolarWind) {
                return (
                    (
                    (initialSpeed - ambientSolarWind) /
                    (1 + dragParameter * Math.abs(initialSpeed - ambientSolarWind) * (elapsedHours * 3600))
                ) + ambientSolarWind
                ) 
            }  else if (initialSpeed < ambientSolarWind) {
                return ((initialSpeed - ambientSolarWind) / (1 + dragParameter * Math.abs(initialSpeed - ambientSolarWind) * (elapsedHours) * 3600) + ambientSolarWind) 
            }
        }
        colorBasedonCMESpeed() {
            if (this.speed < 500) {
                return "#047579";
            } else if (this.speed <= 750) {
                return "#d3a329";
            } else if (this.speed < 1000) {
                return "#b6721a"
            } else if (this.speed > 1000) {
                return "#9a2f1e"
            }
        }
    }

export default function ComputeCMEPosition({speed, latitude, longitude, halfAngle, eruptionDate, isDBMused, ambientSolarWind}) {

    const icmeref = useRef();
    const geoRef = useRef();
    const [linePoints, setLinePoints] = useState([[0, 0, 0], [0, 0, 0]])

        const CoronalMassEjection = new coronalMassEjection(
        speed,
        latitude,
        longitude,
        halfAngle,
        eruptionDate,
        isDBMused,
        ambientSolarWind
    );

    useFrame(() => {
        if (!icmeref.current || !geoRef.current) return;


    icmeref.current.position.set(
            CoronalMassEjection.getPosition().x_pos,
            CoronalMassEjection.getPosition().y_pos,
            CoronalMassEjection.getPosition().z_pos,
    );

        localTarget.copy(targetDirection);
        icmeref.current.worldToLocal(localTarget);
        geoRef.current.lookAt(localTarget);
        geoRef.current.rotateX(Math.PI / 2)

        setLinePoints([
            [localTarget.x + 0.5, localTarget.y + 0.1, localTarget.z] + 0.1,
            [localTarget.x, localTarget.y, localTarget.z]
        ])
    });

if(CoronalMassEjection.getPosition().x_pos < 6 && CoronalMassEjection.getPosition().y_pos < 6 && CoronalMassEjection.getPosition().z_pos < 6) {
    return (
        <group ref={icmeref}>
            {/* HTML label sits safely on the root container, isolated from cone rotations */}
            <Html distanceFactor={1.2}>
                <div className="unselectable">
                    {"Vrad: " + CoronalMassEjection.calculateSpeed(CoronalMassEjection.speed, CoronalMassEjection.ambientSolarWind, new Date(CoronalMassEjection.eruptionDate))}
                    <br></br>
                    {"StartTime: " + new Date(CoronalMassEjection.eruptionDate)}
                    {"EruptionVrad: " + CoronalMassEjection.speed}
                    <br></br>
                    {"Lat: " + CoronalMassEjection.latitude + "Lon: " + CoronalMassEjection.longitude}
                </div>
            </Html>
            <mesh ref={geoRef}>
                <coneGeometry args={[halfAngle * (Math.PI / 180), 0.05, 32]} rotateX={Math.PI}/>
                <meshBasicMaterial color={CoronalMassEjection.colorBasedonCMESpeed()} transparent opacity={0.5} />
            </mesh>
        </group>
    )
}
}