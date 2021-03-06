d3.selectAll("#Years").on("change", UpdateMap);

UpdateMap(2017)
// Mapping function called when a dropdown menu is selected
function UpdateMap(){

        d3.select("#map").remove()
        d3.select("body").append("div").attr("id", "map")

        var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/light-v10", // Using Mapbox style: light-v10
        accessToken: API_KEY
            });
        var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: "mapbox/satellite-v9", // Using Mapbox style: satellite-v9
            accessToken: API_KEY
        });
        var dark = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: "mapbox/dark-v10", // Using Mapbox style: satellite-v9
            accessToken: API_KEY
        });

        // Only one base layer can be shown at a time
        var baseMaps = {
            Light: light, // Legend Light to select light style
            Satellite: satellite, // Legend Satellite to select satellite style
            Dark: dark // Legend Dark to select dark style
        };

        // Create map object and set default layers
        var myMap = L.map("map", {
            center: [37.0902, -98.4842],
            zoom: 5,
            layers: [light] // Default layer is light style
        });
        // Add the layer control to the map
        L.control.layers(baseMaps).addTo(myMap);

        //makeMap()
        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#Years");
        // Assign the value of the dropdown menu option to a variable
        var year = dropdownMenu.property("value");

        const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 
        'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 
        'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 
        'Nevada', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 
        'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Virginia', 'Washington', 
        'West Virginia', 'Wisconsin', 'Wyoming'];

        states.forEach(state => {

            //var link = "static/data/Fires_on_federal_land_from_FOIA_CLEANSED.csv";
            var link = "https://datavisproject2.herokuapp.com/api/v1.0/interactive_pie/" + state + "/" + year;
            console.log(link);
            d3.json(link).then(function(data){
                var markers = L.markerClusterGroup();

                data.forEach(data => {
                            const coord = [data.latitude, data.longitude]
                            const descriptor = "<h3>" + data.st +
                                "</h3> <h4> Fire Cause: " + data.cause1 + 
                                    "</h4><hr><p> Date:" + data.year + "</p>";
                            var myIcon = L.icon({
                                        iconUrl: "static/images/fire.png",
                                        //iconUrl: "https://www.searchpng.com/wp-content/uploads/2019/01/realistic-fire-flame-png-1-1024x1024.png",
                                        iconSize: [80,60],
                                        iconAnchor: [0,0],
                                        opacity: .5,
                                        popupAnchor: [0,-53]
                                    });
                            markers.addLayer(L.marker(coord,{icon:myIcon}).bindPopup(descriptor))
                });
            
                myMap.addLayer(markers);

            });
            
        })
        return myMap;       
}

// // Adding a tile layer (the background map image) to our map
// var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/light-v10", // Using Mapbox style: light-v10
//     accessToken: API_KEY
// });
// var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/satellite-v9", // Using Mapbox style: satellite-v9
//     accessToken: API_KEY
// });
// var dark = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/dark-v10", // Using Mapbox style: satellite-v9
//     accessToken: API_KEY
// });
// // Only one base layer can be shown at a time
// const baseMaps = {
//     Light: light, // Legend Light to select light style
//     Satellite: satellite, // Legend Satellite to select satellite style
//     Dark: dark // Legend Dark to select dark style
// };

// // Create map object and set default layers
// const myMap = L.map("map", {
//     center: [37.0902, -98.4842],
//     zoom: 5,
//     layers: [light] // Default layer is light style
// });
// // Add the layer control to the map
// L.control.layers(baseMaps).addTo(myMap);

// var link = "static/data/Fires_on_federal_land_from_FOIA_CLEANSED.csv";
// (async function() {
//   var data = await d3.csv(link);
//   console.log(data);
//   console.log("Total number of wildfires in the dataset : " + data.length);
//   console.log("The first state in the dataset : " + data[0].State);
//   const markers = L.markerClusterGroup();
//     data.forEach(data => {
//             const coord = [data.Latitude, data.Longitude]
//             const descriptor = "<h3>" + data.State +
//             "</h3> <h4> Fire Cause: " + data.Fire_Cause + 
//             "</h4><hr><p> Date:" + data.Date + "</p>";
//             var myIcon = L.icon({
//                 iconUrl: "static/images/Fire_Logo_transparent.png",
//                 iconSize: [40,50],
//                 iconAnchor: [20,60],
//                 popupAnchor: [0,-53]
//             });
//             markers.addLayer(L.marker(coord,{icon:myIcon}).bindPopup(descriptor))
//     })
//     // Add our marker cluster layer to the map
//     myMap.addLayer(markers);

// })()