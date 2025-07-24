const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = 3000;

// Replace with your verify token
const VERIFY_TOKEN = 'your_verify_token_here';

app.use(bodyParser.json());

// Webhook verification endpoint (GET)
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('Webhook verified');
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// Handle incoming events (POST)
app.post('/webhook', (req, res) => {
    console.log('📩 Webhook event received:', JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`🚀 Webhook server running at http://localhost:${PORT}`);
});