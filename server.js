const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/mag-data', async (req, res) => {
  try {
    const response = await fetch('https://www2.irf.se/maggraphs/rt1hour_secondary.txt');
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error('Error fetching mag data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(3001, () => {
  console.log('Backend server running on port 3001');
});
