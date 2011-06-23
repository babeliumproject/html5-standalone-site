<?php

/** DEBUG MODE **/
error_reporting(E_ALL);
ini_set('display_errors', '0'); // DEBUG MODE: turn to 1

/** BEGIN CODE **/
include_once("config/Config.php");
include_once("modules/ModuleLoader.php");

$cfg = Config::getInstance();
$log = $cfg->logger;
$log->info("Initiating index.php");

WidgetLoader::loadWidget("head");
$cfg->smarty->assign("moduleTitle", $_GET["module"]);
$cfg->smarty->assign("sectionTitle", $_GET["section"]);
WidgetLoader::loadWidget("nav");

// Loads home module
ModuleLoader::loadModule("home");

// Load footer
WidgetLoader::loadWidget("footer");

$log->info("Index.php successfully served");

?>
