const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 80;  // Port 80 for Azure App Service

app.use('/', createProxyMiddleware({
  target: 'https://paid.rtxconfigz.shop',  // 3CX panel URL
  changeOrigin: true,  // Ensures correct Host header
  logLevel: 'debug',
  onError: (err, req, res) => {
    res.status(500).send('Something went wrong with the reverse proxy.');
  }
}));

app.listen(port, () => {
  console.log(`Reverse proxy running on http://localhost:${port}`);
});
