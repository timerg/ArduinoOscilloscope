// Client

var socket = io();

var xval = 0;


anychart.onDocumentReady(function () {
  // data
  dataSet = anychart.data.set([
    {x: 0, value: 100},
  ]);
  for(var i = 0; i < 1280; i++){
    dataSet.append({
      x: 0,
      value: 0
    })
  }
  // set chart type
  var chart = anychart.line();
  chart.title().text("Click on Chart to Add a Point ");

  // set data
  chart.spline(dataSet).markers(null);

  // disable stagger mode. Only one line for x axis labels
  chart.xAxis().staggerMode(false);

  // set container and draw chart
  chart.container("container").draw();

  // first index for new point
  indexSetter = (dataSet.mapAs().getRowsCount())+1;
});


socket.on('data', function (buffer){
    var rows = new Array(1280);
    var row;
    for(var i = 0; i < 1280; i++){
      rows[i] = {
        x: xval++,
        value: buffer[i]
      };
      // dataSet.remove(0);
    }
    appendData(dataSet, rows, 1280);
});


function startStream() {


  socket.emit('start');
  // adjust button content
  var streamButton = document.getElementById("streamButton");
  streamButton.innerHTML = "Stop" + "\nstream";

  streamButton.onclick = function (){
    socket.emit('stop');
    streamButton.onclick = function(){
      startStream();
    };
    streamButton.innerHTML = "Start" + "\nstream";
  };
};



// ln52 buffer data didn't receive
// modify event listener to more callback