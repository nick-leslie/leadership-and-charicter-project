//-----------------------------------modules/middle where
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
//-----------------------------------

app.use('/',express.static(path.join(__dirname,"../../Frountend")))
module.exports = app;