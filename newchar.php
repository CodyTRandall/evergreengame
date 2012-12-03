<?php

include('../../wocdbconnect.php');
include('./classes/user.php');
include('./classes/character.php');
include('./auth2.php');
	 
if(isset($_GET[id])){
	$classid = (integer) escape_data($_GET[id]);
	
	//Add 1 because the JavaScript array that is incoming starts at 0, the database starts at 1
	$classid++;
	
	$query = "SELECT id FROM masterclass";
	$result = mysql_query($query);
	$num = mysql_num_rows($result);
	
	if($classid>$num || $classid<1){
		$classid=$num;
	}
	
	$query = "SELECT name FROM masterclass WHERE id=$classid";
	$result = mysql_query($query);
	$row = mysql_fetch_array($result);
	$name = $row[0];
}

if(isset($_POST[name])){
	$name = escape_data($_POST[name]);
	$query = "SELECT id FROM characters WHERE name='$name'";
	$result = mysql_query($query);
	if($row = mysql_fetch_array($result)){
		echo $name.' is taken!<br><br>';
	}else{
		$query = "INSERT INTO characters(name,ownerfbid,playerclass) VALUES('$name',$fbid,$classid)";
		$result = @mysql_query($query);
		echo '<script>window.location.href="./index.php";</script>';
	}
}

echo '<form action="./newchar.php?id='.($classid-1).'" method="POST"><table cellspacing=5>
		<tr>
			<td>Enter a name for your '.$row[0].'</td>
			<td><input type="text" name="name"></td>
		</tr><tr>
			<td></td>
			<td><input type="submit" name="create" value="Create"></td>
		</tr></table></form>';
?>