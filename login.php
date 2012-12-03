<?php

include('../../wocdbconnect.php');
include('./auth2.php');

if(isset($_GET['id'])){
	$cid = (integer) escape_data($_GET['id']);
	$_SESSION['cid'] = $cid;
	echo '<script> window.location.href="./map.php";</script>'; 
}else{
	echo 'Error.';
	exit();
}

?>