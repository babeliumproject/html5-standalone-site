<?php

/** DEBUG MODE **/
error_reporting(E_ALL);
ini_set('display_errors', '0'); // DEBUG MODE: turn to 1

require_once(dirname(__FILE__) . "/../core/ModuleLoader.php");
require_once("Zend/Json.php");
require_once(dirname(__FILE__) . "/../core/SessionManager.php");

if ( empty($_SERVER["QUERY_STRING"]) )
	die("No module");
	
SessionManager::getInstance(); // start session

$p = $_POST;

$moduleName = $_SERVER["QUERY_STRING"];
$action = isset($p["action"]) ? $p["action"] : NULL;
$params = isset($p["params"]) ? $p["params"] : NULL;
$state = isset($p["state"]) ? $p["state"] : NULL;

$response = array(
	"content" => ModuleLoader::loadModule($moduleName, $action, $params, $state),
	"title" => $moduleName
);

echo Zend_Json::encode($response);
	
?>