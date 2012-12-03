<?php

if(isset($_GET['id'])){
	$mid = (integer) escape_data($_GET['id']);
}else{
	if(isset($z)){
		$mid = (integer) $z;
	}else{
		$mid = 1;
	}
}
$query = "SELECT tileid FROM map$mid WHERE status=99";
$result = mysql_query($query);
$row = mysql_fetch_array($result);
$data = $row[0];
$query = "SELECT tileid,x,y,status,status2 FROM map$mid WHERE status!=99";
$result = mysql_query($query);
while($row = mysql_fetch_array($result)){
	$data .= ",".$row[tileid].",".$row[x].",".$row[y].",".$row[status].",".$row[status2];
}

/*
$filename = "./maps/".$mid.".txt";
$fh = fopen($filename, 'r');
$data = fgets($fh);
fclose($fh);
*/
/*******
DB Structure
defaulttileid,tile1,x,y,status,status2,tile2,x,y,status,status2

Status is what type of tile it is, status2 is the property for that tile.

Statues:
0 - walkable
1 - not walkable
2 - teleport, status2 is coords for teleport x;y;z,
3 - town, status2 is townid
4 - mining, status2 is mineralid
*************/

?>