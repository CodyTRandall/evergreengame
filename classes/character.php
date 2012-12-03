<?php

class Character{
	
	function __construct($cid){
		$this->id = $cid;
	}
	
	function getStat($stat){
		$query = "SELECT $stat FROM characters WHERE id=$this->id";
		$result = mysql_query($query);
		$row = mysql_fetch_array($result);
		return $row[0];
	}
	
	function setStat($stat,$amt){
		$query = "UPDATE characters SET $stat=$amt WHERE id=$this->id";
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
		return 'new Character('.$this->id.',"'.$this->getStat(name).'",'.$this->getStat(playerclass).','.$this->getStat(xp).','.$this->getStat(level).','.$this->getStat(gold).','.$this->getStat(health).','.$this->getStat(maxhealth).','.$this->getStat(mana).','.$this->getStat(maxmana).','.$this->getStat(str).','.$this->getStat(def).','.$this->getStat(wisdom).','.$this->getStat(speed).','.$this->getStat(intel).','.$this->getStat(strmod).','.$this->getStat(defmod).','.$this->getStat(wisdommod).','.$this->getStat(speedmod).','.$this->getStat(intelmod).','.$this->getStat(x).','.$this->getStat(y).','.$this->getStat(z).',"'.$cname.'",'.$this->getStat(maxitems).','.$this->getStat(weapon).','.$this->getStat(weapon2).','.$this->getStat(head).','.$this->getStat(chest).','.$this->getStat(legs).','.$this->getStat(feet).','.$this->getStat(hands).','.$this->getStat(neck).','.$this->getStat(ring1).','.$this->getStat(ring2).');';
	}
}

?>