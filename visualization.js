/**
 * Created by thomas on 9/01/14.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * (c) www.geocento.com
 * www.metaaps.com
 *
 */

// jQuery
//$.getScript('../Build/Cesium/Cesium.js', function()
//{
    // script is now loaded and executed.
    // put your dependent JS here.
	
//});
var tableFIL; //= $('#simdetailsdivtables');
var manoula;//=$('#mana');
var manoula_def;
	
 // function savetodasos(viewer,extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname) 
function readTextFile(file)
{
	//alert("To google gia to "+VISsid+" einai "+all_sims_google[VISsid]);
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
				var temp11 = new Array();
				//Senario #1. 	Wind Speed: 60.00 	Wind Direction: 341
				//Senario #2. 	Wind Speed: 60.00 	Wind Direction: 1
				//idd=valueRELOAD[0].substr(valueRELOAD[0].indexOf("[")+1, valueRELOAD[0].lastIndexOf("]")-valueRELOAD[0].indexOf("[")-1);
				temp11 = allText.split("Senario #");
				var tbldelete = document.getElementById("simdetailsdivtables");
				if (tbldelete) {
					tbldelete.parentNode.removeChild(tbldelete);
				}
				var table = document.createElement('table');
				table.setAttribute("id", "simdetailsdivtables");
				var simdetails=[];
				//simdetails=[];
				simdetails=[];
				var indexx=0;
				for (var i=1;i<temp11.length;i++){
					//console.log("full temp11[0] is"+temp11[i]);
					//console.log("number is:"+(temp11[i].substr(0,temp11[i].indexOf("W")-1)).replace(/\s/g, ''));
					var numid=(temp11[i].substr(0,temp11[i].indexOf("W")-1)).replace(/\s/g, '');
					var wndspeed=(temp11[i].substr(temp11[i].indexOf("Wind Speed:")+11,temp11[i].indexOf("Wind Direction:")-(temp11[i].indexOf("Wind Speed:")+11))).replace(/\s/g, '');
					var wndir=(temp11[i].substr(temp11[i].indexOf("Wind Direction:")+15,temp11[i].length-(temp11[i].indexOf("Wind Speed:")+15))).replace(/\s/g, '');
					//console.log("number speed is:"+(temp11[i].substr(0,temp11[1].indexOf("W")-1)).replace(/\s/g, ''));
					//console.log("wind Speed is:"+(temp11[i].substr(temp11[i].indexOf("Wind Speed:")+11,temp11[i].indexOf("Wind Direction:")-(temp11[i].indexOf("Wind Speed:")+11))).replace(/\s/g, ''));				
					//console.log("wind Direction is:"+(temp11[i].substr(temp11[i].indexOf("Wind Direction:")+15,temp11[i].length-(temp11[i].indexOf("Wind Speed:")+15))).replace(/\s/g, ''));
					
					//console.log("index:"+(indexx)+" index+1:"+(indexx+1)+" index+2:"+(indexx+2));
					simdetails[indexx]="#"+(temp11[i].substr(0,temp11[1].indexOf("W")-1)).replace(/\./g, "");//.replace(/\s/g, '');//sim number
					simdetails[indexx+1]="\u00A0"+((temp11[i].substr(temp11[i].indexOf("Wind Speed:")+11,temp11[i].indexOf("Wind Direction:")-(temp11[i].indexOf("Wind Speed:")+11))).replace(/\s/g, ''))+"m/s";//wind speed
					simdetails[indexx+2]="\u00A0"+((temp11[i].substr(temp11[i].indexOf("Wind Direction:")+15,temp11[i].length-(temp11[i].indexOf("Wind Speed:")+15))).replace(/\s/g, ''))+"\u00B0";//wind direction
					//simdetails[0]="koukou";
					
					//console.log("EIMAI MIA MIKRI PERIPTEROU simdetails[i-1]:"+simdetails[indexx]+" KAI TO indexx EINAI :"+indexx+" KALMA :"+(temp11[i].substr(temp11[i].indexOf("Wind Speed:")+11,temp11[i].indexOf("Wind Direction:")-(temp11[i].indexOf("Wind Speed:")+11))).replace(/\s/g, ''));
					indexx=indexx+3;
					//var iDiv = document.createElement('div');
					//iDiv.id = 'block';
					//document.getElementsByTagName('body')[0].appendChild(iDiv);

					// Now create and append to iDiv
					//var innerDiv = document.createElement('div');

					// The variable iDiv is still good... Just append to it.
					//iDiv.appendChild(innerDiv);
				}
				var runindex=1;
				var trarxi = document.createElement('tr');
				var th1 = document.createElement('th');th1.style.display = "none";
				th1.innerHTML="title1";th1.style.fontSize = "small";
				var th2 = document.createElement('th');th2.style.display = "none";
				th2.innerHTML="title2";th2.style.fontSize = "small";
				var th3 = document.createElement('th');th3.style.display = "none";
				th3.innerHTML="title3";th3.style.fontSize = "small";
				var th4 = document.createElement('th');th4.style.display = "none";
				th4.innerHTML="title4";th4.style.fontSize = "small";
				var th5 = document.createElement('th');th5.style.display = "none";//id="facility_header
				th5.innerHTML="title5";th5.style.fontSize = "small";
				th5.setAttribute("id", "minutesfotiasth5");th4.setAttribute("id", "minutesfotiasth4");
				th1.setAttribute("id", "defsorting");
				trarxi.appendChild(th1);
				trarxi.appendChild(th2);
				trarxi.appendChild(th3);
				trarxi.appendChild(th4);
				trarxi.appendChild(th5);
				table.appendChild(trarxi);
				for (var i = 0; i < simdetails.length; i=i+3){
					console.log("MPIKA STI LOOPA GIA TO TABLE DIV SIMULATIONN DETAILS KOUKKOU :simdetails.length::"+simdetails.length);
					var tr = document.createElement('tr');   
					var td1 = document.createElement('td');td1.style.fontSize = "small";
					var td2 = document.createElement('td');td2.style.fontSize = "small";
					var td3 = document.createElement('td');td3.style.fontSize = "small";
					
					var text1 = document.createTextNode(simdetails[i]);
					var text2 = document.createTextNode(simdetails[i+1]);
					var text3 = document.createTextNode(simdetails[i+2]);
					//var text3 = document.createTextNode("<font size=\"2\">Places</font>");
					td1.appendChild(text1);
					td2.appendChild(text2);
					td3.appendChild(text3);					
					tr.appendChild(td1);
					tr.appendChild(td2);
					tr.appendChild(td3);
					tr.setAttribute("id", "sce"+(simdetails[i].replace('.','')).replace(/ /g,""));
					////VAZO TO LINK
					if (all_sims_google[VISsid]==1){
					var td4 = document.createElement('td');td4.style.fontSize = "small";
					var btn  = document.createElement('a');
					//btn.innerHTML="(show flames)";
					btn.innerHTML="<span class=\"glyphicon glyphicon-fire\" style=\"padding-left:2px\"></span>";
					btn.value="../../db/simulations/"+VISfid+"/"+VISsid+"/run"+(runindex)+"/Flame_Animation.kmz";
					btn.style.cursor = "pointer";
					btn.style.fontSize = "medium";
					btn.id="btnsce"+(simdetails[i].replace('.','')).replace(/ /g,"");
					btn.onclick=function () {
						//alert("Value pressed is:"+this.value+" and inner HTML"+document.getElementById(this.id).innerHTML);
						//document.getElementById(this.id).innerHTML="<span class=\"glyphicon glyphicon-remove-circle\" onclick=\"alert('STOP');\" style=\"padding-left:2px\"></span>";
						//alert("Value222 pressed is:"+this.value+" and inner HTML"+document.getElementById(this.id).innerHTML);
						var rstckbx=document.getElementById("DEFAULT_SCEN_VIS_CHECKBOX");
						rstckbx.style.display="block";
						//document.getElementById("DEFAULT_SCEN_VIS").checked = false;//ksanaginetai stin visualizegoogle
						//alert("POOO");
						visualizeloadsimulationgoogle(this.value);
						
						//alert("AX: "+document.getElementById(this.id).innerHTML);
						//this.innerHTML="<span class=\"glyphicon glyphicon-remove-circle\" onclick=\"alert('STOP');\" style=\"padding-left:2px\"></span>";
					};
					td4.appendChild(btn);
					tr.appendChild(td4);
					runindex=runindex+1;
					}
					else{
						//tha valo keno td4 etsi kai allios oste na kano sort sto time
						var td4 = document.createElement('td');td4.style.fontSize = "small";
						tr.appendChild(td4);
						
					}
					////VAZO TO LINK
					table.appendChild(tr);
			}
			//table.setAttribute("id", "simdetailsdivtables");class="panel-body"
			table.style.overflowY="auto";
			//table.style.height="200px";
			//table.class="panel-body";
			//document.getElementById('simdetailsdiv').appendChild(table);
			document.getElementById('sawlegacy').appendChild(table);
			//document.body.appendChild(table);
				//simdetails.length=0;
            }
        }
    }
    rawFile.send(null);
}
 
 
 var VISsid;
var VISfid;
var VISsimname;
 function loadsimulation (ee) 
{
	console.log('visualization::loadsimulation::sid is :: '+ee);
	console.log('visualization::loadsimulation::name is is :: '+all_sims_name[ee]);
	console.log('visualization::loadsimulation::fid is :: '+all_sims_fid[ee]);
	VISsid=ee;
	VISfid=all_sims_fid[ee];
	VISsimname=all_sims_name[ee];
	//alert("MORE LES??");

}
 
 function visualizeloadsimulation()
{
	//CLEAR PREVIOUS ON MAP
	clear_form_on_fly_vis();
	
	//alert("!visualization::visualizeloadsimulation::VISsid: "+VISsid+" ::VISfid "+VISfid+" :: VISsimname"+VISsimname);
	readTextFile("../../db/simulations/"+VISfid+"/"+VISsid+"/SetupLog.txt");
	//alert("efiga forestDown "+forestDown+":sid: "+sid+" and lat:"+lat);
viewer.dataSources.removeAll(false);
		dataSourceanimevis.load('../../db/simulations/'+VISfid+'/'+VISsid+'/Probability_Animation.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
		});
		viewer.dataSources.add(dataSourceanimevis)
		.then( function (dataSourceanimevis) {
		var west = forests_west[VISfid];
var south = forests_south[VISfid];
var east = forests_east[VISfid];
var north = forests_north[VISfid];
jumpSetupsles_VIS(west, south, east,north);
		/*
		viewer.flyTo(dataSourceanimevis.entities,{
	duration:3.0,
	maximumHeight:0,
	offset : {
            heading : 0.0,
            pitch : Cesium.Math.toRadians(-90.0),
            range : 0.0
        }
	
});
		*/});//alert("TO EKLEISAI?MPA...");
		closeNav();		
		openSimHistorydeep(VISfid);
//viewer.dataSources.add(Cesium.KmlDataSource
 //   .load('../../db/simulations/'+forestDown+'/'+sid+'/Probability_Animation.kml', {
 //       camera: viewer.camera,
 //       canvas: viewer.canvas
  //  })
//)
//.then( function (dataSource) {
 //   viewer.flyTo(dataSource.entities);
//});
//viewer.dataSources.add(KmlDataSource.fromUrl('../../db/simulations/1312/9421/run9/windVisualization.kmz'));
}

var flaggoogle=0;
function visualizeloadsimulationgoogle(path)
{flaggoogle=1;
	//CLEAR PREVIOUS ON MAP
	clear_form_on_fly_vis();
	//alert("Going to load "+path);
	//alert("!visualization::visualizeloadsimulation::VISsid: "+VISsid+" ::VISfid "+VISfid+" :: VISsimname"+VISsimname);
	//readTextFile("../../db/simulations/"+VISfid+"/"+VISsid+"/SetupLog.txt");
	//alert("efiga forestDown "+forestDown+":sid: "+sid+" and lat:"+lat);
viewer.dataSources.removeAll(false);
		dataSourceanimevis.load(path, {
        camera: viewer.camera,
        canvas: viewer.canvas
		});
		viewer.dataSources.add(dataSourceanimevis)
		.then( function (dataSourceanimevis) { 
		var west = forests_west[VISfid];
var south = forests_south[VISfid];
var east = forests_east[VISfid];
var north = forests_north[VISfid];
jumpSetupsles_VIS(west, south, east,north);
		/*
		viewer.flyTo(dataSourceanimevis.entities,{
	duration:3.0,
	maximumHeight:0,
	offset : {
            heading : 0.0,
            pitch : Cesium.Math.toRadians(-90.0),
            range : 0.0
        }
	
});
		*/});//alert("TO EKLEISAI?MPA...");
		closeNav();		
		openSimHistorydeep(VISfid);
//viewer.dataSources.add(Cesium.KmlDataSource
 //   .load('../../db/simulations/'+forestDown+'/'+sid+'/Probability_Animation.kml', {
 //       camera: viewer.camera,
 //       canvas: viewer.canvas
  //  })
//)
//.then( function (dataSource) {
 //   viewer.flyTo(dataSource.entities);
//});
//viewer.dataSources.add(KmlDataSource.fromUrl('../../db/simulations/1312/9421/run9/windVisualization.kmz'));
//document.getElementById("DEFAULT_SCEN_VIS").checked = false;
}




function flySetupVIS (selection) 
{
	viewer.entities.removeAll();
	if (flaggoogle==1){
		//document.getElementById("DEFAULT_SCEN_VIS").checked = false;
		//var rstckbx=document.getElementById("DEFAULT_SCEN_VIS_CHECKBOX");
		//rstckbx.style.display="none";
		flaggoogle=0;
	}
	else {
		//TO CHECKBOX STO TRUE TO EKANE FALSE
		//document.getElementById("DEFAULT_SCEN_VIS").checked = true;
		var rstckbx=document.getElementById("DEFAULT_SCEN_VIS_CHECKBOX");
		rstckbx.style.display="none";
	}
	//clear_form_on_fly_vis();
	//visualizeloadsimulation();
	//alert("eimai i fly setup:"+this.options[this.selectedIndex].id+" kala");
	//alert("dasos lat:"+forests_lat[this.options[this.selectedIndex].id]+" lon "+forests_lon[this.options[this.selectedIndex].id]);
	//alert("visualization: flySetupVIS selection:"+selection);
	if (typeof selection == 'undefined'){
				//LoadForestsSimulations
				/*var e = document.getElementById("LoadForestsSimulations");
				var esidval = e.options[e.selectedIndex].value;
				if (esidval == ""){
					alert("exo keno sid kai irtha apo flysetupVIS");
					document.getElementById("DEFAULT_SCEN_VIS").disabled= true;
				}*/
				var tbldelete = document.getElementById("simdetailsdivtables");
				if (tbldelete) {
					tbldelete.parentNode.removeChild(tbldelete);
				}
				clear_form_on_fly_vis();
				reset_checkboxes_VIS();
	if (this.options[this.selectedIndex].id) 
    	{
			LoadForestsSimulations(this.options[this.selectedIndex].id);
       		//jumpSetupedit (forests_lat[this.options[this.selectedIndex].id], forests_lon[this.options[this.selectedIndex].id], 0);
       		w_lat=forests_lat[this.options[this.selectedIndex].id];
       		w_lon=forests_lon[this.options[this.selectedIndex].id];
       		w_id=this.options[this.selectedIndex].id;
			var west = forests_west[this.options[this.selectedIndex].id];
			var south = forests_south[this.options[this.selectedIndex].id];
			var east = forests_east[this.options[this.selectedIndex].id];
			var north = forests_north[this.options[this.selectedIndex].id];
       		jumpSetupeditpaogiaipnoVIS(west, south, east,north);
			//weather(0);
			doulepse(global_forests_placemarks.length, forests_reallat[this.options[this.selectedIndex].id], forests_reallon[this.options[this.selectedIndex].id], this.options[this.selectedIndex].id, this.options[this.selectedIndex].text);
       		//showLayeredit (this.options[this.selectedIndex].id, 'pipa', -1);
       		
       		var http2 = new XMLHttpRequest();
		var url2 = "../../include/fidtofuels.php?fid="+this.options[this.selectedIndex].id;
		http2.open("GET", url2, true);
		http2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http2.setRequestHeader("Connection", "close");
		var response;
		var elSel = document.getElementById('fuelDownedit');
		var i;
		if (elSel.length > 1)
  		{
  			for(i=1; i<elSel.length; i++)
  			{
  				elSel.remove(i);
  			}
  		}

		http2.onreadystatechange = function() { 
						
						if(http2.readyState == 4 && http2.status == 200) 
						{
							//alert("epestrepse i fidtofuels");
							response=http2.responseText.split("^");
							var count=response.length;
							elSel = document.getElementById('fuelDownedit');
							
							for (i=0; i<count-1; i++)
							{
								var elOptNew = document.createElement('option');
  								elOptNew.text = response[i];
  								elOptNew.value = response[i];
  								elSel.add(elOptNew, null); // standards compliant; doesn't work in IE
  							}
						}
					}		
  		http2.send();
    	}
	}
	else{
		//alert('selection: '+selection);
		if (selection) 
    	{
			LoadForestsSimulations(selection);	
			if (selection) 
			{
       		//jumpSetupedit (forests_lat[this.options[this.selectedIndex].id], forests_lon[this.options[this.selectedIndex].id], 0);
				w_lat=forests_lat[selection];
				w_lon=forests_lon[selection];
				w_id=selection;
				var west = forests_west[selection];
				var south = forests_south[selection];
				var east = forests_east[selection];
				var north = forests_north[selection];
				jumpSetupeditpaogiaipnoVIS(west, south, east,north);
			//weather(0);
	//			doulepse(global_forests_placemarks.length, forests_reallat[selection], forests_reallon[selection], selection, this.options[this.selectedIndex].text);
       		//showLayeredit (this.options[this.selectedIndex].id, 'pipa', -1);
       		
       		var http2 = new XMLHttpRequest();
			var url2 = "../../include/fidtofuels.php?fid="+selection;
			http2.open("GET", url2, true);
			http2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http2.setRequestHeader("Connection", "close");
			var response;
			var elSel = document.getElementById('fuelDownVIS');
			var i;
			if (elSel.length > 1)
			{
				for(i=1; i<elSel.length; i++)
				{
					elSel.remove(i);
				}
			}

			http2.onreadystatechange = function() { 
						
						if(http2.readyState == 4 && http2.status == 200) 
						{
							//alert("epestrepse i fidtofuels");
							response=http2.responseText.split("^");
							var count=response.length;
							elSel = document.getElementById('fuelDownVIS');
							
							for (i=0; i<count-1; i++)
							{
								var elOptNew = document.createElement('option');
  								elOptNew.text = response[i];
  								elOptNew.value = response[i];
  								elSel.add(elOptNew, null); // standards compliant; doesn't work in IE
  							}
						}
			}		
			http2.send();
			}
		}
	}
//alert("YO");
//alert("oi paramrs einai:"+global_forests_placemarks.length+":"+forests_reallat[this.options[this.selectedIndex].id]+":"+forests_reallon[this.options[this.selectedIndex].id]+":"+this.options[this.selectedIndex].id+":"+this.options[this.selectedIndex].text);

}
function clear_form_on_fly_vis()
{
	var primitives1 = scene.primitives;
	var length = primitives1.length;
	var i =primitives1.length-1;
	while (primitives1.length > 1) {
		var p = primitives1.get(i);
		scene.primitives.remove(p);
		i--;
	}
	var x=document.getElementsByClassName("twipsy-inner");
	var xx=document.getElementsByClassName("twipsy-arrow");
	x[0].style.display ='none';
	xx[0].style.display ='none';
	show_hide_loggingpuretest("hide");
	console.log("MPIKA stin clear_new_forest_form ekana omos kati?");
	//document.getElementById("fname1new").value = "";
    //document.getElementById("cellsize1new").value = "30";//==24
	//cellSize = document.getElementById('cellsize1new').value;
	//fname= document.getElementById('fname1new').value;
	viewer.dataSources.removeAll(false);
	viewer.entities.removeAll();
}

function jumpSetupeditpaogiaipnoVIS(west, south, east,north) 
{
	//clear_form_on_fly_vis();
	console.log("eimai i jumpSetupeditpaogiaipno::::::::::::::::::: westreal: "+west+" southreal:"+south+" eastreal: "+east+" northreal:"+north);
    var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

    viewer.camera.flyTo({
        destination : rectangle
    });
	viewer.entities.add({
    rectangle : {
        coordinates : rectangle,
        fill : false,
        outline : true,
        outlineColor : Cesium.Color.WHITE
    }
});
}

var expandScenarios='';
var visiblerows = new Array();
function checkscenarios(lat, lon) 
{
			var distance=0;
			var clock = viewer.clock;
			//console.log("TIME IS :"+clock.currentTime);
			//alert("checkscenarios "+lon+" "+lat+" and TIME IS :"+clock.currentTime+" but start time was "+clock.startTime);
			var entities = dataSourceanimevis.entities.values;
			//alert("FASKOMILIA "+entities.length);			
			for (var i = 1; i < entities.length; i++) { 
				//console.log("MORE LES?"+entities[i].name+" koukou"+entities[i].name);  //entity.properties contains metadata from file 
				//console.log(" ax paidaki mou"+entities[i].isAvailable(clock.currentTime));
				if ( entities[i].isAvailable(clock.currentTime) == true )
				{
					//alert("FASKOMILIA "+entities[i].name.split(" minute"));
					//console.log("position : "+entities[i].position);
					var minutee = new Array();
					minutee = entities[i].name.split(" minute");
					var min=minutee[0];
					//alert("checkscenarios "+lon+" "+lat+" and TIME IS FAKSOMILIA MINUTE:"+min);
						
				}
			}
			var pinBuilder11 = new Cesium.PinBuilder();
			var wyoming11 = viewer.entities.add({
			id :lon+'::'+lat,
			name : name,
			position : Cesium.Cartesian3.fromDegrees(lon,lat,0.0),
			billboard : {
			//image : pinBuilder.fromColor(Cesium.Color.SALMON, 48).toDataURL(),
			//heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
			//verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
			//image : '../../images/fire.png',
			verticalOrigin : Cesium.VerticalOrigin.BOTTOM
			},
			label : {
			text : name,
			//verticalOrigin : Cesium.VerticalOrigin.BOTTOM
			}
			}
			);
			wyoming11.description = '\
<p>\
  <div style="text-align:center; padding:10px"><button id="DeleteIgnition" value="'+lat+'::'+lon+'" onclick="deleteIgnition('+lat+');" class="click-test-button">' +'Delete ignition point</button></div>\
</p>\
<p>\
</p>';
  	/*ignitions[counter] = ge.createPlacemark('');

	// Create style map for placemark
	var icon = ge.createIcon('');
	icon.setHref('<?php echo $siteUrl; ?>thesis/images/fire.png');
	var style = ge.createStyle('');
	style.getIconStyle().setIcon(icon);
	ignitions[counter].setStyleSelector(style);

	// Create point
	var la = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
	var point = ge.createPoint('');
	point.setLatitude(lat);
	point.setLongitude(lon);
	ignitions[counter].setGeometry(point);
	
	ge.getFeatures().appendChild(ignitions[counter]);
	
	var ignition=ignitions[counter];
	
	google.earth.addEventListener(ignition, 'click', function(event) {
   			// Prevent the default balloon from popping up.
   			event.preventDefault();

   			var balloon = ge.createHtmlDivBalloon('');
   			balloon.setFeature(ignition);

			var div = document.createElement('DIV');
			var p=ignition.getGeometry();
			var lat=p.getLatitude();
			var lon=p.getLongitude();
			var name=ignition.getName();
			
			div.innerHTML = "<a href='#' onclick='deleteIgnition(" + lat +", " + lon + ");'><small>Delete<small></a>";

			balloon.setContentDiv(div);

   			ge.setBalloon(balloon);
	});	
	*/
	var http1= new XMLHttpRequest();
	var url1="../../include/getScenarios.php";
	
	http1.open("POST", url1, true);

	var params1="lat="+lat+"&lon="+lon+"&minute="+min+"&distance="+distance+"&fid="+VISfid+"&sid="+VISsid;
	console.log("GOING to call getScenarios with params: "+params1);
	http1.onreadystatechange = function(){
 
						if(http1.readyState == 4 && http1.status == 200) 
						{
							var response=http1.responseText; 
							//alert("response is "+response);
							console.log("response is "+response);							
							var temp = new Array();
							temp = response.split("!");
							var i=1;
							if(temp.length==1)
							{
								alert("No simulation scenario burns this area at "+minute+"'");
							}
							else
							{
								console.log("GETSCENARIOS expandScenarios is "+expandScenarios);
  								if(expandScenarios=='')
  								{
  									//pm_el = el('expandScenarios');
									//expandScenarios = pm_el.innerHTML;	
  								}
  								else
  								{
  									//pm_el = el('expandScenarios');
  									//pm_el.innerHTML = expandScenarios;
  								}
  								
								var tableHTML='';	
								var rows = (document.getElementById("simdetailsdivtables").getElementsByTagName("tr").length)-1;/////TEMPTEMPTEMP
								
								//arxikopoio kai to td gia to minutesfotias
								if (typeof document.getElementsByName('minutesfotias')[0] != 'undefined'){
									var mikos=document.getElementsByName('minutesfotias');
									var yyy =mikos.length-1;
									while (mikos.length > 0) {
										var tempminutesfotias= document.getElementsByName('minutesfotias')[yyy];
										tempminutesfotias.parentNode.removeChild(tempminutesfotias);
										yyy--;
									}
								}
								
								for(i=1; i<rows+1; i=i+1)
								{
									console.log("checkscenarios: mpika na kano hide all gia sinolika rows:"+rows+" eno to current i:"+i);
									var sceid = document.getElementById("sce#"+i);
									//alert("simdetailsdivtables rows:"+rows+" and sce"+i+" ");
									sceid.style.fontWeight="normal";
									sceid.style.display="none";
									//arxikopoio kai to td gia to minutesfotias
									//console.log("arxikopoio kai to td gia to minutesfotias");
									/*
									if (typeof document.getElementsByName('minutesfotias')[i-1] != 'undefined'){
										var tempminutesfotias= document.getElementsByName('minutesfotias')[i-1];
										if (typeof tempminutesfotias != 'undefined'){
											//tempminutesfotias.parentNode.removeChild(tempminutesfotias);
											//console.log("tha svisei ti les?"+tempminutesfotias.innerHTML);
											var mikos=document.getElementsByName('minutesfotias');
											console.log("VRIKA "+mikos.length);
											//tempminutesfotias.innerHTML="";
											tempminutesfotias.parentNode.removeChild(tempminutesfotias);
											//console.log("esvice ti les?"+tempminutesfotias.innerHTML);
											//tempminutesfotias[i-1].innerHTML="arxikopoiiseballs";
										}
										else{
											console.log("tiproti fora einai undefined to minutesfotias");
										}
									}
									else{
											console.log("tiproti fora einai undefined to document.getElementsByName('minutesfotias')[i-1]");
									
									}*/
									
								}
								
								//console.log("response.split(\"!\") is "+response.split("!"));
								//console.log("temp.length is "+(temp.length));
								var visiblerowsindex=0;
								for(i=0; i<temp.length-1; i=i+1)
								{
									//console.log("I is"+i);
									var tempo = temp[i].split("^");
									//console.log("temp[i].split(\"^\")"+temp[i].split("^"));
									console.log("to senario poio einai magga?"+tempo[0]);
									var scenarios = tempo[0];
									var minutess = tempo[1];
									//if(minutess<10) {
									//	minutess = '0'+minutess
									//}
									var sceid = document.getElementById("sce#"+scenarios);
									sceid.style.fontWeight="bold";
									//console.log("KANO BOLD AYTA POU PREPEI "+scenarios);
									
									for(var ii=1; ii<rows+1; ii=ii+1)
									{
										//console.log("going to check the "+scenarios+" with "+ii);
										if( scenarios == ii )
										{	//console.log(scenarios+" is same with "+ii);
											//vazo ta visible ids se ena array oste na kano to sort meta
											visiblerows[visiblerowsindex]=scenarios;visiblerowsindex++;
											sceid.style.display="block";
											var td5 = document.createElement('td');
											var text1minutess = document.createTextNode("\u00A0\u00A0\u00A0"+minutess+"'");
											td5.appendChild(text1minutess);
											td5.style.fontSize = "small";
											td5.setAttribute("name", "minutesfotias");//style="font-size: small;
											sceid.appendChild(td5);
										}
									}
									var toa = tempo[1];
									var trId = "google"+scenarios;
									
									//var tr = el(trId);

									tableHTML = tableHTML + "<tr id='"+trId+"'>"+tr.innerHTML+"<td><b>"+toa+"'</b></td></tr>";
									//console.log("GETSCENARIOS tableHTML is "+tableHTML);
									//console.log("I at the end of the loop is "+i);
								}
								//////SORTARISMA ANA LEPTO LEME
								//console.log("PAO NA KANO SORTARISMA kai exo "+visiblerows.length+" tosa visible");
								//myFunction();
								activatesortepitelous();
								var sortbtnclickfire=$('#mana');
								sortbtnclickfire.click();
								console.log("EKANA SORTARISMA??");
								
								//pm_el.innerHTML = '<table id="scenariosTable">'+tableHTML+'</table>';		
							}
						} 
				}
				
	http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http1.setRequestHeader("Content-length", params1.length);
	http1.setRequestHeader("Connection", "close");
	http1.send(params1);

}



	function aerial_with_labels_add_remove_vis(checked){
	//alert("Ftiaxno ta kalodia"+checked);
	
	if (checked){
		document.getElementById('AERIAL_WITH_LABELS').checked = true;
		document.getElementById('AERIAL_WITH_LABELS_SIM').checked = true;
		document.getElementById('AERIAL_WITH_LABELS_EDIT').checked = true;
		viewer.imageryLayers.get(1).show=true;
	}
	else{
		document.getElementById('AERIAL_WITH_LABELS').checked = false;
		document.getElementById('AERIAL_WITH_LABELS_SIM').checked = false;
		document.getElementById('AERIAL_WITH_LABELS_EDIT').checked = false;
		viewer.imageryLayers.get(1).show=false;
	}
}



var dataSourceelevvis = new Cesium.KmlDataSource();
var dataSourceslopevis = new Cesium.KmlDataSource();
var dataSourceaspectvis = new Cesium.KmlDataSource();
var dataSourcebehavevis = new Cesium.KmlDataSource();
var dataSourcecorinevis = new Cesium.KmlDataSource();
var dataSourceanimevis = new Cesium.KmlDataSource();

function removeCustomDatasourceVIS(iam) 
{
	console.log("removeCustomDatasourceVIS get timestamp");
	var tometime=getcurrentclocktime();
	
	console.log("EIMAI removeCustomDatasourceVIS APO SIMSETUP:::::::::::::::::::::::::::::::::::>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> kai svino "+iam);
	//viewer.dataSources.add('../../db/forests/'+fid+'/aspect.kml');
	if ( iam == 'slope' )
	{
		viewer.dataSources.remove(dataSourceelevvis);
		viewer.dataSources.remove(dataSourceaspectvis);
		viewer.dataSources.remove(dataSourcebehavevis);
		viewer.dataSources.remove(dataSourcecorinevis);
	}
	if ( iam == 'elev' )
	{
		viewer.dataSources.remove(dataSourceslopevis);
		viewer.dataSources.remove(dataSourceaspectvis);
		viewer.dataSources.remove(dataSourcebehavevis);
		viewer.dataSources.remove(dataSourcecorinevis);
	}
	if ( iam == 'aspect' )
	{
		viewer.dataSources.remove(dataSourceelevvis);
		viewer.dataSources.remove(dataSourceslopevis);
		viewer.dataSources.remove(dataSourcebehavevis);
		viewer.dataSources.remove(dataSourcecorinevis);
	}
	if ( iam == 'behave' )
	{
		viewer.dataSources.remove(dataSourceslopevis);
		viewer.dataSources.remove(dataSourceaspectvis);
		viewer.dataSources.remove(dataSourceelevvis);
		viewer.dataSources.remove(dataSourcecorinevis);
	}
	if ( iam == 'corine' )
	{
		viewer.dataSources.remove(dataSourceelevvis);
		viewer.dataSources.remove(dataSourceaspectvis);
		viewer.dataSources.remove(dataSourcebehavevis);
		viewer.dataSources.remove(dataSourceslopevis);
	}
	if ( iam == 'all' )
	{
		viewer.dataSources.remove(dataSourceelevvis);
		viewer.dataSources.remove(dataSourceslopevis);
		viewer.dataSources.remove(dataSourceaspectvis);
		viewer.dataSources.remove(dataSourcebehavevis);
		viewer.dataSources.remove(dataSourcecorinevis);
	}
	console.log("removeCustomDatasourceVIS set timestamp");
	setcurrentclocktime(tometime);
}


function AutoElevationVIS(checked,fid){
	var iam='elev';
	console.log("eimai i AutoElevationVIS kai exo fid:"+fid+" kai checked= "+checked);//alert("eimai i AutoAspectSimSetup");//alert("eimai i AutoElevationVIS");
		if(fid==-1)
	{
		
		fid=document.getElementById('forestDownVIS').options[document.getElementById('forestDownVIS').selectedIndex].id;
		console.log("to fid ginetai:"+fid);
	}
	if(document.getElementById('corinevis').checked==true)
	{
		document.getElementById('corinevis').checked=false;
	}
	if(document.getElementById('slopevis').checked==true)
	{
		document.getElementById('slopevis').checked=false;
	}
	if(document.getElementById('aspectvis').checked==true)
	{
		document.getElementById('aspectvis').checked=false;
	}
	if(document.getElementById('behavevis').checked==true)
	{
		document.getElementById('behavevis').checked=false;
	}
    //alert("xaxa"+fid);
			if(checked.toString()=='true')
	{
//viewer.dataSources.removeAll(false);	
removeCustomDatasourceVIS(iam);
		dataSourceelevvis.load('../../db/forests/'+fid+'/elev.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
		});
		viewer.dataSources.add(dataSourceelevvis)
		.then( function (dataSourceelevvis) {
		var west = forests_west[fid];
var south = forests_south[fid];
var east = forests_east[fid];
var north = forests_north[fid];
jumpSetupsles_VIS(west, south, east,north);
		
		/*
		viewer.flyTo(dataSourceelevvis.entities,{
	duration:3.0,
	maximumHeight:0,
	offset : {
            heading : 0.0,
            pitch : Cesium.Math.toRadians(-90.0),
            range : 0.0
        }
	
});
		*/});
//viewer.dataSources.add(Cesium.KmlDataSource
   // .load('../../db/forests/'+fid+'/elev.kml', {
   //     camera: viewer.camera,
  //      canvas: viewer.canvas
 //   })
//)
//.then( function (dataSource) {
 //   viewer.flyTo(dataSource.entities,{
//	duration:3.0,
//	maximumHeight:0,
//	offset : {
     //       heading : 0.0,
      //      pitch : Cesium.Math.toRadians(-90.0),
      //      range : 0.0
     //   }
	
//});
//});
	}
			if(checked.toString()=='false')
	{
		//viewer.dataSources.removeAll(false);
		removeCustomDatasourceVIS('all');
	}	
}


function AutoBehaveVIS(checked,fid){
	var iam='behave';
	console.log("eimai i AutoBehaveVIS kai exo fid:"+fid+" kai checked= "+checked);//alert("eimai i AutoBehaveVIS");
		if(fid==-1)
	{
		
		fid=document.getElementById('forestDownVIS').options[document.getElementById('forestDownVIS').selectedIndex].id;
		console.log("to fid ginetai:"+fid);
	}
	if(document.getElementById('corinevis').checked==true)
	{
		document.getElementById('corinevis').checked=false;
	}
	if(document.getElementById('slopevis').checked==true)
	{
		document.getElementById('slopevis').checked=false;
	}
	if(document.getElementById('aspectvis').checked==true)
	{
		document.getElementById('aspectvis').checked=false;
	}
	if(document.getElementById('elevationvis').checked==true)
	{
		document.getElementById('elevationvis').checked=false;
	}
    //alert("xaxa"+fid);
			if(checked.toString()=='true')
	{
//viewer.dataSources.removeAll(false);	
removeCustomDatasourceVIS(iam);
		dataSourcebehavevis.load('../../db/forests/'+fid+'/behave.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
		});
		viewer.dataSources.add(dataSourcebehavevis)
		.then( function (dataSourcebehavevis) {
		var west = forests_west[fid];
var south = forests_south[fid];
var east = forests_east[fid];
var north = forests_north[fid];
jumpSetupsles_VIS(west, south, east,north);

		/*
		viewer.flyTo(dataSourcebehavevis.entities,{
	duration:3.0,
	maximumHeight:0,
	offset : {
            heading : 0.0,
            pitch : Cesium.Math.toRadians(-90.0),
            range : 0.0
        }
	
});
		*/});
//viewer.dataSources.add(Cesium.KmlDataSource
  //  .load('../../db/forests/'+fid+'/behave.kml', {
 //       camera: viewer.camera,
 //       canvas: viewer.canvas
//    })
//)
//.then( function (dataSource) {
//    viewer.flyTo(dataSource.entities,{
//	duration:3.0,
//	maximumHeight:0,
//	offset : {
 //           heading : 0.0,
 //           pitch : Cesium.Math.toRadians(-90.0),
 //           range : 0.0
 //       }
	
//});
//});
	}
			if(checked.toString()=='false')
	{
		//viewer.dataSources.removeAll(false);
		removeCustomDatasourceVIS('all');
	}	
}


function AutoCorineVIS(checked,fid){
	var iam='corine';
	console.log("eimai i AutoCorineVIS kai exo fid:"+fid+" kai checked= "+checked);//alert("eimai i AutoCorineVIS");
		if(fid==-1)
	{
		
		fid=document.getElementById('forestDownVIS').options[document.getElementById('forestDownVIS').selectedIndex].id;
		console.log("to fid ginetai:"+fid+" kai to showaspect:"+document.getElementById('aspect').checked);
	}
	if(document.getElementById('behavevis').checked==true)
	{
		document.getElementById('behavevis').checked=false;
	}
	if(document.getElementById('slopevis').checked==true)
	{
		document.getElementById('slopevis').checked=false;
	}
	if(document.getElementById('aspectvis').checked==true)
	{
		document.getElementById('aspectvis').checked=false;
	}
	if(document.getElementById('elevationvis').checked==true)
	{
		document.getElementById('elevationvis').checked=false;
	}
    //alert("xaxa"+fid);
			if(checked.toString()=='true')
	{
//viewer.dataSources.removeAll(false);	
removeCustomDatasourceVIS(iam);
		dataSourcecorinevis.load('../../db/forests/'+fid+'/corine.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
		});
		viewer.dataSources.add(dataSourcecorinevis)
		.then( function (dataSourcecorinevis) {
		var west = forests_west[fid];
var south = forests_south[fid];
var east = forests_east[fid];
var north = forests_north[fid];
jumpSetupsles_VIS(west, south, east,north);
		/*
		viewer.flyTo(dataSourcecorinevis.entities,{
	duration:3.0,
	maximumHeight:0,
	offset : {
            heading : 0.0,
            pitch : Cesium.Math.toRadians(-90.0),
            range : 0.0
        }
	
});
		*/});
//viewer.dataSources.add(Cesium.KmlDataSource
 //   .load('../../db/forests/'+fid+'/corine.kml', {
 //       camera: viewer.camera,
 //       canvas: viewer.canvas
  //  })
//)
//.then( function (dataSource) {
 //   viewer.flyTo(dataSource.entities,{
//	duration:3.0,
//	maximumHeight:0,
//offset : {
  //          heading : 0.0,
  //          pitch : Cesium.Math.toRadians(-90.0),
   //         range : 0.0
   //     }
	
//});
//});
	}
			if(checked.toString()=='false')
	{
		//viewer.dataSources.removeAll(false);
		removeCustomDatasourceVIS('all');
	}		
}


function AutoSlopeVIS(checked,fid){
	var iam='slope';
	console.log("eimai i AutoSlopeVIS kai exo fid:"+fid+" kai checked= "+checked);
		if(fid==-1)
	{
		
		fid=document.getElementById('forestDownVIS').options[document.getElementById('forestDownVIS').selectedIndex].id;
		console.log("to fid ginetai:"+fid);
	}
	if(document.getElementById('corinevis').checked==true)
	{
		document.getElementById('corinevis').checked=false;
	}
	if(document.getElementById('aspectvis').checked==true)
	{
		document.getElementById('aspectvis').checked=false;
	}
	if(document.getElementById('elevationvis').checked==true)
	{
		document.getElementById('elevationvis').checked=false;
	}
	if(document.getElementById('behavevis').checked==true)
	{
		document.getElementById('behavevis').checked=false;
	}
    //alert("xaxa"+fid);
		if(checked.toString()=='true')
	{
//viewer.dataSources.removeAll(false);	
removeCustomDatasourceVIS(iam);
		dataSourceslopevis.load('../../db/forests/'+fid+'/slope.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
		});
		//console.log("AutoSlopeVIS goint to set time");
		//var tometime=getcurrentclocktime();
		//setcurrentclocktime(tometime);
		viewer.dataSources.add(dataSourceslopevis)
		.then( function (dataSourceslopevis) { 
		
		var west = forests_west[fid];
var south = forests_south[fid];
var east = forests_east[fid];
var north = forests_north[fid];
jumpSetupsles_VIS(west, south, east,north);
		/*
		viewer.flyTo(dataSourceslopevis.entities,{
	duration:3.0,
	maximumHeight:0,
	offset : {
            heading : 0.0,
            pitch : Cesium.Math.toRadians(-90.0),
            range : 0.0
        }
	
});
		*/});
		//viewer.dataSources.add(Cesium.KmlDataSource
  //  .load('../../db/forests/'+fid+'/slope.kml', {
 ///       camera: viewer.camera,
 //       canvas: viewer.canvas
 //   })
//)
//.then( function (dataSource) {
 //   viewer.flyTo(dataSource.entities,{
//	duration:3.0,
//	maximumHeight:0,
//	offset : {
  //          heading : 0.0,
 //           pitch : Cesium.Math.toRadians(-90.0),
 //           range : 0.0
//        }
	
//});
//});
	}
			if(checked.toString()=='false')
	{
		console.log("eimai i AutoSlopeVIS kai exo checked"+checked.toString()+" opote pao na kano remove to datasource iam:"+iam );
		//viewer.dataSources.removeAll(false);
		removeCustomDatasourceVIS('all');
		//removeCustomDatasourceVIS(iam);
	}	
}

function AutoAspectVIS(checked,fid){
	var iam='aspect';
	console.log("eimai i AutoAspectVIS kai exo fid:"+fid+" kai checked= "+checked);//alert("eimai i AutoAspectVIS");
		if(fid==-1)
	{
		
		fid=document.getElementById('forestDownVIS').options[document.getElementById('forestDownVIS').selectedIndex].id;
		console.log("to fid ginetai:"+fid);
	}
	if(document.getElementById('corinevis').checked==true)
	{
		document.getElementById('corinevis').checked=false;
	}
	if(document.getElementById('slopevis').checked==true)
	{
		document.getElementById('slopevis').checked=false;
	}
	if(document.getElementById('behavevis').checked==true)
	{
		document.getElementById('behavevis').checked=false;
	}
	if(document.getElementById('elevationvis').checked==true)
	{
		document.getElementById('elevationvis').checked=false;
	}
    //alert("xaxa"+fid);
			if(checked.toString()=='true')
	{
//viewer.dataSources.removeAll(false);	
removeCustomDatasourceVIS(iam);
		dataSourceaspectvis.load('../../db/forests/'+fid+'/aspect.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
		});
		viewer.dataSources.add(dataSourceaspectvis)
		.then( function (dataSourceaspectvis) {
		
		var west = forests_west[fid];
var south = forests_south[fid];
var east = forests_east[fid];
var north = forests_north[fid];
jumpSetupsles_VIS(west, south, east,north);
		/*
		viewer.flyTo(dataSourceaspectvis.entities,{
	duration:3.0,
	maximumHeight:0,
	offset : {
            heading : 0.0,
            pitch : Cesium.Math.toRadians(-90.0),
            range : 0.0
        }
	
});
		*/});
//viewer.dataSources.add(Cesium.KmlDataSource
   // .load('../../db/forests/'+fid+'/aspect.kml', {
   //     camera: viewer.camera,
  //      canvas: viewer.canvas
 //   })
//)
//.then( function (dataSource) {
 //   viewer.flyTo(dataSource.entities,{
//	duration:3.0,
//	maximumHeight:0,
	//offset : {
          //  heading : 0.0,
         //   pitch : Cesium.Math.toRadians(-90.0),
         //   range : 0.0
        //}
	
//});
//});
	}
			if(checked.toString()=='false')
	{
		//viewer.dataSources.removeAll(false);
		removeCustomDatasourceVIS('all');
	}	
}


function reset_checkboxes_VIS(){
	if(document.getElementById('corinevis').checked==true)
	{
		document.getElementById('corinevis').checked=false;
	}
	if(document.getElementById('slopevis').checked==true)
	{
		document.getElementById('slopevis').checked=false;
	}
	if(document.getElementById('behavevis').checked==true)
	{
		document.getElementById('behavevis').checked=false;
	}
	if(document.getElementById('elevationvis').checked==true)
	{
		document.getElementById('elevationvis').checked=false;
	}
	if(document.getElementById('aspectvis').checked==true)
	{
		document.getElementById('aspectvis').checked=false;
	}
}

function onClickResetCheckScenarios()
{
	var rows = document.getElementById("simdetailsdivtables").getElementsByTagName("tr").length;
	//arxikopoio kai to td gia to minutesfotias
	if (typeof document.getElementsByName('minutesfotias')[0] != 'undefined'){
		var mikos=document.getElementsByName('minutesfotias');
		var yyy =mikos.length-1;
		while (mikos.length > 0) {
			var tempminutesfotias= document.getElementsByName('minutesfotias')[yyy];
			tempminutesfotias.parentNode.removeChild(tempminutesfotias);
			yyy--;
		}
	}
	//activate default sorting
	console.log("activate default sorting");
	activatesortepitelous_default_sort();
	var sortbtnclickfire_def=$('#mana_def');
	sortbtnclickfire_def.click();
	console.log("EKANA SORTARISMA MESA STI RESET CHECKSCENARIOS??");
	for(var resti=1; resti<rows+1; resti=resti+1)
	{
		var sceid = document.getElementById("sce#"+resti);
									//alert("simdetailsdivtables rows:"+rows+" and sce"+i+" ");
		sceid.style.fontWeight="normal";
		sceid.style.display="block";								
	}

}

function LoadForestsSimulations(fid)
{
	//alert("LoadForestsSimulations: FID:"+fid);
	RemoveForestsSimulations();
	for (var jj = 0; jj < all_sims_fid.length; jj += 1) {
		if ( all_sims_fid[jj] == fid)
		{
			var x = document.createElement("OPTION");
			x.setAttribute("value", jj);
			x.style.color="black";
			x.setAttribute("id", all_sims_fid[jj]);
			var t = document.createTextNode(all_sims_name[jj]);
			x.appendChild(t);
			document.getElementById("forestDownVISALLSIMS").appendChild(x);
			//x.innerHTML=all_sims_name[jj];	
			//strSimulations=strSimulations+'<option value="'+jj+'" id="'+all_sims_fid[jj]+'">'+all_sims_name[jj]+'</option>';		
		}
	}
	//add another one option empty and select it
	var x = document.createElement("OPTION");
	//x.setAttribute("value", jj);
	//x.style.color="black";
	//x.setAttribute("id", all_sims_fid[jj]);
	//var t = document.createTextNode(all_sims_name[jj]);
	//x.appendChild(t);
	x.selected="yes";
	document.getElementById("forestDownVISALLSIMS").appendChild(x);
	
	//check if must be selected other option than empty
	if (typeof VISsid != 'undefined'){
		if (VISfid == fid){
			for (var jj = 0; jj < all_sims_fid.length; jj += 1) {
				if ( all_sims_fid[jj] == fid){
					if (jj==VISsid){
						//then it should be selected
							var selsim = document.getElementById('forestDownVISALLSIMS');
							for(var i = 0, j = selsim.options.length; i < j; ++i) {
								if(selsim.options[i].value == VISsid) {
									selsim.selectedIndex = 0;
									selsim.selectedIndex = i;
									break;
								}
							}
					}
				}
			}
		}
	}

}

function RemoveForestsSimulations()
{
	var x = document.getElementById("forestDownVISALLSIMS");
	console.log("BEFORE RemoveForestsSimulations:x.length "+x.length);
	var limit=x.length;
	for (var jj = limit; jj >= 0; jj -= 1) {
		x.remove(jj);
	}
	console.log("AFTER RemoveForestsSimulations:x.length "+x.length);
}

function LoadSelectedSimulation(sid)
{
	if (typeof sid == 'undefined'){
		var ee = {
			value: this.options[this.selectedIndex].value
		};
		console.log("LoadSelectedSimulation:mpika sto undefined:ee.value="+ee.value);
		if (ee.value == "" ){
			//alert("null value should sop and disable the burn propabilities");
			document.getElementById("DEFAULT_SCEN_VIS").disabled= true;
			return;
		}
	}
	else
	{
		var ee = {
			value: sid
		};
		console.log("LoadSelectedSimulation:mpika sto sid"+sid);
	}
	document.getElementById("DEFAULT_SCEN_VIS").disabled= false;//an ola pane kala tote kane enable to default
	//set global variables and then call visualize results
	loadsimulationYO(ee);//call from Parent test.php
	//alert("LoadSelectedSimulation MPIKA NA KANO SELECT AYTO POU PREPEI OSTE VALUE="+ee.value);
	var selsim = document.getElementById('forestDownVISALLSIMS');
	for(var i = 0, j = selsim.options.length; i < j; ++i) {
		if(selsim.options[i].value == ee.value) {
			selsim.selectedIndex = 0;
			selsim.selectedIndex = i;
			break;
		}
	}
	onChangeSimulationDropdown();
}

 function onChangeSimulationDropdown()
{
	//CLEAR PREVIOUS ON MAP
	clear_form_on_fly_vis();
	
	//alert("!visualization::visualizeloadsimulation::VISsid: "+VISsid+" ::VISfid "+VISfid+" :: VISsimname"+VISsimname);
	readTextFile("../../db/simulations/"+VISfid+"/"+VISsid+"/SetupLog.txt");
	//alert("efiga forestDown "+forestDown+":sid: "+sid+" and lat:"+lat);
viewer.dataSources.removeAll(false);
		dataSourceanimevis.load('../../db/simulations/'+VISfid+'/'+VISsid+'/Probability_Animation.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
		});
		viewer.dataSources.add(dataSourceanimevis)
		.then( function (dataSourceanimevis) {
		viewer.flyTo(dataSourceanimevis.entities,{
	duration:3.0,
	maximumHeight:0,
	offset : {
            heading : 0.0,
            pitch : Cesium.Math.toRadians(-90.0),
            range : 0.0
        }
	
});
		});
}

function default_scen_visbtn()
{
		console.log("patao to btn gia default");
		var ee = {
		value: VISsid
		};
		console.log("PAOPAOPAOPAOPAOPAOPAOPAOPAOPAOPAOPAOPAO NA TA KANO UNVISIBLE");
		var rstckbx=document.getElementById("DEFAULT_SCEN_VIS_CHECKBOX");
		rstckbx.style.display="none";
		loadsimulationYO(ee);
		onChangeSimulationDropdown();

	/*if (checked.toString()=='true'){
		var ee = {
			value: VISsid
		};
		loadsimulationYO(ee);
		onChangeSimulationDropdown();
		var rstckbx=document.getElementById("DEFAULT_SCEN_VIS_CHECKBOX");
		console.log("default_scen_vis:PRIN "+document.getElementById("DEFAULT_SCEN_VIS_CHECKBOX").checked);
		document.getElementById("DEFAULT_SCEN_VIS").checked = false;
		console.log("default_scen_vis:META "+document.getElementById("DEFAULT_SCEN_VIS_CHECKBOX").checked);
		rstckbx.style.display="none";
	}
	else if (checked.toString()=='false'){
		console.log("default_scen_vis:TIPOTA");
		document.getElementById("DEFAULT_SCEN_VIS").checked = false;
	}*/
	
}


//visiblerows
function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch,indexsort,indexepitelous,indeyepitelous;
  table = document.getElementById("simdetailsdivtables");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
	for (var ipnoe=0;ipnoe<visiblerows.length;ipnoe++){
		console.log("KLAIO ME MAVRO DAKIR visiblerows["+ipnoe+"]:"+visiblerows[ipnoe]);
	}
    //for (i = 0; i < (rows.length - 1); i++) {
	for ( indexsort=(visiblerows.length)-1;indexsort >0 ;indexsort-- ) {
		console.log("sortTable: exei "+visiblerows.length+" visible");
		console.log("sortTable: ta opoia exoun id "+visiblerows[indexsort]+" kai "+visiblerows[indexsort-1]);
		//console.log("sortTable: toulaxiston girnaei kala? "+rows[visiblerows[indexsort]-1].getElementsByTagName("TD")[3].innerHTML.toLowerCase()+" ???");
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      //x = rows[i].getElementsByTagName("TD")[5];
      //y = rows[i + 1].getElementsByTagName("TD")[5];
	  console.log("SORTTABLE X:"+((visiblerows[indexsort])-1)+" and Y:"+((visiblerows[indexsort-1])-1)+" kai to indexsort einai "+indexsort);
	  
	   indexepitelous=((visiblerows[indexsort])-1);
	   indeyepitelous=((visiblerows[indexsort-1])-1);
	   console.log("SORTTABLE indexepitelous:"+indexepitelous+" and indeyepitelous:"+indeyepitelous+" kai to indexsort einai "+indexsort);
		x = rows[indexepitelous].getElementsByTagName("TD")[3];
		y = rows[indeyepitelous].getElementsByTagName("TD")[3];
      //check if the two rows should switch place:
	  
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
		console.log("SORTTABLE prepei na ginei metathesi");
        shouldSwitch= true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
	  //rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      //rows[indexepitelous].parentNode.insertBefore(rows[indexepitelous + 1], rows[indexepitelous]);
		swapTRs(rows[indexepitelous],rows[indeyepitelous]);
      switching = true;
    }
  }
}

function swapTRs(tr1, tr2) 
{
        var numCols = tr1.childNodes.length; // number of columns
        var i;
        for (i=0; i<numCols ; i++) {
              tmp = tr1.childNodes[i].innerHTML;  
              tr1.childNodes[i].innerHTML = tr2.childNodes[i].innerHTML;
              tr2.childNodes[i].innerHTML = tmp;
       }
  }
  
function myFunction(){

console.log("Patithike to myFunction");

}

function myFunctiondef(){

console.log("Patithike to myFunctiondef");

}

function activatesortepitelous(){
	console.log("activatesortepitelous Eginan acctivate amin");
	tableFIL= $('#simdetailsdivtables');
	manoula=$('#mana');//minutesfotiasth
	$('#minutesfotiasth5')
        .wrapInner('<span title="sort this column"/>')
        .each(function(){
            
			
			
            var th = $(this),
                thIndex = th.index(),
                inverse = false;
            
            manoula.click(function(){
                console.log("PTITHIKE I MANA");
                tableFIL.find('td').filter(function(){
                    
                    return $(this).index() === thIndex;
                    
                }).sortElements(function(a, b){
                    console.log("EIMAI I SORTEIMAI I SORTEIMAI I SORTEIMAI I SORTEIMAI I SORT:$.text([a]) :"+Number($.text([a]).substr($.text([a]).lastIndexOf(";")+1,$.text([a]).lastIndexOf("'")-$.text([a]).lastIndexOf(";")-1)));//Number('09')
                    return Number($.text([a]).substr($.text([a]).lastIndexOf(";")+1,$.text([a]).lastIndexOf("'")-$.text([a]).lastIndexOf(";")-1)) > Number($.text([b]).substr($.text([b]).lastIndexOf(";")+1,$.text([b]).lastIndexOf("'")-$.text([b]).lastIndexOf(";")-1)) ?
                        inverse ? -1 : 1
                        : inverse ? 1 : -1;
                    
                }, function(){
                    
                    // parentNode is the element we want to move
                    return this.parentNode; 
                    
                });
                
                inverse = !inverse;
                    
            });
                
        });
}


function activatesortepitelous_default_sort(){
	console.log("activatesortepitelous_default_sort Eginan acctivate gia default");
	tableFIL= $('#simdetailsdivtables');
	manoula_def=$('#mana_def');//minutesfotiasth
	$('#defsorting')
        .wrapInner('<span title="sort this column"/>')
        .each(function(){
            
			
			
            var th = $(this),
                thIndex = th.index(),
                inverse = false;
            
            manoula_def.click(function(){
                console.log("PTITHIKE I reset_perimeter");
                tableFIL.find('td').filter(function(){
                    
                    return $(this).index() === thIndex;
                    
                }).sortElements(function(a, b){
                    console.log("EIMAI I SORTEIMAI I SORTEIMAI I SORTEIMAI I SORTEIMAI I SORT:$.text([a]) :"+Number($.text([a]).substr(($.text([a]).indexOf("-"))+3,($.text([a]).indexOf("'"))-($.text([a]).indexOf("-"))+1-4)));//Number('09')
                    return $.text([a]) > $.text([b]) ?
                        inverse ? -1 : 1
                        : inverse ? 1 : -1;
                    
                }, function(){
                    
                    // parentNode is the element we want to move
                    return this.parentNode; 
                    
                });
                
                inverse = !inverse;
                    
            });
                
        });
}

function getcurrentclocktime(){
	//var clock = viewer.clock;
	var curtime;
	console.log("getcurrentclocktime TIME IS :"+viewer.clock.currentTime);
	curtime=viewer.clock.currentTime;
	return curtime;
}
function setcurrentclocktime(curtime){
	console.log("setcurrentclocktime TIME TO :"+curtime);
	viewer.clock.currentTime = curtime;
}



function jumpSetupsles_VIS(west, south, east,north) 
{
	console.log("i am jumpSetupsimpaogiaipno and i clear the map from previous layers/primitives/kmls");
	//clear_form_on_fly();
	console.log("eimai i jumpSetupsimpaogiaipno::::::::::::::::::: westreal: "+west+" southreal:"+south+" eastreal: "+east+" northreal:"+north);
    var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

    viewer.camera.flyTo({
        destination : rectangle
    });
	viewer.entities.add({
    rectangle : {
        coordinates : rectangle,
        fill : false,
        outline : true,
        outlineColor : Cesium.Color.WHITE
    }
});
}