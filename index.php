<?php

include('../../wocdbconnect.php');
include('./classes/user.php');
include('./auth.php');
include('./classes/character.php');

//Get all of the characters the user has
$count = 0;
$query = "SELECT id FROM characters WHERE ownerfbid=$fbid";
$result = mysql_query($query);
while($row = mysql_fetch_array($result)){
	$chars[$count] = new Character($row[id]);
	$count++;
}
/**************
START JAVASCRIPT VARIABLE DEFINITION
****************/
echo '<script src="./jsclasses/character.js"></script>
	<script>
	var characters = new Array(),total = 2;
	var classlist = new Array();
	function classobject(name,desc1,desc2){
		this.name = name;
		this.desc1 = desc1;
		this.desc2 = desc2;
		this.active = false;
	}';
	
//Print JSON objects for each character to display
for($x=0; $x<2; $x++){
	if(!empty($chars[$x])){
		echo 'characters['.$x.'] = '.$chars[$x]->defineJSON();
	}
}

$count = 0;
$query = "SELECT name, desc1,desc2 FROM masterclass";
$result = mysql_query($query);
while($row = mysql_fetch_array($result)){
	echo 'classlist['.$count.'] = new classobject("'.$row[name].'","'.$row[desc1].'","'.$row[desc2].'");';
	$count++;
}

//Print each classlist object
echo '</script><br><br><canvas id="c"></canvas></script><script src="./canvas/characterselect.js"></script>';


 ?>