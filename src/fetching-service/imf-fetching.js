import {useState, useEffect} from 'react';

function ImfCalculation() {

const [IMFBt, setIMFBt] = useState(null);
const [IMFBz, setIMFBz] = useState(null);
useEffect(() => {

async function fetchData() {
    const response = await fetch('https://services.swpc.noaa.gov/json/dscovr/dscovr_mag_1s.json');
    const result = await response.json();
    if (result == undefined && result == null) {
       setIMFBt("No Data")
        setIMFBz("No Data")
   } else {
    setIMFBt([result[0].bt])
    setIMFBz([result[0].bz_gse])
    console.log(IMFBt, IMFBz)
}


}
setTimeout(function() { fetchData(); }, 6000);
});

return ( 
    <div>
        <div>IMF Bt: {IMFBt} nT </div>
        <div>IMF Bz: {IMFBz} nT </div>
    </div>
)
}

export default ImfCalculation;
