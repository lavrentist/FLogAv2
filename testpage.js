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
function savetodasos(extent,fname,cellSize)
  {
	//alert("eimai i savetodasos apo tin testpage.js exontas cellsize="+cellSize);
	  	if(fname=="")
  	{
  		alert("Enter forest name");
  		//StopIteration;
  		return;
  	}
  	if(cellSize=="")
  	{
  		alert("Enter cell size");
  		//StopIteration;
  		return;
  	}
	var southeast=new Cesium.Cartographic();
	var southwest=new Cesium.Cartographic();
	var northeast=new Cesium.Cartographic();
	var northwest=new Cesium.Cartographic();
	//var lavmetender = Cesium.Cartesian3.fromDegrees(southeast.latitude,southeast.longitude,0);
	//var cartesianPosition = Cesium.Ellipsoid.WGS84.cartographicToCartesian(southeast);
	//Cesium.Rectangle.southeast(extent, result1);
	Cesium.Rectangle.southeast(extent,southeast);
	Cesium.Rectangle.southwest(extent,southwest);
	Cesium.Rectangle.northeast(extent,northeast);
	Cesium.Rectangle.northwest(extent,northwest);
	 southeastlonDegrees = Cesium.Math.toDegrees(southeast.longitude);
	 southeastlatDegrees = Cesium.Math.toDegrees(southeast.latitude);
	 southwestlonDegrees = Cesium.Math.toDegrees(southwest.longitude);
	 southwestlatDegrees = Cesium.Math.toDegrees(southwest.latitude);
	 northeastlonDegrees = Cesium.Math.toDegrees(northeast.longitude);
	 northeastlatDegrees = Cesium.Math.toDegrees(northeast.latitude);
	 northwestlonDegrees = Cesium.Math.toDegrees(northwest.longitude);
	 northwestlatDegrees = Cesium.Math.toDegrees(northwest.latitude);
	console.log('koukoutest medium: '+southeastlonDegrees );
// Specify our point of interest.
var pointOfInterest = Cesium.Cartographic.fromDegrees(
    86.925145, 27.988257, 0, new Cesium.Cartographic());
	
	//var les=new Cesium.CallbackProperty(promise, false);
   // console.log('koukou1 in meters is: '+koukou1  );
	var positionsAB = Cesium.Cartesian3.fromDegreesArray([
    southeastlatDegrees,southeastlonDegrees,
    southwestlatDegrees, southwestlonDegrees ]);
	var positionsAC = Cesium.Cartesian3.fromDegreesArray([
    southeastlatDegrees,southeastlonDegrees,
    northeastlatDegrees, northeastlonDegrees ]);
	var surfacePositionsAB = Cesium.PolylinePipeline.generateArc({
    positions: positionsAB
});
	var surfacePositionsAC = Cesium.PolylinePipeline.generateArc({
    positions: positionsAC
});
var scratchCartesian3AB = new Cesium.Cartesian3();
var scratchCartesian3AC = new Cesium.Cartesian3();
var surfacePositionsLengthAB = surfacePositionsAB.length;
var surfacePositionsLengthAC = surfacePositionsAC.length;
var totalDistanceInMetersAB = 0;
var totalDistanceInMetersAC = 0;
for (var i = 3; i < surfacePositionsLengthAB; i += 3) {
    scratchCartesian3AB.x = surfacePositionsAB[i] - surfacePositionsAB[i - 3];
    scratchCartesian3AB.y = surfacePositionsAB[i + 1] - surfacePositionsAB[i - 2];
    scratchCartesian3AB.z = surfacePositionsAB[i + 2] - surfacePositionsAB[i - 1];
    totalDistanceInMetersAB += Cesium.Cartesian3.magnitude(scratchCartesian3AB);
}
for (var i = 3; i < surfacePositionsLengthAC; i += 3) {
    scratchCartesian3AC.x = surfacePositionsAC[i] - surfacePositionsAC[i - 3];
    scratchCartesian3AC.y = surfacePositionsAC[i + 1] - surfacePositionsAC[i - 2];
    scratchCartesian3AC.z = surfacePositionsAC[i + 2] - surfacePositionsAC[i - 1];
    totalDistanceInMetersAC += Cesium.Cartesian3.magnitude(scratchCartesian3AC);
}
//totalDistanceInKmAB = totalDistanceInMetersAB * 0.001;
//totalDistanceInKmAC = totalDistanceInMetersAC * 0.001;
totalDistanceInKmAB=distance_new_forest(southeastlatDegrees, southeastlonDegrees, southwestlatDegrees, southwestlonDegrees, 'K');
totalDistanceInKmAC=distance_new_forest(southeastlatDegrees, southeastlonDegrees, northeastlatDegrees, northeastlonDegrees, 'K');
 rows=Math.round((totalDistanceInKmAC*1000)/cellSize);
 cols=Math.round((totalDistanceInKmAB*1000)/cellSize);
var vimalon=(northeastlonDegrees-northwestlonDegrees)/(cols-1);
var vimalat=(northwestlatDegrees-southwestlatDegrees)/(rows-1);
//alert("Savetodasos: totalDistanceInKmAB "+totalDistanceInKmAB+"totalDistanceInKmAC"+totalDistanceInKmAC+"rows"+rows+"cols"+cols+"southwestlatDegrees"+southwestlatDegrees+"southeastlatDegrees"+southeastlatDegrees+"vimalat"+vimalat);
//var pinakas = [];
var prevlon;
var prevlat;
prevlon=northwestlonDegrees+(vimalon/2);
var arxiko_lon=prevlon;
prevlat=northwestlatDegrees-(vimalat/2);
var arxiko_lat=prevlat;
for (var i = 0; i < rows; i += 1) { //i = lat
		prevlat=arxiko_lat-(vimalat*i);
		for (var j = 0; j < cols; j += 1) {  //j=lon
	//console.log('i ='+i+' and j = '+j);
	prevlon=arxiko_lon+(vimalon*j);
	
	//console.log('vima savetodasos se lon :'+vimalon+' and vima se lat '+vimalat
	//+'\n opote to lon :'+(prevlon)
	//+'\n opote to lat :'+(prevlat));
	    pinakas.push(
			Cesium.Cartographic.fromDegrees(prevlon, prevlat)
    );
			/*var pinBuilder1 = new Cesium.PinBuilder();
			var wyoming1 = viewer.entities.add({
			name : name,
			position : Cesium.Cartesian3.fromDegrees(prevlon,prevlat,0.0),
			billboard : {
			//image : pinBuilder.fromColor(Cesium.Color.SALMON, 48).toDataURL(),
			//heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
			//verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
			image : pinBuilder1.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
			verticalOrigin : Cesium.VerticalOrigin.BOTTOM
			},
			label : {
			text : name,
			//verticalOrigin : Cesium.VerticalOrigin.BOTTOM
			}
			}
			);
			wyoming1.description = 'lon: '+prevlon+' lat: '+prevlat;*/

		}
}

/*::::::::::Whaaaat? 20170907
	var extentPrimitive = new DrawHelper.ExtentPrimitive({
        extent: extent,
        material: Cesium.Material.fromType(Cesium.Material.WaterType)
    });
    scene.primitives.add(extentPrimitive);
    extentPrimitive.setEditable();
    extentPrimitive.addListener('onEdited', function (event) {
        loggingMessage('Extent edited: extent is (N: ' + event.extent.north.toFixed(3) + ', E: ' + event.extent.east.toFixed(3) + ', S: ' + event.extent.south.toFixed(3) + ', W: ' + event.extent.west.toFixed(3) + ')');
    });*/
	//lalaland(viewer,extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname) ;
	//setForest(extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname);
}
 
 function calltestpage(viewer,extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname) 
{
	//alert("eimai i saveForest apo tin testpage.js exontas cellsize="+cellSize);
	lalaland(viewer,extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname) ;
	//setForest(extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname);
}


function lalaland(viewer,extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname) 
{
 //alert("eimai i lalaland apo tin testpage.js");
  //var promise = Cesium.sampleTerrain(viewer.terrainProvider, 9, pinakas);
  var promise = Cesium.sampleTerrainMostDetailed(viewer.terrainProvider,pinakas);
var koukou1;
Cesium.when(promise, function(updatedPositions) {
    // positions[0].height and positions[1].height have been updated.
    // updatedPositions is just a reference to positions.
	console.log('lalaland::::Heighteeeee in promise in meters is: ' +pinakas[0].height );
	//alert("koukou ele "+pinakas[1].height);
	koukou1=pinakas[1].height;
	console.log('koukoutest cellsize: '+cellSize+'and koukou1= '+koukou1);
	koukoutesttest(extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname);
	console.log('koukoutest ended' );
});
}


function koukoutesttest(extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname)
{
	 //alert("eimai i koukoutest apo tin test");
	catholicvariable=4;
	var elevation = new Array();
	console.log('koukoutest started len: '+pinakas.length+' and cellsize is '+cellSize);
	for (var jj = 0; jj < pinakas.length; jj += 1) {
	//console.log('DEBUG inside '+ jj);
	//console.log('DEBUG inside '+ pinakas[jj].height);
	elevation[jj]=pinakas[jj].height.toFixed(1);
	//console.log('DEBUG Ele '+ elevation[jj]);
	}
 console.log('DEBUG '+ pinakas[1].height);
console.log('Distance ali lisi AB: ' + totalDistanceInKmAB*1000 + ' m '+totalDistanceInKmAB+'(km) and AC :'+totalDistanceInKmAC*1000+' m and cellsize :'+cellSize);
//console.log('columns : '+cols+' and rows '+rows);
	//loggingMessage('Extent created (N: ' + southeastlonDegrees.toFixed(3)  + ', E: ' + extent.east.toFixed(3) + ', S: ' + extent.south.toFixed(3) + ', W: ' + extent.west.toFixed(3) + ')');
	//alert("koukou ele "+pinakas[1].height+" a: south east lon: "+southeastlonDegrees.toFixed(3)+" south east lat : "+ southeastlatDegrees.toFixed(3) 
	//		+ '\nsouth west lon : '+southwestlonDegrees.toFixed(3)+', south west lat ' + southwestlatDegrees.toFixed(3) 
	//		+ '\nnorth east lon : '+northeastlonDegrees.toFixed(3)+', north east lat ' + northeastlatDegrees.toFixed(3)
	//		+ '\nnorth west lon : '+northwestlonDegrees.toFixed(3) +' north west lat ' + northwestlatDegrees.toFixed(3) );
    	  	//var	lat1=(extent.north.toFixed(3) - extent.south.toFixed(3))/2;
	  		//	$lat1=$lat1+extent.south.toFixed(3);
	  		//var	$lon1=(extent.east.toFixed(3) - extent.west.toFixed(3))/2;
	  		//	$lon1=extent.west.toFixed(3) + $lon1;
				//alert("koukou lat: "+(((extent.north.toFixed(3) - extent.south.toFixed(3))/2)+extent.south.toFixed(3)));
	/*var extentPrimitive = new DrawHelper.ExtentPrimitive({
        extent: extent,
        material: Cesium.Material.fromType(Cesium.Material.StripeType)
    });
    scene.primitives.add(extentPrimitive);
    extentPrimitive.setEditable();
    extentPrimitive.addListener('onEdited', function (event) {
        loggingMessage('Extent edited: extent is (N: ' + event.extent.north.toFixed(3) + ', E: ' + event.extent.east.toFixed(3) + ', S: ' + event.extent.south.toFixed(3) + ', W: ' + event.extent.west.toFixed(3) + ')');
    });*/
	var info= new Array(20);
	info[0]="north="+northwestlatDegrees;
	info[1]="south="+southwestlatDegrees;
	info[2]="east="+southeastlonDegrees;
	info[3]="west="+northeastlonDegrees;
	info[4]="cellsize="+cellSize;
	info[5]="rows="+rows;
	info[6]="cols="+cols;	
	info[7]="fname="+fname;
	info[8]="fueltype=0";
	info[9]="rotation=0";
	info[10]="northreal="+northwestlatDegrees;
	info[11]="northreallon="+northwestlonDegrees;
	info[12]="southreal="+southeastlatDegrees;
	info[13]="southreallon="+southeastlonDegrees;
	info[14]="eastreal="+northeastlonDegrees;	
	info[15]="eastreallat="+northeastlatDegrees;
	info[16]="westreal="+southwestlonDegrees;
	info[17]="westreallat="+southwestlatDegrees;
	info[18]="df=0"
	info[19]="username=floga2";
	
	var http1 = new XMLHttpRequest();
	var url1 = "../../include/slopeAspect.php";
	var params1 = "elevation="+elevation.join("^");
	http1.open("POST", url1, true);
	http1.onreadystatechange = function() { 
						
						if(http1.readyState == 4 && http1.status == 200) 
						{
							//alert('slopeAspect returned');
						} 
	}
					
					
	var http2 = new XMLHttpRequest();
	var url2 = "../../include/fuel.php";
	var params2;
	http2.open("POST", url2, true);
	//http2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//http2.setRequestHeader("Connection", "close");
	http2.onreadystatechange = function() { 
						
						if(http2.readyState == 4 && http2.status == 200) 
						{
							
								for (var jj = 0; jj < elevation.length; jj += 1) {
									//console.log('DEBUG inside '+ jj);
									//console.log('DEBUG inside '+ pinakas[jj].height);
									//elevation[jj]=pinakas[jj].height.toFixed(1);
									console.log('fuel params['+jj+']: '+ elevation[jj]);
							}
							//params1=params1+"fid="+fidModis;
							//params1=params1+"&fid="+fidModis;
							//console.log('tha kaleso tin slope me params1'+params1);
							//http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							//http1.setRequestHeader("Content-length", params1.length);
							//http1.setRequestHeader("Connection", "close");
							//http1.send(params1);
					//		for (var ii = 0; ii < 195; ii += 1) {
					//		for (var iii = 0; iii < 290; iii += 1) {
					//		for (var iiii = 0; iiii < 999; iiii += 1) {
						//		console.log('AMANAAAA ');
						//	}
						//	}
							//}
							//alert('fuel.php returned');
						}
					}

	var http = new XMLHttpRequest();
	var url = "../../include/storeDraw.php";
	var params = info.join("&");
	http.open("POST", url, true);
	//http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//http.setRequestHeader("Content-length", params.length);
	//http.setRequestHeader("Connection", "close");
		http.onreadystatechange = function() { 	
								
								if(http.readyState == 4 && http.status == 200) 
								{
									fidModis=parseInt(http.responseText);
									//alert('storeDraw returned fid :'+fidModis);
									//field_area.innerHTML = "<i><small>Layers generation...</small></i>"; 
console.log('params2 : northwestlatDegrees:'+northwestlatDegrees+ ' northwestlonDegrees:'+northwestlonDegrees+' southeastlatDegrees'+southeastlatDegrees+'  southeastlonDegrees'+southeastlonDegrees+'  northeastlonDegrees'+northeastlonDegrees+'  northeastlatDegrees'+northeastlatDegrees+'  southwestlonDegrees'+southwestlonDegrees+'  southwestlatDegrees'+southwestlatDegrees+'  fidModis'+fidModis+'  rows'+rows+'  cols'+cols+' ');
									params2 = "max_lat="+northwestlatDegrees+"&max_lat_lon="+northwestlonDegrees+"&min_lat="+southeastlatDegrees+"&min_lat_lon="+southeastlonDegrees+"&max_lon="+northeastlonDegrees+"&max_lon_lat="+northeastlatDegrees+"&min_lon="+southwestlonDegrees+"&min_lon_lat="+southwestlatDegrees+"&fid="+fidModis+"&rows="+rows+"&cols="+cols+"&df=0";
									http2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
									http2.setRequestHeader("Content-length", params2.length);
									http2.setRequestHeader("Connection", "close");
									http2.send(params2);
									//alert("Tora kano ipologismous gia eleveation kai kalo tin slope");
									params1=params1+"&fid="+fidModis;
									console.log('tha kaleso tin slope me params1'+params1);
									http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
									http1.setRequestHeader("Content-length", params1.length);
									http1.setRequestHeader("Connection", "close");
									http1.send(params1);
									
								} 
							}
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Content-length", params.length);
	http.setRequestHeader("Connection", "close");
	http.send(params);
	
//	http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//	http1.setRequestHeader("Connection", "close");



}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 function callelevfnc(viewer,extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname,fidModis) 
{
	console.log("eimai i callelevfnc exontas cellsize="+cellSize);
	realelevfnc(viewer,extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname,fidModis) ;
	//setForest(extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname);
}
function realelevfnc(viewer,extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname,fidModis) 
{
 console.log("eimai i realelevfnc");
  //var promise = Cesium.sampleTerrain(viewer.terrainProvider, 9, pinakas);sampleTerrainMostDetailed
var promise = Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, pinakas);
  var koukou1;
Cesium.when(promise, function(updatedPositions) {
    // positions[0].height and positions[1].height have been updated.
    // updatedPositions is just a reference to positions.
	console.log('realelevfnc::::Heighteeeee in promise in meters is: ' +pinakas[0].height );
	//alert("koukou ele "+pinakas[1].height);
	koukou1=pinakas[1].height;
	console.log('koukoutest cellsize: '+cellSize+'and koukou1= '+koukou1);
	callslopefnc(extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname,fidModis);
	console.log('koukoutest ended' );
});
}

function reload_forestsantreas(iam) 
{
//alert('MA TI SIMVANEI POIA');

}

function callslopefnc(extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname,fidModis)
{
	var idd;
	var http2reload = new XMLHttpRequest();
	var url2reload = "../../include/load_forest.php";
	var params2reload;
	http2reload.open("POST", url2reload, true);
	http2reload.onreadystatechange = function() { 
						
						if(http2reload.readyState == 4 && http2reload.status == 200) 
						{
							
							//alert("epitelous epestrepse!");
							//console.log('epitelous epitelous epitelous :'+http2reload.responseText);
							var responseRELOAD=http2reload.responseText.split(";");
							//fid=parseInt(response[0]);
							//alert(responseRELOAD.length);
							for(var iRE = 0; iRE < responseRELOAD.length; iRE++) {
								//console.log("inside loop response["+iRE+"]: "+responseRELOAD[iRE]);
								var valueRELOAD=responseRELOAD[iRE].split("=");
								//valueRELOAD[0].indexOf("[");
								//valueRELOAD[0].lastIndexOf("]");
								//console.log("id(substr): "+valueRELOAD[0].substr(valueRELOAD[0].indexOf("[")+1, valueRELOAD[0].lastIndexOf("]")-valueRELOAD[0].indexOf("[")-1));
								//console.log("valueRELOAD[1] "+valueRELOAD[1]);
								idd=valueRELOAD[0].substr(valueRELOAD[0].indexOf("[")+1, valueRELOAD[0].lastIndexOf("]")-valueRELOAD[0].indexOf("[")-1);
								var valuee=valueRELOAD[1];
								if(valueRELOAD[0].substr(1,valueRELOAD[0].indexOf("[")-1) == "forests_lat")
								{
									forests_lat[idd]=valuee;
									//console.log("if:"+valueRELOAD[0].substr(1,valueRELOAD[0].indexOf("[")-1));
								}
								if(valueRELOAD[0].substr(1,valueRELOAD[0].indexOf("[")-1) == "forests_lon")
								{
									forests_lon[idd]=valuee;
									//console.log("if:"+valueRELOAD[0].substr(1,valueRELOAD[0].indexOf("[")-1));
								}
								if(valueRELOAD[0].substr(1,valueRELOAD[0].indexOf("[")-1) == "forests_south")
								{
									forests_south[idd]=valuee;
									//console.log("if:"+valueRELOAD[0].substr(1,valueRELOAD[0].indexOf("[")-1));
								}
								if(valueRELOAD[0].substr(1,valueRELOAD[0].indexOf("[")-1) == "forests_north")
								{
									forests_north[idd]=valuee;
									//console.log("if:"+valueRELOAD[0].substr(1,valueRELOAD[0].indexOf("[")-1));
								}
								if(valueRELOAD[0].substr(1,valueRELOAD[0].indexOf("[")-1) == "forests_west")
								{
									forests_west[idd]=valuee;
									//console.log("if:"+valueRELOAD[0].substr(1,valueRELOAD[0].indexOf("[")-1));
								}
								if(valueRELOAD[0].substr(1,valueRELOAD[0].indexOf("[")-1) == "forests_east")
								{
									forests_east[idd]=valuee;
									//console.log("if:"+valueRELOAD[0].substr(1,valueRELOAD[0].indexOf("[")-1));
								}
								if(valueRELOAD[0].substr(1,valueRELOAD[0].indexOf("[")-1) == "forests_rot")
								{
									forests_rot[idd]=valuee;
									//console.log("if:"+valueRELOAD[0].substr(1,valueRELOAD[0].indexOf("[")-1));
								}
							}
							
						}
					}
	
	
	console.log("eimai i callslopefnc");
	var http1 = new XMLHttpRequest();
	var url1 = "../../include/slopeAspect.php";
	http1.open("POST", url1, true);
	http1.onreadystatechange = function() { 
						
						if(http1.readyState == 4 && http1.status == 200) 
						{
							console.log('slopeAspect returned');
							var primitives1 = scene.primitives;
							var length = primitives1.length;
							var i =primitives1.length-1;
							while (primitives1.length > 1) {
								console.log("primitives1.length: "+primitives1.length+" and i= "+i);
								var p = primitives1.get(i);
								scene.primitives.remove(p);
								i--;
							}
							var x=document.getElementsByClassName("twipsy-inner");
							var xx=document.getElementsByClassName("twipsy-arrow");
				//alert("found inner x"+x[0].innerHTML);
				//this._tooltip.setVisible(false);
							x[0].style.display ='none';
							xx[0].style.display ='none';
							removeCustomDatasourceNewForest('slope');
							dataSourceslope.load('../../db/forests/'+fidModis+'/slope.kml', {
								camera: viewer.camera,
								canvas: viewer.canvas
							});
							viewer.dataSources.add(dataSourceslope)
							.then( function (dataSourceslope) { 
							var west = forests_west[fidModis];
var south = forests_south[fidModis];
var east = forests_east[fidModis];
var north = forests_north[fidModis];
jumpSetupsles_NEW(west, south, east,north);
							/*
							viewer.flyTo(dataSourceslope.entities,{
								duration:3.0,
								maximumHeight:0,
								offset : {
									heading : 0.0,
									pitch : Cesium.Math.toRadians(-90.0),
									range : 0.0
								}
	
							});
							*/});
							//alert("Draw forest ended!");
							closeNav();
							//viewer.entities.removeAll(); //remove entities
							//clear_new_forest_form(); //remove primitives and datasources and hide logging info div
							openSimSetupdeep();
							//global_forests_placemarks.push({i: (global_forests_placemarks.length+1), lat: lat, lon: lon, fid: fidModis, name: fname});
							//alert("Prin ti fly:::::::::::::::::::::::::::::::::idd "+fidModis);
							
							//alert("Meta ti fly:::::::::::::::::::::::::::::::::");
							reload_forestsantreas('test');
							params2reload='TEMPLATE_PARAM';
							//http2reload.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							//http2reload.setRequestHeader("Content-length", params2reload.length);
							//http2reload.setRequestHeader("Connection", "close");
							//http2reload.send(params2reload);
							var newentry = document.getElementById('forestDown');//also for forestDownedit
							var newentryedit = document.getElementById('forestDownedit');
							var newentryvis = document.getElementById('forestDownVIS');
							var elOptNew = document.createElement('option');elOptNew.style.color="black";
							var elOptNewEdit = document.createElement('option');elOptNewEdit.style.color="black";
							var elOptNewVis = document.createElement('option');elOptNewVis.style.color="black";
  							elOptNew.text = fname;elOptNewEdit.text = fname;elOptNewVis.text = fname;
  							elOptNew.value = fidModis;elOptNewEdit.value = fidModis;elOptNewVis.value = fidModis;
							elOptNew.id=fidModis;elOptNewEdit.id=fidModis;elOptNewVis.id=fidModis;					
  							newentry.add(elOptNew, null); // standards compliant; doesn't work in IE
							newentryedit.add(elOptNewEdit, null); // standards compliant; doesn't work in IE
							newentryvis.add(elOptNewVis, null); // standards compliant; doesn't work in IE
							var sel = document.getElementById('forestDown');
							//var val = document.getElementById('AnimalToFind').value;
							//sel.selectedIndex = 0;
							for(var i = 0, j = sel.options.length; i < j; ++i) {
								//DIADOXIKA FORESTS BUGif(sel.options[i].innerHTML == fname) {
								if(sel.options[i].value == fidModis) {
									sel.selectedIndex = 0;
									sel.selectedIndex = i;
									break;
								}
							}
							sortOptions("#forestDown");
							sortOptions("#forestDownedit");
							sortOptions("#forestDownVIS");
							flySetup(fidModis);
							var loadspin=document.getElementById("loading_spinner"); //LOADING LOADING LOADING
							var loadspinbgrd=document.getElementById("loading_bgrd"); //LOADING LOADING LOADING
							//alert("PRIN to loading spinner einai: "+loadspin.style.display+" kai genika to object:"+loadspin);
							loadspin.style.display="none";
							loadspinbgrd.style.display="none";
							
						} 
	}
	var elevation = new Array();
	for (var jj = 0; jj < pinakas.length; jj += 1) {
	//console.log('DEBUG inside '+ jj);
	//console.log('DEBUG inside '+ pinakas[jj].height);
	elevation[jj]=pinakas[jj].height.toFixed(1);
	//console.log('DEBUG Ele '+ elevation[jj]);
	}
	var params1 = "elevation="+elevation.join("^");
	params1=params1+"&fid="+fidModis;
	//console.log('SLOper is called with params: '+params1);
	http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http1.setRequestHeader("Content-length", params1.length);
	http1.setRequestHeader("Connection", "close");
	http1.send(params1);
}


function add_new_forest_to_global_array(fidModis,northwestlatDegrees,southwestlatDegrees,southeastlonDegrees,northeastlonDegrees,southeastlatDegrees,southwestlonDegrees,rows,cols,cellSize)
{
	forests_cell[fidModis]=cellSize;
	forests_rows[fidModis]=rows;
	forests_cols[fidModis]=cols;	
	var latitudee=(northwestlatDegrees - southwestlatDegrees)/2;
	latitudee=latitudee+southwestlatDegrees;
	var longitutee=(southeastlonDegrees - northeastlonDegrees)/2;
	longitutee=longitutee+northeastlonDegrees;
	forests_lat[fidModis]=latitudee;
	forests_lon[fidModis]=longitutee;
	forests_south[fidModis]=southeastlatDegrees.toFixed(4);
	forests_north[fidModis]=northwestlatDegrees.toFixed(4);
	forests_west[fidModis]=southwestlonDegrees.toFixed(4);
	forests_east[fidModis]=northeastlonDegrees.toFixed(4);
	forests_reallat[fidModis]=(northwestlatDegrees+southeastlatDegrees)/2;
	forests_reallon[fidModis]=(northeastlonDegrees+southwestlonDegrees)/2;
	//alert("forests_lat:"+latitudee+"forests_lon:"+longitutee+"forests_south:"+southwestlatDegrees.toFixed(4)+"forests_north:"+northwestlatDegrees.toFixed(4)+"forests_west:"+northeastlonDegrees.toFixed(4)+"forests_east:"+southeastlonDegrees.toFixed(4));
}

/////NEW DISTANCE FNCS
function distance_new_forest( lat1,  lon1,  lat2,  lon2,  unit) {
      var theta = lon1 - lon2;
      var dist = Math.sin(deg2rad_new_forest(lat1)) * Math.sin(deg2rad_new_forest(lat2)) + Math.cos(deg2rad_new_forest(lat1)) * Math.cos(deg2rad_new_forest(lat2)) * Math.cos(deg2rad_new_forest(theta));
      dist = Math.acos(dist);
      dist = rad2deg_new_forest(dist);
      dist = dist * 60 * 1.1515;
      if (unit == 'K') {
        dist = dist * 1.609344;
      } else if (unit == 'N') {
        dist = dist * 0.8684;
        }
      return (dist);
}
    
function  deg2rad_new_forest( deg) {
			return (deg * Math.PI / 180.0);
}


function  rad2deg_new_forest( rad) {
			return (rad * 180.0 / Math.PI);
}

////
function storedrawfnc(viewer,extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname)
{
	 console.log("eimai i storedrawfnc apo tin testpage");
	catholicvariable=4;
	var elevation = new Array();
	if(fname=="")
  	{
  		alert("Enter forest name");
  		//StopIteration;
  		return;
  	}
  	if(cellSize=="")
  	{
  		alert("Enter cell size");
  		//StopIteration;
  		return;
  	}
	var southeast=new Cesium.Cartographic();
	var southwest=new Cesium.Cartographic();
	var northeast=new Cesium.Cartographic();
	var northwest=new Cesium.Cartographic();
	//var lavmetender = Cesium.Cartesian3.fromDegrees(southeast.latitude,southeast.longitude,0);
	//var cartesianPosition = Cesium.Ellipsoid.WGS84.cartographicToCartesian(southeast);
	//Cesium.Rectangle.southeast(extent, result1);
	Cesium.Rectangle.southeast(extent,southeast);
	Cesium.Rectangle.southwest(extent,southwest);
	Cesium.Rectangle.northeast(extent,northeast);
	Cesium.Rectangle.northwest(extent,northwest);
	 southeastlonDegrees = Cesium.Math.toDegrees(southeast.longitude);
	 southeastlatDegrees = Cesium.Math.toDegrees(southeast.latitude);
	 southwestlonDegrees = Cesium.Math.toDegrees(southwest.longitude);
	 southwestlatDegrees = Cesium.Math.toDegrees(southwest.latitude);
	 northeastlonDegrees = Cesium.Math.toDegrees(northeast.longitude);
	 northeastlatDegrees = Cesium.Math.toDegrees(northeast.latitude);
	 northwestlonDegrees = Cesium.Math.toDegrees(northwest.longitude);
	 northwestlatDegrees = Cesium.Math.toDegrees(northwest.latitude);
	console.log('koukoutest medium: '+southeastlonDegrees );
// Specify our point of interest.
var pointOfInterest = Cesium.Cartographic.fromDegrees(
    86.925145, 27.988257, 0, new Cesium.Cartographic());
	
	//var les=new Cesium.CallbackProperty(promise, false);
   // console.log('koukou1 in meters is: '+koukou1  );
	var positionsAB = Cesium.Cartesian3.fromDegreesArray([
    southeastlatDegrees,southeastlonDegrees,
    southwestlatDegrees, southwestlonDegrees ]);
	var positionsAC = Cesium.Cartesian3.fromDegreesArray([
    southeastlatDegrees,southeastlonDegrees,
    northeastlatDegrees, northeastlonDegrees ]);
	var surfacePositionsAB = Cesium.PolylinePipeline.generateArc({
    positions: positionsAB
});
	var surfacePositionsAC = Cesium.PolylinePipeline.generateArc({
    positions: positionsAC
});
var scratchCartesian3AB = new Cesium.Cartesian3();
var scratchCartesian3AC = new Cesium.Cartesian3();
var surfacePositionsLengthAB = surfacePositionsAB.length;
var surfacePositionsLengthAC = surfacePositionsAC.length;
var totalDistanceInMetersAB = 0;
var totalDistanceInMetersAC = 0;
for (var i = 3; i < surfacePositionsLengthAB; i += 3) {
    scratchCartesian3AB.x = surfacePositionsAB[i] - surfacePositionsAB[i - 3];
    scratchCartesian3AB.y = surfacePositionsAB[i + 1] - surfacePositionsAB[i - 2];
    scratchCartesian3AB.z = surfacePositionsAB[i + 2] - surfacePositionsAB[i - 1];
    totalDistanceInMetersAB += Cesium.Cartesian3.magnitude(scratchCartesian3AB);
}
for (var i = 3; i < surfacePositionsLengthAC; i += 3) {
    scratchCartesian3AC.x = surfacePositionsAC[i] - surfacePositionsAC[i - 3];
    scratchCartesian3AC.y = surfacePositionsAC[i + 1] - surfacePositionsAC[i - 2];
    scratchCartesian3AC.z = surfacePositionsAC[i + 2] - surfacePositionsAC[i - 1];
    totalDistanceInMetersAC += Cesium.Cartesian3.magnitude(scratchCartesian3AC);
}
//totalDistanceInKmAB = totalDistanceInMetersAB * 0.001;
//totalDistanceInKmAC = totalDistanceInMetersAC * 0.001;
totalDistanceInKmAB=distance_new_forest(southeastlatDegrees, southeastlonDegrees, southwestlatDegrees, southwestlonDegrees, 'K');
totalDistanceInKmAC=distance_new_forest(southeastlatDegrees, southeastlonDegrees, northeastlatDegrees, northeastlonDegrees, 'K');
										
 rows=Math.round((totalDistanceInKmAC*1000)/cellSize);
 cols=Math.round((totalDistanceInKmAB*1000)/cellSize);
	var info= new Array(20);
	info[0]="north="+northwestlatDegrees;
	info[1]="south="+southwestlatDegrees;
	info[2]="east="+southeastlonDegrees;
	info[3]="west="+northeastlonDegrees;
	info[4]="cellsize="+cellSize;
	info[5]="rows="+rows;
	info[6]="cols="+cols;	
	info[7]="fname="+fname;
	info[8]="fueltype=0";
	info[9]="rotation=0";
	info[10]="northreal="+northwestlatDegrees;
	info[11]="northreallon="+northwestlonDegrees;
	info[12]="southreal="+southeastlatDegrees;
	info[13]="southreallon="+southeastlonDegrees;
	info[14]="eastreal="+northeastlonDegrees;	
	info[15]="eastreallat="+northeastlatDegrees;
	info[16]="westreal="+southwestlonDegrees;
	info[17]="westreallat="+southwestlatDegrees;
	info[18]="df=0"
	info[19]="username=floga2";
	

	var http2 = new XMLHttpRequest();
	var url2 = "../../include/fuel.php";
	var params2;
	http2.open("POST", url2, true);
	http2.onreadystatechange = function() { 
						
						if(http2.readyState == 4 && http2.status == 200) 
						{
							
								//for (var jj = 0; jj < elevation.length; jj += 1) {
									//console.log('DEBUG inside '+ jj);
									//console.log('DEBUG inside '+ pinakas[jj].height);
									//elevation[jj]=pinakas[jj].height.toFixed(1);
								//	console.log('fuel params['+jj+']: '+ elevation[jj]);
							//}
							//params1=params1+"fid="+fidModis;
							//params1=params1+"&fid="+fidModis;
							//console.log('tha kaleso tin slope me params1'+params1);
							//http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							//http1.setRequestHeader("Content-length", params1.length);
							//http1.setRequestHeader("Connection", "close");
							//http1.send(params1);
						//	for (var ii = 0; ii < 1; ii += 1) {
						//	for (var iii = 0; iii < 12; iii += 1) {
						//	for (var iiii = 0; iiii < 3; iiii += 1) {
						//		console.log('AMANAAAA ');
						//	}
							//}
							//}
							console.log('fuel.php returned me fid:::'+fidModis+" kai to dataSourcecorine einai :"+dataSourcecorine);
							//console.log("Epestrepse i storedraw kai to neo forest mpike stous pinakes: :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
							//scene.primitives.destroy();
							var primitives1 = scene.primitives;
							var length = primitives1.length;
							var i =primitives1.length-1;
							while (primitives1.length > 1) {
								console.log("primitives1.length: "+primitives1.length+" and i= "+i);
								var p = primitives1.get(i);
								scene.primitives.remove(p);
								i--;
							}
							var x=document.getElementsByClassName("twipsy-inner");
							var xx=document.getElementsByClassName("twipsy-arrow");
				//alert("found inner x"+x[0].innerHTML);
				//this._tooltip.setVisible(false);
							x[0].style.display ='none';
							xx[0].style.display ='none';
							removeCustomDatasourceNewForest('fuel');
							dataSourcecorine.load('../../db/forests/'+fidModis+'/corine.kml', {
								camera: viewer.camera,
								canvas: viewer.canvas
							});
							viewer.dataSources.add(dataSourcecorine)
							.then( function (dataSourcecorine) {
							var west = forests_west[fidModis];
var south = forests_south[fidModis];
var east = forests_east[fidModis];
var north = forests_north[fidModis];
jumpSetupsles_NEW(west, south, east,north);
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
						}
					}					
				

	var http = new XMLHttpRequest();
	var url = "../../include/storeDraw.php";
	var params = info.join("&");
	http.open("POST", url, true);
	//http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//http.setRequestHeader("Content-length", params.length);
	//http.setRequestHeader("Connection", "close");
		http.onreadystatechange = function() { 	
								
								if(http.readyState == 4 && http.status == 200) 
								{
									fidModis=parseInt(http.responseText);
									//alert('storeDraw returned fid :'+fidModis);
									add_new_forest_to_global_array(fidModis,northwestlatDegrees,southwestlatDegrees,southeastlonDegrees,northeastlonDegrees,southeastlatDegrees,southwestlonDegrees,rows,cols,cellSize);
									//ADD PLACEMARK TO NEW FOREST
									//$lat=(northwestlatDegrees+southeastlatDegrees)/2;
									//$lon=(northeastlonDegrees+southwestlonDegrees)/2;
									var today = new Date();
									var todaySTR=GetDayFormat(today);
									global_forests_placemarks.push({i: (global_forests_placemarks.length+1), lat: (northwestlatDegrees+southeastlatDegrees)/2, lon: (northeastlonDegrees+southwestlonDegrees)/2, fid: fidModis, name: fname,dateCreated: todaySTR});
									doulepse(global_forests_placemarks.length, (northwestlatDegrees+southeastlatDegrees)/2, (northeastlonDegrees+southwestlonDegrees)/2, fidModis, fname,todaySTR);
									var primitives1 = scene.primitives;
									var length = primitives1.length;
									var i =primitives1.length-1;
									while (primitives1.length > 1) {
										console.log("primitives1.length: "+primitives1.length+" and i= "+i);
										var p = primitives1.get(i);
										scene.primitives.remove(p);
										i--;
									}
									var x=document.getElementsByClassName("twipsy-inner");
									var xx=document.getElementsByClassName("twipsy-arrow");
				//alert("found inner x"+x[0].innerHTML);
				//this._tooltip.setVisible(false);
									x[0].style.display ='none';
									xx[0].style.display ='none';
									removeCustomDatasourceNewForest('behave');
									dataSourcebehave.load('../../db/forests/'+fidModis+'/behave.kml', {
										camera: viewer.camera,
										canvas: viewer.canvas
									});
									viewer.dataSources.add(dataSourcebehave)
									.then( function (dataSourcebehave) { 
									var west = forests_west[fidModis];
var south = forests_south[fidModis];
var east = forests_east[fidModis];
var north = forests_north[fidModis];
jumpSetupsles_NEW(west, south, east,north);
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
									//field_area.innerHTML = "<i><small>Layers generation...</small></i>"; 
console.log('params2 : northwestlatDegrees:'+northwestlatDegrees+ ' northwestlonDegrees:'+northwestlonDegrees+' southeastlatDegrees'+southeastlatDegrees+'  southeastlonDegrees'+southeastlonDegrees+'  northeastlonDegrees'+northeastlonDegrees+'  northeastlatDegrees'+northeastlatDegrees+'  southwestlonDegrees'+southwestlonDegrees+'  southwestlatDegrees'+southwestlatDegrees+'  fidModis'+fidModis+'  rows'+rows+'  cols'+cols+' ');
									params2 = "max_lat="+northwestlatDegrees+"&max_lat_lon="+northwestlonDegrees+"&min_lat="+southeastlatDegrees+"&min_lat_lon="+southeastlonDegrees+"&max_lon="+northeastlonDegrees+"&max_lon_lat="+northeastlatDegrees+"&min_lon="+southwestlonDegrees+"&min_lon_lat="+southwestlatDegrees+"&fid="+fidModis+"&rows="+rows+"&cols="+cols+"&df=0";
									http2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
									http2.setRequestHeader("Content-length", params2.length);
									http2.setRequestHeader("Connection", "close");
									http2.send(params2);
									console.log("Tora kano ipologismous gia eleveation kai kalo tin slope");
									savetodasos(extent,fname,cellSize);//exo ipologisei tis korifes
									//ipologizo to elevation
									callelevfnc(viewer,extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname,fidModis); 
									
								} 
							}
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Content-length", params.length);
	http.setRequestHeader("Connection", "close");
	http.send(params);
	




}


function removeCustomDatasourceNewForest(iam) 
{
	console.log("eimai i removeCustomDatasourceNewForest::::");
	//viewer.dataSources.add('../../db/forests/'+fid+'/aspect.kml');
	if ( iam == 'fuel' )
	{
		viewer.dataSources.remove(dataSourceelevedit);
		viewer.dataSources.remove(dataSourceaspectedit);
		viewer.dataSources.remove(dataSourcebehave);
		viewer.dataSources.remove(dataSourceslope);
		console.log("eimai i removeCustomDatasourceNewForest kai esvisa to "+iam+"::::");
	}
	if ( iam == 'slope' )
	{
		viewer.dataSources.remove(dataSourceelevedit);
		viewer.dataSources.remove(dataSourceaspectedit);
		viewer.dataSources.remove(dataSourcebehave);
		viewer.dataSources.remove(dataSourcecorine);
		console.log("eimai i removeCustomDatasourceNewForest kai esvisa to "+iam+"::::");
	}
	if ( iam == 'aspect' )
	{
		viewer.dataSources.remove(dataSourceelevedit);
		viewer.dataSources.remove(dataSourceslope);
		viewer.dataSources.remove(dataSourcebehave);
		viewer.dataSources.remove(dataSourcecorine);
	}
	if ( iam == 'behave' )
	{
		viewer.dataSources.remove(dataSourceslope);
		viewer.dataSources.remove(dataSourceaspectedit);
		viewer.dataSources.remove(dataSourceelevedit);
		viewer.dataSources.remove(dataSourcecorine);
		console.log("eimai i removeCustomDatasourceNewForest kai esvisa to "+iam+"::::");
	}
	if ( iam == 'corine' )
	{
		viewer.dataSources.remove(dataSourceelevedit);
		viewer.dataSources.remove(dataSourceaspectedit);
		viewer.dataSources.remove(dataSourcebehave);
		viewer.dataSources.remove(dataSourceslope);
	}
	if ( iam == 'all' )
	{
		viewer.dataSources.remove(dataSourceelevedit);
		viewer.dataSources.remove(dataSourceslope);
		viewer.dataSources.remove(dataSourceaspectedit);
		viewer.dataSources.remove(dataSourcebehave);
		viewer.dataSources.remove(dataSourcecorine);
	}
}

function aerial_with_labels_add_remove(checked){
	//alert("Ftiaxno ta kalodia"+checked);
	if (checked){
		document.getElementById('AERIAL_WITH_LABELS_SIM').checked = true;
		document.getElementById('AERIAL_WITH_LABELS_VIS').checked = true;
		document.getElementById('AERIAL_WITH_LABELS_EDIT').checked = true;
		viewer.imageryLayers.get(1).show=true;
	}
	else{
		document.getElementById('AERIAL_WITH_LABELS_SIM').checked = false;
		document.getElementById('AERIAL_WITH_LABELS_VIS').checked = false;
		document.getElementById('AERIAL_WITH_LABELS_EDIT').checked = false;
		viewer.imageryLayers.get(1).show=false;
	}
}


function GetDayFormat(date) 
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

	
    return minyear + "-" +
        minmonth + "-" +
        minday;
}


function jumpSetupsles_NEW(west, south, east,north) 
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