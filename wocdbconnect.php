<?php
$host="mysql.rnrdev.com";
$user=rnrdev;
$password="dbgt1234";
$dbc= mysql_connect($host, $user, $password) OR die('No connect');
@mysql_select_db (evergreengame) OR die('No DB');

function escape_data($data){
  global $dbc;
  if(ini_get('magic_quotes_gpc')){
    $data=stripslashes($data);
  }
  $data=htmlspecialchars($data);
  return mysql_real_escape_string(trim($data), $dbc);
}
?>