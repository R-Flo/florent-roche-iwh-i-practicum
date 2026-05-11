require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;
const PORT = process.env.PORT || 3000;

const CUSTOM_OBJECT_TYPE = '2-62299495';
const CUSTOM_PROPERTIES = ['name', 'genre', 'min_players', 'max_players', 'play_time_minutes'];

const HUBSPOT_API = 'https://api.hubapi.com';
const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    'Content-Type': 'application/json'
};

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
    const url = `${HUBSPOT_API}/crm/v3/objects/${CUSTOM_OBJECT_TYPE}?properties=${CUSTOM_PROPERTIES.join(',')}&limit=100`;
    try {
        const response = await axios.get(url, { headers });
        const games = response.data.results || [];
        res.render('homepage', {
            title: 'Board Game Collection | Integrating With HubSpot I Practicum',
            games
        });
    } catch (error) {
        console.error('GET / failed:', error.response ? error.response.data : error.message);
        res.status(500).send('Failed to load board games. Check the server console.');
    }
});

app.get('/update-cobj', (req, res) => {
    res.render('updates', {
        title: 'Update Custom Object Form | Integrating With HubSpot I Practicum'
    });
});

app.post('/update-cobj', async (req, res) => {
    const payload = {
        properties: {
            name: req.body.name,
            genre: req.body.genre,
            min_players: req.body.min_players,
            max_players: req.body.max_players,
            play_time_minutes: req.body.play_time_minutes
        }
    };
    const url = `${HUBSPOT_API}/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`;
    try {
        await axios.post(url, payload, { headers });
        res.redirect('/');
    } catch (error) {
        console.error('POST /update-cobj failed:', error.response ? error.response.data : error.message);
        res.status(500).send('Failed to create board game. Check the server console.');
    }
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
