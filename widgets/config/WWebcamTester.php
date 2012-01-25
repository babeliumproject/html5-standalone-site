<?php 

require_once(dirname(__FILE__) . "/../Widget.php");

// Utils

// Services

class WWebcamTester extends Widget
{	
	public static function load($args)
	{
		parent::load($args);
		
		
		// Prepare template
		//self::assign("webLocale", self::$sessionManager->getWebLanguage());
		
		
		return self::fetch("configuration/WebcamTesterEmbed.tpl");
	}
}

?>