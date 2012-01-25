<?php

require_once(dirname(__FILE__) . "/Module.php");

/* Require API classes */

class MConfig extends Module{
	
	public static function load($args){
		
		parent::load($args);
		
		/* Instantiate API classes */
		
		/* HTML content */
		$content = "";
		
		/* Ensure the user is logged in to avoid wasting space and bandwidth with the config files */
		$loggedIn = self::$sessionManager->isLoggedIn();
		
		if ( !$loggedIn )
			return WidgetLoader::loadWidget("Unauthorized");
			
		// Load content	
		$content = WidgetLoader::loadWidget("ConfigurationTabBar");
		if ( self::$action == "webcam" )
			$content = $content . WidgetLoader::loadWidget("WebcamTester");
		else
			$content = $content . WidgetLoader::loadWidget("MicTester");	
		
		return $content;
	}
	
}

?>