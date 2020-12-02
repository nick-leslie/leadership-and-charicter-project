const http = require('http');
const app = require('./app');
const path = require('path')
require('dotenv').config({path:__dirname + '/config.env'});
const port = process.env.PORT;

//server just serves the express app created
//it is done this way so that it can use https latter
const server = http.createServer(app)

server.listen(port);