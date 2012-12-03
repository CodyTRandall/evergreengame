<? 
   include('./facebook-php-sdk/src/facebook.php');
   $app_id = "195625413855078";
   $app_secret = "ed867f0584331ab727853b207b1688b9";
   $my_url = "http://apps.facebook.com/thewocrpg/";

	if(isset($_GET['error_reason'])){
		echo $_GET['error_reason'];
		exit();
	}
   session_start();
   $code = $_REQUEST["code"];

	if(empty($code)) {
		$_SESSION['state'] = md5(uniqid(rand(), TRUE)); //CSRF protection
		$dialog_url = "https://www.facebook.com/dialog/oauth?client_id=" 
		. $app_id . "&redirect_uri=" . urlencode($my_url) . "&state="
		. $_SESSION['state'];

		echo("<script> top.location.href='" . $dialog_url . "'</script>");
	}

   if($_REQUEST['state'] == $_SESSION['state']) {
     $token_url = "https://graph.facebook.com/oauth/access_token?"
       . "client_id=" . $app_id . "&redirect_uri=" . urlencode($my_url)
       . "&client_secret=" . $app_secret . "&code=" . $code;

     $response = @file_get_contents($token_url);
     $params = null;
     parse_str($response, $params);

     $graph_url = "https://graph.facebook.com/me?access_token=" 
       . $params['access_token'];

     $user = json_decode(file_get_contents($graph_url));
	 $fbid = $user->id;
	 $_SESSION['fbid'] = $fbid;
	 
	 //Check if the user has ever logged in before
	 $query = "SELECT id FROM users WHERE fbid=$fbid";
	 $result = mysql_query($query);
	 if($row = mysql_fetch_array($result)){
		//Exists
		$account = new User($row[0]);
	 }else{
		//Does not exist so create an account
		$query = "INSERT INTO users(fbid) VALUES ($fbid)";
		$result = mysql_query($query);
	 }
   }
   else {
     echo("Loading...");
	 exit();
   }
 ?>