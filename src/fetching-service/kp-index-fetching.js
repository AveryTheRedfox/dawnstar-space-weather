
/*
Fetching des Kp-Index vom Server des SWPC 
Speichert den aktuellen Kp-Index und von wann die Daten sind
*/
import { useState, useEffect } from 'react';

function KpCalculation() {
  const [KpIndex, setKpIndex] = useState(null); //Variable für den Kp-Index
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json'); // Fetch data from an API route
      const result = await response.json();
      setKpIndex([result[350].kp_index]); //Speichert Kp-Index
      console.log(KpIndex);
    } 
    setTimeout(function() { fetchData(); }, 60000);
  });





  
  if (!KpIndex) {
    return <div>Loading...</div>
  } else if (KpIndex <= 4) {
    return (
       <div>
            <div>Current Kp-Index: {KpIndex} (Quiet Conditions)</div>  
          </div>
    )
  } else if (KpIndex >= 4 && KpIndex < 5) {
    return(
       <div>
            <div>Current Kp-Index: {KpIndex} (Active Conditions)</div>
          </div>
    )
  } else if (KpIndex[0] >= 5 && KpIndex[0] < 6) {
    return(
       <div>
            <div>Current Kp-Index: {KpIndex} | Minor Storm</div>
         
          </div>
    )
  } else if (KpIndex[0] >= 6 && KpIndex[0] < 7) {
    return(
       <div>
            <div>Current Kp-Index: {KpIndex} | Moderate Storm</div>
          
          </div>
    )
  }else if (KpIndex[0] >= 7 && KpIndex[0] < 8) {
    return(
       <div>
            <div>Current Kp-Index: {KpIndex} | Strong Storm</div>
          </div>
    ) 
  }else if (KpIndex[0] > 8 && KpIndex[0] < 9) {
    return(
       <div>
            <div>Current Kp-Index: {KpIndex} | Severe Storm</div>
          </div>
    )
  } else if (KpIndex[0] >= 9) {
    return(
       <div>
            <div>Current Kp-Index: {KpIndex} | Extreme Storm</div>
          </div>
    )
  }
  //Dynamisches Display der Messwerte, mit Error Handling 
}



export default KpCalculation; //Export der Komponente 




