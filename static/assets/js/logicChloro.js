// =-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=

// Define a map object and set the default mode, latitude and longitude
var myMap = L.map("map", {
    center: [37.0522, -105.2437],
    zoom: 3
});

// =-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=

// Define the default basemap available on Mapbox.com with a placeholder for the API Key needed to access these
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// =-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=

// Define the variable that will contain the list of dictionaries that contain the State as the key and the fire counts as the corresponding values
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


// =-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=

// Define the loop that will iterate throught the above variable
for (i = 0; i < fire_count.length; i++) {
    var fire_value = parseInt(Object.values(fire_count[i]))
    //console.log(fire_value)

    statesData.features[i].properties.fire = fire_value;
    //console.log(statesData.features[i].properties)
};

// =-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=

// Define the functions that will determine the default and corresponding fill colors based on the overall fire counts by State
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

// =-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=

// Define the GeoJSON variable before our listeners layers
var geojson;

// Define the event listener for layer mouseover event
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

// Define a click listener that zooms to the State
function zoomToFeature(e) {
    myMap.fitBounds(e.target.getBounds());
};

// Define the function on mouseout
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
};

// Define a function that runs once per feature and displays a pop-up containing the location and count of fires on mouseover
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
};

// Define a GeoJSON layer containing the State data
geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(myMap);

// Define the variable for custom control
var info = L.control();

// Define a function that uses the DOM tree to create a div with the class as "info"
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

// =-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=

// Define a function that will update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Number of Fires</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.fire + ' fires'
        : 'Hover over a state');
};

info.addTo(myMap);

// =-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=

// Define and add the legend to the map
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 5, 25, 100, 300, 700, 1500, 2200],
        labels = [];
        
    // Define the loop that iterates through our fire intervals and generates a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

// Add the legend to the displayed map
legend.addTo(myMap);

// =-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=-+-=