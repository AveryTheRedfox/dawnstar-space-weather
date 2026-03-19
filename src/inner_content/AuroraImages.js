
import useFetchingApi from "../fetching-service/FetchingFunction";

function AuroraDisplay() {

const [, , , , , , , Ovation] = useFetchingApi();

    console.log(Ovation);
    return (
        <div></div>
    )
}

export default AuroraDisplay;