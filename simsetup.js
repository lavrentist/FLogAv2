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
 
 // function savetodasos(viewer,extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname) 
function flySetup (selection) 
{
	//defaultLayerckbx();
	//viewer.entities.removeAll();
	/*var primitives1 = scene.primitives;
							var length = primitives1.length;
							var i =primitives1.length-1;
							while (primitives1.length > 1) {
								console.log("primitives1.length: "+primitives1.length+" and i= "+i);
								var p = primitives1.get(i);
								scene.primitives.remove(p);
								i--;
							}*/
	//alert("eimai i fly setup:"+this.options[this.selectedIndex].id+" kala");
	//alert("dasos lat:"+forests_lat[this.options[this.selectedIndex].id]+" lon "+forests_lon[this.options[this.selectedIndex].id]);
	
	if (typeof selection == 'undefined'){
	if (this.options[this.selectedIndex].id) 
    	{
       		//jumpSetup (forests_lat[this.options[this.selectedIndex].id], forests_lon[this.options[this.selectedIndex].id], 0);
       		w_lat=forests_lat[this.options[this.selectedIndex].id];
       		w_lon=forests_lon[this.options[this.selectedIndex].id];
       		w_id=this.options[this.selectedIndex].id;
			var west = forests_west[this.options[this.selectedIndex].id];
			var south = forests_south[this.options[this.selectedIndex].id];
			var east = forests_east[this.options[this.selectedIndex].id];
			var north = forests_north[this.options[this.selectedIndex].id];
       		jumpSetupsimpaogiaipno(west, south, east,north);
       		weather(0);
       		showLayer (this.options[this.selectedIndex].id, 'pipa', -1);
       		
       		var http2 = new XMLHttpRequest();
		var url2 = "../../include/fidtofuels.php?fid="+this.options[this.selectedIndex].id;
		http2.open("GET", url2, true);
		http2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http2.setRequestHeader("Connection", "close");
		var response;
		var elSel = document.getElementById('fuelDown');
		var i;
		if (elSel.length > 1)
  		{
  			/*for(i=1; i<elSel.length; i++)
  			{
  				elSel.remove(i);
  			}*/
			var yyy =elSel.length-1;
			while (elSel.length > 0) {
			console.log("for loop remove:lenght"+elSel.length);
			elSel.remove(yyy);
			yyy--;
			}
			//add only one layer the original!!
			var elOptNewt = document.createElement('option');
			elOptNewt.text = "Original";
			elOptNewt.style.color="black";
			elSel.add(elOptNewt, null); // standards compliant; doesn't work in IE

  		}

		http2.onreadystatechange = function() { 
						
						if(http2.readyState == 4 && http2.status == 200) 
						{
							//alert("epestrepse i fidtofuels");
							response=http2.responseText.split("^");
							var count=response.length;
							//alert("epestrepse i fidtofuels count"+response[0]);
							elSel = document.getElementById('fuelDown');
							
							for (i=0; i<count-1; i++)
							{
								var elOptNew = document.createElement('option');
  								elOptNew.text = response[i];//style="color:black"
								elOptNew.style.color="black";
  								elOptNew.value = response[i];
								//alert("epestrepse i fidtofuels response[i]: "+response[i]);
  								elSel.add(elOptNew, null); // standards compliant; doesn't work in IE
  							}
						}
					}		
  		http2.send();
	}
	//global_forests_placemarks.push({i: (global_forests_placemarks.length+1), lat: (northwestlatDegrees+southeastlatDegrees)/2, lon: (northeastlonDegrees+southwestlonDegrees)/2, fid: fidModis, name: fname});
	//doulepse(global_forests_placemarks.length, forests_reallat[this.options[this.selectedIndex].id], forests_reallon[this.options[this.selectedIndex].id], this.options[this.selectedIndex].id, this.options[this.selectedIndex].text);
	}
	else
	{
		//alert('selection: '+selection);
		///////////////SAME AS ABOVE JUST IT CAN BE CALLED WITH A PARAM EXCEPT FOR THIS
		if (selection) 
    	{
       		//jumpSetup (forests_lat[selection], forests_lon[selection], 0);
       		w_lat=forests_lat[selection];
       		w_lon=forests_lon[selection];
       		w_id=selection;
			var west = forests_west[selection];
			var south = forests_south[selection];
			var east = forests_east[selection];
			var north = forests_north[selection];
       		jumpSetupsimpaogiaipno(west, south, east,north);
       		weather(0);
       		showLayer (selection, 'pipa', -1);
       		
       		var http2 = new XMLHttpRequest();
		var url2 = "../../include/fidtofuels.php?fid="+selection;
		http2.open("GET", url2, true);
		http2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http2.setRequestHeader("Connection", "close");
		var response;
		var elSel = document.getElementById('fuelDown');
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
							//alert("epestrepse i fidtofuels count"+response[0]);
							elSel = document.getElementById('fuelDown');
							
							for (i=0; i<count-1; i++)
							{
								var elOptNew = document.createElement('option');
  								elOptNew.text = response[i];
  								elOptNew.value = response[i];
								//alert("epestrepse i fidtofuels response[i]: "+response[i]);
  								elSel.add(elOptNew, null); // standards compliant; doesn't work in IE
  							}
						}
					}		
  		http2.send();
	}
	//alert("to onoma einai:"+document.getElementById('fuelDown').options.innerHTML);
	//doulepse(global_forests_placemarks.length, forests_reallat[selection], forests_reallon[selection], selection, document.getElementById('fuelDown').options.innerHTML);
	}

}

function jumpSetupsimpaogiaipno(west, south, east,north) 
{
	console.log("i am jumpSetupsimpaogiaipno and i clear the map from previous layers/primitives/kmls");
	clear_form_on_fly();
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

function clear_form_on_fly()
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

function jumpSetup (lat, lon, rot) 
{

  	lat=parseFloat(lat);
  	lon=parseFloat(lon);
	console.log("eimai i jumpSetup kai pao sto lat:"+lat+" kai lon:"+lon+" kai rot:"+rot);
    viewer.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(lon,lat,50000.0),
        orientation : {
            heading : 0.0,
            pitch : Cesium.Math.toRadians(-90.0),
            range : 0.0
        }
    });

}

var dataSourceelev = new Cesium.KmlDataSource();
var dataSourceslope = new Cesium.KmlDataSource();
var dataSourceaspect = new Cesium.KmlDataSource();
var dataSourcebehave = new Cesium.KmlDataSource();
var dataSourcecorine = new Cesium.KmlDataSource();
var dataSourceanime = new Cesium.KmlDataSource();

var dataSourceFuelLayer = new Cesium.KmlDataSource();

function removeCustomDatasourceSIM(iam) 
{
	console.log("EIMAI APO SIMSETUP:::::::::::::::::::::::::::::::::::>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
	//viewer.dataSources.add('../../db/forests/'+fid+'/aspect.kml');
	if ( iam == 'slope' )
	{
		viewer.dataSources.remove(dataSourceelev);
		viewer.dataSources.remove(dataSourceaspect);
		viewer.dataSources.remove(dataSourcebehave);
		viewer.dataSources.remove(dataSourcecorine);
	}
	if ( iam == 'elev' )
	{
		viewer.dataSources.remove(dataSourceslope);
		viewer.dataSources.remove(dataSourceaspect);
		viewer.dataSources.remove(dataSourcebehave);
		viewer.dataSources.remove(dataSourcecorine);
	}
	if ( iam == 'aspect' )
	{
		viewer.dataSources.remove(dataSourceelev);
		viewer.dataSources.remove(dataSourceslope);
		viewer.dataSources.remove(dataSourcebehave);
		viewer.dataSources.remove(dataSourcecorine);
	}
	if ( iam == 'behave' )
	{
		viewer.dataSources.remove(dataSourceslope);
		viewer.dataSources.remove(dataSourceaspect);
		viewer.dataSources.remove(dataSourceelev);
		viewer.dataSources.remove(dataSourcecorine);
	}
	if ( iam == 'corine' )
	{
		viewer.dataSources.remove(dataSourceelev);
		viewer.dataSources.remove(dataSourceaspect);
		viewer.dataSources.remove(dataSourcebehave);
		viewer.dataSources.remove(dataSourceslope);
	}
	if ( iam == 'all' )
	{
		viewer.dataSources.remove(dataSourceelev);
		viewer.dataSources.remove(dataSourceslope);
		viewer.dataSources.remove(dataSourceaspect);
		viewer.dataSources.remove(dataSourcebehave);
		viewer.dataSources.remove(dataSourcecorine);
	}
}

function showLayer (fid, sid, min) 
{
  //alert("eimai i showlayer kai pao sto "+fid);
  	if(min==-1)
  	{
		console.log("eimai i showLayer kai pao sto fid:"+fid+" kai sid:"+sid+" kai min:"+min);
		document.getElementById('elevation').checked=false;
		document.getElementById('aspect').checked=false;
		document.getElementById('corine').checked=false;
		document.getElementById('behave').checked=true;
		document.getElementById('slope').checked=false;
		AutoBehaveSimSetup(true,fid);
		/*dataSourceelev.load('../../db/forests/'+fid+'/behave.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
		});
		viewer.dataSources.removeAll(false);
		viewer.dataSources.add(dataSourceelev)
		.then( function (dataSourceelev) {
		viewer.flyTo(dataSourceelev.entities,{
	duration:3.0,
	maximumHeight:0,
	offset : {
            heading : 0.0,
            pitch : Cesium.Math.toRadians(-90.0),
            range : 4000000
        }
	
});
		});	*/
  	}
	else if (min==0)
	{
		//alert("mpika sto min =0");
		console.log("eimai i showLayer mpika sto min =0");
		//var url = "<?php echo $siteUrl; ?>thesis/db/forests/"+fid+"/"+"fuelRate.kml";
		viewer.dataSources.removeAll(false);	
		viewer.dataSources.add(Cesium.KmlDataSource
		.load('../../db/forests/'+fid+'/fuelRate.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
		})
		)
		.then( function (dataSource) {/*
		viewer.flyTo(dataSource.entities,{
	duration:3.0,
	maximumHeight:0,
	offset : {
            heading : 0.0,
            pitch : Cesium.Math.toRadians(-90.0),
            range : 0.0
        }
	
});
		*/
			var west = forests_west[fid];
			var south = forests_south[fid];
			var east = forests_east[fid];
			var north = forests_north[fid];
       		jumpSetupsles(west, south, east,north);
			});	
	}
  	else
  	{
  		var url = "<?php echo $siteUrl; ?>thesis/db/simulations/"+fid+"/"+sid+"/kmls/"+min+".kml";
  		minute=min;
		//google.earth.fetchKml(ge, url, finishedAnime);
  	}

}

function fuelDown() 
{
	///alert("eimai i fuelDown");
	if(document.getElementById('fuelDown').options[document.getElementById('fuelDown').selectedIndex].value=="Original")
	{
		
		//LOAD the deafult behave
		viewer.dataSources.removeAll(false);
		removeCustomDatasourceSIM('all');
				document.getElementById('elevation').checked=false;
		document.getElementById('aspect').checked=false;
		document.getElementById('corine').checked=false;
		document.getElementById('behave').checked=true;
		document.getElementById('slope').checked=false;
		AutoBehaveSimSetup(true,document.getElementById('forestDown').options[document.getElementById('forestDown').selectedIndex].id);
		//google.earth.fetchKml(ge, '<?php echo $siteUrl; ?>thesis/db/forests/'+document.getElementById('forestDown').options[document.getElementById('forestDown').selectedIndex].id+'/behave.kml', finished);
	}
	else
	{
				console.log('[fuelDown]diavase to allo layer me id: '+document.getElementById('forestDown').options[document.getElementById('forestDown').selectedIndex].id+' Mipos iparxei kai to arxeio? '+'fuelRate'+document.getElementById('fuelDown').options[document.getElementById('fuelDown').selectedIndex].value+'.kml');
		//google.earth.fetchKml(ge, '<?php echo $siteUrl; ?>thesis/db/forests/'+document.getElementById('forestDown').options[document.getElementById('forestDown').selectedIndex].id+'/fuelRate'+document.getElementById('sourceFuelDown').options[document.getElementById('sourceFuelDown').selectedIndex].value+'.kml', finished);
		//viewer.dataSources.removeAll(false);
		viewer.dataSources.remove(dataSourceFuelLayer);	
		dataSourceFuelLayer.load('../../db/forests/'+document.getElementById('forestDown').options[document.getElementById('forestDown').selectedIndex].id+'/fuelFlame'+document.getElementById('fuelDown').options[document.getElementById('fuelDown').selectedIndex].value+'.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
		});
				viewer.dataSources.add(dataSourceFuelLayer)
		.then( function (dataSourceFuelLayer) {
						var west = forests_west[document.getElementById('forestDown').options[document.getElementById('forestDown').selectedIndex].id];
			var south = forests_south[document.getElementById('forestDown').options[document.getElementById('forestDown').selectedIndex].id];
			var east = forests_east[document.getElementById('forestDown').options[document.getElementById('forestDown').selectedIndex].id];
			var north = forests_north[document.getElementById('forestDown').options[document.getElementById('forestDown').selectedIndex].id];
       		jumpSetupsles(west, south, east,north);
			/*
		viewer.flyTo(dataSourceFuelLayer.entities,{
	duration:3.0,
	maximumHeight:0,
	offset : {
            heading : 0.0,
            pitch : Cesium.Math.toRadians(-90.0),
            range : 0.0
        }
	
});
		*/});/*
		viewer.dataSources.add(Cesium.KmlDataSource
		.load('../../db/forests/'+document.getElementById('forestDown').options[document.getElementById('forestDown').selectedIndex].id+'/fuelFlame'+document.getElementById('fuelDown').options[document.getElementById('fuelDown').selectedIndex].value+'.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
		})
		)
		.then( function (dataSource) {
						var west = forests_west[document.getElementById('forestDown').options[document.getElementById('forestDown').selectedIndex].id];
			var south = forests_south[document.getElementById('forestDown').options[document.getElementById('forestDown').selectedIndex].id];
			var east = forests_east[document.getElementById('forestDown').options[document.getElementById('forestDown').selectedIndex].id];
			var north = forests_north[document.getElementById('forestDown').options[document.getElementById('forestDown').selectedIndex].id];
       		jumpSetupsles(west, south, east,north);
});*/
		//google.earth.fetchKml(ge, '<?php echo $siteUrl; ?>thesis/db/forests/'+document.getElementById('forestDown').options[document.getElementById('forestDown').selectedIndex].id+'/behave'+document.getElementById('fuelDown').options[document.getElementById('fuelDown').selectedIndex].value+'.kml', finished);
	}
}


function AutoSlopeSimSetup(checked,fid){
	var iam='slope';
	console.log("eimai i AutoSlopeSimSetup kai exo fid:"+fid+" kai checked= "+checked);
		if(fid==-1)
	{
		
		fid=document.getElementById('forestDown').options[document.getElementById('forestDown').selectedIndex].id;
		console.log("to fid ginetai:"+fid);
	}
	if(document.getElementById('corine').checked==true)
	{
		document.getElementById('corine').checked=false;
	}
	if(document.getElementById('aspect').checked==true)
	{
		document.getElementById('aspect').checked=false;
	}
	if(document.getElementById('elevation').checked==true)
	{
		document.getElementById('elevation').checked=false;
	}
	if(document.getElementById('behave').checked==true)
	{
		document.getElementById('behave').checked=false;
	}
    //alert("xaxa"+fid);
		if(checked.toString()=='true')
	{
//viewer.dataSources.removeAll(false);	
removeCustomDatasourceSIM(iam);
		dataSourceslope.load('../../db/forests/'+fid+'/slope.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
		});
		viewer.dataSources.add(dataSourceslope)
		.then( function (dataSourceslope) { /*
		viewer.flyTo(dataSourceslope.entities,{
	duration:3.0,
	maximumHeight:0,
	offset : {
            heading : 0.0,
            pitch : Cesium.Math.toRadians(-90.0),
            range : 0.0
        }
	
});
		*/
					var west = forests_west[fid];
			var south = forests_south[fid];
			var east = forests_east[fid];
			var north = forests_north[fid];
       		jumpSetupsles(west, south, east,north);});
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
		//viewer.dataSources.removeAll(false);
		removeCustomDatasourceSIM('all');
	}	
}

function AutoAspectSimSetup(checked,fid){
	var iam='aspect';
	console.log("eimai i AutoAspectSimSetup kai exo fid:"+fid+" kai checked= "+checked);//alert("eimai i AutoAspectSimSetup");
		if(fid==-1)
	{
		
		fid=document.getElementById('forestDown').options[document.getElementById('forestDown').selectedIndex].id;
		console.log("to fid ginetai:"+fid);
	}
	if(document.getElementById('corine').checked==true)
	{
		document.getElementById('corine').checked=false;
	}
	if(document.getElementById('slope').checked==true)
	{
		document.getElementById('slope').checked=false;
	}
	if(document.getElementById('behave').checked==true)
	{
		document.getElementById('behave').checked=false;
	}
	if(document.getElementById('elevation').checked==true)
	{
		document.getElementById('elevation').checked=false;
	}
    //alert("xaxa"+fid);
			if(checked.toString()=='true')
	{
//viewer.dataSources.removeAll(false);	
removeCustomDatasourceSIM(iam);
		dataSourceaspect.load('../../db/forests/'+fid+'/aspect.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
		});
		viewer.dataSources.add(dataSourceaspect)
		.then( function (dataSourceaspect) {
						var west = forests_west[fid];
			var south = forests_south[fid];
			var east = forests_east[fid];
			var north = forests_north[fid];
       		jumpSetupsles(west, south, east,north);/*
		
		viewer.flyTo(dataSourceaspect.entities,{
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
		removeCustomDatasourceSIM('all');
	}	
}

function AutoElevationSimSetup(checked,fid){
	var iam='elev';
	console.log("eimai i AutoElevationSimSetup kai exo fid:"+fid+" kai checked= "+checked);//alert("eimai i AutoAspectSimSetup");//alert("eimai i AutoElevationSimSetup");
		if(fid==-1)
	{
		
		fid=document.getElementById('forestDown').options[document.getElementById('forestDown').selectedIndex].id;
		console.log("to fid ginetai:"+fid);
	}
	if(document.getElementById('corine').checked==true)
	{
		document.getElementById('corine').checked=false;
	}
	if(document.getElementById('slope').checked==true)
	{
		document.getElementById('slope').checked=false;
	}
	if(document.getElementById('aspect').checked==true)
	{
		document.getElementById('aspect').checked=false;
	}
	if(document.getElementById('behave').checked==true)
	{
		document.getElementById('behave').checked=false;
	}
    //alert("xaxa"+fid);
			if(checked.toString()=='true')
	{
//viewer.dataSources.removeAll(false);	
removeCustomDatasourceSIM(iam);
		dataSourceelev.load('../../db/forests/'+fid+'/elev.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
		});
		viewer.dataSources.add(dataSourceelev)
		.then( function (dataSourceelev) {
						var west = forests_west[fid];
			var south = forests_south[fid];
			var east = forests_east[fid];
			var north = forests_north[fid];
       		jumpSetupsles(west, south, east,north);/*
		viewer.flyTo(dataSourceelev.entities,{
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
		removeCustomDatasourceSIM('all');
	}	
}

function AutoBehaveSimSetup(checked,fid){
	var iam='behave';
	console.log("eimai i AutoBehaveSimSetup kai exo fid:"+fid+" kai checked= "+checked);//alert("eimai i AutoBehaveSimSetup");
		if(fid==-1)
	{
		
		fid=document.getElementById('forestDown').options[document.getElementById('forestDown').selectedIndex].id;
		console.log("to fid ginetai:"+fid);
	}
	if(document.getElementById('corine').checked==true)
	{
		document.getElementById('corine').checked=false;
	}
	if(document.getElementById('slope').checked==true)
	{
		document.getElementById('slope').checked=false;
	}
	if(document.getElementById('aspect').checked==true)
	{
		document.getElementById('aspect').checked=false;
	}
	if(document.getElementById('elevation').checked==true)
	{
		document.getElementById('elevation').checked=false;
	}
    //alert("xaxa"+fid);
			if(checked.toString()=='true')
	{
//viewer.dataSources.removeAll(false);	
removeCustomDatasourceSIM(iam);
		dataSourcebehave.load('../../db/forests/'+fid+'/behave.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
		});
		viewer.dataSources.add(dataSourcebehave)
		.then( function (dataSourcebehave) {
						var west = forests_west[fid];
			var south = forests_south[fid];
			var east = forests_east[fid];
			var north = forests_north[fid];
       		jumpSetupsles(west, south, east,north);
			/*
		viewer.flyTo(dataSourcebehave.entities,{
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
		removeCustomDatasourceSIM('all');
	}	
}


function AutoCorineSimSetup(checked,fid){
	var iam='corine';
	console.log("eimai i AutoCorineSimSetup kai exo fid:"+fid+" kai checked= "+checked);//alert("eimai i AutoCorineSimSetup");
		if(fid==-1)
	{
		
		fid=document.getElementById('forestDown').options[document.getElementById('forestDown').selectedIndex].id;
		console.log("to fid ginetai:"+fid+" kai to showaspect:"+document.getElementById('aspect').checked);
	}
	if(document.getElementById('behave').checked==true)
	{
		document.getElementById('behave').checked=false;
	}
	if(document.getElementById('slope').checked==true)
	{
		document.getElementById('slope').checked=false;
	}
	if(document.getElementById('aspect').checked==true)
	{
		document.getElementById('aspect').checked=false;
	}
	if(document.getElementById('elevation').checked==true)
	{
		document.getElementById('elevation').checked=false;
	}
    //alert("xaxa"+fid);
			if(checked.toString()=='true')
	{
//viewer.dataSources.removeAll(false);	
removeCustomDatasourceSIM(iam);
		dataSourcecorine.load('../../db/forests/'+fid+'/corine.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
		});
		viewer.dataSources.add(dataSourcecorine)
		.then( function (dataSourcecorine) {
						var west = forests_west[fid];
			var south = forests_south[fid];
			var east = forests_east[fid];
			var north = forests_north[fid];
       		jumpSetupsles(west, south, east,north);
			/*
		viewer.flyTo(dataSourcecorine.entities,{
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
		removeCustomDatasourceSIM('all');
	}		
}

	var w_lat=0;
	var w_lon=0;
	var w_id=-1;

var theta;
var alpha;
var f;
var dif_lat;
var dif_lon;
var alpha2;
var simulationCanStart=0; //used for weather() and setForest() synch when calling simulation()
var fidModis; //used for weather() and setForest() synch when calling simulation()
	
function weather (mode) 
{	
	//alert("Whaat ? weather");		
	var http2= new XMLHttpRequest();
	var url2="../../include/wunderground.php?lat="+w_lat+"&lon="+w_lon;

	http2.open("GET", url2, true);
	//http2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http2.setRequestHeader("Connection", "close");
	http2.onreadystatechange = function() 
	{ 	
			//alert("weather pou mpainei?");
		if(http2.readyState == 4 && http2.status == 200) 
		{
			//alert("epestrepse i weather");
			if(http2.responseText=='NULL' && mode!=3)
			{
				//alert("No METAR station nearby!");
				return(0);
			}
			else if(http2.responseText=='NULL')
			{
				//alert("weather responseText=='NULL");
				pm_el = document.getElementById('wsmin');//el('wsmin');
				pm_el.value = '3';
				pm_el = document.getElementById('wsmax');//el('wsmax');
				pm_el.value = '5';
 				pm_el = document.getElementById('wdmin');//el('wdmin');
 				pm_el.value = '0';
 				pm_el = document.getElementById('wdmax');//el('wdmax');
 				pm_el.value = '60';
 				pm_el = document.getElementById('rmoi');//el('rmoi');  
 				pm_el.value = '25';  				 		
			}
			else
			{
				//alert("weather mpike sto else");
				var wind=http2.responseText.split(" "); 
				var ws=wind[1]*0.447;
				var wd=wind[0];
				moisture=wind[2];
				pm_el = document.getElementById('rmoi');;//el('rmoi');
				//alert("weather moisture:"+pm_el);
				if(pm_el.value=='' || mode==3)
				{
					pm_el.value = moisture;
				}
				document.getElementById('current_speed').innerHTML = "<font color=red>"+ws+"m/s</font>";
				document.getElementById('current_direction').innerHTML = "<font color=red>"+wd+"&#176;</font>";
				if(wd==360)
				{
					wd=0;
				}
				pm_el = document.getElementById('wsmin');//el('wsmin');

 				var temp=ws*0.8;
 				temp=temp+'';
 				temp=temp.substring(0,4);
 				var temp2=ws*1.2;

 				if(pm_el.value=='' || mode==3)
				{
 					pm_el.value=temp;
 				}
 				pm_el = document.getElementById('wsmax');//el('wsmax');

 				var temp4=ws*1.2;
 					
 				if(temp4==0)
 				{
 					temp4=2;
 				}    						
 						
 				temp4=temp4+'';
 				temp4=temp4.substring(0,4);
 				if(pm_el.value=='' || mode==3)
				{
  					pm_el.value=temp4;
 				}
 				pm_el = document.getElementById('wdmin');//el('wdmin');
 				temp=wd-20;
 				temp2=wd-(-20);
 				if(temp<0)
 				{
 					temp=360+temp;
 				}
 				if(pm_el.value=='' || mode==3)
				{
 					pm_el.value=temp;
 				}
 				pm_el = document.getElementById('wdmax');//el('wdmax');

 				if(temp2>360)
 				{
 					temp2=temp2-360;
 				}
 				if(pm_el.value=='' || mode==3)
				{
 					pm_el.value=temp2;
				}
			}
			if(simulationCanStart!=1 && (mode==1 || mode==3))
			{
				if(simulationCanStart==0)
				{
					simulationCanStart=0.5;
				}
				else if (simulationCanStart==0.5)
				{
					simulationCanStart=0.7;
				}
				else
				{
					simulationCanStart=1;
					var tempN="false";
 					//var fname=document.fName.fname.value;
					if(mode==3)
					{
						//alert("koukou eftasa mexri edo");
						simulation(ssc.value, dsc.value, tr.value, wsmin.value, wsmax.value, wdmin.value, wdmax.value, fidModis, distribution.value, tempN, 4);
					}
					else
					{
						//alert("koukou eftasa mexri edo else");
						simulation(ssc.value, dsc.value, tr.value, wsmin.value, wsmax.value, wdmin.value, wdmax.value, fidModis, distribution.value, tempN, 3);
					}								
				}
			}
		} 
	}
	http2.send();
}



function onClickAddIgnition() 
{
  	//alert("eimai i onClickAddIgnition1");
	             /*   drawHelper.startDrawingMarker({
                    callback: function(position) {
                        _self.executeListeners({name: 'markerCreated', position: position});
                    }
                });*/
	 
       // var toolbar = drawHelper.addToolbar(document.getElementById("toolbarsetup"), {
       //     buttons: ['marker', 'extent']
        //});
		/*var survivor=document.getElementById("add_ignition");
	        survivor.addListener('markerCreated', function(event) {
            loggingMessage('Marker created at ' + event.position.toString());
            // create one common billboard collection for all billboards
            var b = new Cesium.BillboardCollection();
            scene.primitives.add(b);
            var billboard = b.add({
                show : true,
                position : event.position,
                pixelOffset : new Cesium.Cartesian2(0, 0),
                eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0),
                horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
                verticalOrigin : Cesium.VerticalOrigin.CENTER,
                scale : 1.0,
                image: './img/glyphicons_242_google_maps.png',
                color : new Cesium.Color(1.0, 1.0, 1.0, 1.0)
            });
            billboard.setEditable();
        });*/
	/*var event_modifier = null;
  	pm_el = el('add_ignition');
  	if (interaction_state == MOVING_CAMERA) 
	{
  		if(counter>=30)
  		{
  			alert('Max 30 Ignition Points!');
  			return;
  		}
    		event_modifier = google.earth.addEventListener;
    		original_add_ignition_text = pm_el.innerHTML;
    		original_add_ignition_text = pm_el.value;
    		pm_el.innerHTML = '<font size="2">Click on earth</font>';
    		pm_el.value='Click on earth';
    		interaction_state = ADDING_IGNITION;
  	} 	
	else if (interaction_state == ADDING_IGNITION) 
	{
    		event_modifier = google.earth.removeEventListener;
    		pm_el.innerHTML = original_add_ignition_text;
    		pm_el.value=original_add_ignition_text;
    		interaction_state = MOVING_CAMERA;
  	} 
	else 
	{
    		// Should not be reached.
    		return;
  	}
  	event_modifier(ge.getGlobe(), "mousedown", onEarthAddIgnitionClick);
*/
}



function getIgnitions (option) 
{
	//alert("eimai i getIgnitions");
	var http1= new XMLHttpRequest();
	var url1="../../include/getIgnitions.php";
	
	http1.open("POST", url1, true);
	if(option==1)
	{
		var params1="fid="+w_id;
		http1.onreadystatechange = function() 
		{ 
			if(http1.readyState == 4 && http1.status == 200) 
			{
							//alert("epestrepse i getIgnitions");
							var response=http1.responseText; 
							var temp = new Array();
							temp = response.split(new RegExp( "[\n ]{1}", "g" ) );
							var i=1;
				if(temp.length==1)
				{
								//alert("No ignition points for this site. resp:"+http1.responseText);
				}
				else
				{
					for(i=0; i<temp.length; i=i+2)
					{
									ignitionCounter++;
								
									var g=i+'';
									var lat=temp[i];
									var lon=temp[i+1];
									europeIgnitionsLat[ignitionCounter-1] = parseFloat(lat);
									europeIgnitionsLon[ignitionCounter-1] = parseFloat(lon);
									//var latlon= new GLatLng(lat, lon);
								
									//geocoder.getLocations(latlon, getAddress);
									ignitions_lat[counter]=temp[i];
									ignitions_lon[counter]=temp[i+1];
	
									++counter;
					}
					getAddress(0);
				}
			} 
		}
	}
	else if (option==2)
	{			
		var params1="fid=-1&option=2";	
		monitoring=1;		
			
		http1.onreadystatechange = function() 
		{ 
			var temp = new Array();		
			var i=0;	
						
			if(http1.readyState == 4 && http1.status == 200) 
			{
				//alert("epestrepse i getIgnitions");
				var response=http1.responseText; 

				response=response.substring(0, (response.length)-1);
							
				temp = response.split(new RegExp( "[\n ]{1}", "g" ) );
			
				if(temp.length<=1)
				{
					alert("Monitoring for ignitions...");
				}
				else
				{
					var param=temp.length/2;
					var answer = confirm(param+" new ignitions found! Continue with simulation?");
					
					if(answer)
					{
						ignitionSum=temp.length/2;
						for(i=0; i<temp.length; i=i+2)
						{
							ignitionCounter++;
										
							var lat=temp[i];
							europeIgnitionsLat[ignitionCounter-1] = parseFloat(lat);
							var lon=temp[i+1];
							europeIgnitionsLon[ignitionCounter-1]= parseFloat(lon);
									
							//var latlon= new GLatLng(lat, lon);
	
							//geocoder.getLocations(latlon, getAddress);	
							
							//setTimeout('geocoder.getLocations("'+latlon+'",getAddress)', 1000);							
							
						}	
						getAddress(0);
					}

				}		
			} 
		}
	}
	else
	{			
		var params1="fid=-1";			
			
		http1.onreadystatechange = function() 
		{ 
						
			if(http1.readyState == 4 && http1.status == 200) 
			{
				//alert("epestrepse i getIgnitions sto else");
				var response=http1.responseText; 

				response=response.substring(0, (response.length)-1);
							
				var temp = new Array();
				temp = response.split(new RegExp( "[\n ]{1}", "g" ) );
				var i=0;
			
				if(temp.length<=1)
				{
					alert("No ignition points found.");
				}
				else
				{
					var param=temp.length/2;
					//alert(param+" ignitions found!");
										
					for(i=0; i<temp.length; i=i+2)
					{
						ignitionCounter++;
									
						var lat=temp[i];
						europeIgnitionsLat[ignitionCounter-1] = parseFloat(lat);
						var lon=temp[i+1];
						europeIgnitionsLon[ignitionCounter-1]= parseFloat(lon);
								
						//var latlon= new GLatLng(lat, lon);

						//geocoder.getLocations(latlon, getAddress);

						//getAddress(latlon);

					}		
					
					getAddress(0);
				}
			} 
		}
	}
			http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http1.setRequestHeader("Content-length", params1.length);
			http1.setRequestHeader("Connection", "close");
			http1.send(params1);
			
}



	var ignitions_lat = new Array();
	var ignitions_lon = new Array();
	var elevation = new Array();
	var ignitions = new Array();

	var beari;

	var distaa;
	var distbb;

	var dista;
	var distb;

  	var max_lat;
  	var min_lat;
  	var max_lon;
  	var min_lon;
  
  	var max_lat_lon;
  	var min_lat_lon;
  
  	var max_lon_lat;
	var min_lon_lat;
	
	var a_lat;
	var a_lon;
	
	var b_lat;
	var b_lon;
	
	var o_lat;
	var o_lon;
	
	var d_lat;
	var d_lon;
	
	var counter=0;

	var moisture;

	ignitions_lat[0]=0;
	ignitions_lon[0]=0;
	ignitions_lat[1]=0;
	ignitions_lon[1]=0;
	ignitions_lat[2]=0;
	ignitions_lon[2]=0;
	ignitions_lat[3]=0;
	ignitions_lon[3]=0;
	ignitions_lat[4]=0;
	ignitions_lon[4]=0;
	ignitions_lat[5]=0;
	ignitions_lon[5]=0;
	ignitions_lat[6]=0;
	ignitions_lon[6]=0;
	ignitions_lat[7]=0;
	ignitions_lon[7]=0;
	ignitions_lat[8]=0;
	ignitions_lon[8]=0;
	ignitions_lat[9]=0;
	ignitions_lon[9]=0;

	ignitions_lat[10]=0;
	ignitions_lon[10]=0;
	ignitions_lat[11]=0;
	ignitions_lon[11]=0;
	ignitions_lat[12]=0;
	ignitions_lon[12]=0;
	ignitions_lat[13]=0;
	ignitions_lon[13]=0;
	ignitions_lat[14]=0;
	ignitions_lon[14]=0;
	ignitions_lat[15]=0;
	ignitions_lon[15]=0;
	ignitions_lat[16]=0;
	ignitions_lon[16]=0;
	ignitions_lat[17]=0;
	ignitions_lon[17]=0;
	ignitions_lat[18]=0;
	ignitions_lon[18]=0;
	ignitions_lat[19]=0;
	ignitions_lon[19]=0;

	ignitions_lat[20]=0;
	ignitions_lon[20]=0;
	ignitions_lat[21]=0;
	ignitions_lon[21]=0;
	ignitions_lat[22]=0;
	ignitions_lon[22]=0;
	ignitions_lat[23]=0;
	ignitions_lon[23]=0;
	ignitions_lat[24]=0;
	ignitions_lon[24]=0;
	ignitions_lat[25]=0;
	ignitions_lon[25]=0;
	ignitions_lat[26]=0;
	ignitions_lon[26]=0;
	ignitions_lat[27]=0;
	ignitions_lon[27]=0;
	ignitions_lat[28]=0;
	ignitions_lon[28]=0;
	ignitions_lat[29]=0;
	ignitions_lon[29]=0;
function start_loading_spinner ()
{
	var loadspin=document.getElementById("loading_spinner"); //LOADING LOADING LOADING
	var loadspinbgrd=document.getElementById("loading_bgrd"); //LOADING LOADING LOADING
	//alert("PRIN to loading spinner einai: "+loadspin.style.display+" kai genika to object:"+loadspin);
	loadspin.style.display="block";
	loadspinbgrd.style.display="block";
}
function fill_loading_spinner_text (text)
{
var loadspintxt=document.getElementById("spinner_text"); //LOADING LOADING LOADING
//alert("PRIN to loading spinner einai: "+loadspin.style.display+" kai genika to object:"+loadspin);
loadspintxt.innerHTML= "<i><small>"+text+"</small></i>";
}
function end_loading_spinner ()
{
	var loadspin=document.getElementById("loading_spinner"); //LOADING LOADING LOADING
	var loadspinbgrd=document.getElementById("loading_bgrd"); //LOADING LOADING LOADING
	//alert("PRIN to loading spinner einai: "+loadspin.style.display+" kai genika to object:"+loadspin);
	loadspin.style.display="none";
	loadspinbgrd.style.display="none";
}

function simulation (ssc, dsc, tr, wsmin, wsmax, wdmin, wdmax, forestDown, distribution, visualization, mode) 
{
	fill_loading_spinner_text ("<p style=\"color:rgba(242, 242, 242, 0.84);\";><font size=\"3\">Starting Simulation</font></p>");
	start_loading_spinner();
	var info= new Array(25);
	
	simulationCanStart=0;
	//alert("simulation kai to doc einai ssc:"+document.getElementById('ssc').value);
	//pm_el = el('ssc');
	var ssc = document.getElementById('ssc').value;//pm_el.value;	
	
	//pm_el = el('dsc');
	var dsc = document.getElementById('dsc').value;//pm_el.value;	
	
	//pm_el = el('tr');
	var tr = document.getElementById('tr').value;//pm_el.value;

	//pm_el = el('wsmin');
	var wsmin = document.getElementById('wsmin').value;//pm_el.value;

	//pm_el = el('wsmax');
	var wsmax = document.getElementById('wsmax').value;//pm_el.value;	

	//pm_el = el('wdmin');
	var wdmin = document.getElementById('wdmin').value;//pm_el.value;	

	//pm_el = el('wdmax');
	var wdmax = document.getElementById('wdmax').value;//pm_el.value;	
	
	if(mode!=3 && mode!=4)
	{
		var forestDown = document.getElementById('forestDown').options[document.getElementById('forestDown').selectedIndex].value;		
		//pm_el = el('visualization1');
		var visualization = document.getElementById('visualization1').checked;//pm_el.checked;								
	}
	
	//pm_el = el('distribution');
	var distribution = document.getElementById('distribution').value;//pm_el.value;		
	
	if(ignitions_lat[0]==0)
	{
		alert("You have to specify at least one ignition point!"); 
	}
	else
	{
		info[0]="ssc="+ssc;
		info[1]="tr="+tr;
		info[2]="wsmin="+wsmin;
		info[3]="wsmax="+wsmax;
		info[4]="wdmin="+wdmin;
		info[5]="wdmax="+wdmax;
		info[6]="lat_0="+ignitions_lat[0];
		info[7]="lon_0="+ignitions_lon[0];
		info[8]="forestDown="+forestDown;
		info[9]="distribution="+distribution;
		info[10]="visualization="+visualization;
		info[11]="mode="+mode;
		info[12]="dsc="+dsc;
		
		if (ignitions_lat[1]!=0)
		{
			info[13]="lat_1="+ignitions_lat[1];
			info[14]="lon_1="+ignitions_lon[1];
		}
		if (ignitions_lat[2]!=0)
		{
			info[15]="lat_2="+ignitions_lat[2];
			info[16]="lon_2="+ignitions_lon[2];
		}
		if (ignitions_lat[3]!=0)
		{
			info[17]="lat_3="+ignitions_lat[3];
			info[18]="lon_3="+ignitions_lon[3];
		}
		if (ignitions_lat[4]!=0)
		{
			info[19]="lat_4="+ignitions_lat[4];
			info[20]="lon_4="+ignitions_lon[4];
		}
		if (ignitions_lat[5]!=0)
		{
			info[21]="lat_5="+ignitions_lat[5];
			info[22]="lon_5="+ignitions_lon[5];
		}
		if (ignitions_lat[6]!=0)
		{
			info[23]="lat_6="+ignitions_lat[6];
			info[24]="lon_6="+ignitions_lon[6];
		}
		if (ignitions_lat[7]!=0)
		{
			info[25]="lat_7="+ignitions_lat[7];
			info[26]="lon_7="+ignitions_lon[7];
		}
		if (ignitions_lat[8]!=0)
		{
			info[27]="lat_8="+ignitions_lat[8];
			info[28]="lon_8="+ignitions_lon[8];
		}
		if (ignitions_lat[9]!=0)
		{
			info[29]="lat_9="+ignitions_lat[9];
			info[30]="lon_9="+ignitions_lon[9];
		}
		if (ignitions_lat[10]!=0)
		{
			info[31]="lat_10="+ignitions_lat[10];
			info[32]="lon_10="+ignitions_lon[10];
		}		
	
		if (ignitions_lat[11]!=0)
		{
			info[33]="lat_11="+ignitions_lat[11];
			info[34]="lon_11="+ignitions_lon[11];
		}
		if (ignitions_lat[12]!=0)
		{
			info[35]="lat_12="+ignitions_lat[12];
			info[36]="lon_12="+ignitions_lon[12];
		}
		if (ignitions_lat[13]!=0)
		{
			info[37]="lat_13="+ignitions_lat[13];
			info[38]="lon_13="+ignitions_lon[13];
		}
		if (ignitions_lat[14]!=0)
		{
			info[39]="lat_14="+ignitions_lat[14];
			info[40]="lon_14="+ignitions_lon[14];
		}
		if (ignitions_lat[15]!=0)
		{
			info[41]="lat_15="+ignitions_lat[15];
			info[42]="lon_15="+ignitions_lon[15];
		}
		if (ignitions_lat[16]!=0)
		{
			info[43]="lat_16="+ignitions_lat[16];
			info[44]="lon_16="+ignitions_lon[16];
		}
		if (ignitions_lat[17]!=0)
		{
			info[45]="lat_17="+ignitions_lat[17];
			info[46]="lon_17="+ignitions_lon[17];
		}
		if (ignitions_lat[18]!=0)
		{
			info[47]="lat_18="+ignitions_lat[18];
			info[48]="lon_18="+ignitions_lon[18];
		}
		if (ignitions_lat[19]!=0)
		{
			info[49]="lat_19="+ignitions_lat[19];
			info[50]="lon_19="+ignitions_lon[19];
		}
		if (ignitions_lat[20]!=0)
		{
			info[51]="lat_20="+ignitions_lat[20];
			info[52]="lon_20="+ignitions_lon[20];
		}		
	
		if (ignitions_lat[21]!=0)
		{
			info[53]="lat_21="+ignitions_lat[21];
			info[54]="lon_21="+ignitions_lon[21];
		}
		if (ignitions_lat[22]!=0)
		{
			info[55]="lat_22="+ignitions_lat[22];
			info[56]="lon_22="+ignitions_lon[22];
		}
		if (ignitions_lat[23]!=0)
		{
			info[57]="lat_23="+ignitions_lat[23];
			info[58]="lon_23="+ignitions_lon[23];
		}
		if (ignitions_lat[24]!=0)
		{
			info[59]="lat_24="+ignitions_lat[24];
			info[60]="lon_24="+ignitions_lon[24];
		}
		if (ignitions_lat[25]!=0)
		{
			info[61]="lat_25="+ignitions_lat[25];
			info[62]="lon_25="+ignitions_lon[25];
		}
		if (ignitions_lat[26]!=0)
		{
			info[63]="lat_26="+ignitions_lat[26];
			info[64]="lon_26="+ignitions_lon[26];
		}
		if (ignitions_lat[27]!=0)
		{
			info[65]="lat_27="+ignitions_lat[27];
			info[66]="lon_27="+ignitions_lon[27];
		}
		if (ignitions_lat[28]!=0)
		{
			info[67]="lat_28="+ignitions_lat[28];
			info[68]="lon_28="+ignitions_lon[28];
		}
		if (ignitions_lat[29]!=0)
		{
			info[69]="lat_29="+ignitions_lat[29];
			info[70]="lon_29="+ignitions_lon[29];
		}	
		
		//pm_el = el('rmoi');
		info[71]="moi="+document.getElementById('rmoi').value;//pm_el.value;
		if(mode!=3 && mode!=4)
		{
			info[72]="fuelDown="+document.getElementById('fuelDown').options[document.getElementById('fuelDown').selectedIndex].value;
		}
		else
		{
			info[72]="fuelDown=Original";
		}
		
		var sid;

		var http1 = new XMLHttpRequest();
		var url1 = "../../include/storeSimulation_lav.php";
		var params1 = info.join("&");
		//alert("pao na kaleso tin storeSimulation");
		http1.open("POST", url1, true);
		http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http1.setRequestHeader("Content-length", params1.length);
		//http1.setRequestHeader("Connection", "close");

		http1.onreadystatechange = function() { 
								
									if(http1.readyState == 4 && http1.status == 200) 
									{
										
										sid=parseInt(http1.responseText);
										//alert("kalestike i storeSimulation sid "+sid);
										//var simname=dsc+" dir. x "+ssc+"sp., "+distribution+", "+tr+"min., "+wdmin+"-"+wdmax+"deg., "+wsmin+"-"+wsmax+"m/s";
										var today = new Date();
										var todaySTR=GetDayFormat_simsetup(today);
										console.log("pao na ftiakso to sinname");
										var simname="#"+String(sid)+" | "+String(todaySTR)+" | "+tr+"m. | "+dsc+"x"+ssc+" | "+wsmin+"-"+wsmax+"m/s | "+wdmin+"-"+wdmax;
										console.log("to ftiaksa kai einai "+simname);										
											var googleSIM;
											if(visualization==false)
											{
												googleSIM=0;
											}
											else
											{
												googleSIM=1;
											}
										add_new_forest_to_global_simarray(sid,simname,forestDown,googleSIM);
										var http = new XMLHttpRequest();
										var url = "../../include/simulation.php";
										var params = info.join("&");
										params="sid="+sid+"&"+params;
										console.log('params for simulation.php: '+params );
										http.open("POST", url, true);
										http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
										http.setRequestHeader("Content-length", params.length);
										//http.setRequestHeader("Connection", "close");
										
										http.onreadystatechange = function() {
																				//do it
																			}
										http.send(params);
										
										if(mode==4)
										{
											resetForest();	
											var field_area = document.getElementById('underBar');//el('underBar');
											field_area.innerHTML = "<i><small>Searching for another ignition...</small></i>";											
											refreshIgnitions();													
										}
										
										if(mode==1 || mode==3)
										{
											checkSimStatus(sid, dsc, ssc, forestDown, mode);
											var field_area = document.getElementById('underBar');//el('underBar');
											field_area.innerHTML = "<i><small>Creating scenarios</small></i>";
											resetForest();
										}
									} 
								}
		http1.send(params1);
		}

}

function deleteIgnition(latlonstr) 
{
	var temp11 = new Array();
	temp11 = latlonstr.split("::");
	var lat=temp11[0];
	var lon=temp11[1];
  //alert("deleteIgnition lat "+lat+" and lon:"+lon+" ignitions_lat"+ignitions_lat[0]+" ignitions_lon: "+ignitions_lon[0]+" lat.toPrecision(8)"+lat+" lon.toPrecision(8)"+lon);
	var i;
	for (i=0; i<=29; i++)
	{
		if(ignitions_lat[i]==lat && ignitions_lon[i]==lon)
		{
			
			var getentity = viewer.entities.getById(lon+'::'+lat);
			var placemark=ignitions[i];
			var bol=false;
			bol=viewer.entities.removeById(getentity.id);
			//alert("To vrika stin thesi i:"+i+" kai to getentity einai :"+getentity.id+" kai to bol:"+bol);
			//ge.getFeatures().removeChild(placemark);
			var j;
			for (j=i+1; j<=29; j++)
			{
				ignitions_lat[j-1]=ignitions_lat[j];
				ignitions_lat[j]=0;
				ignitions_lon[j-1]=ignitions_lon[j];
				ignitions_lon[j]=0;
				ignitions[j-1]=ignitions[j];
			}
			counter--;
			break;
		}
	}

}


function deletePolygon(latlonstr) 
{
	
	var temp11 = new Array();
	temp11 = latlonstr.split("::");
	var lat=temp11[0];
	var lon=temp11[1];
  //alert("deleteIgnition lat "+lat+" and lon:"+lon+" ignitions_lat"+ignitions_lat[0]+" ignitions_lon: "+ignitions_lon[0]+" lat.toPrecision(8)"+lat+" lon.toPrecision(8)"+lon);
	var i;	
			var getentity = viewer.entities.getById(lon+'::'+lat);
			if (typeof getentity != 'undefined')
			{
				var bol=false;
				bol=viewer.entities.removeById(getentity.id);
			}
}

function deletePolygon1(latlonstr) 
{
	
	//var temp11 = new Array();
	//temp11 = latlonstr.split("::");
	//var lat=temp11[0];
	//var lon=temp11[1];
  //alert("deleteIgnition lat "+lat+" and lon:"+lon+" ignitions_lat"+ignitions_lat[0]+" ignitions_lon: "+ignitions_lon[0]+" lat.toPrecision(8)"+lat+" lon.toPrecision(8)"+lon);
	//var i;	
			var getentity = viewer.entities.getById(latlonstr);
			if (typeof getentity != 'undefined')
			{
				var bol=false;
				bol=viewer.entities.removeById(getentity.id);
			}
}

function AddIgnitionUpdate(lat, lon) 
{
			//alert("AddIgnitionUpdate "+lon+" "+lat);
			var pinBuilder11 = new Cesium.PinBuilder();
			var wyoming11 = viewer.entities.add({
			id :lon+'::'+lat,
			name : name,
			position : Cesium.Cartesian3.fromDegrees(lon,lat,0.0),
			billboard : {
			//image : pinBuilder.fromColor(Cesium.Color.SALMON, 48).toDataURL(),
			//heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
			//verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
			image : '../../images/fire.png',
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
  <div style="text-align:center; padding:10px"><button id="DeleteIgnition" value="'+lat+'::'+lon+'" onclick="deleteIgnition('+lat+');" >' +'Delete ignition point</button></div>\
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
	ignitions_lat[counter]=lat;
	ignitions_lon[counter]=lon;
	
	++counter;

}




function checkSimStatus (sid, dsc, ssc, forestDown, mode) 
{

	//alert("eimai i checkSimStatus");
	var url="../../include/progress.php";

	var httpz = new XMLHttpRequest();
	var number=dsc*ssc;
	var progress;
	
	var field_area = document.getElementById('underBar');//el('underBar');

	var setup=0;
	var terminated=0;
		
	httpz.open("POST", url, true);
	var params = "sid="+sid+"&status=setup&forest="+forestDown+"&sc="+number+"&mode="+mode;
	console.log('params for progress.php: '+params );
	httpz.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	httpz.setRequestHeader("Content-length", params.length);
	//httpz.setRequestHeader("Connection", "close");
	httpz.onreadystatechange = function() { 
									if(httpz.readyState == 4 && httpz.status == 200) 
									{
											//alert("epestrepse i progress");
											progress=8;
											//pb.set(progress);
											field_area.innerHTML = "<i><small>Simulating scenarios</small></i>";
									} 
								}	
	httpz.send(params);

	var http1= new Array(number);
	console.log("checkSimStatus: edo mpike? number="+number);
	for (i=1; i<=number; i++)
	{
		var t=i-1;
		http1[t]=new XMLHttpRequest();
		http1[t].open("POST", url, true);
		var params1 = "sid="+sid+"&status="+i+"&forest="+forestDown+"&sc="+number+"&mode="+mode;
		console.log("params1 of checkSimStatus is :"+params1);
		http1[t].setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		//http1[t].setRequestHeader("Content-length", params1.length);
		//http1[t].setRequestHeader("Connection", "close");
		http1[t].onreadystatechange = function(t) { return function () { 
			
									if(http1[t].readyState == 4 || http1[t].status == 200) 
									{
											//alert("eskase i progress gamo: "+http1[t].status+" and readystate:"+http1[t].readyState);
											//alert("epestrepse i progress kati");
											progress=parseInt(http1[t].responseText)+8;
											//pb.set(progress);
											var temp=t+1;
											if(temp!=number)
											{
												field_area.innerHTML = "<i><small>"+temp+"/"+number+" scenarios terminated</small></i>";
												//var loadspintxt=document.getElementById("spinner_text"); //LOADING LOADING LOADING
												//alert("PRIN to loading spinner einai: "+loadspin.style.display+" kai genika to object:"+loadspin);
												//loadspintxt.innerHTML= "<i><small>"+temp+"/"+number+" scenarios terminated</small></i>";
												fill_loading_spinner_text ("<p style=\"color:rgba(242, 242, 242, 0.84);\";><font size=\"3\">"+temp+"/"+number+" scenarios terminated</font></p>");
											}
											else
											{
												field_area.innerHTML = "<i><small>Generating visualization</small></i>";
												fill_loading_spinner_text ("<p style=\"color:rgba(242, 242, 242, 0.84);\";><font size=\"3\">Generating visualization</font></p>");
												//end_loading_spinner();
											}									
									} 
								};
								}(t);	
			http1[t].send(params1);
		}	

		var http2 = new XMLHttpRequest();

		http2.open("POST", url, true);
		var params2 = "sid="+sid+"&status=terminated&forest="+forestDown+"&sc="+number+"&mode="+mode;
		http2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http2.setRequestHeader("Content-length", params2.length);
		//http2.setRequestHeader("Connection", "close");
		http2.onreadystatechange = function() { 
									
									if(http2.readyState == 4 && http2.status == 200) 
									{
										//alert("epestrepse i progress telos");
										var url='\'<?php echo $siteUrl; ?>thesis/index.php?visualization='+sid+'&lat='+forests_lat[forestDown]+'&lon='+forests_lon[forestDown]+'\'';
										progress=100;
										//pb.set(progress);
										field_area.innerHTML = '';
										//document.getElementById('visualizeResults').innerHTML = '<br/><a href='+url+'><img src="<?php echo $siteUrl; ?>thesis/images/visualize_results.jpg" width="120" height="25" border="0"" /></a> ';
										//document.getElementById('visualizeResults').innerHTML = '<input type="submit" value="Visualize results" class="classname" onClick="parent.location='+url+'" id=vis_results name=vis_results>';
										//document.getElementById('visualizeResults').innerHTML = '<input type="submit" value="Visualize results" class="classname" onClick="efiga('+sid+','+forests_lat[forestDown]+','+forestDown+')" id=vis_results name=vis_results>';
										empty_ignitions();
										end_loading_spinner();
										efiga(sid,forests_lat[forestDown],forestDown);
									} 
								}	
		http2.send(params2);	
	
}


var outPlacemark;
var out_lat = null;
var out_lon = null;
var cent_lat = null;
var cent_lon = null;
var draw=0;
function resetForest() 
{

	if(draw==1)
	{
		//ge.getFeatures().removeChild(forestlineStringPlacemark);
		//ge.getFeatures().removeChild(outPlacemark);
		out_lat = null;
		out_lon = null;
		cent_lat = null;
		cent_lon = null;
		draw=0;
	}

}

function efiga(sid , lat,forestDown)
{
	
	//CALL VISUALIZE IN ORDER TO LOAD SIMULATION RESULTS (REDIRECT TO VISUALIZATION)
	VISfid=forestDown;VISsid=sid
	//alert("eimai apo simsetup kai pao na kaleso tin visualizeloadsimulation meorismata VISfid:"+VISfid+" kai VISsid:"+VISsid);
	visualizeloadsimulation();
	
	/*
viewer.dataSources.removeAll(false);
		dataSourceanime.load('../../db/simulations/'+forestDown+'/'+sid+'/Probability_Animation.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
		});
		viewer.dataSources.add(dataSourceanime)
		.then( function (dataSourceanime) {
		viewer.flyTo(dataSourceanime.entities,{
	duration:3.0,
	maximumHeight:0,
	offset : {
            heading : 0.0,
            pitch : Cesium.Math.toRadians(-90.0),
            range : 0.0
        }
	
});
		});	*/
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


function requestCorinePolygonUpdate1(lat, lon) 
{

      	var http2 = new XMLHttpRequest();
		var url2 = "../../include/service_point.php?lat="+lat+"&lon="+lon;
		console.log('service_point called with params lat: '+lat+' and lon: '+lon);
		http2.open("GET", url2, true);
		http2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		//http2.setRequestHeader("Connection", "close");
		var response;

		http2.onreadystatechange = function() { 
						
						if(http2.readyState == 4 && http2.status == 200) 
						{
							//alert('epestrepse i service_point');
							response=http2.responseText.split("^");
							var count=response.length;
							
							if(parseInt(count)==1)
							{
								alert("No land cover polygon here!");
							}
							else
							{
								corineDraw1(count, response,lat,lon);
							}
						}
					}		
  		http2.send();
		//alert("requestCorinePolygonUpdate lat: "+lat+" and lon "+lon);

}


var dataSourcerequestcorinee = new Cesium.CzmlDataSource();
//var dataSource = new Cesium.CzmlDataSource();
function corineDraw1 (count, response,lat,lon)
{
	
	behaveCode=response[0];
	corineCode=response[1];
	fuelDescr=response[2];
	
	//var maggas =createBaloonTooltip(viewer.container);
	//maggas.showAt(lat,lon, "<p>Drag to change rectangle extent</p><p>Click again to finish drawing: </p>");
	
	
	
			//deletePolygon(lat+'::'+lon);
			//<div style="text-align:center; padding:10px"><button id="deletePolygon" value="'+lat+'::'+lon+'" onclick="deletePolygon('+lat+');" class="click-test-button">' +'deletePolygon</button></div>\ //
			deletePolygon1('editcorine');
			var wyomingrec = viewer.entities.add({
			id :'editcorine',
			name : 'editcorine',
			position : Cesium.Cartesian3.fromDegrees(lon,lat,0.0),
			billboard : {
			//image : pinBuilder.fromColor(Cesium.Color.SALMON, 48).toDataURL(),
			//heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
			//verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
			image : '../../images/rsz_layers-icon.png',
			verticalOrigin : Cesium.VerticalOrigin.BOTTOM
			},
			label : {
			text : name,
			//verticalOrigin : Cesium.VerticalOrigin.BOTTOM
			}
			}
			);//
			wyomingrec.description = '\
<p>\
<div>'+fuelDescr+'</div>\
<br/><div>CORINE land cover: <b>'+corineCode+'</b></div>\
<br/><div>BEHAVE fuel model: <b>'+behaveCode+'</b></div>\
  <div style="text-align:center; padding:10px"><button id="deletePolygon1" value="editcorine" onclick="deletePolygon1("editcorine");" class="click-test-button">' +'Remove from map</button></div>\
</p>\
<p>\
</p>';
	
	
	
	
	//viewer.dataSources.remove(dataSourcerequestcorinee);
	viewer.dataSources.remove(dataSourcerequestcorinee, false);
	var pinakasleslesles = [];
	//var p = [];
	//alert("corineDraw count: "+count+" response "+response);
	//console.log('Response is :'+response);
	//window.corinePolygonPlacemark = ge.createPlacemark('');
	//corineFlag=1;
	var leslesles=new Cesium.Cartographic();
	
	//ge.getFeatures().appendChild(window.corinePolygonPlacemark);
		
	count--;


	// create the line string geometry
	//polygonCorine = ge.createPolygon('');
	//window.corinePolygonPlacemark.setDescription("<div><div><b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp "+fuelDescr+" &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</b></div><br/><div>CORINE land cover: <b>"+corineCode+"</b></div><div>BEHAVE fuel model: <b>"+behaveCode+"</b></div></div>");

	//outerCorine = ge.createLinearRing('');

	//window.corinePolygonPlacemark.setGeometry(polygonCorine);

	// Square outer boundary.
	//centerCorine = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
	//coordsCorine = outerCorine.getCoordinates();
	polygonString = new Array ();
	//polygonStringkoukou = new Array ();
	//var jj=0;							  	
	for(i=3; i<count; i=i+2)
	{
		//coordsCorine.pushLatLngAlt(parseFloat(response[i]), parseFloat(response[i+1]), 0);
		polygonString[i-3]=parseFloat(response[i]).toFixed(7);
	 	polygonString[i-2]=parseFloat(response[i+1]).toFixed(7);
		//console.log('mesa sti corineDraw: '+parseFloat(response[i]).toFixed(7)+' and '+parseFloat(response[i+1]).toFixed(7));
		//parseFloat(response[i+1]).toFixed(7) ,parseFloat(response[i]).toFixed(7)
	//	Cesium.Cartographic.fromDegrees(parseFloat(response[i]).toFixed(7), parseFloat(response[i+1]).toFixed(7), 0, leslesles);
		//console.log('leslesles: '+leslesles.longitude);
		pinakasleslesles.push(
		parseFloat(response[i+1]).toFixed(7)
	//	Cesium.Cartographic.fromDegrees(parseFloat(response[i+1]).toFixed(7), parseFloat(response[i]).toFixed(7),0)
		);
				pinakasleslesles.push(
		parseFloat(response[i]).toFixed(7)
	//	Cesium.Cartographic.fromDegrees(parseFloat(response[i+1]).toFixed(7), parseFloat(response[i]).toFixed(7),0)
		);
				pinakasleslesles.push(
		0
	//	Cesium.Cartographic.fromDegrees(parseFloat(response[i+1]).toFixed(7), parseFloat(response[i]).toFixed(7),0)
		);
		
	//	console.log('pinakasleslesles: lon: '+pinakasleslesles[jj].longitude+' lat: '+pinakasleslesles[jj].latitude+' height '+pinakasleslesles[jj].height+' i: '+i+' max: '+(count));
		//if (i>=8)
		//	break;
		//jj++;
	}
	if (response[i]!=response[3])
	{
		//coordsCorine.pushLatLngAlt(parseFloat(response[3]), parseFloat(response[4]), 0);
		polygonString[i-3]=parseFloat(response[3]).toFixed(7);
		polygonString[i-2]=parseFloat(response[4]).toFixed(7);
		//console.log('mesa sti corineDraw: '+parseFloat(response[3]).toFixed(7)+' and '+parseFloat(response[4]).toFixed(7));
	}
		var czml = [{
    "id" : "document",
    "name" : "CZML Geometries: Polygon",
    "version" : "1.0"
}, {
    "id" : "outlinedPolygon",
    "name" : "Outlined Polygon",
    "polygon" : {
        "positions" : {
            "cartographicDegrees" : pinakasleslesles
        },
        "material" : {
            "solidColor" : {
                "color" : {
                    "rgba" : [0, 0, 0, 0]
                }
            }
        },
        "extrudedHeight" : 0,
        "perPositionHeight" : true,
        "outline" : true,
        "outlineColor" : {
            "rgba" : [255, 255, 0, 255]
        }
    }
}];
	//var dataSourcerequestcorinee = Cesium.CzmlDataSource.load(czml);
	//dataSourcerequestcorinee = Cesium.CzmlDataSource.load(czml);
	dataSourcerequestcorinee.load(czml);
	//p = Cesium.Cartesian3.fromDegreesArray(pinakasleslesles);
	//viewer.dataSources.add(Cesium.KmlDataSource.load(czml))
	viewer.dataSources.add(dataSourcerequestcorinee);
      /*  var nisatzo =viewer.entities.add({
        polygon: new Cesium.PolygonGraphics({
            hierarchy: {
                positions: p
            },
            show: true,
			billboard : {
			//image : pinBuilder.fromColor(Cesium.Color.SALMON, 48).toDataURL(),
			//heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
			//verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
			//image : pinBuilder1.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
			verticalOrigin : Cesium.VerticalOrigin.BOTTOM
			},
            fill: true,
            material: Cesium.Color.CHARTREUSE ,
            outline : true,
            outlineWidth : 100 ,
            outlineColor : Cesium.Color.CHARTREUSE
        })
    });
    nisatzo.description='koukou';*/
	//alert('les11:'+pinakasleslesles);
	//viewer.zoomTo(dataSourcerequestcorinee);	
	//polygonCorine.setOuterBoundary(outerCorine);								
								
	//window.corinePolygonPlacemark.setStyleSelector(ge.createStyle(''));
	//var lineStyle = window.corinePolygonPlacemark.getStyleSelector().getLineStyle();
	//lineStyle.setWidth(lineStyle.getWidth() + 2);
	// Color is specified in 'aabbggrr' format.
	//lineStyle.getColor().set('ffffffff');

	// Color can also be specified by individual color components.
	//var polyColor = window.corinePolygonPlacemark.getStyleSelector().getPolyStyle().getColor();
	//polyColor.setA(70);
	//polyColor.setB(255);
	//polyColor.setG(255);
	//polyColor.setR(255);

	//ge.getFeatures().removeChild(window.corinePolygonPlacemark);
	
}








   function createBaloonTooltip(frameDiv) {

        var tooltip = function(frameDiv) {

            var div = document.createElement('DIV');
            div.className = "twipsy right";

            var arrow = document.createElement('DIV');
            arrow.className = "twipsy-arrow";
            div.appendChild(arrow);

            var title = document.createElement('DIV');
            title.className = "twipsy-inner";
            div.appendChild(title);

            this._div = div;
            this._title = title;

            // add to frame div and display coordinates
            frameDiv.appendChild(div);
        }

        tooltip.prototype.setVisible = function(visible) {
            this._div.style.display = visible ? 'block' : 'none';
        }

        tooltip.prototype.showAt = function(lat,lon, message) {
                this.setVisible(true);
                this._title.innerHTML = message;
                this._div.style.left = lat + 10 + "px";
                this._div.style.top = (lon - this._div.clientHeight / 2) + "px";
            
        }

        return new tooltip(frameDiv);
    }
	
	
	
	
	function aerial_with_labels_add_remove_sim(checked){
	//alert("Ftiaxno ta kalodia"+checked);
	
	if (checked){
		document.getElementById('AERIAL_WITH_LABELS').checked = true;
		document.getElementById('AERIAL_WITH_LABELS_VIS').checked = true;
		document.getElementById('AERIAL_WITH_LABELS_EDIT').checked = true;
		viewer.imageryLayers.get(1).show=true;
	}
	else{
		document.getElementById('AERIAL_WITH_LABELS').checked = false;
		document.getElementById('AERIAL_WITH_LABELS_VIS').checked = false;
		document.getElementById('AERIAL_WITH_LABELS_EDIT').checked = false;
		viewer.imageryLayers.get(1).show=false;
	}
}

function add_new_forest_to_global_simarray(sid,simname,forestDown,googleSIM)
{
	all_sims_name[sid]=simname;
	all_sims_fid[sid]=forestDown;
	all_sims_google[sid]=googleSIM;
	//alert("SIMSETUP:add_new_forest_to_global_simarray:all_sims_name["+sid+"]:"+all_sims_name[sid]+" all_sims_fid["+sid+"]:"+all_sims_fid[sid]+" all_sims_google["+sid+"]:"+all_sims_google[sid]);
	//alert("forests_lat:"+latitudee+"forests_lon:"+longitutee+"forests_south:"+southwestlatDegrees.toFixed(4)+"forests_north:"+northwestlatDegrees.toFixed(4)+"forests_west:"+northeastlonDegrees.toFixed(4)+"forests_east:"+southeastlonDegrees.toFixed(4));
}

function defaultLayerckbx(){
	console.log("defaultLayerckbxdefaultLayerckbx???");
	document.getElementById('behave').checked=true;
	if(document.getElementById('corine').checked==true)
	{
		document.getElementById('corine').checked=false;
	}
	if(document.getElementById('slope').checked==true)
	{
		document.getElementById('slope').checked=false;
	}
	if(document.getElementById('aspect').checked==true)
	{
		document.getElementById('aspect').checked=false;
	}
	if(document.getElementById('elevation').checked==true)
	{
		document.getElementById('elevation').checked=false;
	}
}


function GetDayFormat_simsetup(date) 
{
	
		
		var minday = date.getDate();
		var minmonth = date.getMonth() +1;//alert("min "+data.values.min.getMonth());
		var minyear = date.getFullYear();
		if(minday<10) {
			minday = '0'+minday;
		} 
		if(minmonth<10) {
			minmonth = '0'+minmonth;
		}

	
    return minday + "-" +
        minmonth + "-" +
        minyear;
}

function empty_ignitions(){
	
	counter=0;



	ignitions_lat[0]=0;
	ignitions_lon[0]=0;
	ignitions_lat[1]=0;
	ignitions_lon[1]=0;
	ignitions_lat[2]=0;
	ignitions_lon[2]=0;
	ignitions_lat[3]=0;
	ignitions_lon[3]=0;
	ignitions_lat[4]=0;
	ignitions_lon[4]=0;
	ignitions_lat[5]=0;
	ignitions_lon[5]=0;
	ignitions_lat[6]=0;
	ignitions_lon[6]=0;
	ignitions_lat[7]=0;
	ignitions_lon[7]=0;
	ignitions_lat[8]=0;
	ignitions_lon[8]=0;
	ignitions_lat[9]=0;
	ignitions_lon[9]=0;

	ignitions_lat[10]=0;
	ignitions_lon[10]=0;
	ignitions_lat[11]=0;
	ignitions_lon[11]=0;
	ignitions_lat[12]=0;
	ignitions_lon[12]=0;
	ignitions_lat[13]=0;
	ignitions_lon[13]=0;
	ignitions_lat[14]=0;
	ignitions_lon[14]=0;
	ignitions_lat[15]=0;
	ignitions_lon[15]=0;
	ignitions_lat[16]=0;
	ignitions_lon[16]=0;
	ignitions_lat[17]=0;
	ignitions_lon[17]=0;
	ignitions_lat[18]=0;
	ignitions_lon[18]=0;
	ignitions_lat[19]=0;
	ignitions_lon[19]=0;

	ignitions_lat[20]=0;
	ignitions_lon[20]=0;
	ignitions_lat[21]=0;
	ignitions_lon[21]=0;
	ignitions_lat[22]=0;
	ignitions_lon[22]=0;
	ignitions_lat[23]=0;
	ignitions_lon[23]=0;
	ignitions_lat[24]=0;
	ignitions_lon[24]=0;
	ignitions_lat[25]=0;
	ignitions_lon[25]=0;
	ignitions_lat[26]=0;
	ignitions_lon[26]=0;
	ignitions_lat[27]=0;
	ignitions_lon[27]=0;
	ignitions_lat[28]=0;
	ignitions_lon[28]=0;
	ignitions_lat[29]=0;
	ignitions_lon[29]=0;
	
}

function jumpSetupsles(west, south, east,north) 
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