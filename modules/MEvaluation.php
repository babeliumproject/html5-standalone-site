<?php

require_once(dirname(__FILE__) . "/Module.php");

class MEvaluation extends Module
{	
	public static function load($args)
	{
		parent::load($args);
		
		$content = "";
		$loggedIn = self::$sessionManager->isLoggedIn();
		
		if ( !$loggedIn )
			return WidgetLoader::loadWidget("Unauthorized");
			
		$content = WidgetLoader::loadWidget("EvaluationTabBar",
							self::$config->restrictedEvaluation,
							self::$sessionManager->getUserData()->isAdmin);
		
		return $content;
	}
}

?>