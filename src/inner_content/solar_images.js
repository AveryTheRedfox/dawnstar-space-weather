


function SolarImages() {

let solarImages = [
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_0193.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_0304.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_0171.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_0211.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_0094.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_0131.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_0335.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_HMIBC.jpg',
    'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_512_HMIIC.jpg',
];


    return (
        <div className="solar-images-container" style={{
            "alignContent": "flex",
            "flexDirection": "row",
            "verticalAlign": "top",
            "display": "flex",
            "border": "2px solid gray",
            "borderRadius": "10px",
            "padding": "10px",
            "position":"relative",
             "minWidth": "75vw",
             "maxWidth": "78vw",
             "marginTop": "0px",
             "alignContent": "space-evenly",
             "justifyContent": "space-evenly",
             "flexWrap": "wrap",
        }}>
            {solarImages.map((image, index) => (
                <img key={index} src={image} style={{"margin": "5px", "width": "80px", "height": "80px"}}/>
            ))}

        </div>
    );

}

export default SolarImages;