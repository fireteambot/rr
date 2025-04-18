const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 8080;  // Use environment port or 8080 as fallback

// Set up proxy to your 3CX UI panel
app.use('/', createProxyMiddleware({
  target: 'http://paid.rtxconfigz.shop',  // Your 3CX UI panel URL
  changeOrigin: true,  // Ensures the proxying works with the correct host header
  logLevel: 'debug',   // Log proxying details for debugging (optional)
  onError: (err, req, res) => {
    // Send a 500 error if the proxy fails
    res.status(500).send('Something went wrong with the reverse proxy.');
  }
}));

// Start the server
app.listen(port, () => {
  console.log(`Reverse proxy is running on http://localhost:${port}`);
});
