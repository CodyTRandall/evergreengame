<?php
session_start();

if(isset($_SESSION['fbid'])){
	$fbid = $_SESSION['fbid'];
}else{
	echo 'Sorry, your session has timed out. Please re authorize.<script> window.location.href="./index.php";</script>';
}

?>