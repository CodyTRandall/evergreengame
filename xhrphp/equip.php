 <?php
 
include('../../../wocdbconnect.php');
include('../classes/character.php');
session_start();

if(isset($_SESSION['cid'])){

	$cid = $_SESSION['cid'];
	$c = new Character($cid);

	if(isset($_GET['eid'])){
		$iid = (integer) escape_data($_GET['eid']);
		
		//Make sure you have that item and decrease the amt
		$query = "SELECT amt FROM items WHERE masterid=$iid AND ownerid=$cid";
		$result = mysql_query($query);
		if($row = mysql_fetch_array($result)){
			$amt = $row[0];
			$amt--;
			if($amt == 0){
				$query = "DELETE FROM items WHERE masterid=$iid AND ownerid=$cid";
				$result = @mysql_query($query);
			}else{
				$query = "UPDATE items SET amt=$amt WHERE masterid=$iid AND ownerid=$cid";
				$result = @mysql_query($query);
			}
		}else{
			echo 'error';
			exit();
		}
		
		//Get the type of the item being equipped
		$query = "SELECT type FROM masteritems WHERE id=$iid";
		$result = mysql_query($query);
		$row = mysql_fetch_array($result);
		$type = $row[0];
		
		//Define all the types of weapons
		$types = array("head", "weapon", "chest", "weapon2", "legs", "hands", "feet", "ring1", "neck", "ring2");
		
		//Get the old equipped item
		$query = "SELECT $types[$type] FROM characters WHERE id=$cid";
		$result = mysql_query($query);
		$row = mysql_fetch_array($result);
		$olditem = $row[0];
		
		//Change the equipped item
		$query = "UPDATE characters SET $types[$type]=$iid WHERE id=$cid";
		$result = @mysql_query($query);
		
		//Decrease your stats for the item getting removed, then add new stats
		$stats = array("str", "def", "wisdom", "speed", "intel");
		for($x=0; $x<sizeof($stats); $x++){
			$query = "SELECT $stats[$x]mod FROM characters WHERE id=$cid";
			$result = mysql_query($query);
			$row = mysql_fetch_array($result);
			$stat = $row[0];
			//Decrease
			if($olditem>0){
				$query = "SELECT $stats[$x] FROM masteritems WHERE id=$olditem";
				$result = mysql_query($query);
				$row = mysql_fetch_array($result);
				$stat -= $row[0];
			}
			//Increase
			$query = "SELECT $stats[$x] FROM masteritems WHERE id=$iid";
			$result = mysql_query($query);
			$row = mysql_fetch_array($result);
			$stat += $row[0];
			//Update
			$query = "UPDATE characters SET $stats[$x]mod=$stat WHERE id=$cid";
			$result = @mysql_query($query);
		}
		
		if($olditem!=0){
			//If the old item existed, add it to the inventory
			$query = "SELECT amt FROM items WHERE masterid=$olditem AND ownerid=$cid";
			$result = mysql_query($query);
			if($row = mysql_fetch_array($result)){//If the row exists, increase the amt of the item
				$amt = $row[0];
				$amt++;
				$query = "UPDATE items SET amt=$amt WHERE masterid=$olditem AND ownerid=$cid";
				$result = @mysql_query($query);
			}else{//If it doesnt exist, add it to the items
				$query = "INSERT INTO items(masterid,ownerid,amt) VALUES($olditem,$cid,1)";
				$result = @mysql_query($query);
			}
		}
	}
}