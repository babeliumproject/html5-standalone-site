<?php

/** DEBUG MODE **/
error_reporting(E_ALL);
ini_set('display_errors', '0'); // DEBUG MODE: turn to 1

/** BEGIN CODE **/
require_once("config/Config.php");
require_once("modules/SessionManager.php");

/** Init session and config **/
$cfg = Config::getInstance();
$session = SessionManager::getInstance();

$cfg->logger->info("Initiating index.php");

$module = (isset($_GET["module"]))? $_GET["module"] : "home";
$section = (isset($_GET["section"]))? $_GET["section"] : "";
$state = (isset($_GET["state"]))? $_GET["state"] : "";

// Load header
echo WidgetLoader::loadWidget("Head");
echo WidgetLoader::loadWidget("Nav", $module, $section);

// Load module
echo ModuleLoader::loadModule($module, $section, $state);

// Load footer
echo WidgetLoader::loadWidget("Footer");

$cfg->logger->info("Index.php successfully loaded");

?>
