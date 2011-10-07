<?php

/** DEBUG MODE **/
error_reporting(E_ALL);
ini_set('display_errors', '0'); // DEBUG MODE: turn to 1

require_once(dirname(__FILE__) . "/../core/ModuleLoader.php");
require_once("Zend/Json.php");
require_once(dirname(__FILE__) . "/../core/SessionManager.php");

if ( !isset($_GET["module"]) )
	die("No module");
	
SessionManager::getInstance(); // start session

$moduleName = $_GET["module"];
$action = $_GET["action"];
$params = $_GET["params"];

$module = array(
		"content" => ModuleLoader::loadModule($moduleName, $action, $params),
		"title" => $moduleName
	);

echo Zend_Json::encode($module);
	
?>