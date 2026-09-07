

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
      'https://kauai.ccmc.gsfc.nasa.gov/DONKI/WS/get/CME?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd',
    ];

const fetchWithErrorLogging = async (url) => {
    try {
        const response = await fetch(url, {
            headers: {
                // Tells NOAA's firewall that this request is coming from a real web browser
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) {
            console.warn(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
            return null;
        }

        // 1. DYNAMIC TYPE PARSING: Check if the file target is explicitly JSON
        if (url.endsWith('.json')) {
            try {
                return await response.json();
            } catch (jsonError) {
                console.warn(`Failed to parse valid JSON from ${url}:`, jsonError.message);
                return null;
            }
        }

        // 2. TEXT TARGETS: Handle text streams and normalize line-endings for Linux/Raspberry Pi
        let text = await response.text();
        if (!text || text.trim() === "") {
            console.warn(`Empty response from text endpoint ${url}`);
            return null;
        }

        // Strip carriage returns (\r) to guarantee matching string lengths on the Pi
        return text.replace(/\r/g, '');

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
      cmeResult      
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
      cme: cmeResult || [], 
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