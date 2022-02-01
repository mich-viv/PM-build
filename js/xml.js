var xmlhttp;

	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
		
		xmlhttp=new XMLHttpRequest();
		
	}else{// code for IE6, IE5
	
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		
	}//if-else

	//nome percorso e path del file .gpx
	var track = "";
	var path  = "";
	
	//inizializzo canvas e grafico
	var ctx = document.getElementById('myChart').getContext('2d');
	var chart = new Chart(ctx,null);
	
	document.getElementById("track").onchange = function(){
		
		if(track_name.value == "560"){
			
			track = "sentiero cai 560";
			path = "./sentiero-c-a-i-560.gpx";
			//alert(path);
			
		}else if(track_name.value == "567"){
			
			track = "sentiero cai 567";
			path = "./sentiero-cai-567.gpx";

		}else if(track_name.value == "215"){
			
			track = "sentiero cai 215";
			path = "./sentiero-c-a-i-215.gpx";

		}else if(track_name.value == "762"){
			
			track = "sentiero cai 762";
			path = "./sentiero_762.gpx";

		}else if(track_name.value == "483"){
			
			track = "sentiero cai 483";
			path = "./sentiero_483.gpx";

		}else if(track_name.value == "764-765"){
			
			track = "sentiero cai 764-765";
			path = "./sentiero-cai-764-765.gpx";

		}else if(track_name.value == "cd"){
			
			track = "sentiero coldosè";
			path = "./sentiero-di-moregna-e-di-coldose.gpx";

		}else if(track_name.value == "pn"){
			
			track = "sentiero paolo e nicola";
			path = "./sentiero-di-valmaggiore-e-di-coltorondo.gpx";

		}//if-else
			
		xmlhttp.open("GET",path,false);
		xmlhttp.setRequestHeader('Content-Type',  'text/xml');
		xmlhttp.send();
			
		var xmlDoc=xmlhttp.responseXML; 
		var x=xmlDoc.getElementsByTagName("trkpt");
		//array contenenti elevazione latitudine longitudine
		var elev = [];
		var lat = [];
		var lon = [];
		
		for (i=0;i<x.length;i++){ 
            
			lat.push(x[i].getAttribute('lat'));
			lon.push(x[i].getAttribute('lon'));
			elev.push(x[i].getElementsByTagName('ele')[0].childNodes[0].nodeValue);
			
		}//for
		
		var dist=[];//array contenente all'indice i la distanze dal punto xi al punto xi+1
		var dist_parziali=[];//array contenente la ripartizione delle somme di tutte le distanze antecedenti a xi, serve per la scala X del grafico 
		var tot=0; //distanza complessiva
		var min=elev[0]; //elevazione minima
		var max=elev[0]; //elevazione massima
		
		//distanza tra due generici punti date le coordinate P1:(lat,lon) e P2:(lat,lon)
	    function haversine(la1,lo1,la2,lo2) {
		   
		   var lat1 = la1/180.0 * Math.PI;
		   var lon1 = lo1/180.0 * Math.PI;
		   var lat2 = la2/180.0 * Math.PI;
		   var lon2 = lo2/180.0 * Math.PI;
		   var R = 6372.8; // km
		   var dLat = lat2 - lat1;
		   var dLon = lon2 - lon1;
		   var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(lat1) * Math.cos(lat2);
		   var c = 2 * Math.asin(Math.sqrt(a));
		   
		   return R * c * 1000;
		   
		}//haversine

		//inserisce nell'array le distanze tra il punto xi e il punto xi+1 e trova il massimo e il minimo tra le elevazioni
		for(i=1;i<elev.length;i++){
			dist.push(haversine(lat[i-1],lon[i-1],lat[i],lon[i]));
			
			if(max < elev[i]){
				max = elev[i];
			}//if
			
			if(min > elev[i]){
				min = elev[i];
			}//if-else
				
		}//for
		
		//inizializzo dist_parziali
		dist_parziali[0] = 0;
		for(i=1;i<elev.length;i++){
			
			var s = 0;
			
			for(j=0;j<i;j++){
				
				s+=dist[j];
				
			}//for-j
			
			dist_parziali[i]=Number((s/1000).toFixed(2));
			
		}//for-i
	
		//distanza totale
		for(i=0; i<dist.length; i++){ 
		
			tot+=dist[i];	
			
		}//for-i
		
		document.getElementById('result').innerHTML = "distanza percorsa: " + Number((tot/1000).toFixed(2)) + " KM; altitudine massima: " + max + "M; altitudine minima: " + min;
		
		if(chart !== null){

			chart.destroy();
			
		}//if
		
		
		 chart = new Chart(ctx, {
			// The type of chart we want to create
			type: 'bar',

			// The data for our dataset
			data: {
				labels: dist_parziali,
				datasets: [{
					label: "profilo altimetrico " + track,
					backgroundColor: 'rgb(153, 240, 161)',
					data: elev
				}]
			},

			// Configuration options go here
			
			options: {
				tooltips: {
					displayColors: false,
					callbacks: {
						label: function(tooltipItem) {
							return 'Altitudine: ' + tooltipItem.yLabel;
						},
						title: function(tooltipItem) {
							return;
						}
					}

				}
			}
			
		});
	
	}//function
	
	
