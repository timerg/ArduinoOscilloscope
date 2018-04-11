// SocketiO server
var server = require('http').createServer(handler);
var fs = require('fs');
var url = require('url');
var SerialPort = require('serialport');
var io = require('socket.io')(server)
var express = require('express');
var app = express();
var path = require('path');

var dir = path.join(__dirname, 'public');

app.use(express.static(dir));


function handler (request, response) {
    var upath = url.parse(request.url).pathname;
    switch(upath){
        case '/interface.html':
            fs.readFile(__dirname + upath, function(error, data) {
                if (error){
                  response.writeHead(404);
                  response.write("opps this doesn't exist - 404");
                } else {
                  response.writeHead(200, {"Content-Type": "text/html"});
                  response.write(data, "utf8");
                }
                response.end();
            });
            break;
        default:
            response.writeHead(404);
            response.write("opps this doesn't exist - 404");
            response.end();
            break;
    }
}

server.listen(3000);
io.listen(server);

io.on('connection', function(client){
    console.log('a user connected');
});

io.on('start', () => {
    console.log("start");
})

// Serial Port

// var port = new SerialPort('/dev/tty.SLAB_USBtoUART', {
//   baudRate: 9600
// });
//
// port.on('error', function(err) {
//   console.log('Error: ', err.message);
// })
//
// port.on('data', function (data) {
//   console.log('Data:', data);
// });