
import fallback from './mag_chart_2026-07-24.png';

export function MagnetometerData({src, alt, fallbackSrc = fallback.src}) {

    return (
        <div className="MagnetometerData" style={{
            "display": "flex",
            "flexDirection": "row",
            "fontFamily": "Roboto",
            "border": "2px solid gray",
            "borderRadius": "5px",
            "padding": "1rem",
            "backgroundColor": "#3f3b5180"
        }}>
            <img
            src={'http://192.168.2.233/graphs/k_index_diagnostic_plot.png'}
            alt={alt}
            onError={(e) => (e.currentTarget.src = fallbackSrc)}
            style={{
                height: '70vh'
            }}
            />
            <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginLeft: "1rem"
            }}
            >
                <img 
                src={'http://192.168.2.233/graphs/mag_chart_latest.png'}
                style={{height: '23vh'}}/>
                <img
                src={'http://192.168.2.233/graphs/h_component_latest.png'}
                style={{height: '23vh'}}/>
                <img
                src={'http://192.168.2.233/graphs/temperature_latest.png'}
                style={{height: '23vh'}}/>
            </div>
            <div style={{ marginLeft: "1rem"}}>
                <div style={{fontSize: "3vh", color: "white"}}>K-Index Diagnostic Plot</div>
                <div style={{fontSize: "3vh", color: "white"}}>Data Source: GAMmA Station GRA</div>
                <div style={{fontSize: "1.5rem", color: "red", background: "#3f3b5180", border: "2px solid gray", borderRadius: "5px"}}>Warning: Magnetometer Station<br></br>currently offline due to maintenance</div>
                <div style={{fontSize: "1.5rem", color: "white"}}>Last Updated: {new Date().toLocaleString()}</div>
                <div style={{marginTop: "1rem" , fontSize: "3vh", color: "white"}}>
                    Those are the images provided by the magnetometer station GRA. The first image shows the local K-Index. 
                    The second the total H-Component measured the third the fluctuations based on the solar quiet day and the last image the temperature measured around the magnetometer.
                </div>
            </div>
            </div>
    )
}