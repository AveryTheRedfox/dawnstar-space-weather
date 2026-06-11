
import { useEffect, useState } from "react";

function dragModel() {
    const dragCoefficient = 1;
    const ambientSolarWindSpeed = 250;
    const [CMEInitialSpeed, setCMEInitialSpeed] = useState(1000);
    const [CMEArrivalTime, setCMEArrivalTime] = useState(null);
    const CMESpeeds = [];
    
    useEffect(() => {
        const distanceToEarth = 149597870.7;
        for (let i  = 0; i < 1000; i + 1) {
            let currentCMESpeed = (CMEInitialSpeed - ambientSolarWindspeed)/(1 + dragCoefficient)
            CMESpeeds.push(currentCMESpeed);
        }
}, [CMESpeeds]);


return(CMESpeeds);

}
