<?php

require_once(dirname(__FILE__) . "/../util/interfaces/iModule.php");
require_once(dirname(__FILE__) . "/../config/Config.php");
require_once(dirname(__FILE__) . "/../core/WidgetLoader.php");
require_once(dirname(__FILE__) . "/../core/SessionManager.php");

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
		
		/*$ex = new Exercise();
		$response = $ex->getExercises();
		
		$phpObj = $response;*/
		
		$action = isset($args[1]) ? $args[1] : "";
		$content = "";

		if ( SessionManager::getInstance()->isLoggedIn() )
		{ // Logged In
			
			// Load MOTD
			$content = WidgetLoader::loadWidget("HomeSigned");
			
			// Load content
			if ( $action == "rated" )
				$content = $content . WidgetLoader::loadWidget("BestRatedVideos");
			else if ( $action == "activity" ) {}
			else
				$content = $content . WidgetLoader::loadWidget("LatestUploadedVideos");
		}
		else
		{ // Logged Out

			// Load MOTD
			$content = WidgetLoader::loadWidget("HomeUnsigned");
		}
		
		return $content;
	}
}

?>