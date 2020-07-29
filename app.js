const express = require('express');

const app = express();

const oraRoute = require('./routes/getOra');

app.use('/api/v1/oracle', oraRoute); // to sie nazywa mouting router

module.exports = app;
