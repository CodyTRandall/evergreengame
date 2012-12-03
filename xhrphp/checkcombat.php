 <?php
 
include('../../../wocdbconnect.php');
include('../classes/character.php');
session_start();

if(isset($_SESSION['cid'])){

	$cid = $_SESSION['cid'];
	$c = new Character($cid);

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
}