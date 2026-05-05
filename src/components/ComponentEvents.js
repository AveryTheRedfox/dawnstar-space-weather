
import useFetchingApi from "../fetching-service/FetchingFunction/FetchingFunction";
import { useState, useEffect } from "react";

//Event triggers for the PopUp Components and other future components. 
//Will Trigger on those conditions: 
//- X-Ray Flare Events (C, M, X Class) (Done)
//- Geomagnetic Storms (Kp-Index >= 4) (Done)
//- Coronal Hole Detection
//- Coronal Mass Ejection Arrival 
//- Type II and Type IV Radio Emission Detection

export function ComponentEvents() {

if (!Array.prototype.last) {
    Array.prototype.last = function() {
    return this[this.length - 1];
    };
};
     //Check latest flare data for Flares only once per flare, trigger PopUp if C, M or X class flare is detected 
     //Skip concurrent values above triggered value if not another flare event is detected, to avoid multiple popups for the same flare event.

    function RadioBlackOutEvent() {
        const [, , , , Flare, LatestFlare] = useFetchingApi();  
        let LatestFlareClass = LatestFlare?.[0]?.max_class ?? null;
        let EventIsTriggered = false;
        let NewestFlare = Flare?.flux;
const [minorRadioBlackoutToggle, useMinorRadioBlackoutToggle] = useState(Boolean);
const [moderateRadioBlackoutToggle, useModerateRadioBlackoutToggle] = useState(Boolean);
const [strongRadioBlackoutToggle, useStrongRadioBlackoutToggle] = useState(Boolean);
const [severeRadioBlackoutToggle, useSevereRadioBlackoutToggle] = useState(Boolean);
const [extremeRadioBlackoutToggle, useExtremeRadioBlackoutToggle] = useState(Boolean); 


    function BackgroundListener() {
    const [, , , , Flare, LatestFlare] = useFetchingApi();
    let lastFlareClass = Flare?.Flux; 
    let LatestFlareFlux = lastFlareClass.last(); 
    return(LatestFlareFlux);
}
    function ActiveListener() {
        const [, , , , Flare, LatestFlare] = useFetchingApi();
        let lastFlare = Flare.last();
        while(minorRadioBlackoutToggle != true) {
        if (lastFlare?.energy != "0.1-0.8nm") {
            if (lastFlare?.flux > 1.0e-5) {
                return(useMinorRadioBlackoutToggle = true);
                }
            }
        }
    }
let {MinorRadioBlackoutToggle, ModerateRadioBlackoutToggle, StrongRadioBlackoutToggle, SevereRadioBlackoutToggle, ExtremeRadioBlackoutToggle} = ListenerToggles;
if (MinorRadioBlackoutToggle == true) {
    return("Minor R1 Radio Blackout Detected")
} else if (ModerateRadioBlackoutToggle == true) {
    return("Moderate R2 Radio Blackout Detected")
} else if (StrongRadioBlackoutToggle == true) {
    return("Strong R3 Radio Blackout Detected")
} else if (SevereRadioBlackoutToggle == true) {
    return("Severe R4 Radio Blackout Detected") 
} else if (ExtremeRadioBlackoutToggle == true) {
    return("Extreme R5 Radio Blackout Detected") 
}
}



function GeomagneticStormEvent() {
    const [KpIndex] = useFetchingApi();
        let CurrentKpIndex = KpIndex?.[57]?.Kp;
        let GeomagneticStormEvents =
        CurrentKpIndex >= 4 && CurrentKpIndex < 5 ? "G1 - Minor Geomagnetic Storm" :
        CurrentKpIndex >= 5 && CurrentKpIndex < 6 ? "G2 - Moderate Geomagnetic Storm" :
        CurrentKpIndex >= 6 && CurrentKpIndex < 7 ? "G3 - Strong Geomagnetic Storm" :
        CurrentKpIndex >= 7 && CurrentKpIndex < 8 ? "G4 - Severe Geomagnetic Storm" :
        CurrentKpIndex >= 8 ? "G5 - Extreme Geomagnetic Storm" :
        "";
     return(GeomagneticStormEvents);
    }
}