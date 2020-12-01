//-----------------------------------modules/middle where
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
//-----------------------------------

app.use('/',express.static("../../Frountend/client"))
module.exports = app;