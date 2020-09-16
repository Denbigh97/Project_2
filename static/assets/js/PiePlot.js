// =-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=

// Create a function to read in the JSON using D3
buildPieChart("Alabama", "2013");
function CreateURL(state, year) {  

  // Define the varibles and constant for state and year that will result in the url that will be queried
  var state = document.getElementById('dropDown1').value;
  //console.log(state);
  var year = document.getElementById('dropDown2').value;
  //console.log(year);
  
  const url = 'https://datavisproject2.herokuapp.com/api/v1.0/interactive_pie/'+state+'/'+year;  
  d3.json(url).then((data) => {
    //console.log(data);
  });

  buildPieChart(state, year);
};

// =-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=

// Create a function to populate the pie charts with corresponding values for the selected state and year
function buildPieChart() {

  // Define the varibles and constant for state and year that will result in the url that will be queried to update the pie chart
  var state = document.getElementById('dropDown1').value;
  var year = document.getElementById('dropDown2').value;
  const url = 'https://datavisproject2.herokuapp.com/api/v1.0/interactive_pie/'+state+'/'+year;
  d3.json(url).then((data) => {

    var state = Object.values(data[0])[7]
    data.map(x => x[state]);
    //console.log(state);

    // Define the varibles of the 3 major fire causes
    var countNatural = 0;
    var countHuman = 0
    var countUnknown = 0

    // Define the loop that will calculate the count of fire causes by State and Year
    data.forEach(data => {
      var fireCause = data.cause1
      //console.log(fireCause);
        if (fireCause === "Human") {
          countHuman = countHuman + 1;
        }        
        else if (fireCause === "Natural") {
          countNatural = countNatural + 1;
        }    
        else {
          countUnknown = countUnknown + 1;
        }
    });    
    //console.log(countHuman, countNatural, countUnknown);

    // Define the attributes for values, labels, type, text and markers
    var pieData = [{
      values: [countHuman, countNatural, countUnknown],
      labels: ["Human", "Natural", "Undetermined"],
      type: "pie",
      font: {family: "Calibri", size: 19},
      textposition: "inside",
      textinfo: "label+percent",
      hoverinfo : "label+percent",
      hovermode: "closests",
      marker: {colors: ["#9e4655", "#f57d57", "#f7ecaa"]},
      automargin: true
    }]
    
    // Define the layout of the plot
    let pieLayout = {
      title: `${state}`,
      margin: {"t": 0, "b": 0, "l": 0, "r": 0},
      showlegend: false
      }
    
    var config ={responsive:true}
    

    // Render the plot to the div tag with id "pie"
    Plotly.plot('pie', pieData, pieLayout, config)
  })
}

// =-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=

// Add an event listener for submit button
d3.selectAll("body").on("change", CreateURL);

// =-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=