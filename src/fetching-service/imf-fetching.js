import {useState, useEffect} from 'react';

function ImfCalculation() {

const [IMFBt, setIMFBt] = useState(null);
const [IMFBz, setIMFBz] = useState(null);
useEffect(() => {

async function fetchData() {
    const response = await fetch('https://services.swpc.noaa.gov/products/solar-wind/mag-5-minute.json');
    const result = await response.json();
    setIMFBt([result[1][6]]);
    setIMFBz([result[1][2]]);
    console.log(IMFBt, IMFBz);

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
