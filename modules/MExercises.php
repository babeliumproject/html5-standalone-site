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
		$action = isset($args[1]) ? $args[1] : "";
		$params = isset($args[2]) ? $args[2] : "";
		$videoInfo = split(";", $params); // id, name, title
		$state = isset($args[3]) ? $args[3] : "";
		$content = "";
		$loggedIn = SessionManager::getInstance()->isLoggedIn();
		
		// Obtain video information
		if ( $action == "view" && count($videoInfo) == 2 )
		{
			// params should be video id or name as long as name is still unique
			$response = $ex->getExerciseByName($videoInfo[1]);
			
			if ( isset($response) )
				$content = WidgetLoader::loadWidget("ExerciseInfo", $response, $loggedIn);
		}
		
		/*
		 * Obtain video list
		 * if state == min then return only video information
		 */
		if ( $state != "min" )
		{
			if ( $loggedIn )
			{ // Logged In
				$response = $ex->getRecordableExercises();
			}
			else
			{ // Logout
				$response = $ex->getExercises();
			}
				
			$content .= WidgetLoader::loadWidget("VideoList", $response);
		}
		
		return $content;
	}
	
}