
import fallback from './mag_chart_2026-07-24.png';

export function MagnetometerData({src, alt, fallbackSrc = fallback.src}) {

    return (
        <div className="MagnetometerData" style={{
            "maxWidth": "20vw",
        }}>
            <img
            src={'./mag_graphs/mag_chart_latest.png'}
            alt={alt}
            onError={(e) => (e.currentTarget.src = fallbackSrc)}
            />
            </div>
    )
}