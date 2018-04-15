
// Serial Port
var SerialPort = require('serialport');
const ByteLength = SerialPort.parsers.ByteLength;
// SocketiO server
var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// SocketiO server
server.listen(3000);
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/interface/interface.html');
});
app.use(express.static(__dirname + '/'));

io.on('connection', function (socket) {
  socket.on('start', function () {
    port.open();
  });
  socket.on('stop', function () {
    port.close();
  });
});

// Serial Port

const dev = "/dev/tty.usbserial-A105N9Y1";

const port = new SerialPort(dev, {
  baudRate: 9600,
  autoOpen: false
});
const parser = port.pipe(new ByteLength({length: 1280}));



port.on('error', function(err) {
  console.log('Error: ', err.message);
})

port.on('open', () => {
  console.log("Port Open");
  parser.on('data', (buffer) => {
    var arr = Array.prototype.slice.call(buffer, 0)
    // console.log("Parser On");
    console.log(buffer[0]);
    // for(var i = 0; i < 30; i++){
      io.emit('data', arr);
    // }
  });
})

port.on('close', () => {
  console.log("Port Close");
})


