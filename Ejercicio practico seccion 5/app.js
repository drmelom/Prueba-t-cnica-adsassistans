import express from 'express';
import axios from 'axios';

const app = express();

async function fetchData() {
    try {
      const response = await axios.get('https://api.spacexdata.com/v5/launches');
      const data = response.data;
      // Procesar los datos
      return data;
    } catch (error) {
      // Manejar errores
      console.error('Error fetching data:', error.message);
    }
  }
  

app.get('/api', async (req, res) => {

    const data = await fetchData();
    if (data) res.json(data);
    else res.status(500).json({ error: 'Error fetching data' });
});

app.listen(3000, () => console.log('Server running on port 3000'));