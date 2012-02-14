<?php

require_once("config/Config.php");
require_once("core/SessionManager.php");
require_once("util/Smarty/function.i18n.php"); // Required to avoid error

if ( $_SERVER["QUERY_STRING"] != "babeliumjs" )
	die("No resource required");

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
	list($name, $value) = explode("=", $line, 2);
	
	if ( !empty($name) && !empty($value) )
		$smarty->assign($name, trim($value));
}
		
header("Content-type: text/javascript\n\n");

$smarty->display("Scripts/babeliumjs.tpl");

?>
