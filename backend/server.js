

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
      'https://services.swpc.noaa.gov/text/aurora-nowcast-hemi-power.txt',     
      'https://services.swpc.noaa.gov/text/3-day-geomag-forecast.txt',   
      'https://services.swpc.noaa.gov/text/srs.txt',
    ];

    const fetchWithErrorLogging = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.warn(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
          return null;
        }
        const text = await response.text();
        if (!text) {
          console.warn(`Empty response from ${url}`);
          return null;
        }
        try {
        return JSON.parse(text);
        } catch(parseError) {
          console.warn(`${url} is not valid JSON, parsing as text instead`);
          return text;
        }
      } catch (error) {
        console.error(`Error fetching ${url}:`, error.message);
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
      hpiResult,             
      forecastResult,   
      sunspotResult,      
    ] = await Promise.all(urls.map(fetchWithErrorLogging));

    const data = {
      solarWind: windResult || [],
      intMag: imfResult || [],
      kpIndex: kpResult || [],
      alerts: alertsResult || [],
      flare: flareResult || [],
      latestFlare: latestFlareResult || [],
      enlil: enlilResult || [],
      ovation: ovationResult || [],
      hpi: typeof hpiResult === 'string' ? { text: hpiResult } : (hpiResult || {}),
      forecast: typeof forecastResult === 'string' ? { text: forecastResult } : (forecastResult || {}),
      sunspot: typeof sunspotResult === 'string' ? { text: sunspotResult } : (sunspotResult || {}),
    };

    console.log('API response prepared with data from NOAA services');
    res.json(data);
  } catch (error) {
    console.error('Error fetching space weather data:', error);
    res.status(500).json({ error: 'Error fetching data', details: error.message });
  }
});

app.listen(3001, '0.0.0.0', () => {
  console.log('Backend server running on port 3001');
});