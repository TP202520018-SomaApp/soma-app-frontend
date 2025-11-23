const express = require('express');
const cors = require('cors');
const https = require('https');
const userRoutes = require('./interfaces/routes/router.cjs');
require('dotenv').config({ path: './backend/.env' });
const PORT = JSON.parse(process.env.PORT || '3016');
const URL = process.env.URL || 'somapp.tarket.com.pe';
const logger = require('./shared/utils/logger.util.cjs');

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/api/v1', userRoutes);

try {
    const server = https.createServer({
        key: require('fs').readFileSync(`C:/Certbot/live/${URL}/privkey.pem`),
        cert: require('fs').readFileSync(`C:/Certbot/live/${URL}/fullchain.pem`),
    }, app);
    server.listen(PORT, () => { logger.log(`Servidor desplegado en https://${URL}:${PORT}/api/v1`); });
} catch(err) {
    app.listen(PORT, () => { logger.log(`Servidor HTTP desplegado en http://localhost:${PORT}/api/v1`); });
}