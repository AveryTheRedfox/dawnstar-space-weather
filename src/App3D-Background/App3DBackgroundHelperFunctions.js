import {SYSTEM_START_TIME } from "./App3DBackground";

export function meanAnomalyCalculation(planet) {
    return planet.L - planet.w;
}

export function argumentOfPerihelion(planet) {
    return planet.w - planet.omega;
}

export function convertToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

export function eccentricAnomalyCalculation(meanAnomalyRad, e) {
    let E = meanAnomalyRad + e * Math.sin(meanAnomalyRad) * (1 + e * Math.cos(meanAnomalyRad));
    for (let i = 0; i < 8; i++) {
        // Everything inside this equation must be entirely in Radians
        E = E - (E - e * Math.sin(E) - meanAnomalyRad) / (1 - e * Math.cos(E));
    }
    return E;
}

export function getJulianCenturiesSinceJ2000(timeWarpFactor) {
    const realTimeNow = Date.now() / 1000;
    timeWarpFactor = 1;
    const realSecondsElapsed = realTimeNow - SYSTEM_START_TIME;
    const simulatedSecondsElapsed = realSecondsElapsed * timeWarpFactor;
    const totalSimulatedSeconds = SYSTEM_START_TIME + simulatedSecondsElapsed;
    const julianDate = (totalSimulatedSeconds / 86400) + 2440587.5;
    return (julianDate - 2451545.0) / 36525;
}
