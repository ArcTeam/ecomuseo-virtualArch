const osmTile = 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png';
const osmAttrib='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const gStreetTile = 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
const gSatTile = 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}';
const gHybridTile = 'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}';
const gTerrainTile = 'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}';
const gSubDomains = ['mt0','mt1','mt2','mt3']
const extent = [[46.1,11.0],[46.2,11.2]]



$(document).ready(function() {
  console.log(pannelli[0]['poi'][1][lang]['nome']);
  console.log(pannelli);
  $("body").on('click','.link-poi', function(e){
    e.preventDefault();
    let poi = $(this).data('poi');
    localStorage.setItem("poi", poi);
    window.location.href='poi.html';
  })
});

var map = L.map('map').fitBounds(extent);
let osm = L.tileLayer(osmTile, {attribution: osmAttrib});
let gStreets = L.tileLayer(gStreetTile,{maxZoom: 20, subdomains:gSubDomains });
let gSat = L.tileLayer(gSatTile,{maxZoom: 20, subdomains:gSubDomains});
let gTerrain = L.tileLayer(gTerrainTile,{maxZoom: 20, subdomains:gSubDomains});
gStreets.addTo(map)

let markerPoi = L.icon({
  iconUrl: 'img/icons/marker_02.png',
  iconSize: [30, 30],
  iconAnchor: [14, 30],
  popupAnchor: [0, -28]
});
let markerPanel = L.icon({
  iconUrl: 'img/icons/marker_01.png',
  iconSize: [40, 40],
  iconAnchor: [20, 35],
  popupAnchor: [0, -28]
});

let percorso = L.geoJson(pathJson, { style: sentieroStyle }).addTo(map);

var poi = L.geoJSON(poiJson, {
  pointToLayer: function (feature, latlng) { return L.marker(latlng, {icon: markerPoi}); },
  onEachFeature: onEachPoi
}).addTo(map);

var panel = L.geoJSON(pannelliJson, {
  pointToLayer: function (feature, latlng) { return L.marker(latlng, {icon: markerPanel}); },
  onEachFeature: onEachPanel
}).addTo(map);


map.flyToBounds(poi.getBounds())
var baseLayers = {
  "Terrain":gTerrain,
  "Satellite": gSat,
  "OpenStreetMap": osm,
  "Google Street": gStreets
};
L.control.layers(baseLayers, null, {position: 'bottomright'}).addTo(map);
let resetMap = L.Control.extend({
  options: { position: 'topleft'},
  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'extentControl leaflet-bar leaflet-control leaflet-touch');
    btn=$("<a/>",{href:'#'}).appendTo(container);
    $("<i/>",{class:'mdi mdi-crosshairs-gps'}).appendTo(btn)
    btn.on('click', function (e) {
      e.preventDefault()
      map.flyToBounds(poi.getBounds());
    });
    return container;
  }
})
map.addControl(new resetMap());

map.on('locationfound', onLocationFound);
map.locate({setView: true, watch: true, maxZoom: 8});

function onLocationFound(e) {
  var radius = e.accuracy / 2;
  L.marker(e.latlng).addTo(map).bindPopup("You are here").openPopup();
  L.circle(e.latlng, radius).addTo(map);
}

function onEachPoi(feature, layer) {
  let pannello = parseInt(feature.properties.pannello) - 1;
  let poi = feature.properties.poi;
  let title = '<h5>'+pannelli[pannello]['poi'][poi][lang]['nome']+'</h5>';
  let body = '<p>'+cutString(pannelli[pannello]['poi'][poi][lang]['testo'],30) + '...</p>';
  let link = '<a href="#" class="link-poi" data-poi="['+pannello+','+poi+']">#view poi</a>';
  var popupContent = title+body+link;
  layer.bindPopup(popupContent);
}

function onEachPanel(feature,layer){
  let panel = feature.properties.nome;
  layer.bindTooltip(panel,{direction:'top',permanent:true,offset: L.point({x: 0, y: -25})}).openTooltip();
}

function sentieroStyle() {
  return { opacity: 1, color: 'red', stroke: true, dashArray: '10, 10', weight: 3.0, fillOpacity: 0}
}
