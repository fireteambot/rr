const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 80;  // Listen on port 80 for HTTP traffic

// Set up proxy to your 3CX UI panel over HTTPS (port 443)
app.use('/', createProxyMiddleware({
  target: 'https://paid.rtxconfigz.shop',  // Proxy to your 3CX UI panel (HTTPS)
  changeOrigin: true,  // Ensures correct Host header
  logLevel: 'debug',   // Log proxying details for debugging (optional)
  onError: (err, req, res) => {
    // Send a 500 error if the proxy fails
    res.status(500).send('Something went wrong with the reverse proxy.');
  }
}));

// Start the server on port 80
app.listen(port, () => {
  console.log(`Reverse proxy is running on http://localhost:${port}`);
});
