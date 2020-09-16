var myMap = L.map("map", {
    center: [37.0522, -105.2437],
    zoom: 3
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var fire_count = 
[{'Alabama': 33},
 {'Alaska': 511},
 {'Arizona': 2755},
 {'Arkansas': 100},
 {'California': 2387},
 {'Colorado': 1642},
 {'Connecticut': 3},
 {'Delaware': 1},
 {'District of Columbia': 14},
 {'Florida': 428},
 {'Georgia': 71},
 {'Hawaii': 12},
 {'Idaho': 1089},
 {'Illinois': 21},
 {'Indiana': 57},
 {'Iowa': 76},
 {'Kansas': 118},
 {'Kentucky': 10},
 {'Louisiana': 65},
 {'Maine': 27},
 {'Maryland': 44},
 {'Massachusetts': 11},
 {'Michigan': 28},
 {'Minnesota': 2129},
 {'Mississippi': 182},
 {'Missouri': 19},
 {'Montana': 2240},
 {'Nebraska': 85},
 {'Nevada': 1461},
 {'New Hampshire': 0},
 {'New Jersey': 10},
 {'New Mexico': 1494},
 {'New York': 122},
 {'North Carolina': 197},
 {'North Dakota': 2119},
 {'Ohio': 3},
 {'Oklahoma': 1407},
 {'Oregon': 2231},
 {'Pennsylvania': 17},
 {'Rhode Island': 1},
 {'South Carolina': 28},
 {'South Dakota': 2101},
 {'Tennessee': 68},
 {'Texas': 261},
 {'Utah': 1441},
 {'Vermont' : 0},
 {'Virginia': 65},
 {'Washington': 1452},
 {'West Virginia': 19},
 {'Wisconsin': 95},
 {'Wyoming': 705},
 {'Puerto Rico': 147}]
 
for (i = 0; i < fire_count.length; i++) {
    var fire_value = parseInt(Object.values(fire_count[i]))
    //console.log(fire_value)
    statesData.features[i].properties.fire = fire_value;
    //console.log(statesData.features[i].properties)
};

function getColor(d) {
    return d > 2200 ? '#800026' :
           d > 1500  ? '#BD0026' :
           d > 700  ? '#E31A1C' :
           d > 300  ? '#FC4E2A' :
           d > 100   ? '#FD8D3C' :
           d > 25   ? '#FEB24C' :
           d > 5   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.fire),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

var geojson;

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#800026',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
};

function zoomToFeature(e) {
    myMap.fitBounds(e.target.getBounds());
};

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
};

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
};

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(myMap);

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Number of Fires</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.fire + ' fires'
        : 'Hover over a state');
};

info.addTo(myMap);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 5, 25, 100, 300, 700, 1500, 2200],
        labels = [];
        
    // loop through our fire intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        //div.innerHTML = '<h1>hello</h1>'
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);

// var stateList = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
// var yearList = [2013, 2014, 2015, 2016, 2017]

// var count_dict = {}

// stateList.forEach(function(state){
//     yearList.forEach(function(year){
//     //url = `https://wildfire-api-3.herokuapp.com/api/v1.0/interactive_pie/${state}/${year}`
//     url = `https://datavisproject2.herokuapp.com/api/v1.0/interactive_pie/${state}/${year}`
//     stateName = state
//     //console.log(url)
//     getData(url);
//     //console.log(url)
//     });
// });
// //url = `https://wildfire-api-3.herokuapp.com/api/v1.0/interactive_pie/${state}/${year}`
// async function getData(sample){
//     const data = await d3.json(sample).then(data=>console.log(data))
// }



//console.log(statesData.features[0].properties)

//  data.fire = 10
//  console.log(
//  data
//  )

//  statesData.forEach(function(data, index){
//     console.log(data.feature[index].properties)
//  });
 

 //console.log(fire_count)
// const storage = [
//     { data: '1', status: '0' },
//     { data: '2', status: '0' },
//     { data: '3', status: '0' },
//     { data: '4', status: '0' },
//     { data: '5', status: '0' },
//     { data: '6', status: '0' },
//     { data: '7', status: '1' },
//   ];
  
//   let counter = 0;
//   for (const obj of storage) {
//     if (obj.status === '0') counter++;
//   }
  
//   console.log(counter); // 6



//var geoData = "us-states.json"

// var geojson;

// d3.json(geoData, function(data){

//     geojson = L.choropleth( data, {
//         valueProperty: "density",
//         scale: ["#FFFFb2", "#b10026"],
//         steps: 10,
//         mode: "q",
//         style: 
//         {
//             color: "#fff",
//             weight: 1,
//             fillOpacity: 0.8
//         }

//     }).addTo(myMap);
// });