<?php  
session_start();
 $message = '';  
 $error = ''; 

if (!isset($_SESSION['count'])) {
	  $_SESSION['count'] = 0;
	} else {
	  $_SESSION['count']++;
}

if(isset($_POST["submit"])){ 
 
		  if(file_exists('data.json')){  
				

				$zaino = "";
				$cat = array();
				$subcat_value = array();
				$subcat_desc = array();
				$subcat_quant = array();

				foreach($_POST as $key => $value){
					
					if (strpos($key,"newnumber")!==false){
						
						$cat[$key] = $value;
					
					}else if (strpos($key,"newsubnumber")!==false){
						
						$subcat_value[$key] = $value;
						
					}else if (strpos($key,"description")!==false){
						
						$subcat_desc[$key] = $value;
						
					}else if (strpos($key,"quantity")!==false){
						
						$subcat_quant[$key] = $value;
						
					}else if (strpos($key,"zaino")!==false){
						
						$zaino = $value;
						
					}//if-else
				}//foreach
				
				$result = array();
				$key_val = array_keys($subcat_value);
				$key_desc = array_keys($subcat_desc);
				$key_quant = array_keys($subcat_quant);
				$id_val = array();
				$id_desc = array();
				$id_quant = array();
				
				
				for($j=0; $j<count($subcat_value); $j++){
					
					$id_val[] = explode("_",str_replace("newsubnumbers","",$key_val[$j]))[0];
					$id_desc[] = explode("_",str_replace("description","",$key_desc[$j]))[0];
					$id_quant[] = explode("_",str_replace("quantity","",$key_quant[$j]))[0];
					
				}//for-j
				
				$i1 = array_values(array_unique($id_val));
				$i2 = array_values(array_unique($id_desc));  
				$i3 = array_values(array_unique($id_quant));

				$solution = array();
				$tot = array();//totale del peso per ogni categoria
				$s = 0;
				
				for($i=0; $i<count($cat); $i++){
					$sub = array();
					
					for($j=0; $j<count($subcat_desc); $j++){

							if(($subcat_value["newsubnumbers".$i."_".$j]!="")&&($subcat_desc["description".$i."_".$j]!="")&&($subcat_quant["quantity".$i."_".$j]!="")){
								
								$solution[$i][$j] = array( "Oggetto" =>$subcat_value["newsubnumbers".$i."_".$j],"Descrizione" => $subcat_desc["description".$i."_".$j],"Quantita" => $subcat_quant["quantity".$i."_".$j]);
								$s += $subcat_quant["quantity".$i."_".$j];
								
							}//if
							
					}//for-j
					$tot[] = array($cat["newnumber".$i] => $s);
					
					$s = 0;
				}//for-i
				
				//echo "tot".$tot[0][nome dato alla categoria]; per accedere al totale della prima categoria
				//echo $solution[0][0]["Descrizione"]; per accedere alla descrizione del primo cibo inserito
				//echo $solution[1][0]["Descrizione"]; per accedere alla descrizione del secondo oggetto inserito
				//aggiungere 1 array alla gine dello Zaino i-esimo contenente alla posizione i-elima il tot della quantità della categoria i-esima
				$current_data = file_get_contents('data.json');  
                $array_data = json_decode($current_data, true); 
				

				
				$extra = array(
						 "Zaino" => $zaino,
						 "Totale" => $tot
				);
				
				for($i=0; $i<count($cat); $i++){
					
					$extra[$cat["newnumber".$i]]=$solution[$i];
					//$extra["Totale"]=$tot[$i];
					
				}//for-i
				
				
				
				$array_data[] = $extra;  
				$final_data = json_encode($array_data);  
			    if(file_put_contents('data.json', $final_data)){  
						
						 $message = "<label class='text-success'>File modificato con successo</label>"; 
						 
				} else {  
				   
					$error = 'JSON non esiste'; 
					
				} 
				
	}
		   
}  
 ?>  
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>PROJECT MOUNTAIN</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.3.1/materia/bootstrap.min.css"/>
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css">
    <link rel="stylesheet" type="text/css" href="/left.0cf57001.css" id="bootstrap-css">
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>

    <script async defer src="https://buttons.github.io/buttons.js"></script>
</head>

<body style="margin-right: 0px;">


<div class="container-fluid">
    <div class="row">
		<nav class="navbar navbar-expand-md navbar-dark fixed-left" style="background-color:#01796f;">
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarsExampleDefault">
				<ul class="navbar-nav">
					<li class="nav-item text-center">
						<a class="nav-link" href="/index.html"><img src="/logo_2.png"></a>
					</li>
					<li class="nav-item text-center">
						<a class="nav-link" href="/timeline.html">Cronistoria</a>
					</li>
					<li class="nav-item text-center">
						<a class="nav-link" href="/sentiero.html">Sentiero</a>
					</li>
					<li class="nav-item text-center">
						<a class="nav-link" href="/zaino.php">Zaino</a>
					</li>
					<li class="nav-item text-center dropdown">
						<a class="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Info</a>
						<div class="dropdown-menu">
							<a class="dropdown-item text-center" href="/chisono.html">Chi sono io</a>
							<div class="dropdown-divider"></div>
							<a class="dropdown-item text-center" href="/contatti.html">Contattami</a>
						</div>
					</li>
				</ul>
				<footer style="position:fixed; bottom: 0; height:40px; color: white;">PROJECT MOUNTAIN v0.1</footer>  
		</div>
		</nav>
	</div>
	<canvas id="pieChart" class="canvas_gr" style="max-width: 500px;"></canvas>	
	<br>
	<br>
	<div id="json_data">
		<button type="button" class="btn btn-sm btn-primary button_info" data-toggle="modal" data-target="#exampleModal">
		  display info
		</button>
	</div>
	
	<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	  <div class="modal-dialog" role="document">
		<div class="modal-content">
		  <div class="modal-header">
			<h5 class="modal-title" id="exampleModalLabel"></h5>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			  <span aria-hidden="true">&times;</span>
			</button>
		  </div>
		  <div class="modal-body">
		  </div>
		  <div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		  </div>
		</div>
	  </div>
	</div>
		
	
    <form method="post">
			<?php   
                     if(isset($error))  
                     {  
                          echo $error;  
                     }  
            ?>  
            <br/>
			<input type="text" name="zaino"  class="form-control txt" value="inserisci un nome per lo zaino" id="zaino"/>
			<input type="button" class="btn btn-success" id="addNumber" value="Aggiungi categoria" disabled="disabled"/>
			<input type="button" class="btn btn-primary" id="button_update" value="Update" disabled="disabled"/>
			<input type="submit" name="submit" id="button_send" value="Salva lo zaino" class="btn btn-warning" disabled="disabled"/>
			<input type="button" class="btn btn-info" id="button_load" value="load"/>
			<select style="width: 90px;" id="drop" data-toggle="tooltip" data-placement="right" title="Scegli uno zaino poi premi il pulsante Load per caricarlo">
			</select>
			<?php  
                     if(isset($message))  
                     {  
                          echo $message;  
                     }  
            ?> 
			<div id="container_in">
			</div>
		</form>	
		
		<br />
	 	
      </body>
	  <script>

	var ctxP = document.getElementById("pieChart").getContext('2d');
	var myPieChart = new Chart(ctxP, null);

	var category = [];
	var subcategory = [];
	
	$('#drop').tooltip();
	
	$(document).ready(function () {
    
	var subNumberN = 0;
	var counter = 0;
	var arrN = [];
	var hasSubNumbersN = 0;
	var quantity = [];
	
	$.getJSON('data.json', function(data) {
		//console.log(data);
		
		/*
        $.each(data, function(index, element) {
            $('body').append($('<div>', {
                text: element.Nome + ' ' + element.Cognome
            }));
        });*/
		
		 $.each(data, function (key, value) {
                $("#drop").append($('<option></option>').val(value.Zaino).html(value.Zaino));
				
         });
		/*
		 $('#drop').change(function () {
                alert($(this).val());
         });*/
	});
	
	  $('.txt').on('keyup', function(){
			
			var empty = false;
			$('.txt').each(function() {
				if ($(this).val().length == 0) {
					empty = true;
				}
			});
		
			if (empty) {
				$('#button_send').attr('disabled', 'disabled');
				$('#button_update').attr('disabled', 'disabled');
				$('#addNumber').attr('disabled', 'disabled');
			} else {
				$('#addNumber').attr('disabled', false);
			}
			
	  });
	
	$("#addNumber").on("click",function(event){
		
		$('#button_send').attr('disabled', false);
		$('#button_update').attr('disabled', false);
		
		var text1 = '<div><input type="text" id="number'+counter+'" name="newnumber'+counter+'" placeholder="nuova categoria id:'+counter+'" class="form-control txt"/><input type="button" id="addSubNumber' + counter + '" class="SubNumber btn btn-success btn-sm" value="Aggiungi oggetto"/><input type="button" id="remove' + counter + '" class="removeNumber btn btn-danger btn-sm" value="Rimuovi categoria"/><div id="subNumber' + counter + '" class="container_sub"></div></div>';
		var newNumber = $(text1);

		$("#container_in").append(newNumber);
		
		arrN[counter] = 0;
		
		category[counter]= "number"+counter;

		counter++;
	    
	});
	
	
	$("#container_in").on("click",".SubNumber", function(event){

		var val = this.id;
		var n = val.match(/\d+/);
		
		var parent = $(this).closest("input").attr("id");
		var parent_n = parent.match(/\d+/);
		var c = arrN[parent_n];
		arrN[parent_n] = arrN[parent_n]+1;
		
		var text1 = '<div><input type="text" class="hasSubNumbers' + n + '" id="subnumbers'+ n + '.' + arrN[parent_n] +'" name="newsubnumbers'+ n + '.' + (arrN[parent_n]-1) +'" placeholder="nuovo oggetto' + arrN[parent_n] + '" class="form-control txt"/><input type="text" name="description' + n + '.' + (arrN[parent_n]-1) + '" id="description' + n + '.' + arrN[parent_n] + '" class="descrizione form-control txt" placeholder="descrizione oggetto"/><input type="number" name="quantity' + n + '.' + (arrN[parent_n]-1) + '" id="quantity' + n + '.' + arrN[parent_n] + '"class="quantity form-control txt w-25 mt-5" placeholder="quantita`" min="1"/><input type="button" id="remove' + parent_n + '" class="removeSubNumber btn btn-danger btn-sm" value="Rimuovi oggetto"/></div></br>';
		
		var newSubNumber = $(text1);
		subcategory[n]="quantity"+n+"."+(c+1);

		$("#subNumber"+n).append(newSubNumber);
		

	});


    $("#container_in").on("click", ".removeSubNumber", function (event) {
	
		$(this).closest("div").remove();
		
		
		var div = this.id;
		var n = div.match(/\d+/);

		var parent = $(this).closest("input").attr("id");
		var parent_n = parent.match(/\d+/);
		
		for(var i=0; i<arrN[parent_n]; i++){

			$(".hasSubNumbers" + n).eq(i).attr("name","subnumbers"+n+"."+(i+1));
			$(".hasSubNumbers" + n).eq(i).attr("placeholder","nuovo oggetto"+(i+1));
			 
		}//for
		
		subcategory[n] = "quantity"+n+"."+(arrN[parent_n]-1);
		
		if(subcategory[n] == "quantity"+n+".0"){

			subcategory[n]=null;
			
		}

		arrN[parent_n] = arrN[parent_n]-1;
		
		

    });
	
	$("#container_in").on("click", ".removeNumber", function (event) {//riaggiornare l'id delle varie categorie al momento della cancellazione

		$(this).closest("div").remove();
		
		var div = this.id;
		var n = div.match(/\d+/); 
		
		category[n] = null;
		subcategory[n] = null;
		//console.log(category);
		
		counter--;
		
		if(counter == 0){
			$('#button_send').attr('disabled', 'disabled');
			$('#button_update').attr('disabled', 'disabled');
        }//if
		
    });

});

$('#button_update').on('click', function () {
  
		var cat_value = [];
		var subcat_value = [];
		var r="";
		var t="";
		
		
		for(i=0; i<category.length; i++){
			
			if(category[i] !== null){
				
				cat_value[i]=$("#"+category[i]).val();

				var id = subcategory[i];
				var index = id.substring(id.indexOf(".")+1,id.length);
				var arr = [];
				
				for(var j=0; j<index; j++){
					
					arr[j] = document.getElementById("quantity"+i+"."+(j+1)).value;

				}//for-j
				
				subcat_value[i] = arr;
				
			}else{
			
				cat_value[i]="categoria rimossa";
				subcat_value[i]="sottocategorie rimosse";
				
			}//if-else	
				
	   }//for-i
	   
	   var data=[];

	   for(i=0;i<subcat_value.length;i++){
			
			var s =0;
			for(j=0;j<subcat_value[i].length;j++){
				s = s + Number(subcat_value[i][j]);//somma tutte le quantità nella stssa categoria
				data[i] =s;
			}//for-j

		}//for-i
		
		if(myPieChart !== null){
			myPieChart.destroy();
		}
		
		myPieChart = new Chart(ctxP, {
		type: 'pie',
		data: {
			labels: cat_value,
			datasets: [{
				data: data,
				backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
				hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
			}]
		},
		options: {
			responsive: true
		}
	});
		
	
});

$('#button_load').on('click', function () {

		var nm = $('#drop').val();
		//alert(nm);
		$('.button_info').css('display', 'block');

		var tot = [];
		var qt = [];
		var lb = [];
		var key = [];
		var obj =[];
		//console.log(nm);
		
		//valore dell'ultimo array contenete il totale delle somme delle categorie
		var id=0;
		var id_obj =0;
		$.getJSON('data.json', function(data) {
			
			$.each(data, function(index, element) {

				if(element.Zaino === nm){
						
						a = element;
						tot[id] = (element.Totale);
						
						$.each(element, function(index, element){
							
							if(index !== "Totale"){
								
								//console.log(index,element);
								key[id_obj]=index;
								obj[id_obj]=element;
								id_obj++;
							}//if
							
							
							
						});
						
				}//if
				
			});
			//console.log(a.Totale);
			//console.log(obj);
			var title = "<b>" + key[0] + "</b> : " + obj[0];
			$('.modal-title').html(title);
			var s ="";
			//console.log(obj[1].length);
			//console.log(Object.values(obj[1][0]));
			
			for(var i=1; i<key.length; i++){
				
				s+="<b style='text-transform: uppercase;'>"+key[i]+"</b><br>";
				var k = [];
				var e = [];
				var c = getRandomColor();
				
				for(var j=0; j<obj[i].length; j++){
					
					k[j] = Object.keys(obj[i][j]);
					e[j] = Object.values(obj[i][j]);
					
				}//for-j
				console.log(k[0][0]);
				
				//console.log(k.length);
				for(var z=0; z<k.length; z++){
					
					
					for(var t=0; t<3; t++){
						
						s+= "<b style='color:" + c + ";'>" + k[z][t] + "</b> : " + e[z][t];
						s+= "<br>";
						
					}//for-t
					s+= "~~~~~~~~~~~~~~~~~~~~~~<br>";
				}//for-z
				
				s+= "<br>";
				
			}//for-i
			
			function getRandomColor() {
				  var letters = '0123456789ABCDEF';
				  var color = '#';
				  for (var i = 0; i < 6; i++) {
					color += letters[Math.floor(Math.random() * 16)];
				  }
				  return color;
			}
			
			$('.modal-body').html(s);

			for(var i=0; i<tot[0].length; i++){
				
				lb[i]=Object.keys(tot[0][i]);
				qt[i]=Object.values(tot[0][i]);
				
			}//for-i
			
			//console.log(Object.keys(tot[0][1]));
			
			if(myPieChart !== null){
				myPieChart.destroy();
			}
			
			myPieChart = new Chart(ctxP, {
			type: 'pie',
			data: {
				labels: lb,
				datasets: [{
					data: qt,
					backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
					hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
				}]
			},
			options: {
				responsive: true
			}
			});
			
			id++;
			
		});

});
</script>
</body>
    
</html>