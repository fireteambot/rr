const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Use the environment's port or default to port 80 for Azure App Service
const port = process.env.PORT || 80;

// Configure the reverse proxy middleware
app.use('/', createProxyMiddleware({
  target: 'https://paid.rtxconfigz.shop',  // 3CX UI panel URL
  changeOrigin: true,  // Ensures correct Host header is forwarded
  logLevel: 'debug',   // Logs proxy details for debugging
  onError: (err, req, res) => {
    res.status(500).send('Something went wrong with the reverse proxy.');
  }
}));

// Start the server on port 80 (default for HTTP)
app.listen(port, () => {
  console.log(`Reverse proxy running on http://localhost:${port}`);
});
