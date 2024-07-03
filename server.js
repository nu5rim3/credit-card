const express = require('express');
const path = require('path');
const app = express();
var httpProxy = require('http-proxy')
var cors = require('cors')
var proxy = httpProxy.createProxyServer()

var serverOne = 'https://uat.warranty.lk'

app.disable('x-powered-by');

app.use(function(req, res, next) {
  res.setHeader("content-security-policy", "upgrade-insecure-requests; frame-ancestors 'self' https://creditcard.lolc.lk");
  res.setHeader("strict-transport-security", "max-age=31536000");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("x-frame-options", "SAMEORIGIN");
  res.setHeader("x-xss-protection", "1; mode=block");
  return next();
});

app.use('/robots.txt', function (req, res, next) {
  res.redirect('https://creditcard.lolc.lk');
});

app.use(express.static(path.join(__dirname, 'build')));

app.all("/services*", function (req, res) {
    proxy.web(req, res, { target: serverOne, secure: false, changeOrigin: true })
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8080);
