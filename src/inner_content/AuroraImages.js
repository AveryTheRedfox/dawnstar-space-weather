
import FetchingApi from "../fetching-service/FetchingFunction";

function AuroraDisplay() {

const [, , , , , , , Ovation] = FetchingApi();

    console.log(Ovation);
    return (
        <div></div>
    )
}

export default AuroraDisplay;