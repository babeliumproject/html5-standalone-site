<?php

/** DEBUG MODE **/
error_reporting(E_ALL);
ini_set('display_errors', '0'); // DEBUG MODE: turn to 1

/** BEGIN CODE **/
include_once("config/Config.php");

$cfg = Config::getInstance();
$log = $cfg->logger;
$log->info("Initiating index.php");

$module = (isset($_GET["module"]))? $_GET["module"] : "home";
$section = (isset($_GET["section"]))? $_GET["section"] : "";
	
// Load header
echo WidgetLoader::loadWidget("Head");
echo WidgetLoader::loadWidget("Nav", $module, $section);

// Load module
echo ModuleLoader::loadModule("home");

// Load footer
echo WidgetLoader::loadWidget("Footer");

$log->info("Index.php successfully loaded");

?>
