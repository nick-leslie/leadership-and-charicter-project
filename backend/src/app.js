//-----------------------------------modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
//-----------------------------------route imports
const userRoute = require('./routes/usersRoute')
//--------------------------------- config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())
//-------------------------------- routes
app.use('/',express.static("../../Frountend/client"));
app.use('/users',userRoute);
module.exports = app;