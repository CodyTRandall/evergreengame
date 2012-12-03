<?php

class User{

	function __construct($uid){
		$this->id = $uid;
	}

	function getStat($stat){
		$query = "SELECT $stat FROM users WHERE id=$this->id";
		$result = mysql_query($query);
		$row = mysql_fetch_array($result);
		return $row[0];
	}
	
	function setStat($stat,$amt){
		$query = "UPDATE users SET $stat=$amt WHERE id=$this->id";
		$result = @mysql_query($query);
		if($result){
			return true;
		}
		return false;
	}
}

?>