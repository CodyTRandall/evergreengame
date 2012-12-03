<?php

class Item{
	
	function __construct($cid){
		$this->id = $cid;
		$query = "SELECT masterid FROM items WHERE id=$cid";
		$result = mysql_query($query);
		$this->mid = $row[0];
	}
	
	function getStat($stat){
		$query = "SELECT $stat FROM masteritems WHERE id=$this->mid";
		$result = mysql_query($query);
		$row = mysql_fetch_array($result);
		return $row[0];
	}
	
	function setStat($stat,$amt){
		$query = "UPDATE characters SET $stat=$amt WHERE id=$this->mid";
		$result = @mysql_query($query);
		if($result){
			return true;
		}
		return false;
	}
	
	function defineJSON(){
		$query = "SELECT name FROM masterclass WHERE id=".$this->getStat(playerclass);
		$result = mysql_query($query);
		$row = mysql_fetch_array($result);
		$cname = $row[0];
		return '';
	}
	
	function addItem(amt){
	}
}

?>