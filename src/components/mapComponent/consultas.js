import 'jquery';

var owsrootUrl = 'http://34.73.64.218:8080/geoserver/repelon/ows?';

var defaultParameters = {
	service: 'WFS',
	version: '1.0.0',
		request: 'GetFeature',
	typeName: "repelon:rp_gc_predios_catastro",
	outputFormat: 'application/json',

};
var parameters = L.Util.extend(defaultParameters);

var URL = owsrootUrl + L.Util.getParamString(parameters);
	
$.ajax({
	url: URL,
	success: function (data) {
		var geojson = new L.geoJson(data, {
			style: {"color":"#2ECCFA","weight":2},
			onEachFeature: function(feature, layer){
				layer.bindPopup("Has hecho click en " + feature.properties.codigo);
			}}
		).addTo(map);
	}
});
