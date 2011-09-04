<?php

include_once($_SERVER["DOCUMENT_ROOT"] . "/util/interfaces/iWidget.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/config/Config.php");
include_once("Zend/Http/Client.php");
include_once("Zend/Json.php");

class WExerciseList implements IWidget
{	
	public static function load($args)
	{
		$cfg = Config::getInstance();
		
		$widget = $args[0];
		$theme = $cfg->theme;

		if ( !file_exists($_SERVER["DOCUMENT_ROOT"] . "/themes/".$theme."/templates/".$widget.".tpl") )
		{
			//$cfg->logger->error("Cant load Widget ($widget) template");
			return false;
		}
		
		$client = new Zend_Http_Client();
		$client->setUri($cfg->api_bridge . "?class=Exercise&method=getExercises");
		$client->setConfig(array(
			"maxredirects" => 0,
		    "timeout"      => 30));
		
		$response = $client->request();
		
		$phpObj = Zend_Json::decode($response->getBody());
		
		// Prepare template
		$cfg->smarty->assign("exercises", $phpObj['Exercise']['getExercises']);
		
		return $cfg->smarty->fetch($widget.".tpl");
	}
}

?>