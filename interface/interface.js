

const BUFFLIMIT = 50;
const DATAGAP = 10
<<<<<<< HEAD
const DATASIZE = 2560;
=======
const DATASIZE = 3840;
>>>>>>> e676527b6c1761acdfdd58ee1b733c01666d932d
const BUFFSIZE = DATASIZE * BUFFLIMIT;
var FRAMELIMIT = 50;
var FRAMESIZE = DATASIZE * FRAMELIMIT;
var div = 128;		// determine by arduino adc ADCSRA register.  128/64/32/16/8
const DIVTOSR = 13;	// A factor related to ADC cycles per sample. div only decides the input clk that ADC uses.



//-- Canvas position
var CBOARDERL = 200;		// left gap btw canvas and window
var CBOARDERT = 100;		// top gap btw canvas and window
const PBOARDERL = 10;		// left gap btw plot line and canvas
const PBOARDERT = 10;		// top gap btw plot line and canvas
const PBOARDERB = 20;
var CWIDTH = 800;
var PWIDTH = CWIDTH - PBOARDERL*2;
var CHEIGHT = 600;
var PHEIGHT = CHEIGHT - PBOARDERB;
var YSCALE = (PHEIGHT / 255);	// scale data value to plot size

// Socket io
var socket = io();

//--- Event


//--- Data and Buffer
	// Buffer for y
var buffer = new Uint8Array(BUFFSIZE);
var buffCount = 0; //Indicate the buffer position into which data is inserted
	// Buffer for x
var xbuffer = new Float32Array(BUFFSIZE);


var fc = document.getElementById("fg"),
		fg = fc.getContext("2d");

function createFront() {
    fc.width = window.innerWidth;
	CBOARDERL = fc.width * 0.1;
    CWIDTH = fc.width * 0.7;
    PWIDTH = CWIDTH - PBOARDERL*2;
    fc.height = window.innerHeight;
	CBOARDERT = fc.height * 0.1
    CHEIGHT = fc.height * 0.7;
    PHEIGHT = CHEIGHT - PBOARDERB;
    YSCALE = (PHEIGHT / 255);
    scaleX(FRAMESIZE);


	fg.fillStyle = "black";
	fg.lineWidth = 3;
	fg.fillRect(CBOARDERL, CBOARDERT, CWIDTH, CHEIGHT);
	fg.strokeStyle="yellow";
}

$( window ).resize(createFront);
$( document ).ready(createFront);

//--- User Control interface
	// Frame Slider
function rescale(val){
	FRAMELIMIT = val;
	FRAMESIZE = val * DATASIZE;
	buffCount = 0;
	scaleX(FRAMESIZE);
}

//---Data Generate and Get

//---xbuffer and Time calculation
	// Only write frameSize slots from the beginning of xbuffer. Other slots are ignored
	// The change of division factor doesn't make difference to xbuffer because the datasize is always same
	// But the x label (s/div) should be modified
function scaleX(frameSize){
	for(var i = 0; i < frameSize; i++){
		xbuffer[i] = i / (frameSize) * PWIDTH + CBOARDERL + PBOARDERL;
	}
}
scaleX(FRAMESIZE);

var write0ToBufferID;
function write0ToBuffer(){
	write0ToBufferID = window.setInterval(function(){
		let startPoint = buffCount*DATASIZE;
		for(let i = startPoint; i < startPoint + DATASIZE; i++){
			buffer[i] = 0;
 		}
		buffCount = (buffCount + 1) % FRAMELIMIT;
	}, div * DATASIZE * DIVTOSR / 16000)
}


socket.on('data', function (dataArray){
		//clearInterval(write0ToBufferID);
		let view   = new Uint8Array(dataArray);
    buffer.set(view, buffCount * DATASIZE);
    buffCount = (buffCount + 1) % FRAMELIMIT;
		//write0ToBuffer();
});



function startStream(){
    socket.emit('start');
    var streamButton = document.getElementById("streamButton");
	streamButton.innerHTML = "Stop Stream";
	streamButton.onclick = function(){
        socket.emit('stop');
		streamButton.innerHTML = "Start Stream";
		streamButton.onclick = function(){
			startStream()
		}
	}
}


//--- Canvas
//--- Draw path
var drawDataID;
function drawData(){
	fg.fillStyle = "black"
	fg.fillRect(CBOARDERL, CBOARDERT, CWIDTH, CHEIGHT);
	fg.beginPath();
	let num = 0;
	for(let i = 0; i < FRAMESIZE; i++){
		num = CHEIGHT - (buffer[i] * YSCALE + PBOARDERT) + CBOARDERT ;
		fg.lineTo(xbuffer[i], num);		// the plot x position doesn't change with data. It's x label should change
	}
	fg.stroke();
	fg.fillStyle = "#ffffff"
	fg.fillRect(xbuffer[buffCount * DATASIZE], CBOARDERT, 3, CHEIGHT);
	drawDataID = requestAnimationFrame(drawData);
}

function drawDataEvent(){
	var drawDataButton = document.getElementById('drawData');
	drawDataButton.innerHTML = "Stop";
	drawData();
	drawDataButton.onclick = function(){
		cancelAnimationFrame(drawDataID);
		drawDataButton.innerHTML = "Run";
		drawDataButton.onclick = function(){
			drawDataEvent()
		}
	}
}
