// Serial Port
var SerialPort = require('serialport');
var port = new SerialPort('/dev/tty.SLAB_USBtoUART', {
  baudRate: 9600
});

port.on('error', function(err) {
  console.log('Error: ', err.message);
})

port.on('data', function (data) {
  console.log('Data:', data);
});