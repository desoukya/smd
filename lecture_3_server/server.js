const express = require('express');
const app  = express();
const locations = require('./locations.json');
const universities = require('./universities.json');

app.get('/locations', function(req, res) {
  return res.send(locations);
});
app.get('/universities', function (req, res) {
  return res.send(universities);
});

app.get('/locations/:countryCode', function(req, res) {
  const { countryCode } = req.params;
  return res.send(locations[countryCode.toUpperCase()]);
});

app.get('/universities/:countryCode', function(req, res) {
  const { countryCode } = req.params;
  return res.send(universities[countryCode.toUpperCase()]);
});

app.listen(3000, function() {
  console.log("[OK] = HTTP Server listening on: http://localhost:3000");
});