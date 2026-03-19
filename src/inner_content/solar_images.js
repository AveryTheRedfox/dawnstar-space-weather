
import 'reactjs-popup/dist/index.css'

function SolarImages() {

let solarImages = [
    'https://services.swpc.noaa.gov/images/animations/suvi/secondary/195/latest.png',
    'https://services.swpc.noaa.gov/images/animations/suvi/secondary/304/latest.png',
    'https://services.swpc.noaa.gov/images/animations/suvi/secondary/171/latest.png',
    'https://services.swpc.noaa.gov/images/animations/suvi/secondary/284/latest.png',
    'https://services.swpc.noaa.gov/images/animations/suvi/secondary/094/latest.png',
    'https://services.swpc.noaa.gov/images/animations/suvi/secondary/131/latest.png',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_HMIBC.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_HMIIC.jpg',
];

    


    return (
        <div className="solar-images-container" style={{
            "alignContent": "flex",
            "flexDirection": "row",
            "verticalAlign": "top",
            "display": "flex",
            "padding": "10px",
            "position":"relative",
             "minWidth": "73vw",
             "maxWidth": "75vw",
             "marginTop": "0px",
             "alignContent": "space-evenly",
             "justifyContent": "space-between",
             "flexWrap": "wrap"
        }}>
            {solarImages.map((image, index) => (
                          <img key={index} src={image}  style={{"width": "160px", "height": "160px"}}></img>
            ))}

        </div>
    );

}

export default SolarImages;