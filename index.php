<?php

/** DEBUG MODE **/
error_reporting(E_ALL);
ini_set('display_errors', "0"); // DEBUG MODE: turn to 1

/** BEGIN CODE **/
require_once("config/Config.php");
require_once("core/SessionManager.php");
require_once("util/Smarty/function.i18n.php");
require_once("core/ModuleLoader.php");
require_once("core/WidgetLoader.php");

/** Init session and config **/
$cfg = Config::getInstance();
$session = SessionManager::getInstance(); // starts session

$cfg->logger->info("Initiating index.php");

$module = (isset($_GET["module"]))? $_GET["module"] : "home";
$action = (isset($_GET["action"]))? $_GET["action"] : "";
$params = (isset($_GET["params"]))? $_GET["params"] : "";

// Load header
echo WidgetLoader::loadWidget("Head");
echo WidgetLoader::loadWidget("Nav", ucwords($module), $action, $module == "home");

// Load module
echo ModuleLoader::loadModule($module, $action, $params);

// Load footer
echo WidgetLoader::loadWidget("Footer");

$cfg->logger->info("Index.php successfully loaded");

?>
