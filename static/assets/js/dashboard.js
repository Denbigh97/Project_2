// =-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=

// Create a function to read in the data using D3
Plotly.d3.csv("https://raw.githubusercontent.com/TheGreekGoddess/Project_2/master/Data/Fires_on_federal_land_from_FOIA_CLEANSED.csv", function(err, rows){

  // Define a function to unpack the data
  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
  }

  // Define the varibles that will hold the various arrays for the dashboard data table
  var headerNames = Plotly.d3.keys(rows[0]);
  var headerValues = [];
  var cellValues = [];

  // Define the loop that will iterate and add the various values to the dashboard data table fields
  for (i = 0; i < headerNames.length; i++) {
    headerValue = [headerNames[i]];
    headerValues[i] = headerValue;
    cellValue = unpack(rows, headerNames[i]);
    cellValues[i] = cellValue;
  }

  for (i = 0; i < cellValues[1].length; i++) {
  var dateValue = cellValues[1][i].split(' ')[0]
  cellValues[1][i] = dateValue
  }

  // Define the attributes for the dashboard data table
  var data = [{
    type: 'table',
    columnwidth: [200,100,200,200,200,200,500,200,250,250, 150, 100, 100, 100],
    columnorder: [0,1,2,3,4,5,6,7,8,9,10,11,12,13],
    header: {
      values: headerValues,
      height: 50,
      align: "center",
      line: {width: 1, color: 'rgb(50, 50, 50)'},
      fill: {color: '#f6a964'},
      font: {family: "Arial", size: 12, color: "white"}
    },
    cells: {
      values: cellValues,
      height: 30,
      align: ["center", "center"],
      line: {color: "black", width: 1},
      fill: {color: ['#fff','#f6a964', '#fff']},
      font: {family: "Arial", size: 11, color: ["black"]}
    }
  }]

  // Define the layout of the dashboard data table
  var layout = {
    hoverlabel: { bgcolor: "salmon" },
    height: document.documentElement.clientHeight
  }

  // Render the plot to the div tag with id "myTable"
  Plotly.newPlot("myTable", data, layout, {
      // responsive: true,
      displaylogo: false
  });
});

// =-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=