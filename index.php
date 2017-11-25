<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <title>FLogA</title>
	  <meta charset="utf-8">
	  <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale = 1.0, maximum-scale=1.0, user-scalable=no"/>
	  	<link href="css/style.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" href="jQRangeSlider-5.7.2/css/classic.css" type="text/css" />
	<link type="text/css" rel="StyleSheet" href="css/luna/luna.css" />
	<link rel="stylesheet"
    href="jquery_resizable_menu.css">
  <script src="../Build/Cesium/Cesium.js"></script>
  
  <link type="text/css" rel="StyleSheet" href="noUiSlider.10.0.0/nouislider.css" />
  <script src="noUiSlider.10.0.0/nouislider.js"></script>
  
  <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<!-- FOR sortable table -->


<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  
    <!--Using jQuery and jQuery UI for display effects-->
   <!-- <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>-->
   <!-- <script src="https://code.jquery.com/ui/1.11.1/jquery-ui.min.js"></script>-->
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
	<!--<script src=jquery-3.1.0.min.js></script>-->
<script src="jQRangeSlider-5.7.2/jQAllRangeSliders-min.js"></script>
    <!--Using the hamburger menu display code-->
    <script src="js/hamburger.js"></script>
	<script src="testpage.js"></script>
	<script src="simsetup.js"></script>
	<script src="editvege.js"></script>
	<script src="visualization.js"></script>
	<script src="DrawHelper.js"></script>
	<script src="hotpoint_sim.js"></script>
	<script src="laf.js"></script>
	  <style>
      @import url(../Build/Cesium/Widgets/widgets.css);
	  @import url(DrawHelper.css);
	         #toolbar {
           <!-- position: absolute;
            top: 0px;
            right: 0;-->
            display: inline;
            margin: 10px;
            padding: 0px;
        }
        #logging {
            position: absolute;
            bottom: 0px;
            right: 0;
            display: none;
            margin: 10px;
            padding: 100px;
            background: white;
        }
      html, body, #cesiumContainer {
          width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden; position: relative; background-color: lightgreen;
       }
   </style>
    <script type="text/javascript">
    (function ($) {
        // Detect touch support
        $.support.touch = 'ontouchend' in document;
        // Ignore browsers without touch support
        if (!$.support.touch) {
        return;
        }
        var mouseProto = $.ui.mouse.prototype,
            _mouseInit = mouseProto._mouseInit,
            touchHandled;

        function simulateMouseEvent (event, simulatedType) { //use this function to simulate mouse event
        // Ignore multi-touch events
            if (event.originalEvent.touches.length > 1) {
            return;
            }
        event.preventDefault(); //use this to prevent scrolling during ui use

        var touch = event.originalEvent.changedTouches[0],
            simulatedEvent = document.createEvent('MouseEvents');
        // Initialize the simulated mouse event using the touch event's coordinates
        simulatedEvent.initMouseEvent(
            simulatedType,    // type
            true,             // bubbles                    
            true,             // cancelable                 
            window,           // view                       
            1,                // detail                     
            touch.screenX,    // screenX                    
            touch.screenY,    // screenY                    
            touch.clientX,    // clientX                    
            touch.clientY,    // clientY                    
            false,            // ctrlKey                    
            false,            // altKey                     
            false,            // shiftKey                   
            false,            // metaKey                    
            0,                // button                     
            null              // relatedTarget              
            );

        // Dispatch the simulated event to the target element
        event.target.dispatchEvent(simulatedEvent);
        }
        mouseProto._touchStart = function (event) {
        var self = this;
        // Ignore the event if another widget is already being handled
        if (touchHandled || !self._mouseCapture(event.originalEvent.changedTouches[0])) {
            return;
            }
        // Set the flag to prevent other widgets from inheriting the touch event
        touchHandled = true;
        // Track movement to determine if interaction was a click
        self._touchMoved = false;
        // Simulate the mouseover event
        simulateMouseEvent(event, 'mouseover');
        // Simulate the mousemove event
        simulateMouseEvent(event, 'mousemove');
        // Simulate the mousedown event
        simulateMouseEvent(event, 'mousedown');
        };

        mouseProto._touchMove = function (event) {
        // Ignore event if not handled
        if (!touchHandled) {
            return;
            }
        // Interaction was not a click
        this._touchMoved = true;
        // Simulate the mousemove event
        simulateMouseEvent(event, 'mousemove');
        };
        mouseProto._touchEnd = function (event) {
        // Ignore event if not handled
        if (!touchHandled) {
            return;
        }
        // Simulate the mouseup event
        simulateMouseEvent(event, 'mouseup');
        // Simulate the mouseout event
        simulateMouseEvent(event, 'mouseout');
        // If the touch interaction did not move, it should trigger a click
        if (!this._touchMoved) {
          // Simulate the click event
          simulateMouseEvent(event, 'click');
        }
        // Unset the flag to allow other widgets to inherit the touch event
        touchHandled = false;

        };
        mouseProto._mouseInit = function () {
        var self = this;
        // Delegate the touch handlers to the widget's element
        self.element
            .on('touchstart', $.proxy(self, '_touchStart'))
            .on('touchmove', $.proxy(self, '_touchMove'))
            .on('touchend', $.proxy(self, '_touchEnd'));

        // Call the original $.ui.mouse init method
        _mouseInit.call(self);
        };
    })(jQuery);


    </script>
  <script>
		//$("#slider").dateRangeSlider();
  		var forests_lat = new Array();
		var all_sims_name = new Array();
		var all_sims_fid = new Array();
		var all_sims_google = new Array();
		var forests_cell = new Array();
		var forests_rows = new Array();
		var forests_cols = new Array();
		var forests_lon = new Array();
		var forests_north = new Array();
		var forests_south = new Array();
		var forests_west = new Array();
		var forests_east = new Array();
		var forests_rot = new Array();
		var forests_reallat = new Array();
		var forests_reallon = new Array();
		var min_date_creation;
  <?php

		include("../../db/connection.php");
		
		
		$db_handle = mysql_connect($db_host, $username, $password);
		$db_found = mysql_select_db($db_name, $db_handle);
		
		if ($db_found) 
		{
			$SQL = "SELECT * FROM FORESTS";
			$result = mysql_query($SQL);
			while($row = mysql_fetch_array($result))
	  		{
	  			$lat=($row['north'] - $row['south'])/2;
	  			$lat=$lat+$row['south'];
	  			$lon=($row['east'] - $row['west'])/2;
	  			$lon=$row['west'] + $lon;
	  			$rot=$row['rotation'];
	  			$reallat=($row['northreal']+$row['southreal'])/2;
				$reallon=($row['eastreal']+$row['westreal'])/2;
			
				printf ("forests_cell[%d]=%d; ", $row['id'], $row['cell_size']);
				printf ("forests_rows[%d]=%d; ", $row['id'], $row['row']);
				printf ("forests_cols[%d]=%d; ", $row['id'], $row['cols']);
	  			printf ("forests_lat[%d]=%01.4f; ", $row['id'], $lat);
	  			printf ("forests_lon[%d]=%01.4f; ", $row['id'], $lon);
				printf ("forests_south[%d]=%01.4f; ", $row['id'], $row['southreal']);
				printf ("forests_north[%d]=%01.4f; ", $row['id'], $row['northreal']);
				printf ("forests_west[%d]=%01.4f; ", $row['id'], $row['westreal']);
				printf ("forests_east[%d]=%01.4f; ", $row['id'], $row['eastreal']);
	  			printf ("forests_rot[%d]=%01.7f; ", $row['id'], $rot);
	  			printf ("forests_reallat[%d]=%01.4f; ", $row['id'], $reallat);
	  			printf ("forests_reallon[%d]=%01.4f; ", $row['id'], $reallon);				
	  		}
	  		mysql_close($db_handle);
	  		
	  		echo "var username='".$_SESSION['username']."';";
		}	
?>
  <?php

		include("../../db/connection.php");
		
		
		$db_handle = mysql_connect($db_host, $username, $password);
		$db_found = mysql_select_db($db_name, $db_handle);
		
		if ($db_found) 
		{
			$SQL = "SELECT * FROM SIMULATIONS";
			$result = mysql_query($SQL);
			while($row = mysql_fetch_array($result))
	  		{	
				$namee=$row['name'];
				//$ssssid=$row['name'];
	  			$fidd=$row['forest_id'];
				$googlee=$row['google'];
	  			//printf ("all_sims_name[%d]=%s; ", $row['id'], $namee);
				echo "all_sims_name[".$row['id']."]='#".$row['id']." | ".$namee."';";
	  			printf ("all_sims_fid[%d]=%s; ",$row['id'], $fidd);	
				printf ("all_sims_google[%d]=%s; ",$row['id'], $googlee);				
	  		}
	  		mysql_close($db_handle);
		}	
?>
  <?php

		include("../../db/connection.php");
		
		
		$db_handle = mysql_connect($db_host, $username, $password);
		$db_found = mysql_select_db($db_name, $db_handle);
		
		if ($db_found) 
		{
			$SQL = "select min(dateCreated) as dtmin from FORESTS where dateCreated is not null and dateCreated <> '0000-00-00'";
			$result = mysql_query($SQL);
			while($row = mysql_fetch_array($result))
	  		{	
				$dateee=$row['dtmin'];
				echo "min_date_creation='".$dateee."';";			
	  		}
	  		mysql_close($db_handle);
		}	
?>
</script>
<script>
function init1(mode) 
{
  
  	if(mode==4)
  	{
  		
  	}
	else if(mode==2)
	{
		
		
	}
	
}

</script>
    <!--Using Media Queries, if the viewport is smaller than 700px use another stylesheet-->
    <link rel="stylesheet" type="text/css" media="all" href="css/hamburger_right_FL.css"/>
</head>

<body>
<script>
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

  </script>
<!--This wrapping container is used to get the width of the whole content-->
<!--<div id="container">-->

    <!--The Hamburger Button in the Header-->
	<!--<div id="header_er" style="position: absolute;top:0px;left:5px;height:100%; background: rgba(42, 42, 42, 0.8);padding: 5px 8px;border-radius: 5px;">-->
    <!--<header>-->
      <!--  <div id="hamburger">-->
       <!--     <div></div>-->
      <!--      <div></div>-->
     <!--       <div></div>-->
     <!--   </div>-->
   <!-- </header>-->
<!--</div>-->
    <!--The mobile navigation Markup hidden via css-->

    <!--The Layer that will be layed over the content
    so that the content is unclickable while menu is shown-->
    <div id="contentLayer"></div>

    <!--The content of the site-->
    <div id="content">
  <div id="cesiumContainer" style="width: 100%; height: 100%;" ></div>
  <div id="toolbar22">
</div>
<div id="logging">
</div>
<div id="loading_bgrd" class="full-koukou"></div>
      <div id="loading_spinner" class="sk-cube-grid" style="display: none;">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
		<div id="spinner_text" class="koukou" ><p style="color:rgba(242, 242, 242, 0.84);";><font size="3">Creating Layers</font></p></div>
      </div>
<div class="row" style="background-color: rgba(25, 25, 25, 0.8);position: fixed;top: 0px;right: 5px;min-width: 225px;padding-top:5px;padding-bottom: 3px;">
	<div class="col-md-10 col-sm-10 col-xs-10" style="color: lightblue;text-align: center;">
		<span id="ipno2" style="white-space: nowrap;cursor:pointer;color: lightblue;" onclick="showNavNEW();" >Simulation History</span>
	</div>
	<div class="col-md-2 col-sm-2 col-xs-2">
		<span id="ipno1" onclick="openNavNEW()" style="cursor:pointer;color: lightblue;padding: 2px;padding-right:10px;padding-left:10px; float: right;">☰</span>
	</div>
</div>
<div id="resizable" class="container">
	<div class="row">
		<div class="col-md-2 col-sm-2 col-xs-2">
			<span style="color:lightblue;padding: 2px;cursor:pointer" onclick="hideNav();" class="glyphicon"></span>
		</div>
		<div class="col-md-8 col-sm-8 col-xs-8" style="color: lightblue;text-align: center;">
			<span id="ipno3" style="color: lightblue;cursor:pointer" onclick="showNavNEW();" >Simulation History</span>
		</div>
		<div class="col-md-2 col-sm-2 col-xs-2">
			<span id="ipno" onclick="openNavNEW()" style="color: lightblue;padding: 2px;padding-right:10px;padding-left:10px; float: right;cursor:pointer">☰</span>
		</div>
	</div>

<div id="mySidenav" class="sidenav">
  <!--<a href="javascript:void(0)" class="closebtn" onclick="hideNav()"><span style="color:lightblue" class="glyphicon">&#xe258;</span></a> -->
  <!--<ul style="list-style-type:none;padding-left: 0px;">-->
  <div><a href="javascript:void(0)" onclick="openSimHistorydeep()">Simulation History</a></div>
  <div><a href="javascript:void(0)" onclick="openSimSetupdeep()">Simulation Setup</a></div>
  <div><a href="javascript:void(0)" onclick="openNavdeep()">New Forest</a></div>
  <div><a href="javascript:void(0)" onclick="openEditVegetationdeep()">Edit Forest</a></div>
  <div><a href="javascript:void(0)" onclick="openHotpointSimdeep()">Hotspots & DDDAS</a></div>
  <!--</ul>-->
</div>
<div id="New Forest1" class="sidenavdeep">
<div class="wrtext" style="padding-left: 5%;padding-right: 2%;">
  <!--<a href="javascript:void(0)" class="closebtn" onclick="hideNav()"><span style="color:lightblue" class="glyphicon">&#xe258;</span></a>-->
    	<table id="drawForestParameters">
	    	<tr>
	    		<td>Name</td>
		</tr>
		<tr>
	    		<td style="padding-bottom:10px"><input style="-webkit-border-radius: 6px;" type="text" name="fname" id="fname1new" size="24"></td>
	    	</tr>
    		<tr>
    			<td>Cell size</td>
		</tr>
		<tr>
    			<td style="padding-bottom:10px"><input  type="number" style="width:3em;-webkit-border-radius: 6px;" id='cellsize1new' name="cellsize" value="30"> m.</td>
    		</tr>
		<tr>
    			<td>Map labels</td>
		</tr>
		<tr>
    			<td><input type="checkbox" checked name="AERIAL_WITH_LABELS" id="AERIAL_WITH_LABELS" value="AERIAL_WITH_LABELS" onchange="aerial_with_labels_add_remove(this.checked);"></td>
    		</tr>
    	</table>
  <br/>
      <div id="toolbar">
</div>
<br/>
    	<input type="submit" value="Save forest" class="classname" onclick='saveForesttest();' id="set_forest" name="set_forest" />
		
</div>
</div>
<div id="dateslider" class="sidenavdeep" style="width:100%;">
<div class="wrtext" style="padding-left: 5%;padding-right: 2%;">
<!--<a href="javascript:void(0)" class="closebtn" onclick="hideNav()"><span style="color:lightblue" class="glyphicon">&#xe258;</span></a>-->
</div>
<div id="sliderlav" style="display:none;width:350px;margin-top:35px;margin-left:5%;margin-right:30px" ></div>
<table align="center" style="height:100%">
				<tr style="line-height: 15px; height: 15px;"><td><font style="color: white;font-size: small;">Forests Creation Date</font></td></tr>
				<tr style="line-height: 15px; height: 15px;"><td><span class="example-val" style="color: white;font-size: small;" id="event-end">Friday, 31st December 2010</span></td></tr>
			   <tr style="line-height: 15px; height: 15px;"><td><span class="example-val" style="color: white;font-size: small;" id="event-start">Friday, 2nd January 2015</span></td></tr>
			   <tr style="height:15px"></tr>
			   <tr><td><div id="slider" > </div></td></tr>
		</table>
</div>
<div id="visualizationControls" class="sidenavdeep">
<div class="wrtext" style="padding-left: 5%;padding-right: 2%;">
  <!--<a href="javascript:void(0)" class="closebtn" onclick="hideNav()"><span style="color:lightblue" class="glyphicon">&#xe258;</span></a>-->
<?php

	$sid = $_GET["visualization"];

	include("../../db/connection.php");
	include("../../db/variables.php");
	
	$db_handle = mysql_connect($db_host, $username, $password);
	$db_found = mysql_select_db($db_name, $db_handle);
	
	if ($db_found) 
	{
		$SQL = "SELECT * FROM FORESTS";
		$result = mysql_query($SQL);
				
		if ($sid)
		{		
			$SQL2 = "SELECT * FROM SIMULATIONS WHERE id='$sid'";
			$result2 = mysql_query($SQL2);
			$row2 = mysql_fetch_array($result2);
			$tr = $row2['time_range'];
			$sname = $row2['name'];
			
			while($row = mysql_fetch_array($result))
			{
				if($row['id']==$row2['forest_id'])
				{
					$fname=$row['name'];
					$rot=sprintf("%01.0f", $row['rotation']);
					$fid=$row['id'];
					break;
				}
			}
		}
	}
	else 
	{
		print "Database NOT Found ";
		mysql_close($db_handle);
	}
?>

<label>
	<b>
		<font color=#ff4040>
	<?php 
		if ($sid) 
		{
			echo "<div>
					<a href='#' id='forestNameLink' onclick='jumpToPoint (forests_lat[".$fid."], forests_lon[".$fid."], 35000, 0);'>".$fname."</a> &nbsp
					<a href='#' id='forestTour' onclick=\"enterTour ();\"><img src='../../images/bino.jpg' border='0' WIDTH='18' HEIGHT='18' /></a> &nbsp"; 
			echo "</div>";
		} 
	?> 
		</font>
	</b>
</label>
	<table>
	<tr>
	<td>
	<font size="2"><b>Forest</b></font>
	<br/>
	<select style="color:black;width:82%" name="forestDownVIS" id="forestDownVIS" onchange="flySetupVIS.apply(this);">
		<option value="9000000" selected="yes"></option>
<?php

include("../../db/connection.php");
	
	$db_handle = mysql_connect($db_host, $username, $password);
	$db_found = mysql_select_db($db_name, $db_handle);
	
	if ($db_found) 
	{
			$SQL = "SELECT id from USER where username='floga'";
			$result = mysql_query($SQL);
			$row = mysql_fetch_array($result);  	
			$userid = $row['id'];	

		if($userid!=1)
		{
			$SQL = "SELECT * FROM FORESTS WHERE user=".$userid;
		}
		else
		{
			$SQL = "SELECT * FROM FORESTS WHERE user=0 OR user=1";			
		}
		$result = mysql_query($SQL);
				
		while($row = mysql_fetch_array($result))
		{
			echo "<option style=\"color: black\" value=\"".$row['id']."\" id=\"".$row['id']."\">".$row['name']."</option>";
		}

	}
	else 
	{
		print "Database NOT Found";
		mysql_close($db_handle);
	}
?>
	</td>
	</tr>
	<tr>
	<td>
		<font size="2"><b>Simulations</b></font>
		<br/>
		<select style="color:black;width:82%" name="forestDownVISALLSIMS" id="forestDownVISALLSIMS" onchange="LoadSelectedSimulation.apply(this);">
		<option value="9000000" selected="yes"></option>
	</td>
	</tr>
	<tr>
	<td>

	</td>
<tr>
		<td id="DEFAULT_SCEN_VIS_CHECKBOX" style="display:none">
		<input type="submit" value="Burn probabilities" class="classname" onclick='default_scen_visbtn();' id="DEFAULT_SCEN_VIS" name="DEFAULT_SCEN_VIS"  style="font-size:11px"/>
		<!--<input type="checkbox" name="DEFAULT_SCEN_VIS" id="DEFAULT_SCEN_VIS" value="DEFAULT_SCEN_VIS" onchange="default_scen_vis(this.checked);">
		<font size="2">Burn probabilities</font>-->
	</td>
</tr>
	</tr>
	</select>
	</table>
<div id="simdetailsdiv" style="padding-top: 2px;">
      <div class="panel-heading1">
        <h4 class="panel-title">
          <a data-toggle="collapse" id="collapsea" href="#collapse1" style="font-size: 15px;color:white" class="" aria-expanded="true">
		  <input type="submit" value="Scenarios" class="classname" style="font-size:12px">
		  </a>
        </h4>
      </div>
	  <div id="collapse1" class="panel-collapse collapse in" aria-expanded="true" style="">
	  <div id="sawlegacy" class="panel-body" style="max-height:170px;height:auto;overflow-y: auto;"></div>
	  </div>
</div>

<span class="text" id="h-value" style="margin-left:142px;"></span>

<script type="text/javascript">

	var field_area = el('h-value');
	slider1 = new Slider(document.getElementById("slider-1"), document.getElementById("slider-input-1"));
	
	slider1.setMinimum(60);
	slider1.setMaximum(600);
	slider1.setBlockIncrement(60);
	slider1.setUnitIncrement(60);
	slider1.setValue(300);
	field_area.innerHTML = '<small>Animation speed: '+slider1.getValue()+'x</small>';

	window.onresize = function () 
	{
		slider1.recalculate();
	};

	slider1.onchange = function () 
	{
		animationSpeed=Math.round(slider1.getValue()/10)*10;
		var field_area = el('h-value');	
		field_area.innerHTML = '<small>Animation speed: '+animationSpeed+'x</small>';
		if(ge.getTime().getRate()!=0)
		{
			ge.getTime().setRate(animationSpeed);
		}
	};	

</script>

<br/>
<hr/>

<table>	
			<tr>
				<td style="padding-right: 6px;">
					<input type="checkbox" name="elevation" id="elevationvis" value="elevation" onchange="AutoElevationVIS(this.checked, -1);" />
					<font size="2">Elevation</font>
				</td>
				<td style="padding-right: 6px;">
					<input type="checkbox" name="behave" id="behavevis" value="behave" onchange="AutoBehaveVIS(this.checked, -1);" />
					<font size="2">Behave</font>
				</td>
				<td style="padding-right: 6px;">
					<input type="checkbox" name="corine" id="corinevis" value="corine" onchange="AutoCorineVIS(this.checked, -1);" />
					<font size="2">Corine</font>
				</td>
			</tr>
			<tr>
				<td style="padding-right: 6px;">
					<input type="checkbox" name="slope" id="slopevis" value="slope" onchange="AutoSlopeVIS(this.checked, -1);" />
					<font size="2">Slope</font>
				</td>
				<td style="padding-right: 6px;">
					<input type="checkbox" name="aspect" id="aspectvis" value="aspect" onchange="AutoAspectVIS(this.checked, -1);" />
					<font size="2">Aspect</font>
				</td>
				<td style="padding-right: 6px;">		
					<input type="checkbox" checked name="AERIAL_WITH_LABELS_VIS" id="AERIAL_WITH_LABELS_VIS" value="AERIAL_WITH_LABELS_VIS" onchange="aerial_with_labels_add_remove_vis(this.checked);">
					<font size="2">Map labels</font>
				</td>
			</tr> 
</table>
<hr/>
<table>
	<tr>
		<td style="padding-right:13px">
			<input type="submit" value="Land cover" class="classname" id="toolbar11requestcorineVIS" name="toolbar11requestcorineVIS" />
		</td>
		<td>
			<input type="submit" value="Reset" class="classname" onclick='onClickResetPolygon();' id="reset_polygon" name="reset_polygon" />
		</td>
	</tr>
	<tr>
		<td style="padding-right:13px">
			<input type="submit" value="Check scenarios" class="classname" onclick='onClickAddPerimeter();' id="add_perimeter" name="add_perimeter" />
		</td>
		<td> 			
			<input type="submit" value="Reset" class="classname" onclick='onClickResetCheckScenarios();' id="reset_perimeter" name="reset_perimeter" />
		</td>
	</tr>
	<tr><td><button style="display:none" onclick="myFunction();" id="mana">Click me</button></td>
	<td><button style="display:none" onclick="myFunctiondef();" id="mana_def">Click me</button></td></tr>
</table>

</div>
</div>
<div id="simulationSetup" class="sidenavdeep">
<div class="wrtext" style="padding-left: 5%;padding-right: 2%;">
  <font size="2">Forest</font>
		<br/>
		<select style="color:black;width: 80.5%" name="forestDown" id="forestDown" onchange="flySetup.apply(this);">
		<option value="9000000" selected="yes"></option>
	
<?php

		include("../../db/connection.php");
		
		$db_handle = mysql_connect($db_host, $username, $password);
		$db_found = mysql_select_db($db_name, $db_handle);
		
		if ($db_found) 
		{
				$SQL = "SELECT id from USER where username='floga'";
				$result = mysql_query($SQL);
				$row = mysql_fetch_array($result);  	
				$userid = $row['id'];	
			
			if($userid!=1)
			{
				$SQL = "SELECT * FROM FORESTS WHERE user=".$userid;
			}
			else
			{
				$SQL = "SELECT * FROM FORESTS WHERE user=0 OR user=1";			
			}
			$result = mysql_query($SQL);
					
			if ($sid)
			{		
					$SQL2 = "SELECT * FROM SIMULATIONS WHERE id='$sid'";
					$result2 = mysql_query($SQL2);
					$row2 = mysql_fetch_array($result2);
					
					while($row = mysql_fetch_array($result))
	  				{
	  					if($row['id']==$row2['forest_id'])
	  					{
	  						$fname=$row['name'];
	  						break;
	  					}
	  				}
	  				$fid=$row2['forest_id'];
					echo "<option style=\"color:black\" value=".$fname." id=".$row2['forest_id'].">".$fname."</option>";
					
					// FLY OVER SPECIFIC FOREST
			}
			else
			{
				while($row = mysql_fetch_array($result))
	  			{
	  				echo "<option style=\"color:black\" value=\"".$row['id']."\" id=\"".$row['id']."\">".$row['name']."</option>";
	  			}
			}
		}
		else 
		{
			print "Database NOT Found ";
			mysql_close($db_handle);
		}

?>

		</select>
		
		<br/>
		<font size="2">Fuel layer</font>
		<br/>
		<table>
		<tr>
		<td>		
		<select style="color:black" name="fuelDown" id="fuelDown" onchange="fuelDown.apply(this);">
		<option style="color: black;" id="-1">Original</option>
		</select>
		</td>
		</tr>
		</table>
		<!--<hr style="margin-top: 12px;margin-bottom:12px;"/>-->
		<table>	
			<tr>
				<td style="padding-right: 6px;">
					<input type="checkbox" name="elevation" id="elevation" value="elevation" onchange="AutoElevationSimSetup(this.checked, -1);" />
					<font size="2">Elevation</font>
				</td>
				<td style="padding-right: 6px;">
					<input type="checkbox" name="behave" id="behave" value="behave" onchange="AutoBehaveSimSetup(this.checked, -1);" />
					<font size="2">Behave</font>
				</td>
				<td style="padding-right: 6px;">
					<input type="checkbox" name="corine" id="corine" value="corine" onchange="AutoCorineSimSetup(this.checked, -1);" />
					<font size="2">Corine</font>
				</td>
			</tr>
			<tr>
				<td style="padding-right: 6px;">
					<input type="checkbox" name="slope" id="slope" value="slope" onchange="AutoSlopeSimSetup(this.checked, -1);" />
					<font size="2">Slope</font>
				</td>
				<td style="padding-right: 6px;">
					<input type="checkbox" name="aspect" id="aspect" value="aspect" onchange="AutoAspectSimSetup(this.checked, -1);" />
					<font size="2">Aspect</font>
				</td>
				<td style="padding-right: 6px;">			
					<input type="checkbox" checked name="AERIAL_WITH_LABELS_SIM" id="AERIAL_WITH_LABELS_SIM" value="AERIAL_WITH_LABELS_SIM" onchange="aerial_with_labels_add_remove_sim(this.checked);">
					<font size="2">Map labels</font>
				</td>
			</tr> 
		</table>
		<hr style="margin-top: 12px;margin-bottom:12px;"/>
		<label>
			<span><font size="2">Time range (min.)</font></span>
			<br/>
			<input type="text" class="input-text" id="tr" name="tr" size="3" value="180" />
		</label>
		<br/>
		<span><font size="2">Current relative moisture (%)</font></span>
		<br/>
		<input type="text" class="input-text" id="rmoi" name="rmoi" size="3" />
		<br/>
		<hr style="margin-top: 12px;margin-bottom:12px;visibility: hidden"/>
		<span><font size="2"># Speed scenarios &nbsp &nbsp &nbsp # Direction scenarios</font></span>
		<br/>
		<input type="text" class="input-text" id="ssc" name="ssc" size="3" value="3" /> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp <input type="text" class="input-text" id="dsc" name="dsc" size="3" value="3" />
		<br/>
		<font size="2">Sampling</font>
		<br/>
		<select style="color:black" name="distribution" id="distribution">
			<option style="color:black">Equidistant</option>
			<option style="color:black">Random Uniform distribution</option>
			<option style="color:black">Random Gaussian distribution</option>
		</select>
				<br/>
		<br/>
		<font size="2">Current wind Speed <span id="current_speed"></span></font>
		<br/> <table><tbody><tr><td><font size="2">Default range (m/s) </font></td></tr>
			<tr><td><input type="text" class="input-text" id="wsmin" name="wsmin" size="3"></td><td><input type="text" class="input-text" id="wsmax" name="wsmax" size="3"></td></tr>
		</tbody></table>
		<br/>
		<font size="2">Current wind Direction <span id="current_direction"></span></font>
		<br/> <table ><tbody><tr><td><font size="2">Default range (&#176;) </font></td></tr>
		<tr><td><input type="text" class="input-text" id="wdmin" name="wdmin" size="3" /></td><td><input type="text" class="input-text" id="wdmax" name="wdmax" size="3" /></td></tr>
		</tbody></table>
		<hr style="margin-top: 12px;margin-bottom:12px;visibility: hidden"/>
		<input onclick="changebtn('Click to place ignition');" style='float:left; margin-right:10px;' type="submit"  value="Add ignition point" class="flamebutton"  id="toolbar11" name="add_ignition" />
<!--<div id="toolbar11"  >
</div>-->
		<input class='flamebutton' type="submit" onclick='getIgnitions(1);' value="Check MODIS ignitions">
		<div align="left" id="ignition_coo"></div>
		<br/>
		<table ><tbody>
		<tr><td style="padding-right: 6px;"><input type="checkbox" name="WindNinja" id="WindNinja" value="WindNinja" /></td><td><font size="2">WindNinja</font></td></tr>
		<tr><td style="padding-right: 6px;"><input type="checkbox" name="visualization1" id="visualization1" value="Flame Length" /></td><td><font size="2">Flame length animations</font></td></tr>
		</tbody></table>
		<input style='margin-top:5px;' type="submit" value="Run simulations" class="classname" onclick='simulation(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1);' />
		<!--<input style='margin-top:20px;' type="submit" value="Run simulations" class="classname" onclick='efiga();' />-->
		<br/>		
		<div id="put-bar-here"></div>
		<div id="underBar"></div>
		<div id="visualizeResults"></div>
		</div>
		</div>
<div id="editForestControls" class="sidenavdeep">
<div class="wrtext" style="padding-left: 5%;padding-right: 2%;">
  <!--<a href="javascript:void(0)" class="closebtn" onclick="hideNav()"><span style="color:lightblue" class="glyphicon">&#xe258;</span></a>-->



  	<font size="2"><b>Forest</b></font>
	<br/>
	<select style="color:black;width:82%" name="forestDown" id="forestDownedit" onchange="flySetupedit.apply(this);">
		<option value="9000000" selected="yes"></option>
<?php

include("../../db/connection.php");
	
	$db_handle = mysql_connect($db_host, $username, $password);
	$db_found = mysql_select_db($db_name, $db_handle);
	
	if ($db_found) 
	{
			$SQL = "SELECT id from USER where username='floga'";
			$result = mysql_query($SQL);
			$row = mysql_fetch_array($result);  	
			$userid = $row['id'];	

		if($userid!=1)
		{
			$SQL = "SELECT * FROM FORESTS WHERE user=".$userid;
		}
		else
		{
			$SQL = "SELECT * FROM FORESTS WHERE user=0 OR user=1";			
		}
		$result = mysql_query($SQL);
				
		while($row = mysql_fetch_array($result))
		{
			echo "<option style=\"color:black\" value=\"".$row['id']."\" id=\"".$row['id']."\">".$row['name']."</option>";
		}

	}
	else 
	{
		print "Database NOT Found";
		mysql_close($db_handle);
	}
?>
	</select>
	<br/>
		<table>	
			<tr>
				<td style="padding-right: 6px;">
					<input type="checkbox" name="elevation" id="elevationedit" value="elevation" onchange="AutoElevationedit(this.checked, -1);" />
					<font size="2">Elevation</font>
				</td>
				<td style="padding-right: 6px;">
					<input type="checkbox" name="behave" id="behaveedit" value="behave" onchange="AutoBehaveedit(this.checked, -1);" />
					<font size="2">Behave</font>
				</td>
				<td style="padding-right: 6px;">
					<input type="checkbox" name="corine" id="corineedit" value="corine" onchange="AutoCorineedit(this.checked, -1);" />
					<font size="2">Corine</font>
				</td>
			</tr>
			<tr>
				<td style="padding-right: 6px;">
					<input type="checkbox" name="slope" id="slopeedit" value="slope" onchange="AutoSlopeedit(this.checked, -1);" />
					<font size="2">Slope</font>
				</td>
				<td style="padding-right: 6px;">
					<input type="checkbox" name="aspect" id="aspectedit" value="aspect" onchange="AutoAspectedit(this.checked, -1);" />
					<font size="2">Aspect</font>
				</td>
				<td style="padding-right: 6px;">
					<input type="checkbox" checked  name="AERIAL_WITH_LABELS_EDIT" id="AERIAL_WITH_LABELS_EDIT" value="AERIAL_WITH_LABELS_EDIT" onchange="aerial_with_labels_add_remove_edit(this.checked);">
					<font size="2">Map labels</font>
				</td>
			</tr> 
		</table>
	<hr/>
	<font size="2"><b>Source fuel layer</b></font>
	<table>
		<tr>
			<td>
				<select style="color:black" name="sourceFuelDown" id="sourceFuelDown" onchange="sourceFuelEdit.apply(this);">
					<option style="color: black;">Original</option>
				</select>
			</td>
		</tr>
	</table>
	<br/>
	<input type="submit" class="classname"  value="Land Cover" id="toolbar11requestcorine" name="toolbar11requestcorine" />
	<input type="submit" value="Free draw" class="classname" id="toolbar12" name="add_polygon" />
	<input type="submit" value="Reset" class="classname" onclick='onClickResetPolygon();' id="reset_polygon" name="reset_polygon" />
	<br/><br/>
	<table>
		<tr>
			<td><font size=2>Convert to Fuel model:</font></span></td>
			<td><input type="text" class="input-text" id="fuelModel" name="fuelModel" size="2" /></td>
		</tr>
	</table>
	<hr/>
	<font size="2"><b>Target fuel layer</b></font>
	<table>
		<tr>
			<td>
				<select style="color:black" name="targetFuelDown" id="targetFuelDown">
					<option>Original</option>
				</select></td><td>
				<input type="checkbox" name="newEditCheck" id="newEditCheck" value="newEdit" onchange="newEdit(this.checked);" />
				<font size="2">Create new</font>
			</td>
		</tr>
		<tr>
			<td></td>
			<td><div id="newEditName"></div></td>
		</tr>
	</table>
	<hr/>
	<br/>
	<input type="submit" value="Edit fuel layer" class="classname" onclick='editForest();' />
	</div>
		</div>
		</div>
    <script>
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth(); //January is 0!
	
	var d = new Date();
d.setDate(d.getDate() - 1);
var xthes=d.getDate();
	
	var mmbck = new Date();
    mmbck.setMonth(mmbck.getMonth() - 1);
    var mmminus1 = mmbck.getMonth();
	
	var yyyy = today.getFullYear();
// Source: http://stackoverflow.com/questions/497790
var dates = {
    convert:function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
        );
    },
    compare:function(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
    },
    inRange:function(d,start,end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
       return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    }
};
if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = mm + '/' + dd + '/' + yyyy;
$( "#resizable" ).resizable({
      containment: "#cesiumContainer"
    },{ handles: 'w,s' },{minWidth: 241});
	//$("#sliderlav").dateRangeSlider();
	//$("#sliderlav").dateRangeSlider("bounds", new Date(2015, 5, 1), new Date(2018, 5, 31));
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
	$("#sliderlav").dateRangeSlider({
  bounds:{
    min: new Date(2016, 0, 1),
    max: new Date(yyyy, mm, dd)
  },
  defaultValues:{
    min: new Date(yyyy, mm, 01),
    max: new Date(yyyy, mm, dd)
  },
scales: [{
      first: function(value){ return value; },
      end: function(value) {return value; },
      next: function(value){
        var next = new Date(value);
        return new Date(next.setMonth(value.getMonth() + 1));
      },
      label: function(value){
        return months[value.getMonth()];
      },
      format: function(tickContainer, tickStart, tickEnd){
        tickContainer.addClass("myCustomClass");
      }
    }]
	});
	/*$("#sliderlav").bind("valuesChanging", function(e, data){
				viewer.dataSources.removeAll(false);
		clear_new_forest_form();
		viewer.entities.removeAll();
		//var dateValues = $("#sliderlav").dateRangeSlider("values");
		var minday = data.values.min.getDate();
		var maxday = data.values.max.getDate();
		var minmonth = data.values.min.getMonth() + 1;
		var maxmonth = data.values.max.getMonth() + 1;
		var minyear = data.values.min.getFullYear();
		var maxyear = data.values.max.getFullYear();
		if(minday<10) {
			minday = '0'+minday
		} 
		if(maxday<10) {
			maxday = '0'+maxday
		}
		if(minmonth<10) {
			minmonth = '0'+minmonth
		}
		if(maxmonth<10) {
			maxmonth = '0'+maxmonth
		}		
		console.log("!!!!!!Something moved. min: " +minyear+"-"+minmonth+"-"+minday+ " max: " +maxyear+"-"+maxmonth+"-"+maxday);		
		for (var koukou = 0; koukou < global_forests_placemarks.length; koukou++) { 
			if (global_forests_placemarks[koukou].dateCreated == minyear+"-"+minmonth+"-"+minday || global_forests_placemarks[koukou].dateCreated == maxyear+"-"+maxmonth+"-"+maxday)
			{
				console.log("KOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOU "+global_forests_placemarks[koukou].name);
			}
			//doulepse(global_forests_placemarks[koukou].i, global_forests_placemarks[koukou].lat, global_forests_placemarks[koukou].lon, global_forests_placemarks[koukou].fid, global_forests_placemarks[koukou].name);
		}
  //console.log("Something moved. min: " + data.values.min + " max: " + data.values.max);
});*/
$("#sliderlav").bind("valuesChanged", function(e, data){
	//alert("kalestike i on change");
  viewer.dataSources.removeAll(false);
		clear_new_forest_form();
		viewer.entities.removeAll();
		//var dateValues = $("#sliderlav").dateRangeSlider("values");
		var minday = data.values.min.getDate();
		var maxday = data.values.max.getDate();
		var minmonth = data.values.min.getMonth() +1;//alert("min "+data.values.min.getMonth());
		var maxmonth = data.values.max.getMonth() +1;//alert("max "+data.values.max.getMonth());
		var minyear = data.values.min.getFullYear();
		var maxyear = data.values.max.getFullYear();
		if(minday<10) {
			minday = '0'+minday;
		} 
		if(maxday<10) {
			maxday = '0'+maxday;
		}
		if(minmonth<10) {
			minmonth = '0'+minmonth;
		}
		if(maxmonth<10) {
			maxmonth = '0'+maxmonth;
		}
//alert("minyear:"+minyear+"minmonth:"+minmonth+"minday:"+minday);		
var minnum=Number(minyear+minmonth+minday)	;	
var maxnum=Number(maxyear+maxmonth+maxday)	;
		//console.log("!!!!!!Something moved. min: " +minnum+ " max: " +maxnum);
//alert("global_forests_placemarks.length:"+global_forests_placemarks[333].id);
		var xmin = new Date(minyear+"-"+minmonth+"-"+minday);
		var ymax = new Date(maxyear+"-"+maxmonth+"-"+maxday);
		//+xmin <= +ymax;  => true
		//+xmin >= +ymax;  => true
		//+xmin === +ymax; => true
		//alert("xmin:"+xmin+" ymax:"+ymax+" and +xmin <= +ymax"+(+xmin <= +ymax)+" and +xmin >= +ymax"+(+xmin >= +ymax)+" and +xmin === +ymax"+(+xmin === +ymax));
		for (var koukou = 0; koukou < global_forests_placemarks.length; koukou++) { 
			var value=new Date(global_forests_placemarks[koukou].dateCreated);//console.log("valuevaluevaluevaluevaluevaluevalue:"+value);
		//alert("Number(global_forests_placemarks[koukou].dateCreated.replace('-', ''))"+Number(global_forests_placemarks[koukou].dateCreated.replace('-', '')));
			if (+value >= +xmin && +value <= +ymax)
			{
				//console.log("HIT!!!!!!!!:"+global_forests_placemarks[koukou].name+" with datecreated"+global_forests_placemarks[koukou].dateCreated);
				doulepse(global_forests_placemarks[koukou].i, global_forests_placemarks[koukou].lat, global_forests_placemarks[koukou].lon, global_forests_placemarks[koukou].fid, global_forests_placemarks[koukou].name,global_forests_placemarks[koukou].dateCreated);
				//console.log("minnum:"+minnum+" maxnum:"+maxnum+" value"+value);
				//console.log("KOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOU "+global_forests_placemarks[koukou].name+"id"+global_forests_placemarks[koukou].id+"and date:"+global_forests_placemarks[koukou].dateCreated+" and "+Number(global_forests_placemarks[koukou].dateCreated.replace('-', '').replace('-', '')));
			}
			//doulepse(global_forests_placemarks[koukou].i, global_forests_placemarks[koukou].lat, global_forests_placemarks[koukou].lon, global_forests_placemarks[koukou].fid, global_forests_placemarks[koukou].name);
		}
});
</script>
<!--<div id="mySidenav" class="sidenav">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a> 
  <div><a href="javascript:void(0)" onclick="openSimHistorydeep()">Simulation history</a></div>
  <div><a href="javascript:void(0)" onclick="openSimSetupdeep()">SimulationSetup</a></div>
  <div><a href="javascript:void(0)" onclick="openNavdeep()">New Forest</a></div>
  <div><a href="javascript:void(0)" onclick="openEditVegetationdeep()">Forest Edit</a></div>
  <div><a href="javascript:void(0)" onclick="openHotpointSimdeep()">Hotspot Simulation</a></div>
  <div><a href="#" class="tablinks" onclick="openCity(event, 'Area monitoring')">Area monitoring</a></div>
</div>-->
</div>
</div>

<!--<div id="visualizationControls" class="sidenavdeep">
<div class="wrtext" style="margin-left: 5%;">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
<?php
/*
	$sid = $_GET["visualization"];

	include("../../db/connection.php");
	include("../../db/variables.php");
	
	$db_handle = mysql_connect($db_host, $username, $password);
	$db_found = mysql_select_db($db_name, $db_handle);
	
	if ($db_found) 
	{
		$SQL = "SELECT * FROM FORESTS";
		$result = mysql_query($SQL);
				
		if ($sid)
		{		
			$SQL2 = "SELECT * FROM SIMULATIONS WHERE id='$sid'";
			$result2 = mysql_query($SQL2);
			$row2 = mysql_fetch_array($result2);
			$tr = $row2['time_range'];
			$sname = $row2['name'];
			
			while($row = mysql_fetch_array($result))
			{
				if($row['id']==$row2['forest_id'])
				{
					$fname=$row['name'];
					$rot=sprintf("%01.0f", $row['rotation']);
					$fid=$row['id'];
					break;
				}
			}
		}
	}
	else 
	{
		print "Database NOT Found ";
		mysql_close($db_handle);
	}
*/?>

<label>
	<b>
		<font color=#ff4040>
	<?php 
	/*	if ($sid) 
		{
			echo "<div>
					<a href='#' id='forestNameLink' onclick='jumpToPoint (forests_lat[".$fid."], forests_lon[".$fid."], 35000, 0);'>".$fname."</a> &nbsp
					<a href='#' id='forestTour' onclick=\"enterTour ();\"><img src='../../images/bino.jpg' border='0' WIDTH='18' HEIGHT='18' /></a> &nbsp"; 
			echo "</div>";
		} 
	*/?> 
		</font>
	</b>
</label>
<br/>	


	<br/>
	<select style="color:black;width:82%" name="forestDownVIS" id="forestDownVIS" onchange="flySetupVIS.apply(this);">
		<option></option>
<?php
/*
include("../../db/connection.php");
	
	$db_handle = mysql_connect($db_host, $username, $password);
	$db_found = mysql_select_db($db_name, $db_handle);
	
	if ($db_found) 
	{
			$SQL = "SELECT id from USER where username='floga'";
			$result = mysql_query($SQL);
			$row = mysql_fetch_array($result);  	
			$userid = $row['id'];	

		if($userid!=1)
		{
			$SQL = "SELECT * FROM FORESTS WHERE user=".$userid;
		}
		else
		{
			$SQL = "SELECT * FROM FORESTS WHERE user=0 OR user=1";			
		}
		$result = mysql_query($SQL);
				
		while($row = mysql_fetch_array($result))
		{
			echo "<option style=\"color: black\" value=\"".$row['id']."\" id=\"".$row['id']."\">".$row['name']."</option>";
		}

	}
	else 
	{
		print "Database NOT Found";
		mysql_close($db_handle);
	}*/
?>
	</select>
<table>
	<tr>
		<td id="loadPlayButtonChange" width="120">
			
			<a href="#" onclick='playAnimation();'><IMG TITLE="Play animation" SRC="../../images/play.png" WIDTH="22" HEIGHT="22" BORDER="0" /></a>
			<a href="#" onclick='pauseAnimation();'><IMG TITLE="Pause animation" SRC="../../images/pause.png" WIDTH="20" HEIGHT="20" BORDER="0" /></a>
			<a href="#" onclick='setBeginEnd();'><IMG TITLE="Load animation" SRC="../../images/reload.png" WIDTH="18" HEIGHT="18" BORDER="0" /></a>
		</td>
		<td>
			<div class="slider" id="slider-1" tabIndex="1">
				<input class="slider-input" id="slider-input-1"/>
			</div>
		</td>
	</tr>
</table>

<span class="text" id="h-value" style="margin-left:142px;"></span>

<script type="text/javascript">

	var field_area = el('h-value');
	slider1 = new Slider(document.getElementById("slider-1"), document.getElementById("slider-input-1"));
	
	slider1.setMinimum(60);
	slider1.setMaximum(600);
	slider1.setBlockIncrement(60);
	slider1.setUnitIncrement(60);
	slider1.setValue(300);
	field_area.innerHTML = '<small>Animation speed: '+slider1.getValue()+'x</small>';

	window.onresize = function () 
	{
		slider1.recalculate();
	};

	slider1.onchange = function () 
	{
		animationSpeed=Math.round(slider1.getValue()/10)*10;
		var field_area = el('h-value');	
		field_area.innerHTML = '<small>Animation speed: '+animationSpeed+'x</small>';
		if(ge.getTime().getRate()!=0)
		{
			ge.getTime().setRate(animationSpeed);
		}
	};	

</script>

<br/>
<hr/>

<table>	
	<tr>
		<td>
			<input type="checkbox" name="places" id="places" value="places" onchange="places(this.checked);" />
			<font size="2">Places</font>
		</td>
		<td>

			<input type="checkbox" name="roads" id="roads" value="roads" onchange="roads(this.checked);" />
			<font size="2">Roads</font>
		</td>
		<td>
			<input type="checkbox" name="trees" id="trees" value="trees" onchange="trees(this.checked);" >
			<font size="2" />Trees</font>
		</td>
	</tr>
	<tr>
		<td>
			<input type="checkbox" name="fuelRate" id="fuelRateOBSO" value="fuelRate" onchange="fuelRate(this.checked, <?php //echo $fid; ?>);" />
			<font size="2">Fuel <i>RoS</i> </font>
		</td>
		<td>
			<input type="checkbox" name="fuelFlame" id="fuelFlameOBSO" value="fuelFlame" onchange="fuelFlame(this.checked, <?php //echo $fid; ?>);" />
			<font size="2">Fuel <i>FL</i> </font>
		</td>
		<td>
			<input type="checkbox" name="corine" id="corineOBSO" value="corine" onchange="corine(this.checked, <?php //echo $fid; ?> );" />
			<font size="2">Land cover </font>
		</td>
	</tr>
	<tr>
		<td>
			<input type="checkbox" name="slope" id="slopeOBSO" value="slope" onchange="slope(this.checked, <?php //echo $fid; ?>);" />
			<font size="2">Slope </font>
		</td>
		<td>
			<input type="checkbox" name="aspect" id="aspectOBSO" value="aspect" onchange="aspect(this.checked, <?php //echo $fid; ?>);" />
			<font size="2">Aspect </font>
		</td>
		<td>

		</td>
	</tr>
</table>
<hr/>
<table>
	<tr>
		<td>
			<input type="submit" value="Land cover" class="classname" id="toolbar11requestcorineVIS" name="toolbar11requestcorineVIS" />
		</td>
		<td>
			<input type="submit" value="Reset" class="classname" onclick='onClickResetPolygon();' id="reset_polygon" name="reset_polygon" />
		</td>
	</tr>
	<tr>
		<td>
			<input type="submit" value="Check scenarios" class="classname" onclick='onClickAddPerimeter();' id="add_perimeter" name="add_perimeter" />
		</td>
		<td> 			
			<input type="submit" value="Reset" class="classname" onclick='onClickResetPerimeter();' id="reset_perimeter" name="reset_perimeter" />
		</td>
	</tr>
</table>
</div>
</div>-->

<!--<div id="New Forest1" class="sidenavdeep">
<div class="wrtext" style="margin-left: 5%;">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
    	<table id="drawForestParameters">
	    	<tr>
	    		<td>Name:</td>
		</tr>
		<tr>
	    		<td><input style="-webkit-border-radius: 6px;" type="text" name="fname" id="fname1new" size="24"></td>
	    	</tr>
    		<tr>
    			<td>Cell size:</td>
		</tr>
		<tr>
    			<td><input  type="number" style="width:3em;-webkit-border-radius: 6px;" id='cellsize1new' name="cellsize" value="30"> m.</td>
    		</tr>
		<tr>
    			<td>Show Roads,Cities etc</td>
		</tr>
		<tr>
    			<td><input type="checkbox" name="AERIAL_WITH_LABELS" id="AERIAL_WITH_LABELS" value="AERIAL_WITH_LABELS" onchange="aerial_with_labels_add_remove(this.checked);"></td>
    		</tr>
    	</table>
  <br/>
      <div id="toolbar">
</div>
<br/>
    	<input type="submit" value="Save forest" class="classname" onclick='saveForesttest();' id="set_forest" name="set_forest" />
		
</div>
</div>-->
<!--<div id="simulationSetup" class="sidenavdeep">
<div class="wrtext" style="margin-left: 5%;">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <br>

  <font size="2">Forest</font>
		<br/>
		<select style="color:black;width: 80.5%" name="forestDown" id="forestDown" onchange="flySetup.apply(this);">
		<option selected="yes"></option>
	
<?php
/*
		include("../../db/connection.php");
		
		$db_handle = mysql_connect($db_host, $username, $password);
		$db_found = mysql_select_db($db_name, $db_handle);
		
		if ($db_found) 
		{
				$SQL = "SELECT id from USER where username='floga'";
				$result = mysql_query($SQL);
				$row = mysql_fetch_array($result);  	
				$userid = $row['id'];	
			echo "<option value=melissa id=12koukou>ax melissoula:".$userid."</option>";
			if($userid!=1)
			{
				$SQL = "SELECT * FROM FORESTS WHERE user=".$userid;
			}
			else
			{
				$SQL = "SELECT * FROM FORESTS WHERE user=0 OR user=1";			
			}
			$result = mysql_query($SQL);
					
			if ($sid)
			{		
					$SQL2 = "SELECT * FROM SIMULATIONS WHERE id='$sid'";
					$result2 = mysql_query($SQL2);
					$row2 = mysql_fetch_array($result2);
					
					while($row = mysql_fetch_array($result))
	  				{
	  					if($row['id']==$row2['forest_id'])
	  					{
	  						$fname=$row['name'];
	  						break;
	  					}
	  				}
	  				$fid=$row2['forest_id'];
					echo "<option style=\"color:black\" value=".$fname." id=".$row2['forest_id'].">".$fname."</option>";
					
					// FLY OVER SPECIFIC FOREST
			}
			else
			{
				while($row = mysql_fetch_array($result))
	  			{
	  				echo "<option style=\"color:black\" value=\"".$row['id']."\" id=\"".$row['id']."\">".$row['name']."</option>";
	  			}
			}
		}
		else 
		{
			print "Database NOT Found ";
			mysql_close($db_handle);
		}
*/
?>

		</select>
		
		<br/>
		<font size="2">Fuel layer</font>
		<br/>
		<select style="color:black" name="fuelDown" id="fuelDown" onchange="fuelDown.apply(this);">
		<option id="-1">Original</option>
		</select>
		<br/>
		<hr/>
		<table>	
			<tr>
				<td>
					<input type="checkbox" name="elevation" id="elevation" value="elevation" onchange="AutoElevationSimSetup(this.checked, -1);" />
					<font size="2">Elevation</font>
				</td>
				<td>
					<input type="checkbox" name="behave" id="behave" value="behave" onchange="AutoBehaveSimSetup(this.checked, -1);" />
					<font size="2">Behave</font>
				</td>
				<td>
					<input type="checkbox" name="corine" id="corine" value="corine" onchange="AutoCorineSimSetup(this.checked, -1);" />
					<font size="2">Corine</font>
				</td>
			</tr>
			<tr>
				<td>
					<input type="checkbox" name="slope" id="slope" value="slope" onchange="AutoSlopeSimSetup(this.checked, -1);" />
					<font size="2">Slope</font>
				</td>
				<td>
					<input type="checkbox" name="aspect" id="aspect" value="aspect" onchange="AutoAspectSimSetup(this.checked, -1);" />
					<font size="2">Aspect</font>
				</td>
				<td></td>
			</tr> 
		</table>
		<hr/>
		<label>
			<span><font size="2">Time range (min.)</font></span>
			<br/>
			<input type="text" class="input-text" id="tr" name="tr" size="3" value="180" />
		</label>
		<br/>
		<br/>
		<span><font size="2">Current relative moisture (%)</font></span>
		<br/>
		<input type="text" class="input-text" id="rmoi" name="rmoi" size="3" />
		<br/>
		<hr/>	
		<span><font size="2"># Speed scenarios &nbsp &nbsp &nbsp # Direction scenarios</font></span>
		<br/>
		<input type="text" class="input-text" id="ssc" name="ssc" size="3" value="3" /> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp <input type="text" class="input-text" id="dsc" name="dsc" size="3" value="3" />
		<br/>
		<br/>
		<font size="2">Sampling</font>
		<br/>
		<select style="color:black" name="distribution" id="distribution">
			<option style="color:black">Equidistant</option>
			<option style="color:black">Random Uniform distribution</option>
			<option style="color:black">Random Gaussian distribution</option>
		</select>
				<br/>
		<br/>
		<font size="2">Current wind Speed: <span id="current_speed"></span></font>
		<br/> <table><tbody><tr><td><font size="2">Default range (m/s): </font></td></tr>
			<tr><td><input type="text" class="input-text" id="wsmin" name="wsmin" size="3"></td><td><input type="text" class="input-text" id="wsmax" name="wsmax" size="3"></td></tr>
		</tbody></table>
		<br/>
		<font size="2">Current wind Direction: <span id="current_direction"></span></font>
		<br/> <table><tbody><tr><td><font size="2">Default range (&#176;): </font></td></tr>
		<tr><td><input type="text" class="input-text" id="wdmin" name="wdmin" size="3" /></td><td><input type="text" class="input-text" id="wdmax" name="wdmax" size="3" /></td></tr>
		</tbody></table>
		<br/>
		<hr/>
		<input style='float:left; margin-right:10px;' type="submit" value="Add ignition point" class="flamebutton"  id="toolbar11" name="add_ignition" />
<!--<div id="toolbar11"  >
</div>-->
		<!--<input class='flamebutton' type="submit" onclick='getIgnitions(1);' value="Check MODIS ignitions">
		<div align="left" id="ignition_coo"></div>
		<br/>
		<input type="checkbox" name="visualization1" id="visualization1" value="Flame Length" />
		<font size="2">Flame length animations</font>
		<input style='margin-top:20px;' type="submit" value="Run simulations" class="classname" onclick='simulation(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1);' />
		<!--<input style='margin-top:20px;' type="submit" value="Run simulations" class="classname" onclick='efiga();' />-->
		<!--<br/>		
		<div id="put-bar-here"></div>
		<div id="underBar"></div>
		<div id="visualizeResults"></div>
		</div>
		</div>-->
<!--<div id="editForestControls" class="sidenavdeep">
<div class="wrtext" style="margin-left: 5%;">
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  <br>


  	<font size="2"><b>Forest</b></font>
	<br/>
	<select style="color:black;width:82%" name="forestDown" id="forestDownedit" onchange="flySetupedit.apply(this);">
		<option></option>
<?php
/*
include("../../db/connection.php");
	
	$db_handle = mysql_connect($db_host, $username, $password);
	$db_found = mysql_select_db($db_name, $db_handle);
	
	if ($db_found) 
	{
			$SQL = "SELECT id from USER where username='floga'";
			$result = mysql_query($SQL);
			$row = mysql_fetch_array($result);  	
			$userid = $row['id'];	

		if($userid!=1)
		{
			$SQL = "SELECT * FROM FORESTS WHERE user=".$userid;
		}
		else
		{
			$SQL = "SELECT * FROM FORESTS WHERE user=0 OR user=1";			
		}
		$result = mysql_query($SQL);
				
		while($row = mysql_fetch_array($result))
		{
			echo "<option style=\"color:black\" value=\"".$row['id']."\" id=\"".$row['id']."\">".$row['name']."</option>";
		}

	}
	else 
	{
		print "Database NOT Found";
		mysql_close($db_handle);
	}*/
?>
	</select>
	<br/>
		<table>	
			<tr>
				<td>
					<input type="checkbox" name="elevation" id="elevationedit" value="elevation" onchange="AutoElevationedit(this.checked, -1);" />
					<font size="2">Elevation</font>
				</td>
				<td>
					<input type="checkbox" name="behave" id="behaveedit" value="behave" onchange="AutoBehaveedit(this.checked, -1);" />
					<font size="2">Behave</font>
				</td>
				<td>
					<input type="checkbox" name="corine" id="corineedit" value="corine" onchange="AutoCorineedit(this.checked, -1);" />
					<font size="2">Corine</font>
				</td>
			</tr>
			<tr>
				<td>
					<input type="checkbox" name="slope" id="slopeedit" value="slope" onchange="AutoSlopeedit(this.checked, -1);" />
					<font size="2">Slope</font>
				</td>
				<td>
					<input type="checkbox" name="aspect" id="aspectedit" value="aspect" onchange="AutoAspectedit(this.checked, -1);" />
					<font size="2">Aspect</font>
				</td>
				<td></td>
			</tr> 
		</table>
	<hr/>
	<font size="2"><b>Source fuel layer</b></font>
	<table>
		<tr>
			<td>
				<select style="color:black" name="sourceFuelDown" id="sourceFuelDown" onchange="sourceFuelEdit.apply(this);">
					<option>Original</option>
				</select>
			</td>
		</tr>
	</table>
	<br/>
	<input type="submit" class="classname"  value="Land Cover" id="toolbar11requestcorine" name="toolbar11requestcorine" />
	<input type="submit" value="Free draw" class="classname" id="toolbar12" name="add_polygon" />
	<input type="submit" value="Reset" class="classname" onclick='onClickResetPolygon();' id="reset_polygon" name="reset_polygon" />
	<br/><br/>
	<table>
		<tr>
			<td><font size=2>Convert to Fuel model:</font></span></td>
			<td><input type="text" class="input-text" id="fuelModel" name="fuelModel" size="2" /></td>
		</tr>
	</table>
	<hr/>
	<font size="2"><b>Target fuel layer</b></font>
	<table>
		<tr>
			<td>
				<select style="color:black" name="targetFuelDown" id="targetFuelDown">
					<option>Original</option>
				</select></td><td>
				<input type="checkbox" name="newEditCheck" id="newEditCheck" value="newEdit" onchange="newEdit(this.checked);" />
				<font size="2">Create new</font>
			</td>
		</tr>
		<tr>
			<td></td>
			<td><div id="newEditName"></div></td>
		</tr>
	</table>
	<hr/>
	<br/>
	<input type="submit" value="Edit fuel layer" class="classname" onclick='editForest();' />
	</div>
		</div>-->
		<script type="text/javascript;version=1.7">
	
		window.onload=init(6);
			
		window.addEvent('domready', function() {
			
			pb = new dwProgressBar({
				container: $('put-bar-here'),
				startPercentage: 0,
				speed:1000,
				boxID: 'box',
				percentageID: 'perc',
				onComplete: function() {
					//alert('Simulation Terminated!');
				},
				allowMore: 1
			});
			
			$$('.mover').each(function(el) {
								el.addEvent('click',function(e) {
														e.stop();
														pb.set(el.get('rel'));
													});
								});
			
		});
				
	</script>
  And here is some more text
  <script>

  // Construct the default list of terrain sources.
//var terrainModels = Cesium.createDefaultTerrainProviderViewModels();
// Create a new date from a string, return as a timestamp.
//Start Screen Simulation History
 var lelos=$('.cesium-button cesium-infoBox-camera');
 lelos.click(function(){ alert("KOTZILELOS");
 });

		var LASTOPENETAB="openSimHistorydeep";
		document.getElementById("mySidenav").style.display = "none";
		document.getElementById("New Forest1").style.display = "none";
		document.getElementById("simulationSetup").style.display = "none";
		document.getElementById("editForestControls").style.display = "none";
		document.getElementById("visualizationControls").style.display = "none";
		document.getElementById("dateslider").style.width = "100%";
		document.getElementById("dateslider").style.display = "block";

function timestamp(str){
    return new Date(str).getTime();   
}
function todaytimestamp(str){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth(); //January is 0!
	var yyyy = today.getFullYear();
	
    return new Date(yyyy, mm, dd).getTime();   
}
//   var viewer = new Cesium.Viewer('cesiumContainer' , {
//    terrainProviderViewModels: terrainModels,
//    selectedTerrainProviderViewModel: terrainModels[5]  // Select STK High-res terrain
//});
// Create a list of day and monthnames.
var dateValuesDIV = [
	document.getElementById('event-start'),
	document.getElementById('event-end')
];


var
	weekdays = [
		"Sunday", "Monday", "Tuesday",
		"Wednesday", "Thursday", "Friday",
		"Saturday"
	],
	months = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December"
	];

// Append a suffix to dates.
// Example: 23 => 23rd, 1 => 1st.
function nth (d) {
  if(d>3 && d<21) return 'th';
  switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}

function getUIvalues(sliderGET)
{
var temp = new Array();
var getval=String(sliderGET);
temp = getval.split(",");

var UImin=new Date(Number(temp[0]));//MIN
var UImax=new Date(Number(temp[1]));//MAX

		var minday = UImin.getDate();
		var maxday = UImax.getDate();
		var minmonth = UImin.getMonth() +1;//alert("min "+data.values.min.getMonth());
		var maxmonth = UImax.getMonth() +1;//alert("max "+data.values.max.getMonth());
		var minyear = UImin.getFullYear();
		var maxyear = UImax.getFullYear();
		if(minday<10) {
			minday = '0'+minday;
		} 
		if(maxday<10) {
			maxday = '0'+maxday;
		}
		if(minmonth<10) {
			minmonth = '0'+minmonth;
		}
		if(maxmonth<10) {
			maxmonth = '0'+maxmonth;
		}


		var UIobj = {
			min:  new Date(minyear+"-"+minmonth+"-"+minday),
			max: new Date(maxyear+"-"+maxmonth+"-"+maxday)
		};
return UIobj;
}

// Create a string representation of the date.
function formatDate ( date ) {
	
		
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
var slider = document.getElementById('slider');

noUiSlider.create(slider, {
	start: [ timestamp('2016'), timestamp('2017') ],
	orientation: 'vertical',
	direction: 'rtl',
	range: {
        min: (new Date(min_date_creation).getTime()),
        max: todaytimestamp('2017')
    }
});
console.log("EIMAI META TO CREATION TO SLIDER ME IMEROMINIA MIN:"+(new Date(min_date_creation).getTime()));
var UIrangeValues=getUIvalues(slider.noUiSlider.get());
dateValuesDIV[0].innerHTML = "Min:"+formatDate(new Date(+UIrangeValues.min));
dateValuesDIV[1].innerHTML = "Min:"+formatDate(new Date(+UIrangeValues.max));

var minin;
var maxax;
var temp = new Array();
var getval;
slider.noUiSlider.on('change', function( values, handle ) {
	console.log("You presses values: "+handle+" and "+formatDate(new Date(+values[handle])));
	viewer.dataSources.removeAll(false);
	clear_new_forest_form();
	viewer.entities.removeAll();
	var UIrangeValues=getUIvalues(slider.noUiSlider.get());
	console.log("slider.noUiSlider.get():"+slider.noUiSlider.get());
	console.log("UIrangeValues min and max are:"+UIrangeValues.min+" and "+UIrangeValues.max);
	for (var koukou = 0; koukou < global_forests_placemarks.length; koukou++) { 
		var value=new Date(global_forests_placemarks[koukou].dateCreated);//console.log("valuevaluevaluevaluevaluevaluevalue:"+value);
		if (+value >= +UIrangeValues.min && +value <= +UIrangeValues.max)
		{
			doulepse(global_forests_placemarks[koukou].i, global_forests_placemarks[koukou].lat, global_forests_placemarks[koukou].lon, global_forests_placemarks[koukou].fid, global_forests_placemarks[koukou].name,global_forests_placemarks[koukou].dateCreated);
		}
	}
	if (handle==0){
		dateValuesDIV[handle].innerHTML = "Min:"+formatDate(new Date(+values[handle]));		
	}
	else
	{
		dateValuesDIV[handle].innerHTML = "Max:"+formatDate(new Date(+values[handle]));
	}
});

slider.noUiSlider.on('update', function( values, handle ) {
	if (handle==0){
		dateValuesDIV[handle].innerHTML = "Min: "+formatDate(new Date(+values[handle]));		
	}
	else
	{
		dateValuesDIV[handle].innerHTML = "Max: "+formatDate(new Date(+values[handle]));
	}
});

//slider.noUiSlider.set([new Date(yyyy, mm, xthes), new Date(yyyy, mm, dd)]);
slider.noUiSlider.set([new Date(yyyy, mm, dd), new Date(yyyy, mm, dd)]);

var cesiumTerrainProviderMeshes = new Cesium.CesiumTerrainProvider({
    url : 'https://assets.agi.com/stk-terrain/world',
    requestWaterMask : true,
    requestVertexNormals : true
});
var BingMapsRoadImageryProvider = new Cesium.BingMapsImageryProvider({
                url: 'http://dev.virtualearth.net',
                mapStyle: Cesium.BingMapsStyle.AERIAL_WITH_LABELS
});
var ellipsoidProvider = new Cesium.EllipsoidTerrainProvider();
var viewer = new Cesium.Viewer('cesiumContainer', {
	baseLayerPicker : false,
	terrainProvider : cesiumTerrainProviderMeshes
	//imageryProvider: BingMapsRoadImageryProvider
});
viewer.infoBox.frame.removeAttribute('sandbox');
///ADD cities and road names layer default show is false(index is 1) 
viewer.imageryLayers.add(new Cesium.ImageryLayer(BingMapsRoadImageryProvider),1);//viewer.imageryLayers.get(0).show=false;
viewer.imageryLayers.get(1).show=true;
var ellipsoid = viewer.scene.globe.ellipsoid;
   var scene = viewer.scene;
   //var sceneces = viewer.scene;
   var drawHelper = new DrawHelper(viewer);
var toolbar = drawHelper.addToolbar(document.getElementById("toolbar"), {
    buttons: ['marker', 'extent']
});
var toolbar11 = drawHelper.addBTN(document.getElementById("toolbar11"), {
	buttons: ['marker']
});
var add_perimeter = drawHelper.addBTNperimeter(document.getElementById("add_perimeter"), {
	buttons: ['marker']
});
var toolbar12 = drawHelper.addBTN12(document.getElementById("toolbar12"), {
	buttons: ['polygon']
});
//toolbar11requestcorine
var toolbar11requestcorine = drawHelper.addBTNreqcorine(document.getElementById("toolbar11requestcorine"), {
	buttons: ['marker']
});

var toolbar11requestcorineVIS = drawHelper.addBTNreqcorineVIS(document.getElementById("toolbar11requestcorineVIS"), {
	buttons: ['marker']
});
show_hide_loggingpuretest("hide");
//var add_ignition = drawHelper.addToolbar(document.getElementById("add_ignition"), {
//    buttons: ['marker']
//});
var xelement = document.getElementsByName("add_ignition")[0];
xelement.addEventListener('click', function() { 
console.log("PATITHIKE TO IGNTION POINT");
xelement.value="Click on earth for ignition"; }, false);

//for add_polygon
var xelementadd_polygon = document.getElementsByName("add_polygon")[0];
xelementadd_polygon.addEventListener('click', function() { 
console.log("PATITHIKE TO add_polygon");
onClickResetPolygon();
 }, false);

cellsize1new.addEventListener("input", function (e) {
    cellSize = document.getElementById('cellsize1new').value;
	var rowsss=Math.round((totalDistanceInKmAC*1000)/cellSize);
	var colsss=Math.round((totalDistanceInKmAB*1000)/cellSize);
	//alert("Tora exo rows: "+rowsss+" kai cols: "+colsss+" kai to extent:"+extent);
	show_hide_loggingpuretest("show");
	var testvarwow=document.getElementsByClassName("loggingpuretest");
	//alert('getelementbyclass: ' +testvarwow[0].innerHTML );
	//testvarwow[0].innerHTML = rowsss+"rows x "+colsss+"cols - "+totalDistanceInKmAB.toFixed(2)+"km x "+totalDistanceInKmAC.toFixed(2)+"km ,cellsize: "+cellSize;
	testvarwow[0].innerHTML = "cell: "+cellSize+"m. - grid: "+rowsss+" x "+colsss+" - size: "+totalDistanceInKmAB.toFixed(2)+" x "+totalDistanceInKmAC.toFixed(2)+"km";
});
wdmin.addEventListener("input", function (e) {
	var value=document.getElementById('wdmin').value;
    if (isNaN(value)) // this is the code I need to change
    {
        alert("Must input numbers 0-360:"+value);
		document.getElementById('wdmin').value=0;
        return false;
    }
});
wdmax.addEventListener("input", function (e) {
	var value=document.getElementById('wdmax').value;
    if (isNaN(value)) // this is the code I need to change
    {
        alert("Must input numbers 0-360:"+value);
		document.getElementById('wdmax').value=360;
        return false;
    }
});
toolbar.addListener('markerCreated', function (event) {
    loggingMessage('Marker created at ' + event.position.toString());
    // create one common billboard collection for all billboards
    var b = new Cesium.BillboardCollection();
    scene.primitives.add(b);
    var billboard = b.add({
        show: true,
        position: event.position,
        pixelOffset: new Cesium.Cartesian2(0, 0),
        eyeOffset: new Cesium.Cartesian3(0.0, 0.0, 0.0),
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        scale: 1.0,
        image: 'http://pad.geocento.com/DrawHelper/img/glyphicons_242_google_maps.png',
        color: new Cesium.Color(1.0, 1.0, 1.0, 1.0)
    });
    billboard.setEditable();
});
toolbar11.addListener('markerCreated', function(event) {
            //loggingMessage('Marker created at ' + event.position.toString());
			//var result=new Cesium.Cartographic();
			//Cesium.Cartographic.fromCartesian(event.position, result);
			var cartographiclav = ellipsoid.cartesianToCartographic(event.position);
			var kiamoslonDegrees = Cesium.Math.toDegrees(cartographiclav.longitude);
			var kiamoslatDegrees = Cesium.Math.toDegrees(cartographiclav.latitude);
			
			//alert("vre paidi mou tha koimithoume?? "+event.position.x.toString()+" "+event.position.y.toString()+" "+event.position.z.toString()+"Cesium.Cartographic.fromCartesian(cartesian, ellipsoid, result) " );//Cesium.Cartesian3.fromDegrees(-106.690647, 36.806761, 0);
			AddIgnitionUpdate(kiamoslatDegrees,kiamoslonDegrees);
            // create one common billboard collection for all billboards
    //        var b = new Cesium.BillboardCollection();
     //       scene.primitives.add(b);
     //       var billboard = b.add({
     //           show : true,
     //           position : event.position,
     //           pixelOffset : new Cesium.Cartesian2(0, 0),
    //            eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0),
     //           horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
    //            verticalOrigin : Cesium.VerticalOrigin.CENTER,
    //            scale : 1.0,
   //             image: '../../images/fire.png',
   //            color : new Cesium.Color(1.0, 1.0, 1.0, 1.0)
    //        });
    //        billboard.setEditable();
			

        });
add_perimeter.addListener('markerCreated', function(event) {
            //loggingMessage('Marker created at ' + event.position.toString());
			//var result=new Cesium.Cartographic();
			//Cesium.Cartographic.fromCartesian(event.position, result);
			var cartographiclav = ellipsoid.cartesianToCartographic(event.position);
			var kiamoslonDegreesperi = Cesium.Math.toDegrees(cartographiclav.longitude);
			var kiamoslatDegreesperi = Cesium.Math.toDegrees(cartographiclav.latitude);
			
			//alert("vre paidi mou tha koimithoume?? "+event.position.x.toString()+" "+event.position.y.toString()+" "+event.position.z.toString()+"Cesium.Cartographic.fromCartesian(cartesian, ellipsoid, result) " );//Cesium.Cartesian3.fromDegrees(-106.690647, 36.806761, 0);
			checkscenarios(kiamoslatDegreesperi,kiamoslonDegreesperi);
            // create one common billboard collection for all billboards
    //        var b = new Cesium.BillboardCollection();
     //       scene.primitives.add(b);
     //       var billboard = b.add({
     //           show : true,
     //           position : event.position,
     //           pixelOffset : new Cesium.Cartesian2(0, 0),
    //            eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0),
     //           horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
    //            verticalOrigin : Cesium.VerticalOrigin.CENTER,
    //            scale : 1.0,
   //             image: '../../images/fire.png',
   //            color : new Cesium.Color(1.0, 1.0, 1.0, 1.0)
    //        });
    //        billboard.setEditable();
			

        });
var cartographiclavPARRAY= new Array();
var polygon;
toolbar12.addListener('polygonCreated', function(event) {
            //loggingMessage('Marker created at ' + event.position.toString());
			//var result=new Cesium.Cartographic();
			//Cesium.Cartographic.fromCartesian(event.position, result);
//			var cartographiclav = ellipsoid.cartesianToCartographic(event.position);
//			var kiamoslonDegrees = Cesium.Math.toDegrees(cartographiclav.longitude);
//			var kiamoslatDegrees = Cesium.Math.toDegrees(cartographiclav.latitude);
			
			//alert("vre paidi mou tha koimithoume?? "+event.position.x.toString()+" "+event.position.y.toString()+" "+event.position.z.toString()+"Cesium.Cartographic.fromCartesian(cartesian, ellipsoid, result) " );//Cesium.Cartesian3.fromDegrees(-106.690647, 36.806761, 0);
//			AddIgnitionUpdate(kiamoslatDegrees,kiamoslonDegrees);
            // create one common billboard collection for all billboards
    //        var b = new Cesium.BillboardCollection();
     //       scene.primitives.add(b);
     //       var billboard = b.add({
     //           show : true,
     //           position : event.position,
     //           pixelOffset : new Cesium.Cartesian2(0, 0),
    //            eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0),
     //           horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
    //            verticalOrigin : Cesium.VerticalOrigin.CENTER,
    //            scale : 1.0,
   //             image: '../../images/fire.png',
   //            color : new Cesium.Color(1.0, 1.0, 1.0, 1.0)
    //        });
    //        billboard.setEditable();
	//svino to pallio
	onClickResetPolygon();
	polygon = new DrawHelper.PolygonPrimitive({
                positions: event.positions,
                material : Cesium.Material.fromType(Cesium.Material.GridType)
            });
            scene.primitives.add(polygon);
			//alert("polygon created with "+event.positions.length+" points");
			polygonString = new Array ();
			var z=0;
			for (var i = 0; i < event.positions.length-2; i++) 
			{
				 cartographiclavPARRAY = ellipsoid.cartesianArrayToCartographicArray(event.positions);
					var lonDegreesPARRAY = Cesium.Math.toDegrees(cartographiclavPARRAY[i].longitude);
					var latDegreesPARRAY = Cesium.Math.toDegrees(cartographiclavPARRAY[i].latitude);
				console.log(i+"loop: free polygon created with points :lat: "+latDegreesPARRAY.toFixed(7)+" ,lon: "+lonDegreesPARRAY.toFixed(7));
				//var coord = lineString.getCoordinates().get(i);
				//outer.getCoordinates().pushLatLngAlt(coord.getLatitude(), coord.getLongitude(), coord.getAltitude());
				polygonString[z]=latDegreesPARRAY.toFixed(7);
				polygonString[z+1]=lonDegreesPARRAY.toFixed(7);
				z=z+2;
			}
			polygonString[z]=polygonString[0];
			polygonString[z+1]=polygonString[1];
			/*for (var ii = 0; ii < polygonString.length; ii=ii+2) 
			{
				//console.log("polygonString :lat: "+polygonString[ii]+" ,lon: "+polygonString[ii+1]);
				console.log('tha valo placemark lon lat '+polygonString[ii+1]+' '+polygonString[ii]);
				var pinBuilder = new Cesium.PinBuilder();	
				var wyoming = viewer.entities.add({
				name : name,
				position : Cesium.Cartesian3.fromDegrees(polygonString[ii+1],polygonString[ii],0.0),
				billboard : {
			//image : pinBuilder.fromColor(Cesium.Color.SALMON, 48).toDataURL(),
			//heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
			//verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
				image : pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
				verticalOrigin : Cesium.VerticalOrigin.BOTTOM
				},
				label : {
				text : name,
			//verticalOrigin : Cesium.VerticalOrigin.BOTTOM
				}
				}
				);
				wyoming.description = '\
<p>\
  exo  \
</p>\
<p>\
  exo lat '+polygonString[ii]+'  kai lon'+polygonString[ii+1]+'\
</p>\
<p>\
  Source: \
  <a style="color: WHITE"\
    target="_blank"\
    href="http://en.wikipedia.org/wiki/Wyoming">Wikpedia</a>\
</p>';
			}*/	
			//editForest();			

        });
toolbar11requestcorine.addListener('markerCreated', function(event) {
            //loggingMessage('Marker created at ' + event.position.toString());
			//var result=new Cesium.Cartographic();
			//Cesium.Cartographic.fromCartesian(event.position, result);
			var cartographiclavcorine = ellipsoid.cartesianToCartographic(event.position);
			var kiamoslonDegreescorine = Cesium.Math.toDegrees(cartographiclavcorine.longitude);
			var kiamoslatDegreescorine = Cesium.Math.toDegrees(cartographiclavcorine.latitude);
			
			//alert("toolbar11requestcorine lat: "+kiamoslatDegreescorine+" and lon "+kiamoslonDegreescorine);
			requestCorinePolygonUpdate(kiamoslatDegreescorine, kiamoslonDegreescorine) ;
			//AddIgnitionUpdate(kiamoslatDegrees,kiamoslonDegrees);
            // create one common billboard collection for all billboards
    //        var b = new Cesium.BillboardCollection();
     //       scene.primitives.add(b);
     //       var billboard = b.add({
     //           show : true,
     //           position : event.position,
     //           pixelOffset : new Cesium.Cartesian2(0, 0),
    //            eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0),
     //           horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
    //            verticalOrigin : Cesium.VerticalOrigin.CENTER,
    //            scale : 1.0,
   //             image: '../../images/fire.png',
   //            color : new Cesium.Color(1.0, 1.0, 1.0, 1.0)
    //        });
    //        billboard.setEditable();
			

        });
toolbar11requestcorineVIS.addListener('markerCreated', function(event) {
            //loggingMessage('Marker created at ' + event.position.toString());
			//var result=new Cesium.Cartographic();
			//Cesium.Cartographic.fromCartesian(event.position, result);
			var cartographiclavcorine = ellipsoid.cartesianToCartographic(event.position);
			var kiamoslonDegreescorine = Cesium.Math.toDegrees(cartographiclavcorine.longitude);
			var kiamoslatDegreescorine = Cesium.Math.toDegrees(cartographiclavcorine.latitude);
			
			//alert("toolbar11requestcorine lat: "+kiamoslatDegreescorine+" and lon "+kiamoslonDegreescorine);
			requestCorinePolygonUpdate(kiamoslatDegreescorine, kiamoslonDegreescorine) ;
			//AddIgnitionUpdate(kiamoslatDegrees,kiamoslonDegrees);
            // create one common billboard collection for all billboards
    //        var b = new Cesium.BillboardCollection();
     //       scene.primitives.add(b);
     //       var billboard = b.add({
     //           show : true,
     //           position : event.position,
     //           pixelOffset : new Cesium.Cartesian2(0, 0),
    //            eyeOffset : new Cesium.Cartesian3(0.0, 0.0, 0.0),
     //           horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
    //            verticalOrigin : Cesium.VerticalOrigin.CENTER,
    //            scale : 1.0,
   //             image: '../../images/fire.png',
   //            color : new Cesium.Color(1.0, 1.0, 1.0, 1.0)
    //        });
    //        billboard.setEditable();
			

        });

		
var catholicvariable;
var extent ;
var pinakas = [];
var cellSize;
var totalDistanceInKmAB ;
var totalDistanceInKmAC ;
var southeastlonDegrees ;
var southeastlatDegrees ;
var southwestlonDegrees;
var southwestlatDegrees ;
var northeastlonDegrees ;
var northeastlatDegrees ;
var northwestlonDegrees ;
var northwestlatDegrees ;
var rows;
var cols;
var fname;

function changebtn(text){
	//alert("ALAKSE MORE?");
	console.log("ALAKSE MORE?");
	var btn=document.getElementById('toolbar11');
	btn.value=text;
};

function show_hide_loggingpuretest(order){

	var lgmessage=document.getElementsByClassName("loggingpuretest");
	if (order=="show")
	{
		lgmessage[0].style.display = "block";
	}
	else if (order=="hide")
	{
		lgmessage[0].style.display = "none";
	}
	
}
    function getExtentlav(mn, mx) {
        var e = new Cesium.Rectangle();

        // Re-order so west < east and south < north
        e.west = Math.min(mn.longitude, mx.longitude);
        e.east = Math.max(mn.longitude, mx.longitude);
        e.south = Math.min(mn.latitude, mx.latitude);
        e.north = Math.max(mn.latitude, mx.latitude);

        // Check for approx equal (shouldn't require abs due to re-order)
        var epsilon = Cesium.Math.EPSILON7;

        if ((e.east - e.west) < epsilon) {
            e.east += epsilon * 2.0;
        }

        if ((e.north - e.south) < epsilon) {
            e.north += epsilon * 2.0;
        }

        return e;
    };
	var extentPrimitive;
	var extentfordraw;
	////THIS IS THE MAIN FUNCTION FOR THE NEW FOREST
function saveForesttestMAKIS(){
	//alert("eimai i saveForesttestMAKIS");
	clear_new_forest_form();///CLEAR ALL PREVIOUS DRAWING
		cellSize = document.getElementById('cellsize1new').value;
	 fname= document.getElementById('fname1new').value;
	 //savetestForest(cellSize);
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
			
			var camera = viewer.camera;
		var e = new Cesium.Rectangle();
		camera.computeViewRectangle(ellipsoid, e);
		var southeastlav=new Cesium.Cartographic();
		var southwestlav=new Cesium.Cartographic();
		var northeastlav=new Cesium.Cartographic();
		var northwestlav=new Cesium.Cartographic();
		Cesium.Rectangle.southeast(e,southeastlav);
		Cesium.Rectangle.southwest(e,southwestlav);
		Cesium.Rectangle.northeast(e,northeastlav);
		Cesium.Rectangle.northwest(e,northwestlav);
		var southeastlonDegreeslav = Cesium.Math.toDegrees(southeastlav.longitude);
		var southeastlatDegreeslav = Cesium.Math.toDegrees(southeastlav.latitude);
		var southwestlonDegreeslav = Cesium.Math.toDegrees(southwestlav.longitude);
		var southwestlatDegreeslav = Cesium.Math.toDegrees(southwestlav.latitude);
		var northeastlonDegreeslav = Cesium.Math.toDegrees(northeastlav.longitude);
		var northeastlatDegreeslav = Cesium.Math.toDegrees(northeastlav.latitude);
		var northwestlonDegreeslav = Cesium.Math.toDegrees(northwestlav.longitude);
		var northwestlatDegreeslav = Cesium.Math.toDegrees(northwestlav.latitude);
		console.log("computeViewRectangle: (southeastlav) "+southeastlav.latitude);
			var getcameraextent = new Array();
			var offlon=((northeastlonDegreeslav-northwestlonDegreeslav)/3);
			var offlat=((northwestlatDegreeslav-southwestlatDegreeslav)/3);
			getcameraextent[0]=southeastlonDegreeslav-offlon;
			getcameraextent[1]=southeastlatDegreeslav+offlat;
			getcameraextent[2]=southwestlonDegreeslav+offlon;
			getcameraextent[3]=southwestlatDegreeslav+offlat;
			getcameraextent[4]=northeastlonDegreeslav-offlon;
			getcameraextent[5]=northeastlatDegreeslav-offlat;
			getcameraextent[6]=northwestlonDegreeslav+offlon;
			getcameraextent[7]=northwestlatDegreeslav-offlat;
			//alert("old"+southeastlav+" new"+Cesium.Cartographic.fromDegrees(getcameraextent[0], getcameraextent[1])) ;
			//alert("old"+southeastlav+" new"+Cesium.Cartographic.fromDegrees(getcameraextent[6], getcameraextent[7])) ;
			
		var exextent=getExtentlav(Cesium.Cartographic.fromDegrees(getcameraextent[0], getcameraextent[1]),Cesium.Cartographic.fromDegrees(getcameraextent[6], getcameraextent[7]));
	 extentfordraw=exextent;
	 extentPrimitive = new DrawHelper.ExtentPrimitive({
        extent: exextent,
        material: Cesium.Material.fromType(Cesium.Material.GridType)//Cesium.Material.fromType(Cesium.Material.StripeType)
    });
    scene.primitives.add(extentPrimitive);
    extentPrimitive.setEditable(e);extentPrimitive.setEditMode(true);
    extentPrimitive.addListener('onEdited', function (event) {
		console.log("you edited itMAKIS");
		/*var camera = viewer.camera;
		var e = new Cesium.Rectangle();
		camera.computeViewRectangle(ellipsoid, e);
		var southeastlav=new Cesium.Cartographic();
		var southwestlav=new Cesium.Cartographic();
		var northeastlav=new Cesium.Cartographic();
		var northwestlav=new Cesium.Cartographic();
		Cesium.Rectangle.southeast(e,southeastlav);
		Cesium.Rectangle.southwest(e,southwestlav);
		Cesium.Rectangle.northeast(e,northeastlav);
		Cesium.Rectangle.northwest(e,northwestlav);*/

			//alert("SPANE NEVRA EDO northeastlonDegreeslav("+northeastlonDegreeslav+") - northwestlonDegreeslav("+northwestlonDegreeslav+") new : northeastlonDegreeslav("+(northeastlonDegreeslav-offlon)+") new northwestlonDegreeslav("+(northwestlonDegreeslav+offlon)+")");
			/*for (var i = 0; i < getcameraextent.length; i += 2) {
			var pinBuilder1 = new Cesium.PinBuilder();
			var wyoming1 = viewer.entities.add({
			name : name,
			position : Cesium.Cartesian3.fromDegrees(getcameraextent[i],getcameraextent[i+1],0.0),
			billboard : {
			image : pinBuilder.fromColor(Cesium.Color.SALMON, 48).toDataURL(),
			heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
			verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
			image : pinBuilder1.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
			verticalOrigin : Cesium.VerticalOrigin.BOTTOM
			},
			label : {
			text : name,
			verticalOrigin : Cesium.VerticalOrigin.BOTTOM
			}
			}
			);
			wyoming1.description = ' i:'+i+'lon: '+getcameraextent[i]+' lat: '+getcameraextent[i+1];
			}*/
		extent = event.extent; //in order to save the new dimensions !!!!!!!!!!!!!!!!!!!!!
        loggingMessage('Extent edited: extent is (N: ' + event.extent.north.toFixed(3) + ', E: ' + event.extent.east.toFixed(3) + ', S: ' + event.extent.south.toFixed(3) + ', W: ' + event.extent.west.toFixed(3) + ')');
    });
extent = exextent;	
}
	
toolbar.addListener('extentCreated', function (event) {
    //var extent = event.extent;
	extent = event.extent;
	//var cellSize = document.getElementById('cellsize1').value;
	cellSize = document.getElementById('cellsize1new').value;
	 fname= document.getElementById('fname1new').value;
	 //savetestForest(cellSize);
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

/*	
	var southeast=new Cesium.Cartographic();
	var southwest=new Cesium.Cartographic();
	var northeast=new Cesium.Cartographic();
	var northwest=new Cesium.Cartographic();

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

var pointOfInterest = Cesium.Cartographic.fromDegrees(
    86.925145, 27.988257, 0, new Cesium.Cartographic());
	
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
totalDistanceInKmAB = totalDistanceInMetersAB * 0.001;
totalDistanceInKmAC = totalDistanceInMetersAC * 0.001;
 rows=Math.round((totalDistanceInKmAC*1000)/cellSize);
 cols=Math.round((totalDistanceInKmAB*1000)/cellSize);
var vimalon=(southwestlonDegrees-southeastlonDegrees)/(cols-1);
var vimalat=(southwestlatDegrees-southeastlatDegrees)/(cols-1);
var prevlon;
var prevlat;
prevlon=southeastlonDegrees+(vimalon/2);
prevlat=southeastlatDegrees+(vimalat/2);
for (var i = 0; i < rows; i += 1) {
		for (var j = 0; j < cols; j += 1) {
	console.log('i ='+i+' and j = '+j);
	prevlon=prevlon+vimalon;
	prevlat=prevlat+vimalat;

	    pinakas.push(
			Cesium.Cartographic.fromDegrees(prevlon, prevlat)
    );

		}
}

*/	
alert("SPANE NEVRA");
		var camera = viewer.camera;
		var e = new Cesium.Rectangle();
		camera.computeViewRectangle(ellipsoid, e);
		var southeastlav=new Cesium.Cartographic();
		var southwestlav=new Cesium.Cartographic();
		var northeastlav=new Cesium.Cartographic();
		var northwestlav=new Cesium.Cartographic();
		Cesium.Rectangle.southeast(e,southeastlav);
		Cesium.Rectangle.southwest(e,southwestlav);
		Cesium.Rectangle.northeast(e,northeastlav);
		Cesium.Rectangle.northwest(e,northwestlav);
		var exextent=getExtentlav(southeastlav,northwestlav);
	var extentPrimitive = new DrawHelper.ExtentPrimitive({
        extent: exextent,
        material: Cesium.Material.fromType(Cesium.Material.GridType)
    });
    scene.primitives.add(extentPrimitive);
    extentPrimitive.setEditable();
    extentPrimitive.addListener('onEdited', function (event) {
		console.log("you edited it");
		/*var camera = viewer.camera;
		var e = new Cesium.Rectangle();
		camera.computeViewRectangle(ellipsoid, e);
		var southeastlav=new Cesium.Cartographic();
		var southwestlav=new Cesium.Cartographic();
		var northeastlav=new Cesium.Cartographic();
		var northwestlav=new Cesium.Cartographic();
		Cesium.Rectangle.southeast(e,southeastlav);
		Cesium.Rectangle.southwest(e,southwestlav);
		Cesium.Rectangle.northeast(e,northeastlav);
		Cesium.Rectangle.northwest(e,northwestlav);*/
		var southeastlonDegreeslav = Cesium.Math.toDegrees(southeastlav.longitude);
		var southeastlatDegreeslav = Cesium.Math.toDegrees(southeastlav.latitude);
		var southwestlonDegreeslav = Cesium.Math.toDegrees(southwestlav.longitude);
		var southwestlatDegreeslav = Cesium.Math.toDegrees(southwestlav.latitude);
		var northeastlonDegreeslav = Cesium.Math.toDegrees(northeastlav.longitude);
		var northeastlatDegreeslav = Cesium.Math.toDegrees(northeastlav.latitude);
		var northwestlonDegreeslav = Cesium.Math.toDegrees(northwestlav.longitude);
		var northwestlatDegreeslav = Cesium.Math.toDegrees(northwestlav.latitude);
		console.log("computeViewRectangle: (southeastlav) "+southeastlav.latitude);
			var getcameraextent = new Array();
			getcameraextent[0]=southeastlonDegreeslav-(1/2);
			getcameraextent[1]=southeastlatDegreeslav+(1/2);
			getcameraextent[2]=southwestlonDegreeslav+(1/2);
			getcameraextent[3]=southwestlatDegreeslav+(1/2);
			getcameraextent[4]=northeastlonDegreeslav-(1/2);
			getcameraextent[5]=northeastlatDegreeslav-(1/2);
			getcameraextent[6]=northwestlonDegreeslav+(1/2);
			getcameraextent[7]=northwestlatDegreeslav-(1/2);
			for (var i = 0; i < getcameraextent.length; i += 2) {
			var pinBuilder1 = new Cesium.PinBuilder();
			var wyoming1 = viewer.entities.add({
			name : name,
			position : Cesium.Cartesian3.fromDegrees(getcameraextent[i],getcameraextent[i+1],0.0),
			billboard : {
			image : pinBuilder.fromColor(Cesium.Color.SALMON, 48).toDataURL(),
			heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
			verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
			image : pinBuilder1.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
			verticalOrigin : Cesium.VerticalOrigin.BOTTOM
			},
			label : {
			text : name,
			verticalOrigin : Cesium.VerticalOrigin.BOTTOM
			}
			}
			);
			wyoming1.description = ' i:'+i+'lon: '+getcameraextent[i]+' lat: '+getcameraextent[i+1];
			}
		extent = event.extent; //in order to save the new dimensions !!!!!!!!!!!!!!!!!!!!!
        loggingMessage('Extent edited: extent is (N: ' + event.extent.north.toFixed(3) + ', E: ' + event.extent.east.toFixed(3) + ', S: ' + event.extent.south.toFixed(3) + ', W: ' + event.extent.west.toFixed(3) + ')');
    });


});
var logging = document.getElementById('logging');

function loggingMessage(message) {
    logging.innerHTML = message;
}
            //cssLink.type = "text/css";
			 function loadsimulationYO (ee) 
{
	console.log('visualization::loadsimulation::sid is :: '+ee.value);
	console.log('visualization::loadsimulation::name is is :: '+all_sims_name[ee.value]);
	console.log('visualization::loadsimulation::fid is :: '+all_sims_fid[ee.value]);
	VISsid=ee.value;
	VISfid=all_sims_fid[ee.value];
	VISsimname=all_sims_name[ee.value];
	console.log("PARENT:OLA KALA KAI EVALA TIS TIMES ee.value"+ee.value);
	//alert("VISsid"+ee.value);
visualizeloadsimulation();
}
   		viewer.infoBox.frame.addEventListener('load', function() {
			
			//var cssLink = frameDocument.createElement("link");
            //cssLink.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css';
            //cssLink.rel = "stylesheet";

           // viewer.infoBox.frame.contentDocument.head.appendChild(cssLink);
    //
    // Now that the description is loaded, register a click listener inside
    // the document of the iframe.
    //
    viewer.infoBox.frame.contentDocument.body.addEventListener('click', function(e) {
        //
        // The document body will be rewritten when the selectedEntity changes,
        // but this body listener will survive.  Now it must determine if it was
        // one of the clickable buttons.
		//alert("TUS");
		if (e.target && e.target.id === 'megalesprodsokiesbtn') {
			//alert("prosaptheia: "+e.target.value);  			
			alert("megalesprodsokiesbtn"+e.target.value);
		}
        if (e.target && e.target.className === 'click-test-button') {
			//alert("ke.target && e.target.className === 'click-test-button' ");
			visualizeloadsimulation();
        }
		else {
			//alert("xoxo");
		}
		if (e.target && e.target.id === 'fuelRate1') {
			//alert("prosaptheia: "+e.target.value);  			
            AutoCalculateMandateOnChange(e.target.value);
        }
		if (e.target && e.target.id === 'Corine') {
			//alert("prosaptheia: "+e.target.value);  			
            AutoCorine(e.target.value);
        }
		if (e.target && e.target.id === 'Elevation') {
			//alert("prosaptheia: "+e.target.value);  			
            AutoElevation(e.target.value);
        }
		if (e.target && e.target.id === 'Slope') {
			//alert("slope is checked?: "+e.target.checked);
			if (e.target.checked === true)
            AutoSlope(e.target.value);
        }
		if (e.target && e.target.id === 'Aspect') {
			//alert("prosaptheia: "+e.target.value);  			
            AutoAspect(e.target.value);
        }
		if (e.target && e.target.id === 'Behave') {
			//alert("prosaptheia: "+e.target.value);  			
            AutoBehave(e.target.value);
        }
		if (e.target && e.target.id === 'DeleteIgnition') {
			//alert("prosaptheia: "+e.target.value);  			
            deleteIgnition(e.target.value);
        }
		if (e.target && e.target.id === 'deletePolygon') {
			//alert("prosaptheia: "+e.target.value);  			
            deletePolygon(e.target.value);
        }
		if (e.target && e.target.id === 'simulationslist1') {
			//alert("e.target && e.target.id === 'simulationslist1'"+e.target.id+" and value:"+e.target.value); 
			//on change function outside of iframe (with parent. referemce to it)
			//if (e.target.value)	{
            //loadsimulation(e.target.value)
			//};
        }
		if (e.target && e.target.id === 'simulationslist1btn') {
			//alert("e.target && e.target.id === 'simulationslist1btn' ");
			//alert("prosaptheia: "+e.target.id+" and value:"+e.target.value);  			
            visualizeloadsimulation();
        }
		if (e.target && e.target.id === 'deletePolygon1') {
			//alert("prosaptheia: "+e.target.value); 
			onClickResetPolygon()			
            //deletePolygon1(e.target.value);
        }
    }, false);
}, false);

//var dataSourcePoints = new Cesium.CustomDataSource('points');



		//var dataSourcePoints = new Cesium.CustomDataSource('points');
		    var pixelRange = 25;
    var minimumClusterSize = 4;
    var enabled = true;
    var removeListener;

    var pinBuilder = new Cesium.PinBuilder();
    var pin50 = pinBuilder.fromText('50+', Cesium.Color.RED, 48).toDataURL();
    var pin40 = pinBuilder.fromText('40+', Cesium.Color.ORANGE, 48).toDataURL();
    var pin30 = pinBuilder.fromText('30+', Cesium.Color.YELLOW, 48).toDataURL();
    var pin20 = pinBuilder.fromText('20+', Cesium.Color.GREEN, 48).toDataURL();
    var pin10 = pinBuilder.fromText('10+', Cesium.Color.BLUE, 48).toDataURL();
	var singleDigitPins = new Array(8);
  function init(mode) 
{
	if(mode==4)
	{
		
 

		//alert("checkpoint1");

		getForests(0);
//var dataSourcePromise = viewer.dataSources.add(dataSourcePoints);
/*var dataSourcePromise = viewer.dataSources.add(dataSourcePoints);
dataSourcePromise.then(function(dataSource) {


    
    for (var i = 0; i < singleDigitPins.length; ++i) {
        singleDigitPins[i] = pinBuilder.fromText('' + (i + 2), Cesium.Color.VIOLET, 48).toDataURL();
    }

    dataSourcePoints.clustering.enabled = enabled;
    dataSourcePoints.clustering.pixelRange = pixelRange;
dataSourcePoints.clustering.minimumClusterSize = minimumClusterSize;
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function(movement) {
        var pickedLabel = viewer.scene.pick(movement.position);
        
        if (Cesium.defined(pickedLabel)) {
            var keimeno="";
            var ids = pickedLabel.id;
            if (Cesium.isArray(ids)) {
                for (var i = 0; i < ids.length; ++i) {
                    ids[i].billboard.color = Cesium.Color.RED;
                    console.log("VERTIS:"+ids[i].name);
                    keimeno=keimeno+"<p>"+ids[i].name;
                }
				            var entity = new Cesium.Entity('Clustered Forests');
            entity.description = {
                getValue : function() {
                return keimeno;
				}
			};
			entity.name = "Clustered Forests"
viewer.selectedEntity = entity;
            }

        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
});*/
	//	customStyle();
	//	alert("ALERTAS:");



		initCallback4(4);
		
}
	else if(mode==2)
	{
		
		
	}
}

//////////////////////////////////////////////////////////////////////////////
////FOR CLUSTERING////////////////////////////////////////////////////////////
    function customStyle() {
        if (Cesium.defined(removeListener)) {
            removeListener();
            removeListener = undefined;
        } else {
            removeListener = dataSourcePoints.clustering.clusterEvent.addEventListener(function(clusteredEntities, cluster) {
                cluster.label.show = false;
                cluster.billboard.show = true;
                cluster.billboard.id = cluster.label.id;
				//cluster.billboard.text = "koukou";
                cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;

                if (clusteredEntities.length >= 50) {
					cluster.billboard.text = "koukou";
                    cluster.billboard.image = pin50;
                } else if (clusteredEntities.length >= 40) {
                    cluster.billboard.image = pin40;
                } else if (clusteredEntities.length >= 30) {
                    cluster.billboard.image = pin30;
                } else if (clusteredEntities.length >= 20) {
                    cluster.billboard.image = pin20;
                } else if (clusteredEntities.length >= 10) {
                    cluster.billboard.image = pin10;
                } else {
                    cluster.billboard.image = singleDigitPins[clusteredEntities.length - 2];
                }
            });
        }

        // force a re-cluster with the new styling
        var pixelRange = dataSourcePoints.clustering.pixelRange;
        dataSourcePoints.clustering.pixelRange = 0;
        dataSourcePoints.clustering.pixelRange = pixelRange;
    }
	

//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function initCallback4(mode) 
{
  
	

}


function saveForesttest() 
{
	aerial_with_labels_add_remove(false);
	fill_loading_spinner_text("<p style=\"color:rgba(242, 242, 242, 0.84);\";><font size=\"3\">Creating Layers</font></p>");
	var loadspin=document.getElementById("loading_spinner"); //LOADING LOADING LOADING
	var loadspinbgrd=document.getElementById("loading_bgrd"); //LOADING LOADING LOADING
	//alert("PRIN to loading spinner einai: "+loadspin.style.display+" kai genika to object:"+loadspin);
	loadspin.style.display="block";
	loadspinbgrd.style.display="block";
	//alert("META to loading spinner einai: "+document.getElementById("loading_spinner").style.display);
	//alert("eimai i saveForesttest kai to distance apo kapou einai "+totalDistanceInKmAB);
	//savetodasos(extent,fname,cellSize);
	cellSize = document.getElementById('cellsize1new').value;
	fname=id=document.getElementById('fname1new').value;
	var rowsss=Math.round((totalDistanceInKmAC*1000)/cellSize);
	var colsss=Math.round((totalDistanceInKmAB*1000)/cellSize);
	//alert("Tora exo rows: "+rowsss+" kai cols: "+colsss+" kai to extent:"+extent);
	show_hide_loggingpuretest("show");
	var testvarwow=document.getElementsByClassName("loggingpuretest");
	//alert('getelementbyclass: ' +testvarwow[0].innerHTML );
	//testvarwow[0].innerHTML = rowsss+"rows x "+colsss+"cols - "+totalDistanceInKmAB.toFixed(2)+"km x "+totalDistanceInKmAC.toFixed(2)+"km ,cellsize: "+cellSize;
	testvarwow[0].innerHTML = "cell: "+cellSize+"m. - grid: "+rowsss+" x "+colsss+" - size: "+totalDistanceInKmAB.toFixed(2)+" x "+totalDistanceInKmAC.toFixed(2)+"km";
	pinakas=[];
	//calltestpage(viewer,extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname);
storedrawfnc(viewer,extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname);
//document.getElementById("loading_spinner").style.display = "none"; //END LOADING LOADING LOADING

}

function saveForest() 
{
	//alert("eimai i saveForest");
	setForest(extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname);
}
function setForest(extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname) 
{
 // alert("eimai i setForest");
  var promise = Cesium.sampleTerrain(viewer.terrainProvider, 9, pinakas);
var koukou1;
Cesium.when(promise, function(updatedPositions) {
    // positions[0].height and positions[1].height have been updated.
    // updatedPositions is just a reference to positions.
	console.log('Heighteeeee in promise in meters is: ' +pinakas[0].height );
	//alert("koukou ele "+positions[1].height);
	koukou1=pinakas[1].height;
	console.log('koukoutest cellsize: '+cellSize+'and koukou1= '+koukou1);
	koukoutest(extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname);
	console.log('koukoutest ended' );
});
}


function koukoutest(extent,pinakas,cellSize,totalDistanceInKmAB,totalDistanceInKmAC,southeastlonDegrees,southeastlatDegrees,southwestlonDegrees,southwestlatDegrees,northeastlonDegrees,northeastlatDegrees,northwestlonDegrees,northwestlatDegrees,rows,cols,fname)
{
	catholicvariable=4;
	var elevation = new Array();
	console.log('koukoutest started len: '+pinakas.length+' and cellsize is '+cellSize);
	for (var jj = 0; jj < pinakas.length; jj += 1) {
	//console.log('DEBUG inside '+ jj);
	//console.log('DEBUG inside '+ pinakas[jj].height);
	elevation[jj]=pinakas[jj].height.toFixed(1);
	console.log('DEBUG Ele '+ elevation[jj]);
	}
 console.log('DEBUG '+ pinakas[1].height);
console.log('Distance ali lisi AB: ' + totalDistanceInKmAB*1000 + ' m '+totalDistanceInKmAB+'(km) and AC :'+totalDistanceInKmAC*1000+' m and cellsize :'+cellSize);
//console.log('columns : '+cols+' and rows '+rows);
	//loggingMessage('Extent created (N: ' + southeastlonDegrees.toFixed(3)  + ', E: ' + extent.east.toFixed(3) + ', S: ' + extent.south.toFixed(3) + ', W: ' + extent.west.toFixed(3) + ')');
	//alert("koukou ele "+pinakas[1].height+" a: south east lat: "+southeastlonDegrees.toFixed(3)+" south east lon : "+ southeastlatDegrees.toFixed(3) 
	//		+ '\nsouth west lat : '+southwestlonDegrees.toFixed(3)+', south west lon ' + southwestlatDegrees.toFixed(3) 
	//		+ '\nnorth east lat : '+northeastlonDegrees.toFixed(3)+', north east lon ' + northeastlatDegrees.toFixed(3)
	//		+ '\nnorth west lat : '+northwestlonDegrees.toFixed(3) +' north west lon ' + northwestlatDegrees.toFixed(3) );
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
	info[0]="north=30";
	info[1]="south=30";
	info[2]="east=30";
	info[3]="west=30";
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
							//alert('fuel.php returned');
								for (var jj = 0; jj < elevation.length; jj += 1) {
									//console.log('DEBUG inside '+ jj);
									//console.log('DEBUG inside '+ pinakas[jj].height);
									//elevation[jj]=pinakas[jj].height.toFixed(1);
									console.log('fuel params['+jj+']: '+ elevation[jj]);
							}
							http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							http1.setRequestHeader("Content-length", params1.length);
							http1.setRequestHeader("Connection", "close");
							http1.send(params1);
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
									//alert('storeDraw returned');
									//field_area.innerHTML = "<i><small>Layers generation...</small></i>"; 
console.log('params2 : northwestlatDegrees:'+northwestlatDegrees+ ' northwestlonDegrees:'+northwestlonDegrees+' southeastlatDegrees'+southeastlatDegrees+'  southeastlonDegrees'+southeastlonDegrees+'  northeastlonDegrees'+northeastlonDegrees+'  northeastlatDegrees'+northeastlatDegrees+'  southwestlonDegrees'+southwestlonDegrees+'  southwestlatDegrees'+southwestlatDegrees+'  fidModis'+fidModis+'  rows'+rows+'  cols'+cols+' ');
									params2 = "max_lat="+northwestlatDegrees+"&max_lat_lon="+northwestlonDegrees+"&min_lat="+southeastlatDegrees+"&min_lat_lon="+southeastlonDegrees+"&max_lon="+northeastlonDegrees+"&max_lon_lat="+northeastlatDegrees+"&min_lon="+southwestlonDegrees+"&min_lon_lat="+southwestlatDegrees+"&fid="+fidModis+"&rows="+rows+"&cols="+cols+"&df=0";
									http2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
									http2.setRequestHeader("Content-length", params2.length);
									http2.setRequestHeader("Connection", "close");
									http2.send(params2);
									
								} 
							}
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Content-length", params.length);
	http.setRequestHeader("Connection", "close");
	http.send(params);
	
//	http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//	http1.setRequestHeader("Connection", "close");



}

function koukou(updatedPositions) 
{
    // positions[0].height and positions[1].height have been updated.
    // updatedPositions is just a reference to positions.
	console.log('Heighteeeee in meters is: ' +updatedPositions[0].height );
	//alert("koukou ele "+positions[1].height);
	koukou1=updatedPositions[0].height;
}

function fuelRate (checked, fid) 
{
	if(document.getElementById('fuelRate').checked==true)
	{
		document.getElementById('fuelRate').checked=false;
	}
//alert("kati doulepse more");

}

	var forestCounter=0;
	var forestCounter2=0;
	var forestsLat = new Array();
	var forestsLon = new Array();
	var forests = new Array();
	var forestsBalloons = new Array();
	var forestData = new Array();
	var global_forests_placemarks = [];
function getForests (option) 
{
	
	var http1= new XMLHttpRequest();
	var url1="include/getForests2.php";
	
	http1.open("POST", url1, true);

	var params1="fid=-1&username=floga";
//alert("checkpoint2");	
	http1.onreadystatechange = function(){
 
						if(http1.readyState == 4 && http1.status == 200) 
						{
							var response=http1.responseText;
							var temp11 = new Array();
							temp11 = response.split("klaiooooo");
							//alert("temp11 "+temp11[1]);							
							 obj = JSON.parse(temp11[1]);
							 //console.log(temp11[1]);
							//alert("getforest2: "+obj.length);
							//var temp11 = new Array();
							//temp = response.split(new RegExp( "[KSEKINAEI]{1}", "g" ) );
							//temp11 = response.split("KSEKINAEI");
							//alert("forest found "+temp11);
							//var temp = new Array();
							//temp = temp11[1].split(new RegExp( "[\n]{1}", "g" ) );
							//alert("meta to deutero split "+temp[0]);
							//alert("meta to deutero split "+temp[1]);
							var i=1;
							if(obj.length ==0)
							{
								alert("No forest found!");
							}
							else
							{
								for(i=0; i<obj.length; i=i+1)
								{
								
									//forestCounter++;
									
									//forestData[forestCounter-1] = temp[i].split(new RegExp( "[~]{1}", "g" ) );
									
									//var data= forestData[forestCounter-1];
									//console.log("object is "+obj[i].name+" and fid"+obj[i].id+" and crdate"+obj[i].dateCreated);
									var lat = parseFloat(obj[i].coo.lat);
									var lon = parseFloat(obj[i].coo.lon);
			
									var fid = parseInt(obj[i].id);
									//alert("prinkaleso tin doulepse "+i);
									//doulepse(i, lat, lon, fid, obj[i].name);								
									global_forests_placemarks.push({i: i, lat: lat, lon: lon, fid: fid, name: obj[i].name, dateCreated: obj[i].dateCreated}); /* Object literal. */
									//console.log("AX PAIDAKI MOU:::::::::::::::"+global_forests_placemarks.length+" AND :"+global_forests_placemarks[0].dateCreated);
								}
										/*var dateValues = $("#sliderlav").dateRangeSlider("values");
										var minday = dateValues.min.getDate();
										var maxday = dateValues.max.getDate();
										var minmonth = dateValues.min.getMonth() +1;
										var maxmonth = dateValues.max.getMonth() +1;
										var minyear = dateValues.min.getFullYear();
										var maxyear = dateValues.max.getFullYear();
										if(minday<10) {
											minday = '0'+minday;
										} 
										if(maxday<10) {
											maxday = '0'+maxday;
										}
										if(minmonth<10) {
											minmonth = '0'+minmonth;
										}
										if(maxmonth<10) {
											maxmonth = '0'+maxmonth;
										}
										var xmin = new Date(minyear+"-"+minmonth+"-"+minday);
										var ymax = new Date(maxyear+"-"+maxmonth+"-"+maxday);*/
										var UIrangeValues=getUIvalues(slider.noUiSlider.get());
										for (var koukou = 0; koukou < global_forests_placemarks.length; koukou++) { 
											var value=new Date(global_forests_placemarks[koukou].dateCreated);//console.log("valuevaluevaluevaluevaluevaluevalue:"+value);
											if (+value >= +UIrangeValues.min && +value <= +UIrangeValues.max)
											{
												doulepse(global_forests_placemarks[koukou].i, global_forests_placemarks[koukou].lat, global_forests_placemarks[koukou].lon, global_forests_placemarks[koukou].fid, global_forests_placemarks[koukou].name,global_forests_placemarks[koukou].dateCreated);
											}
										}
										//openSimHistorydeep();
										//$("#sliderlav").dateRangeSlider("values", xminset, ymaxset);*/
								
							}
						} 
				}
				
			http1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			http1.setRequestHeader("Content-length", params1.length);
			http1.setRequestHeader("Connection", "close");
			http1.send(params1);	

}

var toolbar = document.getElementById('toolbar');
var numClicks = 0;

// CAUTION: Only disable iframe sandbox if the descriptions come from a trusted source.
viewer.infoBox.frame.setAttribute('sandbox', 'allow-same-origin allow-popups allow-forms allow-scripts allow-top-navigation');


function updateDisplay() {
   // toolbar.innerHTML = 'Number of times you clicked either button: ' + numClicks;
//alert("XATUSIS");
}
function  deg2rad( deg) {
	return (deg * Math.PI / 180.0);
}


function  rad2deg( rad) {
	return (rad * 180.0 / Math.PI);
}
function distance( lat1,  lon1,  lat2,  lon2,  unit) {
  var theta = lon1 - lon2;
  var dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
  dist = Math.acos(dist);
  dist = rad2deg(dist);
  dist = dist * 60 * 1.1515;
  if (unit == 'K') {
	dist = dist * 1.609344;
  } else if (unit == 'N') {
	dist = dist * 0.8684;
	}
  return (dist);
}

function doulepse (counter, lat, lon, fid, name,date) 
{
		function onChanged(collection, added, removed, changed){
			var msg = 'Added ids';
			for(var i = 0; i < added.length; i++) {
			msg += '\n' + added[i].id;
			}
		}
  			viewer.entities.collectionChanged.addEventListener(onChanged);
		var pinBuilder = new Cesium.PinBuilder();	
		var wyoming = viewer.entities.add({
			name : date+" "+name,
			position : Cesium.Cartesian3.fromDegrees(lon,lat,0.0),
			billboard : {
			//image : pinBuilder.fromColor(Cesium.Color.SALMON, 48).toDataURL(),
			//heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
			//verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
			image : pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
			verticalOrigin : Cesium.VerticalOrigin.BOTTOM
			},
			label : {
			text : name,
			//verticalOrigin : Cesium.VerticalOrigin.BOTTOM
			}
		}
		);
		var strSimulations;
		for (var jj = 0; jj < all_sims_fid.length; jj += 1) {
			if ( all_sims_fid[jj] == fid)
			{
				//console.log('found fid :'+fid+' with all_sims_fid['+jj+'] with name: all_sims_name['+jj+'] : '+all_sims_name[jj] );
				strSimulations=strSimulations+'<option value="'+jj+'" id="'+all_sims_fid[jj]+'">'+all_sims_name[jj]+'</option>';
				//echo "<option value=\"".$row['id']."\" id=\"".$row['id']."\">".$row['name']."</option>";
			}
		}
		//wyoming.title="koukou";
		var victorAB=distance(forests_south[fid], forests_east[fid], forests_north[fid], forests_east[fid], 'K');
		var victorAC=distance(forests_south[fid], forests_east[fid], forests_south[fid], forests_west[fid], 'K');
		wyoming.description = '\
		  <script src="visualization.js"></scr'+'ipt>'+'\
<p>\
<span style="fontSize:medium;cursor:pointer" onclick="parent.infobtnoverride('+fid+');" class="glyphicon glyphicon-facetime-video"><font size="4">&#x1f3a5;\u00A0</font></span> cell:'+forests_cell[fid]+'m | grid:'+forests_rows[fid]+'x'+forests_cols[fid]+' | size:'+victorAC.toFixed(2)+'km x '+victorAB.toFixed(2)+'km\
</p>\
<p>\
  <div class="balloon1"><input type="radio" id="Corine" name="fooby[1][]" value='+fid+' onchange = "AutoCorine('+fid+')">Corine\
  <div class="balloon1"><input type="radio" id="Behave" name="fooby[1][]" value='+fid+' onchange = "AutoBehave('+fid+')">Behave\
  <div class="balloon1"><input type="radio" id="Elevation" name="fooby[1][]" value='+fid+' onchange = "AutoElevation('+fid+')">Elevation\
  <div class="balloon1"><input type="radio" id="Slope" name="fooby[1][]" value='+fid+' onchange = "AutoSlope('+fid+')">Slope\
  <div class="balloon1"><input type="radio" id="Aspect" name="fooby[1][]" value='+fid+' onchange = "AutoAspect('+fid+')">Aspect\
  <p>\
  Select simulation \
</p>\
<select style="color:black" name="simulationslist" id="simulationslist1" onchange = "parent.loadsimulationYO(this);" >\
  <option></option>'+strSimulations
+'</select>\
<div style="text-align:center; padding:10px"><button style="display:none;" id="hiddenvalue'+fid+'" onClick="visualizeloadsimulation()" class="click-test-button">' +'Select simulation</button></div>\
</p>\
<p>\
</p>';
		//addMultiplePoints(lat, lon);

//viewer.zoomTo(viewer.entities);
var xino=new Cesium.HeadingPitchRange(90, 90, 120);
//viewer.zoomTo(viewer.entities, xino);
//viewer.flyTo(viewer.entities);
viewer.flyTo(viewer.entities,{
	duration:3.0,
	maximumHeight:0,
	offset : {
            heading : 0.0,
            pitch : Cesium.Math.toRadians(-90.0),
            range : 0.0
        }
	
});
}


function addMultiplePoints(lat, lon) {

//alert("vazo points "+lat+","+lon);
    viewer.entities.add({
        position : Cesium.Cartesian3.fromDegrees(lat, lon,100000.0),
        point : {
            color : Cesium.Color.RED,
            pixelSize : 32
        }
    });
}

function AutoCalculateMandateOnChange(fid){
    //alert("xaxa"+fid);
viewer.dataSources.removeAll(false);	
viewer.dataSources.add(Cesium.KmlDataSource
    .load('../../db/forests/'+fid+'/fuel.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
    })
)
.then( function (dataSource) {
    viewer.flyTo(dataSource.entities);
});	
}
function AutoSlope(fid){
    //alert("xaxa"+fid);
viewer.dataSources.removeAll(false);	
viewer.dataSources.add(Cesium.KmlDataSource
    .load('../../db/forests/'+fid+'/slope.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
    })
)
.then( function (dataSource) {
    viewer.flyTo(dataSource.entities,{
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
function AutoCorine(fid){

	//BETA TEST
	console.log('BETA TEST for AutoCorine '+fid);
	//AutoCorineSimSetup(true,fid);
viewer.dataSources.removeAll(false);	
viewer.dataSources.add(Cesium.KmlDataSource
    .load('../../db/forests/'+fid+'/corine.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
    })
)
.then( function (dataSource) {
    viewer.flyTo(dataSource.entities,{
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
function AutoAspect(fid){
    //alert("xaxa"+fid);
viewer.dataSources.removeAll(false);	
viewer.dataSources.add(Cesium.KmlDataSource
    .load('../../db/forests/'+fid+'/aspect.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
    })
)
.then( function (dataSource) {
    viewer.flyTo(dataSource.entities,{
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
function AutoBehave(fid){
    //alert("xaxa"+fid);
viewer.dataSources.removeAll(false);	
viewer.dataSources.add(Cesium.KmlDataSource
    .load('../../db/forests/'+fid+'/behave.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
    })
)
.then( function (dataSource) {
    viewer.flyTo(dataSource.entities,{
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
function AutoElevation(fid){
    //alert("xaxa"+fid);
viewer.dataSources.removeAll(false);	
viewer.dataSources.add(Cesium.KmlDataSource
    .load('../../db/forests/'+fid+'/elev.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
    })
)
.then( function (dataSource) {
    viewer.flyTo(dataSource.entities,{
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



function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

  </script>

    </div>
 		


	
<?php


	include("../../db/connection.php");

	print "hellow";
	$db_handle = mysql_connect($db_host, $username, $password);
	$db_found = mysql_select_db($db_name, $db_handle);
	
	if ($db_found) 
	{
			$SQL = "SELECT id from USER where username='floga'";
			$result = mysql_query($SQL);
			$row = mysql_fetch_array($result);  	
			$userid = $row['id'];	

		if($userid!=1)
		{
			//$SQL = "SELECT * FROM FORESTS WHERE user=".$userid;
			$SQL = "SELECT * FROM FORESTS ";
		}
		else
		{
			//$SQL = "SELECT * FROM FORESTS WHERE user=0 OR user=1";
			$SQL = "SELECT * FROM FORESTS ";			
		}
		$result = mysql_query($SQL);
				
		while($row = mysql_fetch_array($result))
		{
			echo "<option value=\"".$row['id']."\" id=\"".$row['id']."\">".$row['name']."</option>";
		}

	}
	else 
	{
		print "Database NOT Found";
		mysql_close($db_handle);
	}
?>
	

<!--<table>
<tr>
<td>
		<div class="col-md-2 col-sm-2 col-sx-2">
			<span id="ipno1" onclick="openNavNEW()" style="color: lightblue;padding: 2px; float: right;">☰</span>
		</div>
</td><td><span id="ipno2" style="border-radius: 3px;background-color:rgba(25, 25, 25, 0.8);font-weight: bold;font-size:17px;cursor:pointer" onclick="showNavNEW()">Simulation History</span></td></tr>
</table>-->
	<!--<div class="row">
		<div class="col-md-8 col-sm-8 col-sx-8" style="color: lightblue;text-align: center;">
			<span id="ipno2" style="color: lightblue;" onclick="showNavNEW();" >Simulation History</span>
		</div>
		<div class="col-md-2 col-sm-2 col-sx-2">
			<span id="ipno1" onclick="openNavNEW()" style="color: lightblue;padding: 2px; float: right;">☰</span>
		</div>
	</div>-->
<script>
//var LASTOPENETAB="null";
var simORvis="sim";
function openNavNEW() {
	//an einai kleisto
	if (document.getElementById("mySidenav").style.width == "0" || document.getElementById("mySidenav").style.display == "none"){
		console.log("openNavNEW:einai kleisto opote anoigo to arxiko menu");
		changeMenuTitle("&#9776;");
		closeNav();		
		document.getElementById("mySidenav").style.width = "auto";
		document.getElementById("mySidenav").style.display = "block";
		showNav();
	}//an einai anoixto
	else if (document.getElementById("mySidenav").style.width == "auto" && document.getElementById("mySidenav").style.display == "block" && document.getElementById("resizable").style.display == "none"){
		console.log("openNavNEW:Eimai i bugia!Opote to anoigo to arxiko menu");
		changeMenuTitle("&#9776;");
		closeNav();		
		document.getElementById("mySidenav").style.width = "auto";
		document.getElementById("mySidenav").style.display = "block";
		showNav();
	}
	else if(document.getElementById("mySidenav").style.width == "auto" && document.getElementById("mySidenav").style.display == "block"){
		console.log("openNavNEW:einai anoixto opote ato kleino");
		//kleinei to resizable kai to arxiko menu
		hideNav();
		document.getElementById("mySidenav").style.width = "0";
		document.getElementById("mySidenav").style.display = "none";
	}
	LASTOPENETAB=LASTOPENETAB;
}
function openNav() {
	changeMenuTitle("&#9776;");
	closeNav();
	document.getElementById("mySidenav").style.width = "auto";
	document.getElementById("mySidenav").style.display = "block";
	document.getElementById("ipno1").style.width = "0";
	document.getElementById("ipno1").style.display = "none";
	document.getElementById("ipno2").style.width = "0";
	document.getElementById("ipno2").style.display = "none";
	var koukoukoukou=document.getElementById("resizable");
	koukoukoukou.style.display="block";
	//alert("resizable.style.display[0] and document.getElementById(\"mySidenav\").style.width "+koukoukoukou.style.display+document.getElementById("mySidenav").style.width);
	
	//document.getElementById("mySidenav").style.display = "block";
	console.log("EIMAI I openNav:"+LASTOPENETAB);
	/*if (LASTOPENETAB == "null"){ //EINAI ARXI
		document.getElementById("mySidenav").style.display = "block";
	}
	else if (LASTOPENETAB == "openNavdeep")
	{
		console.log("EIMAI I OPEN:"+LASTOPENETAB+" kai to "+document.getElementById("New Forest1").style.display);
		if (document.getElementById("New Forest1").style.display == "block")
			document.getElementById("New Forest1").style.display = "none";
		else if (document.getElementById("New Forest1").style.display == "none")
			document.getElementById("New Forest1").style.display = "block";		
	}
	else if (LASTOPENETAB == "openSimSetupdeep")
	{
		console.log("EIMAI I OPEN:"+LASTOPENETAB+" kai to "+document.getElementById("simulationSetup").style.display);
		if (document.getElementById("simulationSetup").style.display == "block")
			document.getElementById("simulationSetup").style.display = "none";
		else if (document.getElementById("simulationSetup").style.display == "none")
			document.getElementById("simulationSetup").style.display = "block";		
	}
	else if (LASTOPENETAB == "openSimHistorydeep")
	{
		console.log("EIMAI I OPEN:"+LASTOPENETAB+" kai to "+document.getElementById("visualizationControls").style.display);
		if (document.getElementById("visualizationControls").style.display == "block")
			document.getElementById("visualizationControls").style.display = "none";
		else if (document.getElementById("visualizationControls").style.display == "none")
			document.getElementById("visualizationControls").style.display = "block";		
	}
	else if (LASTOPENETAB == "openEditVegetationdeep")
	{
		console.log("EIMAI I OPEN:"+LASTOPENETAB+" kai to "+document.getElementById("editForestControls").style.display);
		if (document.getElementById("editForestControls").style.display == "block")
			document.getElementById("editForestControls").style.display = "none";
		else if (document.getElementById("editForestControls").style.display == "none")
			document.getElementById("editForestControls").style.display = "block";		
	}*/
LASTOPENETAB=LASTOPENETAB;
}
function clear_new_forest_form()
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
		////////TEST TO SEE IF IT IS NEEDED
	document.getElementById('fname1new').value="";//CLEAR THE FNAME
	if (viewer.geocoder.viewModel.searchText != "" && viewer.geocoder.viewModel.searchText != "Searching..."){ //IF SEARCH AREA ON DEFAULT CESIUM HAS TEXT THEN PUT IT IN THE FNAME
		document.getElementById('fname1new').value=viewer.geocoder.viewModel.searchText;
	}
	////////TEST TO SEE IF IT IS NEEDED
	viewer.dataSources.removeAll(false);
}
function changeMenuTitle(title) {
	var titlemenu=document.getElementById("ipno");
	//alert(" Titlos"+title);
	titlemenu.innerHTML =title;
}
function changeMenuTitle2(title, div, vis) {
	switch (title) {
    case "openNavdeep":
        title = "New Forest";
        break;
    case "openSimSetupdeep":
        title = "Simulation Setup";
        break;
    case "openSimHistorydeep":
        if (simORvis=='vis')
			title = "Simulation Results";
		else if (simORvis=='sim')
			title = "Simulation History";
        break;
    case "openEditVegetationdeep":
        title = "Edit Forest";
        break;
    case "openHotpointSimdeep":
        title = "openHotpointSimdeep";
        break;
    case "":
        title = "";
	}
	
	var titlemenu=document.getElementById(div);
	//alert(" Titlos"+title);
	titlemenu.innerHTML =title;
	
}
function openNavdeep() {
	changeMenuTitle("&#9776;");
	changeMenuTitle2("openNavdeep","ipno3");
	viewer.entities.removeAll();
	clear_new_forest_form();
    //document.getElementById("New Forest1").style.display = "block";
    //document.getElementById("mySidenav").style.display = "none";
    document.getElementById("mySidenav").style.display = "none";
    document.getElementById("editForestControls").style.display = "none";
    document.getElementById("visualizationControls").style.display = "none";
    document.getElementById("simulationSetup").style.display = "none";
    document.getElementById("New Forest1").style.width = "100%";
    document.getElementById("New Forest1").style.display = "block";
    document.getElementById("mySidenav").style.width = "0";
	LASTOPENETAB="openNavdeep";
	console.log("EIMAI I openNavdeep:"+LASTOPENETAB);
}
function sortOptions(dropdown) 
{
	
		var selectedValue = $(dropdown).val();
        $(dropdown).html($(dropdown+' option').sort(function(x, y) {
            return Number($(x).val()) > Number($(y).val()) ? -1 : 1;
        })).val(selectedValue)
       // $("#ddlList").get(0).selectedIndex = 0;

    
}
function openSimSetupdeep() {

/*var selectList = $('#forestDown option');

selectList.sort(function(a,b){
    a = a.value;
    b = b.value;
 
    return a-b;
});*/
sortOptions("#forestDown");
//$('select').eq(0).html(selectList);
		changeMenuTitle("&#9776;");
		changeMenuTitle2("openSimSetupdeep","ipno3");
		viewer.entities.removeAll();
		//viewer.entities.removeAll(); //remove entities
		clear_new_forest_form(); //remove primitives and datasources and hide logging info div
		//document.getElementById("simulationSetup").style.display = "block";
		//document.getElementById("mySidenav").style.display = "none";
		document.getElementById("ipno1").style.width = "0";
		document.getElementById("ipno1").style.display = "none";
		document.getElementById("ipno2").style.width = "0";
		document.getElementById("ipno2").style.display = "none";
		var koukoukoukou=document.getElementById("resizable");
		koukoukoukou.style.display="block";
		document.getElementById("mySidenav").style.display = "none";
		document.getElementById("New Forest1").style.display = "none";
		document.getElementById("visualizationControls").style.display = "none";
		document.getElementById("editForestControls").style.display = "none";
		document.getElementById("simulationSetup").style.width = "auto";
		document.getElementById("simulationSetup").style.display = "block";
		document.getElementById("mySidenav").style.width = "0";
		LASTOPENETAB="openSimSetupdeep";
}
function openSimHistorydeep(parameter) {
	document.getElementById("ipno1").style.width = "0";
	document.getElementById("ipno1").style.display = "none";
	document.getElementById("ipno2").style.width = "0";
	document.getElementById("ipno2").style.display = "none";
	changeMenuTitle("&#9776;");
	changeMenuTitle2("openSimHistorydeep","ipno3");
	sortOptions("#forestDownVIS");
	LASTOPENETAB="openSimHistorydeep";
	console.log("TI EX EPITELLOUS LASTOPENETAB:"+LASTOPENETAB+" ??");
	//var simORvis;
	//getForests(0);
	//doulepse(i, lat, lon, fid, obj[i].name);								
	//global_forests_placemarks.push({i: i, lat: lat, lon: lon, fid: fid, name: obj[i].name}); /* Object literal. */
    if (typeof parameter == 'undefined')
	{
		simORvis="sim";
		changeMenuTitle2("openSimHistorydeep","ipno3",0);
	//in order to load placemarks again
		viewer.dataSources.removeAll(false);
		clear_new_forest_form();
		viewer.entities.removeAll();		
		//for (var koukou = 0; koukou < global_forests_placemarks.length; koukou++) { 
		//	doulepse(global_forests_placemarks[koukou].i, global_forests_placemarks[koukou].lat, global_forests_placemarks[koukou].lon, global_forests_placemarks[koukou].fid, global_forests_placemarks[koukou].name);
		//}
		
		
		var dateValues = $("#sliderlav").dateRangeSlider("values");
		var minday = dateValues.min.getDate();
		var maxday = dateValues.max.getDate();
		var minmonth = dateValues.min.getMonth() +1;//alert("min "+data.values.min.getMonth());
		var maxmonth = dateValues.max.getMonth() +1;//alert("max "+data.values.max.getMonth());
		var minyear = dateValues.min.getFullYear();
		var maxyear = dateValues.max.getFullYear();
		if(minday<10) {
			minday = '0'+minday;
		} 
		if(maxday<10) {
			maxday = '0'+maxday;
		}
		if(minmonth<10) {
			minmonth = '0'+minmonth;
		}
		if(maxmonth<10) {
			maxmonth = '0'+maxmonth;
		}
		//var xminset = new Date(minyear+"-"+minmonth+"-"+minday);
		//var ymaxset = new Date(maxyear+"-"+maxmonth+"-"+maxday);
		var xmin = new Date(minyear+"-"+minmonth+"-"+minday);
		var ymax = new Date(maxyear+"-"+maxmonth+"-"+maxday);
		var UIrangeValuessim=getUIvalues(slider.noUiSlider.get());
//if (+value >= +UIrangeValues.min && +value <= +UIrangeValues.max)
		for (var koukou = 0; koukou < global_forests_placemarks.length; koukou++) { 
			var value=new Date(global_forests_placemarks[koukou].dateCreated);//console.log("valuevaluevaluevaluevaluevaluevalue:"+value);
		//alert("Number(global_forests_placemarks[koukou].dateCreated.replace('-', ''))"+Number(global_forests_placemarks[koukou].dateCreated.replace('-', '')));
			if (+value >= +UIrangeValuessim.min && +value <= +UIrangeValuessim.max)
			{
				//console.log("HIT!!!!!!!!:"+global_forests_placemarks[koukou].name+" with datecreated"+global_forests_placemarks[koukou].dateCreated);
				doulepse(global_forests_placemarks[koukou].i, global_forests_placemarks[koukou].lat, global_forests_placemarks[koukou].lon, global_forests_placemarks[koukou].fid, global_forests_placemarks[koukou].name,global_forests_placemarks[koukou].dateCreated);
				//console.log("minnum:"+minnum+" maxnum:"+maxnum+" value"+value);
				//console.log("KOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOUKOU "+global_forests_placemarks[koukou].name+"id"+global_forests_placemarks[koukou].id+"and date:"+global_forests_placemarks[koukou].dateCreated+" and "+Number(global_forests_placemarks[koukou].dateCreated.replace('-', '').replace('-', '')));
			}
			//doulepse(global_forests_placemarks[koukou].i, global_forests_placemarks[koukou].lat, global_forests_placemarks[koukou].lon, global_forests_placemarks[koukou].fid, global_forests_placemarks[koukou].name);
		}
		//$("#sliderlav").dateRangeSlider("values", xminset, ymaxset);
		///SLIDERR TEST
		var koukoukoukou=document.getElementById("resizable");
		koukoukoukou.style.display="block";
		document.getElementById("mySidenav").style.display = "none";
		document.getElementById("New Forest1").style.display = "none";
		document.getElementById("simulationSetup").style.display = "none";
		document.getElementById("editForestControls").style.display = "none";
		document.getElementById("visualizationControls").style.display = "none";
		document.getElementById("dateslider").style.width = "100%";
		document.getElementById("dateslider").style.display = "block";
		///SLIDERR TEST
		//document.getElementById("visualizationControls").style.display = "block";
		//document.getElementById("mySidenav").style.display = "none";
	//	document.getElementById("visualizationControls").style.width = "auto";
	//	document.getElementById("mySidenav").style.width = "0";
	}
	else 
	{
		simORvis="vis";
		changeMenuTitle2("openSimHistorydeep","ipno3",1);
		//alert("EIMAI i test.php kai kalo tin flySetupVIS me orisma "+parameter);
		var koukoukoukou=document.getElementById("resizable");
		koukoukoukou.style.display="block";
		document.getElementById("mySidenav").style.display = "none";
		document.getElementById("New Forest1").style.display = "none";
		document.getElementById("simulationSetup").style.display = "none";
		document.getElementById("editForestControls").style.display = "none";
		document.getElementById("visualizationControls").style.width = "auto";
		document.getElementById("visualizationControls").style.display = "block";
		var sel = document.getElementById('forestDownVIS');
							//var val = document.getElementById('AnimalToFind').value;
							//sel.selectedIndex = 0;
		for(var i = 0, j = sel.options.length; i < j; ++i) {
			if(sel.options[i].id == parameter) {
				sel.selectedIndex = 0;
				sel.selectedIndex = i;
				break;
			}
		}
		//select the specific simulation that was triggered

		flySetupVIS(parameter);
		//document.getElementById("visualizationControls").style.display = "block";
		//document.getElementById("mySidenav").style.display = "none";
		
		document.getElementById("mySidenav").style.width = "0";
		//alert("sim history called with paramater");
		var koukou=parameter;
		doulepse(global_forests_placemarks[koukou].i, global_forests_placemarks[koukou].lat, global_forests_placemarks[koukou].lon, global_forests_placemarks[koukou].fid, global_forests_placemarks[koukou].name,global_forests_placemarks[koukou].dateCreated);
	}
	LASTOPENETAB="openSimHistorydeep";
}
function openEditVegetationdeep() {
	viewer.entities.removeAll();
	clear_new_forest_form();
	viewer.entities.removeAll();
	sortOptions("#forestDownedit");
	changeMenuTitle("&#9776;");
	changeMenuTitle2("openEditVegetationdeep","ipno3");
   // document.getElementById("editForestControls").style.display = "block";
    //document.getElementById("mySidenav").style.display = "none";
    		document.getElementById("mySidenav").style.display = "none";
		document.getElementById("mySidenav").style.width = "0";
		document.getElementById("New Forest1").style.display = "none";		
		document.getElementById("visualizationControls").style.display = "none";
		document.getElementById("simulationSetup").style.display = "none";
    
    document.getElementById("editForestControls").style.width = "auto";
    document.getElementById("editForestControls").style.display = "block";
    document.getElementById("mySidenav").style.width = "0";
	LASTOPENETAB="openEditVegetationdeep";
}
function openHotpointSimdeep() {
	viewer.entities.removeAll();
	changeMenuTitle("&#9776;");
	changeMenuTitle2("openHotpointSimdeep","ipno3");
   // document.getElementById("editForestControls").style.display = "block";
    //document.getElementById("mySidenav").style.display = "none";
    document.getElementById("editForestControls").style.width = "auto";
    document.getElementById("mySidenav").style.width = "0";
    getIgnitions(0);
	LASTOPENETAB="openHotpointSimdeep";
}
function closeNav() {
	changeMenuTitle("&#9776;");
	/*
	document.getElementById("ipno1").style.width = "auto";
	document.getElementById("ipno1").style.display = "block";
	document.getElementById("ipno2").style.width = "auto";
	document.getElementById("ipno2").style.display = "block";*/
	var koukoukoukou=document.getElementById("resizable");
	koukoukoukou.style.display="none";
	//document.getElementById("mySidenav").style.display = "none";
	//document.getElementById("New Forest1").style.display = "none";
	//document.getElementById("simulationSetup").style.display = "none";
	
    //document.getElementById("mySidenav").style.display = "none";
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("New Forest1").style.width = "0";
	document.getElementById("simulationSetup").style.width = "0";
	document.getElementById("editForestControls").style.width = "0";
	document.getElementById("visualizationControls").style.width = "0";
	document.getElementById("dateslider").style.width = "0";
	
	document.getElementById("mySidenav").style.display = "none";
	document.getElementById("New Forest1").style.display = "none";
	document.getElementById("visualizationControls").style.display = "none";
	document.getElementById("editForestControls").style.display = "none";
	document.getElementById("simulationSetup").style.display = "none";
	document.getElementById("dateslider").style.display = "none";
    /*document.getElementById("New Forest1").style.display = "none";
	document.getElementById("simulationSetup").style.display = "none";
	document.getElementById("editForestControls").style.display = "none";
	document.getElementById("visualizationControls").style.display = "none";*/
	LASTOPENETAB=LASTOPENETAB;
}

function closeNavWithoutTitles() {

    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("New Forest1").style.width = "0";
	document.getElementById("simulationSetup").style.width = "0";
	document.getElementById("editForestControls").style.width = "0";
	document.getElementById("visualizationControls").style.width = "0";
	document.getElementById("dateslider").style.width = "0";
	
	document.getElementById("mySidenav").style.display = "none";
	document.getElementById("New Forest1").style.display = "none";
	document.getElementById("visualizationControls").style.display = "none";
	document.getElementById("editForestControls").style.display = "none";
	document.getElementById("simulationSetup").style.display = "none";
	document.getElementById("dateslider").style.display = "none";
}

function hideNav() {
	changeMenuTitle("&#9776;");

	document.getElementById("ipno1").style.width = "auto";
	document.getElementById("ipno1").style.display = "block";
	document.getElementById("ipno2").style.width = "auto";
	document.getElementById("ipno2").style.display = "block";
	var koukoukoukou=document.getElementById("resizable");
	koukoukoukou.style.display="none";
	console.log("EIMAI I HIDENAV kai to LASTOPENETAB:"+LASTOPENETAB);
	changeMenuTitle2(LASTOPENETAB,"ipno2");
	//LASTOPENETAB="null";
}
function showNav() {
	changeMenuTitle("&#9776;");
	document.getElementById("ipno1").style.width = "0";
	document.getElementById("ipno1").style.display = "none";
	document.getElementById("ipno2").style.width = "0";
	document.getElementById("ipno2").style.display = "none";
	var koukoukoukou=document.getElementById("resizable");
	koukoukoukou.style.display="block";
	console.log("EIMAI I HIDENAV kai to LASTOPENETAB:"+LASTOPENETAB);
	//LASTOPENETAB="null";
}
function showNavNEW() {
	changeMenuTitle("&#9776;");
	document.getElementById("ipno1").style.width = "0";
	document.getElementById("ipno1").style.display = "none";
	document.getElementById("ipno2").style.width = "0";
	document.getElementById("ipno2").style.display = "none";
	closeNavWithoutTitles();// instead of closeNav() that has the bug of titles
		switch (LASTOPENETAB) {
    case "openNavdeep":
		//document.getElementById('fname1new').value="";//CLEAR THE FNAME
		if (viewer.geocoder.viewModel.searchText != "" && viewer.geocoder.viewModel.searchText != "Searching..." && viewer.geocoder.viewModel.searchText != document.getElementById('fname1new').value){ //IF SEARCH AREA ON DEFAULT CESIUM HAS TEXT THEN PUT IT IN THE FNAME
			document.getElementById('fname1new').value=viewer.geocoder.viewModel.searchText;
		}
        document.getElementById("New Forest1").style.width = "100%";
		document.getElementById("New Forest1").style.display = "block";
        break;
    case "openSimSetupdeep":
        document.getElementById("simulationSetup").style.width = "auto";
		document.getElementById("simulationSetup").style.display = "block";
        break;
    case "openSimHistorydeep":
		if(simORvis=="sim"){
			document.getElementById("dateslider").style.width = "100%";
			document.getElementById("dateslider").style.display = "block";
			break;
		}
		else if(simORvis=="vis"){
			document.getElementById("visualizationControls").style.width = "auto";
			document.getElementById("visualizationControls").style.display = "block";
			break;	
		}
    case "openEditVegetationdeep":
        document.getElementById("editForestControls").style.width = "auto";
		document.getElementById("editForestControls").style.display = "block";
        break;
    case "openHotpointSimdeep":
        document.getElementById("editForestControls").style.width = "auto";
		document.getElementById("editForestControls").style.display = "block";;
        break;
    case "":
        document.getElementById("mySidenav").style.width = "auto";
		document.getElementById("mySidenav").style.display = "block";
	}
	var koukoukoukou=document.getElementById("resizable");
	koukoukoukou.style.display="block";
	console.log("EIMAI I HIDENAV kai to LASTOPENETAB:"+LASTOPENETAB);
	//LASTOPENETAB="null";
}


window.onresize = resizeMenu;
window.onload = resizeMenu;
$( document ).ready(function() {
    console.log( "ready!" );
	resizeMenu();
});

function resizeMenu(){
                var height = $(window).height() - $('.cesium-timeline-bar').height();
                console.log("pao na kano to resizable height"+height+"px");
				document.getElementById('resizable').style.height = height + 'px';
				
}



function megalesprosdokies(text){
	console.log("MPIKA STIS MEGALES PROSDOKIES!!!!!!!!!!!!!!!!!!");
	//console.log("MPIKA STIS MEGALES PROSDOKIES!!!!!!!!!!!!!!!!!! DASOS:"+text.substr(text.lastIndexOf("id=\"hiddenvalue"),4));
	var dasos=text.substr(text.indexOf("\"fooby[1][]\" value=")+19,4);
	//var dasostmp = new Array();
	//dasostmp = text.split("hiddenvalue");
	//var dasos=dasostmp[1].substr(0,dasostmp[1].indexOf("\""));
	console.log("MPIKA STIS MEGALES PROSDOKIES!!!!!!!!!!!!!!!!!!dasos"+dasos);	
	return dasos;
}

function gotofrominfobx_old(fid){
    //alert("xaxa"+fid);
viewer.dataSources.removeAll(false);	
viewer.dataSources.add(Cesium.KmlDataSource
    .load('../../db/forests/'+fid+'/behave.kml', {
        camera: viewer.camera,
        canvas: viewer.canvas
    })
)
.then( function (dataSource) {
    viewer.flyTo(dataSource.entities,{
	duration:1.0,
	maximumHeight:0,
	offset : {
            heading : 0.0,
            pitch : Cesium.Math.toRadians(-90.0),
            range : 0.0
        }
	
});
//viewer.dataSources.removeAll(false);
//svino();
});	

}

function gotofrominfobx(fid){
			var west = forests_west[fid];
			var south = forests_south[fid];
			var east = forests_east[fid];
			var north = forests_north[fid];
			console.log("i am gotofrominfobx and i clear the map from previous layers/primitives/kmls");
			//clear_form_on_fly();
			console.log("eimai i gotofrominfobx::::::::::::::::::: westreal: "+west+" southreal:"+south+" eastreal: "+east+" northreal:"+north);
			var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);
			viewer.camera.flyTo({
			destination : rectangle
			});
			viewer.entities.add({
			rectangle : {
			coordinates : rectangle,
			fill : false,
			outline : false
			}
			});
}

function infobtnoverride(fid) { gotofrominfobx(fid); }

</script>
<?php
			if(isset($_GET['visualization']))
			{
				include('include/visualization.php');
			}
			else if(isset($_GET['createForest']))
			{
				include('include/createForest.php');
			}
			else if(isset($_GET['createForest_ac']))
			{
				include('include/createForest_ac.php');
			}
			else if(isset($_GET['simulationSetup']))
			{
				include('include/simulationSetup.php');
			} 
			else if(isset($_GET['simulation']))
			{
				include('include/simulation.php');
			} 
			else if(isset($_GET['deleteSimulation']))
			{
				include('include/deleteSimulation.php');
			} 
			else if(isset($_GET['runSimulation']))
			{
				include('include/runSimulation.php');
			} 
			else if(isset($_GET['editForest']))
			{
				include('include/editForest.php');
			}
			else if(isset($_GET['archive']))
			{
				include('include/archive.php');
			} 
			else if(isset($_GET['archiveVisualization']))
			{
				include('include/archiveVisualization.php');
			} 
			else if(isset($_GET['whereVisualization']))
			{
				include('include/whereVisualization.php');
			} 
			else if(isset($_GET['homeVisualization']))
			{
				include('include/homeVisualization.php');
			} 
			else if(isset($_GET['drawForest']))
			{
				include('include/drawForest.php');
			} 
			else if(isset($_GET['getIgnitions']))
			{
				include('include/ignitionsPage.php');
			} 
			else if(isset($_GET['home']))
			{
				include('include/home.php');
			} 
			else if(isset($_GET['monitoring']))
			{
				include('include/monitoringPage.php');
			} 
			else 
			{
				include('include/homeNew.php');
			}
		?>
			
		
<!--</div>-->
</body>
</html>