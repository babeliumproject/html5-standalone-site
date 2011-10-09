<?php

require_once(dirname(__FILE__) . "/../util/interfaces/iModule.php");
require_once(dirname(__FILE__) . "/../config/Config.php");
require_once(dirname(__FILE__) . "/../core/WidgetLoader.php");
require_once(dirname(__FILE__) . "/../core/SessionManager.php");
require_once(dirname(__FILE__) . "/../util/Convert.php");

// API
require_once(dirname(__FILE__) . "/../api/services/Exercise.php");

class MExercises implements IModule
{	
	public static function load($args)
	{
		$ex = new Exercise();
		$response = $ex->getExercises();
		
		return WidgetLoader::loadWidget("VideoList", $response);
	}
	
}