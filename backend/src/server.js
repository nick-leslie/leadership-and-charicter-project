const http = require('http');
const app = require('./app');

const port = 1234;

//server just serves the express app created
//it is done this way so that it can use https latter
const server = http.createServer(app)

server.listen(port);