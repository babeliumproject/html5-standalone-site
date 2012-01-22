<?php

require_once(dirname(__FILE__) . "/Module.php");

// API
require_once(dirname(__FILE__) . "/../api/services/Exercise.php");

class MExercises extends Module
{	
	public static function load($args)
	{
		parent::load($args);
		
		$ex = new Exercise();
		$content = "";
		$loggedIn = self::$sessionManager->isLoggedIn();
		
		// Obtain video information
		if ( self::$action == "view" )
		{
			// params should be video id or name as long as name is still unique
			$response = $ex->getExerciseByName(self::$params);
			
			if ( isset($response) )
				$content = WidgetLoader::loadWidget("ExerciseInfo", $response, $loggedIn);
		}
		
		/*
		 * Obtain video list
		 * if state == min then return only video information
		 */
		if ( self::$state != "min" )
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

?>