import SolarDataFetching from "./FetchingFunction";


function ImfCalculation() {

const result = SolarDataFetching.IMFBt;
console.log(result);
return ( 
    <div>
        <div>IMF Bt: {result} nT </div>
        <div>IMF Bz:  nT </div>
    </div>
)

} 

export default ImfCalculation;
