

import cors from 'cors';
import express from 'express';
const app = express();
app.use(cors());

app.get('/api/space-weather-data', async (req, res) => {
  try {
    const [
      windResponse,
      imfResponse, 
      kpResponse,
      alertsResponse,
      flareResponse,
      latestFlareResponse,
      enlilResponse,
      ovationResponse,
    ] = await Promise.all([
      fetch('https://services.swpc.noaa.gov/json/rtsw/rtsw_wind_1m.json'),
      fetch('https://services.swpc.noaa.gov/json/rtsw/rtsw_mag_1m.json'),
      fetch('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json'),
      fetch('https://services.swpc.noaa.gov/products/alerts.json'),
      fetch('https://services.swpc.noaa.gov/json/goes/primary/xrays-1-day.json'),
      fetch('https://services.swpc.noaa.gov/json/goes/primary/xray-flares-latest.json'),
      fetch('https://services.swpc.noaa.gov/json/enlil_time_series.json'),
      fetch('https://services.swpc.noaa.gov/json/ovation_aurora_latest.json'),
    ]);

    const [
      windResult,
      imfResult,
      kpResult,
      alertsResult,
      flareResult,
      latestFlareResult,
      enlilResult,
      ovationResult,
    ] = await Promise.all([
      windResponse.json(),
      imfResponse.json(),
      kpResponse.json(),
      alertsResponse.json(),
      flareResponse.json(),
      latestFlareResponse.json(),
      enlilResponse.json(),
      ovationResponse.json(),
    ]);

    // Structure the response
    const data = {
      solarWind: windResult,
      intMag: imfResult,
      kpIndex: kpResult,
      alerts: alertsResult,
      flare: flareResult,
      latestFlare: latestFlareResult?.[0]?.max_class,
      enlil: enlilResult,
      ovation: ovationResult,
    };

    res.json(data);
  } catch (error) {
    console.error('Error fetching space weather data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// Keep the old endpoint for backward compatibility

app.listen(3001, () => {
  console.log('Backend server running on port 3001');
});