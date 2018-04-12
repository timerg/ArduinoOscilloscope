// SocketiO server
var SerialPort = require('serialport');
var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/interface/interface.html');
});
app.use(express.static(__dirname + '/'));


io.on('connection', function (socket) {
  socket.on('start', function () {
    console.log("hey You");
  });
});

// Serial Port

var port = new SerialPort('/dev/tty.usbserial-A105N9Y1', {
  baudRate: 9600
});
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

port.on('data', function (data) {
  console.log('Data:', data);
});