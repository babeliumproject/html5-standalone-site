<?php

include_once("ModuleLoader.php");
include_once("Zend/Json.php");

if ( !isset($_GET["module"]) )
	die("No module");

$moduleName = $_GET["module"];

$module = array(
		"content" => ModuleLoader::loadModule($moduleName),
		"title" => $moduleName
	);

echo Zend_Json::encode($module);
	
?>