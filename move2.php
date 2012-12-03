<?php

include('../../wocdbconnect.php');
session_start();

if(isset($_GET['d'])){
	$d = (integer) $_GET['d'];
}else{
	exit();
}
if(isset($_SESSION['cid'])){
	$cid = $_SESSION['cid'];
}else{
	exit();
}

$query = "SELECT x,y,z FROM characters WHERE id=$cid";
$result = mysql_query($query);
$row = mysql_fetch_array($result);
$x = $row[0];
$y = $row[1];
$z = $row[2];
$oz = $z;
$query = "SELECT north,east,south,west FROM mastermap WHERE id=$z";
$result = mysql_query($query);
$row = mysql_fetch_array($result);

//Up
if($d==0){
	$y--;
}
if($d==1){
	$x++;
}
if($d==2){
	$y++;
}
if($d==3){
	$x--;
}

//Check if reached the end of the map
if($x>16 && $row[east]>0){
	$x=0;
	$z = $row[east];
}
if($y>15 && $row[south]>0){
	$y=0;
	$z = $row[south];
}
if($x<0 && $row[west]>0){
	$x=16;
	$z = $row[west];
}
if($y<0 && $row[north]>0){
	$y=15;
	$z = $row[north];
}
if($z==0){
	$z = $oz;
}
//Update characters location.
$query = "UPDATE characters SET x=$x,y=$y,z=$z WHERE id=$cid";
$result = @mysql_query($query);

//Check if map changed, return 'mapchange'
if($z!=$oz){
	header( './map.php' );
	exit();
}

/**********
Old Check for combat, which checks for random battles
//Check for combat
$query = "SELECT z FROM characters WHERE id=$cid";
$result = mysql_query($query);
$row = mysql_fetch_array($result);
$z = $row[0];

$query = "SELECT mob1,mob1chance,mob2,mob2chance,mob3,mob3chance FROM mastermap WHERE id=$z";
$result = mysql_query($query);
$row = mysql_fetch_array($result);

$randnum = rand(0,100);
if($row[1] > $randnum){
	echo $row[0];
	exit();
}
$randnum = rand(0,100);
if($row[3] > $randnum && $row[2]>0){
	echo $row[2];
	exit();
}
$randnum = rand(0,100);
if($row[5] > $randnum && $row[4]>0){
	echo $row[4];
	exit();
}
***********/

//Newer Check for combat which checks for combat based on locations of monsters
//The map.js script is looking for any text to be echoed, and if it does then it takes that monsters id, assigns it to a new combat and returns that value and initiates a combat on the javascript side.
for($c=1; $c<5; $c++){
	$query = "SELECT mob$c, mob".$c."x, mob".$c."y FROM mastermap WHERE id=$z";
	$result = mysql_query($query);
	$row = mysql_fetch_array($result);
	
	//No more monsters exist, break out of loop
	if($row[0] == 0){
		break;
	}
	
	//If players location is same as the monster, initiate combat
	if($x == $row[1] && $y == $row[2]){
		//Create new combat id
		echo 'A';
	}
}
?>