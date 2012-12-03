<?php

include('../../wocdbconnect.php');
include('./auth2.php');
include('./classes/character.php');

function getItemStat($stat,$id){
	$query = "SELECT $stat FROM masteritems WHERE id=$id";
	$result = mysql_query($query);
	$row = mysql_fetch_array($result);
	return $row[0];
}

//Load the script for the map data
echo '<script src="./canvas/getmapdata.js"></script>
     <script src="./jsclasses/item.js"></script>
	 <script src="./jsclasses/character.js"></script>
	 <script src="./jsclasses/mob.js"></script>';

if(isset($_SESSION['cid'])){
	$cid = $_SESSION['cid'];
	$c = new Character($cid);
	$z = $c->getStat(z);
	
	//Load the map data
	include('./mapload.php');
	
	//Initialize the map variableso
	echo '<script>changeMap("'.$data.'");';
	
	//Initialize the character variables
	echo 'var charX = '.$c->getStat(x).';
			var charY = '.$c->getStat(y).';
			var charclass = '.$c->getStat(playerclass).';
			var character = '.$c->defineJSON().';
			var items = new Array();';

	//Get the data for the location of enemies on the map
	//Create the array that holds all the monsters
	echo 'var mobs = new Array();';
	
	//Loop through the database to find all the monsters and add them to the array until no more monsters exist
	for($m=1; $m<5; $m++){
		$query = "SELECT mob$m, mob".$m."x, mob".$m."y FROM mastermap WHERE id=$z";
		$result = mysql_query($query);
		$row = mysql_fetch_array($result);
		$mobid = $row[0];
		$mobx = $row[1];
		$moby = $row[2];
		
		//No more monsters exist, break out of loop
		if($mobid == 0){
			break;
		}
	
		$query = "SELECT img,name,level FROM mastermonster WHERE id=$mobid";
		$result = mysql_query($query);
		$row = mysql_fetch_array($result);
		$testingnum = $m;
		$testingnum--;
		
		//Add to the array
		echo 'mobs['.$testingnum.'] = new Mob('.$mobid.','.$mobx.','.$moby.','.$row[0].',"'.$row[1].'",'.$row[2].');';
		
	}

	//Initialize the current itmes
	$count = 0;
	$query = "SELECT id,masterid,amt FROM items WHERE ownerid=$c->id";
	$result = mysql_query($query);
	while($row = mysql_fetch_array($result)){
		$mid = $row[id];
		$iid = $row[masterid];
		echo 'items['.$count.'] = new Item('.$mid.',-1,'.$iid.',"'.getItemStat(name,$iid).'",'.getItemStat(str,$iid).','.getItemStat(def,$iid).','.getItemStat(intel,$iid).','.getItemStat(wisdom,$iid).','.getItemStat(speed,$iid).','.getItemStat(minlvl,$iid).','.getItemStat(img,$iid).','.getItemStat(playerclass,$iid).','.getItemStat(type,$iid).','.getItemStat(attack,$iid).','.getItemStat(armor,$iid).','.getItemStat(effect,$iid).','.getItemStat(buyprice,$iid).','.$row[amt].','.getItemStat(health,$iid).','.getItemStat(mana,$iid).');';
		$count++;
	}
	$query = "SELECT head,weapon,chest,weapon2,legs,hands,feet,ring1,neck,ring2 FROM characters WHERE id=$c->id";
	$result = mysql_query($query);
	$row = mysql_fetch_array($result);
	for($x=0; $x<10; $x++){
		if($row[$x]>0){
			$iid = $row[$x];
			echo 'items['.$count.'] = new Item(0,'.$x.','.$iid.',"'.getItemStat(name,$iid).'",'.getItemStat(str,$iid).','.getItemStat(def,$iid).','.getItemStat(intel,$iid).','.getItemStat(wisdom,$iid).','.getItemStat(speed,$iid).','.getItemStat(minlvl,$iid).','.getItemStat(img,$iid).','.getItemStat(playerclass,$iid).','.getItemStat(type,$iid).','.getItemStat(attack,$iid).','.getItemStat(armor,$iid).','.getItemStat(effect,$iid).','.getItemStat(buyprice,$iid).',1,'.getItemStat(health,$iid).','.getItemStat(mana,$iid).');';
			$count++;
		}
	}

	echo '
		</script>';
}else{
	echo 'err';
	exit();
}

//Display the map
echo '<canvas id="c"></canvas>
<script src="./canvas/map.js"></script>
<script src="./canvas/equip.js"></script>
<script src="./canvas/combat.js"></script>';

?>