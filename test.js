const WebSocket = require('ws');

const ws = new WebSocket('ws://0.0.0.0:8080');

ws.on('open', () => {
  console.log('Connected to WebSocket server');
  // Now, connect to NATS and publish/subscribe here
  // Example: ws.send('Hello NATS');
});

ws.on('message', (message) => {
  console.log('Received:', message);
});

ws.on('error', (err) => {
  console.error('WebSocket error:', err);
});

ws.on('close', () => {
  console.log('Connection closed');
});
