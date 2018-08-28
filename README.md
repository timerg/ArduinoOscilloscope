# Oscilloscope with Arduino

Use Arduino and canvas to make a simple Oscilloscope.

## How to use

### interface

The javascript interface is built with `node`. Run `npm install` to setup the environment. You also need basic arduino firmware to communicate with the board.

### Arduino
The board I use is mega 1280. But it should be compatible to 2560 and even uno which girino use.
The input pin is adc1 and vcc = 5V. If any other setting is preferred, you can fiddle it through in `Osci/Setup.ino`.

### Running

Open the folder and run:

```
node ReadSerial.js
```
and open `localhost:3000` in browser. Press 'start Stream' and 'run' to get it work.

The interface also allow writing data to file. Change first line in `ReadSerial.js` from

```
const WRITETOFILE = false;
```
to
```
const WRITETOFILE = true;
```
You will get raw reading data in `dataLog.txt`

## Running the tests

A demo interface is in `interface/index.html`. It use random generated data to demo the scope interface. Just open it in browser and see what you got.


## Notes
This project is **unfinished** due to some data lost from serial port and the insufficient processing speed.

Besides, due to the limitation of baud rate, the output is 'pseudo-continuous'. The frame of oscilloscope is composed of ten smaller frames to present data with longer period.

Some arduino code refers to  [Girino](https://www.instructables.com/id/Girino-Fast-Arduino-Oscilloscope/) which is a great work of home-made oscilloscope!
