<?php

require_once(dirname(__FILE__) . "/Module.php");

// API
require_once(dirname(__FILE__) . "/../api/services/Evaluation.php");

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
		
		/**
		 * SWITCH ACTION
		 */
		if ( self::$action == "touser" )
		{
			$evaluation = new Evaluation();
			$response = $evaluation->getResponsesAssessedToCurrentUser();
		}
		else if	( self::$action == "byuser" )
		{
			$evaluation = new Evaluation();
			$response = $evaluation->getResponsesAssessedByCurrentUser();
		}
		else
		{
			$evaluation = new Evaluation();
			$response = $evaluation->getResponsesWaitingAssessment();
		}
		
		/**
		 * IF ANY, SHOW ASSESMENTS
		 */
		if ( isset($response) )
			$content .= WidgetLoader::loadWidget("EvaluationDataTable", $response, self::$action);
		
		return $content;
	}
}

?>