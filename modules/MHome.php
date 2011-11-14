<?php

require_once(dirname(__FILE__) . "/../util/interfaces/iModule.php");
require_once(dirname(__FILE__) . "/../config/Config.php");
require_once(dirname(__FILE__) . "/../core/WidgetLoader.php");
require_once(dirname(__FILE__) . "/../core/SessionManager.php");

class MHome implements IModule
{	
	public static function load($args)
	{
		$action = isset($args[1]) ? $args[1] : "";
		$params = isset($args[2]) ? $args[2] : "";
		$state = isset($args[3]) ? $args[3] : "";
		$content = "";

		if ( SessionManager::getInstance()->isLoggedIn() )
		{ // Logged In
			
			// Load MOTD
			if ( $state != "min" )
				$content = WidgetLoader::loadWidget("HomeSigned");
			
			// Load content
			if ( $action == "rated" )
				$content = $content . WidgetLoader::loadWidget("BestRatedVideos");
			else if ( $action == "activity" )
				$content = $content . WidgetLoader::loadWidget("LatestActivity");
			else
				$content = $content . WidgetLoader::loadWidget("LatestUploadedVideos");
		}
		else
		{ // Logged Out

			// Load MOTD
			if ( $state != "min" )
				$content = WidgetLoader::loadWidget("HomeUnsigned");
				
			$content = $content . WidgetLoader::loadWidget("StepByStep");
		}
		
		return $content;
	}
}

?>