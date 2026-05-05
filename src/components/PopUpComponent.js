
import { ComponentEvents } from "./ComponentEvents";

export function PopUpComponent() {

    const {RadioBlackOutEvent, GeomagneticStormEvent} = ComponentEvents();

    return(
        <div className="PopUpComponent">
            <div className="PopUpTitle">Current Space Weather Events:</div>
            <div className="PopUpEvents">{GeomagneticStormEvent()} {RadioBlackOutEvent()}</div>
        </div>
    )
}

export default PopUpComponent;