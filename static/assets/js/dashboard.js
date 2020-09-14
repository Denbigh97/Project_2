Plotly.d3.csv("https://raw.githubusercontent.com/TheGreekGoddess/Project_2/master/Data/Fires_on_federal_land_from_FOIA_CLEANSED.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
  }

  var headerNames = Plotly.d3.keys(rows[0]);

  var headerValues = [];
  var cellValues = [];
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


  var data = [{
    type: 'table',
    columnwidth: [200,100,200,200,200,200,500,200,250,250, 150, 100, 100, 100],
    columnorder: [0,1,2,3,4,5,6,7,8,9,10,11,12,13],
    header: {
      values: headerValues,
      height: 50,
      align: "center",
      line: {width: 1, color: 'rgb(50, 50, 50)'},
      fill: {color: '#ffa534'},
      font: {family: "Arial", size: 12, color: "white"}
    },
    cells: {
      values: cellValues,
      height: 30,
      align: ["center", "center"],
      line: {color: "black", width: 1},
      fill: {color: ['rgba(228, 222, 249, 0.65)','#ffa534', 'rgba(228, 222, 249, 0.65)']},
      font: {family: "Arial", size: 11, color: ["black"]}
    }
  }]

  var layout = {
    hoverlabel: { bgcolor: "salmon" },
    height: document.documentElement.clientHeight

  }


  Plotly.newPlot("myTable", data, layout, {
      // responsive: true,
      displaylogo: false
  });
});