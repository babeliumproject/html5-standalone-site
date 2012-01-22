<?php

require_once(dirname(__FILE__) . "/Module.php");

class MHome extends Module
{	
	public static function load($args)
	{
		parent::load($args);

		$content = "";

		if ( self::$sessionManager->isLoggedIn() )
		{ // Logged In
			
			// Load MOTD
			if ( self::$state != "min" )
				$content = WidgetLoader::loadWidget("HomeSigned");
			
			// Load content
			if ( self::$action == "rated" )
				$content = $content . WidgetLoader::loadWidget("BestRatedVideos");
			else if ( self::$action == "activity" )
				$content = $content . WidgetLoader::loadWidget("LatestActivity");
			else
				$content = $content . WidgetLoader::loadWidget("LatestUploadedVideos");
		}
		else
		{ // Logged Out

			// Load MOTD
			if ( self::$state != "min" )
				$content = WidgetLoader::loadWidget("HomeUnsigned");
				
			$content = $content . WidgetLoader::loadWidget("StepByStep");
		}
		
		return $content;
	}
}

?>