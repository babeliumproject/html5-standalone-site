<?php

/** DEBUG MODE **/
error_reporting(E_ALL);
ini_set('display_errors', '0'); // DEBUG MODE: turn to 1

/** BEGIN CODE **/
include_once("config/Config.php");

$cfg = Config::getInstance();
$log = $cfg->logger;
$log->info("Initiating index.php");

// Load header
echo WidgetLoader::loadWidget("Head");
echo WidgetLoader::loadWidget("Nav", $_GET["module"], $_GET["section"]);

// Loads home module
if ( isset($_GET["module"]) )
	echo ModuleLoader::loadModule($_GET["module"]);
else
	echo ModuleLoader::loadModule("home");

// Load footer
echo WidgetLoader::loadWidget("Footer");

$log->info("Index.php successfully loaded");

?>
