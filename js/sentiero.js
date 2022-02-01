var _OSM = _interopRequireDefault(require("./source/OSM.js"));
var _Raster = _interopRequireDefault(require("./source/Raster.js"));
var _Source = _interopRequireDefault(require("./source/Source.js"));
var _Tile = _interopRequireDefault(require("./source/Tile.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./source/BingMaps.js":"node_modules/ol/source/BingMaps.js","./source/CartoDB.js":"node_modules/ol/source/CartoDB.js","./source/Cluster.js":"node_modules/ol/source/Cluster.js","./source/IIIF.js":"node_modules/ol/source/IIIF.js","./source/Image.js":"node_modules/ol/source/Image.js","./source/ImageArcGISRest.js":"node_modules/ol/source/ImageArcGISRest.js","./source/ImageCanvas.js":"node_modules/ol/source/ImageCanvas.js","./source/ImageMapGuide.js":"node_modules/ol/source/ImageMapGuide.js","./source/ImageStatic.js":"node_modules/ol/source/ImageStatic.js","./source/ImageWMS.js":"node_modules/ol/source/ImageWMS.js","./source/OSM.js":"node_modules/ol/source/OSM.js","./source/Raster.js":"node_modules/ol/source/Raster.js","./source/Source.js":"node_modules/ol/source/Source.js","./source/Stamen.js":"node_modules/ol/source/Stamen.js","./source/Tile.js":"node_modules/ol/source/Tile.js","./source/TileArcGISRest.js":"node_modules/ol/source/TileArcGISRest.js","./source/TileDebug.js":"node_modules/ol/source/TileDebug.js","./source/TileImage.js":"node_modules/ol/source/TileImage.js","./source/TileJSON.js":"node_modules/ol/source/TileJSON.js","./source/TileWMS.js":"node_modules/ol/source/TileWMS.js","./source/UrlTile.js":"node_modules/ol/source/UrlTile.js","./source/UTFGrid.js":"node_modules/ol/source/UTFGrid.js","./source/Vector.js":"node_modules/ol/source/Vector.js","./source/VectorTile.js":"node_modules/ol/source/VectorTile.js","./source/WMTS.js":"node_modules/ol/source/WMTS.js","./source/XYZ.js":"node_modules/ol/source/XYZ.js","./source/Zoomify.js":"node_modules/ol/source/Zoomify.js"}],"sentiero.js":[function(require,module,exports) {
"use strict";

require("ol/ol.css");

var _Map = _interopRequireDefault(require("ol/Map"));
var _View = _interopRequireDefault(require("ol/View"));
var _format = require("ol/format");
var _interaction = require("ol/interaction");
var _layer = require("ol/layer");
var _proj = require("ol/proj");
var _source = require("ol/source");
var _style2 = require("ol/style");

//coordinate inizio sentieri

var cai560 = (0, _proj.fromLonLat)([12.0689022, 46.3992571]);
var cai567 = (0, _proj.fromLonLat)([11.9810255, 46.3612238]);
var cai483 = (0, _proj.fromLonLat)([12.3167969, 46.3337943]);
var cai215 = (0, _proj.fromLonLat)([12.2044485, 46.5562143]);
var cai762 = (0, _proj.fromLonLat)([11.9180211, 46.3041354]);
var caicol = (0, _proj.fromLonLat)([11.63223, 46.2366298]);
var caipani = (0, _proj.fromLonLat)([11.6235375, 46.2160783]);
var caibed = (0, _proj.fromLonLat)([11.966388, 46.336861]);
var view_reset = new _View.default({
  center: (0, _proj.transform)([12.00, 46.37], 'EPSG:4326', 'EPSG:3857'),
  zoom: 10
}); //inizializzo lettura file .gpx

var xmlhttp;

if (window.XMLHttpRequest) {
  // code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp = new XMLHttpRequest();
} else {
  // code for IE6, IE5
  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
} //if-else
//inizializzo canvas e grafico


var ctx = document.getElementById('altitude').getContext('2d');
var chart = new Chart(ctx, null); //stili della linea del percorso ed eventuali punti

var _style = {
  'Point': new _style2.Style({
    image: new _style2.Circle({
      fill: new _style2.Fill({
        color: 'rgba(255,0,0,0.8)'
      }),
      radius: 5,
      stroke: new _style2.Stroke({
        color: '#000',
        width: 1
      })
    })
  }),
  'LineString': new _style2.Style({
    stroke: new _style2.Stroke({
      color: '#f00',
      width: 2
    })
  }),
  'MultiLineString': new _style2.Style({
    stroke: new _style2.Stroke({
      color: '#609ff7',
      width: 2
    })
  })
}; //highlight sentiero onmouseover

var highlightStyle = new _style2.Style({
  fill: new _style2.Fill({
    color: 'rgba(255,255,255,0.7)'
  }),
  stroke: new _style2.Stroke({
    color: '#3399CC',
    width: 3
  })
}); //sentiero 567

var vector1 = new _layer.Vector({
  source: new _source.Vector({
    url: './sentiero_567.gpx',
    format: new _format.GPX()
  }),
  style: function style(feature) {
    return _style[feature.getGeometry().getType()];
  }
}); //sentiero 560

var vector2 = new _layer.Vector({
  source: new _source.Vector({
    url: './sentiero_560.gpx',
    format: new _format.GPX()
  }),
  style: function style(feature) {
    return _style[feature.getGeometry().getType()];
  }
}); //sentiero 483

var vector3 = new _layer.Vector({
  source: new _source.Vector({
    url: './sentiero_483.gpx',
    format: new _format.GPX()
  }),
  style: function style(feature) {
    return _style[feature.getGeometry().getType()];
  }
}); //sentiero 762

var vector4 = new _layer.Vector({
  source: new _source.Vector({
    url: './sentiero_762.gpx',
    format: new _format.GPX()
  }),
  style: function style(feature) {
    return _style[feature.getGeometry().getType()];
  }
}); //sentiero 215

var vector5 = new _layer.Vector({
  source: new _source.Vector({
    url: './sentiero_215.gpx',
    format: new _format.GPX()
  }),
  style: function style(feature) {
    return _style[feature.getGeometry().getType()];
  }
}); //sentiero coldosè

var vector6 = new _layer.Vector({
  source: new _source.Vector({
    url: './sentiero_333.gpx',
    format: new _format.GPX()
  }),
  style: function style(feature) {
    return _style[feature.getGeometry().getType()];
  }
}); //sentiero paolo e nicola

var vector7 = new _layer.Vector({
  source: new _source.Vector({
    url: './sentiero_334.gpx',
    format: new _format.GPX()
  }),
  style: function style(feature) {
    return _style[feature.getGeometry().getType()];
  }
}); //sentiero bedin

var vector8 = new _layer.Vector({
  source: new _source.Vector({
    url: './sentiero_764.gpx',
    format: new _format.GPX()
  }),
  style: function style(feature) {
    return _style[feature.getGeometry().getType()];
  }
}); //oggetto-mappa

var raster = new _layer.Tile({
  source: new _source.OSM()
}); //inizializza la visualizzazione della mappa

var view = new _View.default({
  center: (0, _proj.transform)([12.00, 46.37], 'EPSG:4326', 'EPSG:3857'),
  zoom: 10
}); //inizializza mappa

var map = new _Map.default({
  layers: [raster, vector1, vector2, vector3, vector4, vector5, vector6, vector7, vector8],
  target: document.getElementById('map'),
  view: view
}); //sentiero selezionato

var track_HTML = document.getElementById('track'); //nome percorso e path del file .gpx

var track = "";
var path = ""; //zoom sul sentiero selezionato

track_HTML.onchange = function () {
  if (track_HTML.value == 560) {
    view.animate({
      center: cai560,
      zoom: 15,
      duration: 2000
    });
    track = "sentiero cai 560";
    path = "./sentiero_560.gpx"; //alert("ciao");
  } else if (track_HTML.value == 567) {
    view.animate({
      center: cai567,
      zoom: 15,
      duration: 2000
    });
    track = "sentiero cai 567";
    path = "./sentiero_567.gpx";
  } else if (track_HTML.value == 483) {
    view.animate({
      center: cai483,
      zoom: 15,
      duration: 2000
    });
    track = "sentiero cai 483";
    path = "./sentiero_483.gpx";
  } else if (track_HTML.value == 762) {
    view.animate({
      center: cai762,
      zoom: 15,
      duration: 2000
    });
    track = "sentiero cai 762";
    path = "./sentiero_762.gpx";
  } else if (track_HTML.value == 215) {
    view.animate({
      center: cai215,
      zoom: 15,
      duration: 2000
    }); 
    track = "sentiero cai 215";
    path = "./sentiero_215.gpx";
  } else if (track_HTML.value == 333) {
    view.animate({
      center: caicol,
      zoom: 15,
      duration: 2000
    });
    track = "sentiero coldosè";
    path = "./sentiero_333.gpx";
  } else if (track_HTML.value == 334) {
    view.animate({
      center: caipani,
      zoom: 15,
      duration: 2000
    });
    track = "sentiero paolo e nicola";
    path = "./sentiero_334.gpx";
  } else if (track_HTML.value == 764) {
    view.animate({
      center: caibed,
      zoom: 15,
      duration: 2000
    });
    track = "sentiero cai 764-765";
    path = "./sentiero_764.gpx";
  } else if (track_HTML.value == "res") {
    view.animate({
      center: (0, _proj.transform)([12.00, 46.37], 'EPSG:4326', 'EPSG:3857'),
      zoom: 10,
      duration: 2000
    });
    track = "";
    path = "";
  } //if-else


  document.getElementById('info_p').innerHTML = track;
  xmlhttp.open("GET", path, false);
  xmlhttp.setRequestHeader('Content-Type', 'text/xml');
  xmlhttp.send(); //console.log();

  var xmlDoc = xmlhttp.responseXML;
  var x = xmlDoc.getElementsByTagName("trkpt"); //array contenenti elevazione latitudine longitudine

  var elev = [];
  var lat = [];
  var lon = [];

  for (var i = 0; i < x.length; i++) {
    lat.push(x[i].getAttribute('lat'));
    lon.push(x[i].getAttribute('lon'));
    elev.push(x[i].getElementsByTagName('ele')[0].childNodes[0].nodeValue);
  } //for


  var dist = []; //array contenente all'indice i la distanze dal punto xi al punto xi+1

  var dist_parziali = []; //array contenente la ripartizione delle somme di tutte le distanze antecedenti a xi, serve per la scala X del grafico 

  var tot = 0; //distanza complessiva

  var min = Math.max.apply(Math, elev); //elevazione minima

  var max = Math.min.apply(Math, elev); //elevazione massima
  //distanza tra due generici punti date le coordinate P1:(lat,lon) e P2:(lat,lon)

  function haversine(la1, lo1, la2, lo2) {
    var lat1 = la1 / 180.0 * Math.PI;
    var lon1 = lo1 / 180.0 * Math.PI;
    var lat2 = la2 / 180.0 * Math.PI;
    var lon2 = lo2 / 180.0 * Math.PI;
    var R = 6372.8; // km

    var dLat = lat2 - lat1;
    var dLon = lon2 - lon1;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.asin(Math.sqrt(a));
    return R * c * 1000;
  } //haversine
  //inserisco le distanze nell'array corrispondente e inizializzo dist_parziali


  dist_parziali[0] = 0;

  for (var i = 1; i < elev.length; i++) {
    dist.push(haversine(lat[i - 1], lon[i - 1], lat[i], lon[i]));
    var s = 0;

    for (var j = 0; j < i; j++) {
      s += dist[j];
    } //for-j


    dist_parziali[i] = Number((s / 1000).toFixed(2));
  } //for-i
  //distanza totale


  for (var i = 0; i < dist.length; i++) {
    tot += dist[i];
  } //for-i


  document.getElementById('result').innerHTML = "<b>distanza percorsa:</b> " + Number((tot / 1000).toFixed(2)) + "km;</br> <b>altitudine massima:</b> " + max + "m;</br> <b>altitudine minima:</b> " + min + "m";

  if (chart !== null) {
    chart.destroy();
  } //if


  chart = new Chart(ctx, {
    
    type: 'bar',
    
    data: {
      labels: dist_parziali,
      datasets: [{
        label: "profilo altimetrico " + track,
        backgroundColor: 'rgb(153, 240, 161)',
        data: elev
      }]
    },
    
    options: {
      tooltips: {
        displayColors: false,
        callbacks: {
          label: function label(tooltipItem) {
            return 'Altitudine: ' + tooltipItem.yLabel;
          },
          title: function title(tooltipItem) {
            return;
          }
        } //bodyFontSize: 23

      }
    }
  });
}; //resetta la videata premendo il pulsante


var resetView = document.getElementById('reset');
resetView.addEventListener('click', function () {
  view.animate({
    center: (0, _proj.transform)([12.00, 46.37], 'EPSG:4326', 'EPSG:3857'),
    zoom: 10,
    duration: 2000
  });
  
  document.getElementById('info_p').innerHTML ="";
  document.getElementById('result').innerHTML = "";
  
  if (chart !== null) {
    chart.destroy();
  } //if
  
}); //array contenente le altitudini

var ele = []; //visualizza percorso

var displayFeatureInfo = function displayFeatureInfo(pixel) {
  var features = [];
  map.forEachFeatureAtPixel(pixel, function (feature) {
    features.push(feature);
  });

  if (features.length > 0) {
    var info = [];
    var i, ii;

    for (i = 0, ii = features.length; i < ii; ++i) {
      info.push(features[i].get('name'));
      var coo = features[i].getGeometry().getCoordinates();
    } //document.getElementById('info_p').innerHTML =  info.join(' ') || '&nbsp';


    map.getTargetElement().style.cursor = 'pointer';
  } else {
    //document.getElementById('info_p').innerHTML =  '&nbsp';
    map.getTargetElement().style.cursor = '';
  }
}; //info eventuali punti del percorso


map.on('pointermove', function (evt) {
  if (evt.dragging) {
    return;
  }

  var pixel = map.getEventPixel(evt.originalEvent);
  displayFeatureInfo(pixel);
});
map.on('click', function (evt) {
  displayFeatureInfo(evt.pixel);
}); //sentiero selezionato, inizialmente nullo

var selected = null; //illumina il sentiero

map.on('pointermove', function (e) {
  if (selected !== null) {
    selected.setStyle(undefined);
    selected = null;
  }

  map.forEachFeatureAtPixel(e.pixel, function (f) {
    selected = f;
    f.setStyle(highlightStyle);
    return true;
  });
}); 
