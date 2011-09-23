<?php

/** DEBUG MODE **/
error_reporting(E_ALL);
ini_set('display_errors', '1'); // DEBUG MODE: turn to 1

require_once("ModuleLoader.php");
require_once("Zend/Json.php");

if ( !isset($_GET["module"]) )
	die("No module");

$moduleName = $_GET["module"];
$action = $_GET["action"];
$params = $_GET["params"];

$module = array(
		"content" => ModuleLoader::loadModule($moduleName, $action, $params),
		"title" => $moduleName
	);

echo Zend_Json::encode($module);
	
?>