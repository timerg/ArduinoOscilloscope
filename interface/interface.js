// Client

var socket = io();




anychart.onDocumentReady(function () {

  // data
  dataSet = anychart.data.set([
    {x: "P1", value: 100},
    {x: "P2", value: 200},
    {x: "P3", value: 15},
    {x: "P4", value: 130},
    {x: "P5", value: 153},
    {x: "P6", value: 120},
    {x: "P7", value: 151},
    {x: "P8", value: 58},
    {x: "P9", value: 19},
    {x: "P10", value: 135},
    {x: "P11", value: 170},
    {x: "P12", value: 195},
    {x: "P13", value: 22},
    {x: "P14", value: 175},
    {x: "P15", value: 120}
  ]);

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

function startStream() {


  socket.emit('start');
  // adjust button content
  var streamButton = document.getElementById("streamButton");
  streamButton.innerHTML = "Stop" + "\nstream";

  // set interval of data stream
  var myVar = setInterval(

    // data streaming itself
    function() {

      // append data
      dataSet.append({

        // x value
        x: "P" + indexSetter,

        // random value from 1 to 500
        value : Math.floor((Math.random() * 500)+ 1)
      });

      // removes first point
      dataSet.remove(0);
      indexSetter++;
    }, 200            // interval
  );

  streamButton.onclick = function (){
    // clears interval which stops streaming
    clearInterval(myVar);
    streamButton.onclick = function () {
      startStream();
    };
    streamButton.innerHTML = "Start" + "\nstream";
  };
};