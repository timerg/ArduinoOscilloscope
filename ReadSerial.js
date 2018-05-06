const WRITETOFILE = true;
const fs = require('fs');
var file;

// Serial Port
var SerialPort = require('serialport');
const ByteLength = SerialPort.parsers.ByteLength;
const HeaderParser = require('./MyHeaderParser')
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
    if(WRITETOFILE){
      file = fs.openSync("./dataLog.txt", 'w+');
    }
    port.open();
  });
  socket.on('stop', function () {
    port.flush();
    port.close();
  });
});

// Serial Port

const dev = "/dev/tty.usbserial-A105N9Y1";

const port = new SerialPort(dev, {
  baudRate: 9600,
  autoOpen: false
});

const headerParser = new HeaderParser({
  bodyLength: 1280 + 4,
  header: "data"
});
const dataParser = new ByteLength({length: 1280 + 4});
port.pipe(headerParser).pipe(dataParser);



port.on('error', function(err) {
  console.log('Error: ', err.message);
})

port.on('open', () => {
  console.log("Port Open");
  dataParser.on('ready', () => {console.log("ready")})
  dataParser.on('data', (buffer) => {
		if(WRITETOFILE){
					let view = new Uint8Array(buffer);
					fs.writeFileSync(file, view.toString() + "\n\n", {flag: 'a'},  (err) => {
						if (err) throw err;
					})
					console.log("write to file!!");
		} else {
      io.emit('data', buffer);
    }
  })
})

port.on('close', () => {
  console.log("Port Close");
})
