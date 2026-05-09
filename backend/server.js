

import cors from 'cors';
import express from 'express';
const app = express();
app.use(cors());

app.get('/api/space-weather-data', async (req, res) => {
  try {
    const urls = [
      'https://services.swpc.noaa.gov/json/rtsw/rtsw_wind_1m.json',
      'https://services.swpc.noaa.gov/json/rtsw/rtsw_mag_1m.json',
      'https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json',
      'https://services.swpc.noaa.gov/products/alerts.json',
      'https://services.swpc.noaa.gov/json/goes/primary/xrays-1-day.json',
      'https://services.swpc.noaa.gov/json/goes/primary/xray-flares-latest.json',
      'https://services.swpc.noaa.gov/json/enlil_time_series.json',
      'https://services.swpc.noaa.gov/json/ovation_aurora_latest.json',
    ];

    // Fetch all URLs in parallel
    const responses = await Promise.all(urls.map(url => fetch(url)));

    // Parse JSON safely
    const safeJson = async (response) => {
      try {
        if (!response.ok) return null;
        const text = await response.text();
        if (!text) return null;
        return JSON.parse(text);
      } catch {
        return null;
      }
    };

    const [
      windResult,
      imfResult,
      kpResult,
      alertsResult,
      flareResult,
      latestFlareResult,
      enlilResult,
      ovationResult,
    ] = await Promise.all(responses.map(safeJson));

    const data = {
      solarWind: windResult,
      intMag: imfResult,
      kpIndex: kpResult,
      alerts: alertsResult,
      flare: flareResult,
      latestFlare: latestFlareResult,
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