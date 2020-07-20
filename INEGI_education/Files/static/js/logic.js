// Creating map object
var myMap = L.map("map", {
  center: [19.4326, -99.13],
  zoom: 8
});
// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);
// Load in GeoJson data
var geoData = "static/data/municipios_educacion.geojson";
var geojson;
d3.json(geoData, data => {
  console.log(data.features)
  console.log(data.features[345])
  L.choropleth(data, {
    valueProperty: 'graproes', // which property in the features to use
    scale: ['white', 'red'], // chroma.js scale - include as many as you like
    steps: 10, // number of breaks or steps in range
    mode: 'q', // q for quantile, e for equidistant, k for k-means
    style: {
      color: '#fff', // border color
      weight: 2,
      fillOpacity: 0.8
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup(`<h3>Municipio: ${feature.properties.NOM_MUN}</h3> Años de escolaridad: ${feature.properties.graproes}`)
    }
  }).addTo(myMap)
})

