

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