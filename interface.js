

//AnyChart
anychart.onDocumentLoad(function () {
    // set chart type
    var chart = anychart.line();


    // set the data
    dataSet = anychart.data.set([
        {x: 0, value: 0}
    ]);
    // set chart title
    chart.title("Top 5 pancake fillings");
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
        socket.emit('start')
        // // clears interval which stops streaming
        // clearInterval(myVar);
        // streamButton.onclick = function () {
        //     startStream();
        // };
        // streamButton.innerHTML = "Start" + "\nstream";
    };
};