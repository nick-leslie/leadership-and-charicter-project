const http = require('http');
const app = require('./app');
const path = require('path')
const test = require('./state/gameState');
const { networkInterfaces } = require('os');


require('dotenv').config({path:__dirname + '/config.env'});
const port = process.env.PORT;

//server just serves the express app created
//it is done this way so that it can use https latter
const server = http.createServer(app)

server.listen(port);
printLocalIp();
function printLocalIp() 
{
    const nets = networkInterfaces();
    const results = Object.create(null); // or just '{}', an empty object

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                
                results[name].push(net.address);
            }
        }
    }
    console.log(results);
}