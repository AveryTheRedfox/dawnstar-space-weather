
import fallback from './mag_chart_2026-07-24.png';

export function MagnetometerData({src, alt, fallbackSrc = fallback.src}) {

    return (
        <div className="MagnetometerData" style={{
            "maxWidth": "20vw",
        }}>
            <img
            src={'http://192.168.2.233/graphs/h_component_latest.png'}
            alt={alt}
            onError={(e) => (e.currentTarget.src = fallbackSrc)}
            style={{
                height: '50vh'
            }}
            />
            </div>
    )
}