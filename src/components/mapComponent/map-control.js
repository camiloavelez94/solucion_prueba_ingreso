import 'leaflet/dist/leaflet.css';
import './map.scss';

const L =require ('leaflet');

import {carto_light,standard_osm} from './layers/control-layers'


export var map = L.map('map', {
    center: [10.495120545004545, -75.12497202279317],
    zoom: 16,
    layers: [carto_light,standard_osm]
});

// scale control
new L.control.scale({imperial: false}).addTo(map)

import {minimap} from './controls/minimap'

minimap.addTo(map)

import 'leaflet-wfst';

import {AwesomeMarkersIcon} from './controls/icons/famIcon'

var Marcador = L.marker([10.495120545004545, -75.12497202279317],
		{icon: AwesomeMarkersIcon('fa', 'flag','green')}).bindPopup('Holita.')

var Perimetro = new L.WFS({
   url: 'http://34.73.64.218:8080/geoserver/repelon/ows?',
   typeName: "rp_u_perimetro",
   crs: L.CRS.EPSG4326,
   style: {
     weight: 2,
	opacity: 1,
    color: 'red',
    dashArray: '3',
    fillOpacity: 0.3,
    fill: false
    }
}, new L.Format.GeoJSON({crs: L.CRS.EPSG4326}))
;



var popup = new L.Popup();   

var Predios = new L.WFS({
   url: 'http://34.73.64.218:8080/geoserver/repelon/ows?',
   typeName: 'rp_gc_predios_catastro',
   crs: L.CRS.EPSG4326,
   style: {
     weight: 2,
	opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.3,
    fillColor: '#cfc6c6'
    }
}, new L.Format.GeoJSON({crs: L.CRS.EPSG4326}));


Predios.on('click', function(e){
    if (e.layer.feature.properties && e.layer.feature.properties.codigo) { 
       popup
            .setLatLng(e.latlng)
           .setContent("Has hecho click en el predio"+ '</br>'+ "con codigo:"+
		   e.layer.feature.properties.codigo + '</br>' + "y area:"+ e.layer.feature.properties.area)
           .openOn(map);
     }
})


var baseMaps = {
    "carto": carto_light,
    "satandar": standard_osm
};

var overlayMaps = {
    "Marcador": Marcador,
	'Predios':Predios,
	'Perimetro':Perimetro
};


var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);



