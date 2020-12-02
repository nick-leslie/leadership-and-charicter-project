//-----------------------------------modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
//-----------------------------------route imports
const userRoute = require('./routes/usersRoute')
//---------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//here is where we define the routes being used
app.use('/',express.static("../../Frountend/client"));
app.use('/users',userRoute);
module.exports = app;