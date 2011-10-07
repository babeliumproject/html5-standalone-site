<?php

require_once(dirname(__FILE__) . "/../util/interfaces/iModule.php");
require_once(dirname(__FILE__) . "/../config/Config.php");
require_once(dirname(__FILE__) . "/../core/WidgetLoader.php");
require_once(dirname(__FILE__) . "/../util/Convert.php");

// API
require_once(dirname(__FILE__) . "/../api/services/Exercise.php");

class MHome implements IModule
{	
	public static function load($args)
	{
		
		/*$client = new Zend_Http_Client();
		$client->setUri($cfg->api_bridge . "?class=Exercise&method=getExercises");
		$client->setConfig(array(
			"maxredirects" => 0,
		    "timeout"      => 30));
		
		$response = $client->request();
		
		$phpObj = Zend_Json::decode($response->getBody());*/
		
		$ex = new Exercise();
		$response = $ex->getExercises();
		
		$phpObj = $response;

		$r = WidgetLoader::loadWidget("ExerciseList", $phpObj);
		
		return $r;
	}
}

?>