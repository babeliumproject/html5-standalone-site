<?php

/** DEBUG MODE **/
error_reporting(E_ALL);
ini_set('display_errors', '0');

/** BEGIN CODE **/
include_once("config/Config.php");
include_once("widgets/WidgetLoader.php");

$cfg = Config::getInstance();
$log = $cfg->logger;
$log->info("Initiating index.php");

WidgetLoader::loadWidget("layout");

$log->info("Index.php successfully served");

?>
