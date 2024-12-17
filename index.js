const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const robotRoutes = require('./routes/robots');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Fleet Monitoring Dashboard Backend!');
});

// Routes
app.use('/api/robots', robotRoutes);

// WebSocket Server
const wss = new WebSocket.Server({ port: 5001 });

wss.on('connection', (ws) => {
    console.log('Client connected');
    setInterval(() => {
        ws.send(JSON.stringify(generateMockRobotData(10)));
    }, 5000);
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Mock Data Function
function generateMockRobotData(count) {
    return Array.from({ length: count }, (_, i) => ({
        id: `robot-${i}`,
        online: Math.random() > 0.2,
        battery: Math.floor(Math.random() * 100),
        cpu: Math.floor(Math.random() * 100),
        ram: Math.floor(Math.random() * 100),
        lastUpdated: new Date().toISOString(),
        location: {
            lat: 37.7749 + (Math.random() - 0.5) * 0.1,
            lng: -122.4194 + (Math.random() - 0.5) * 0.1,
        },
    }));
}
