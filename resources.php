<?php

require_once("config/Config.php");
require_once("core/SessionManager.php");
require_once("util/Smarty/function.i18n.php"); // Required to avoid error

if ( $_SERVER["QUERY_STRING"] == "babeliumjs" )
{
	/** Init session and config **/
	$cfg = Config::getInstance();
	$session = SessionManager::getInstance(); // starts session

	// Retrieve from session web language
	$language = $session->getWebLanguage();

	// Open client locale file
	$localeFile = file(dirname(__FILE__) . "/locale/$locale.client.i18n");

	if ( !isset($localeFile) || empty($localeFile) )
		die("Error loading required resource");

	$smarty = $cfg->smarty;
	$smarty->left_delimiter = "{{";
	$smarty->right_delimiter = "}}";

	foreach ( $localeFile as $line )
	{
		$line = trim($line);
		if(!empty($line) && ( strpos($line,'//') !=0 || strpos($line,'//') === FALSE ) ){
			list($name, $value) = explode("=", $line, 2);
			if ( !empty($name) && !empty($value) )
				$smarty->assign($name, trim($value));
		}
	}
			
	header("Content-type: text/javascript\n\n");

	$smarty->display("scripts/babeliumjs.tpl");
}
else if ( $_SERVER["QUERY_STRING"] == "css" )
{
	$u_agent = $_SERVER['HTTP_USER_AGENT'];
	$html5css = false;
	
	if ( preg_match('/Firefox/i', $u_agent) || preg_match('/Safari/i', $u_agent) || preg_match('/Chrome/i', $u_agent) )
            $html5css = true;
	
	header("Content-type: text/css\n\n");
	
	if ( $html5css == true )
		require_once("themes/babelium/css/main.css");
	else
		require_once("themes/babelium/css/main-nofb.css");
}
else
	die("Error: resource required");

?>
