<?php

include_once(__DIR__."/../util/interfaces/iWidget.php");

class WExerciseList implements IWidget
{	
	public static function load($args)
	{
		$cfg = Config::getInstance();
		
		$widget = $args[0];
		$theme = $cfg->theme;

		if ( !file_exists(__DIR__."/../themes/".$theme."/templates/".$widget.".tpl") )
		{
			$cfg->logger->error("Cant load Widget ($widget) template");
			return false;
		}
		
		$client = new Zend_Http_Client();
		$client->setUri($cfg->api . "?class=Exercise&method=getExercises");
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