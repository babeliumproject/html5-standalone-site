<?php

require_once(dirname(__FILE__) . "/../util/interfaces/iWidget.php");

/**
 * Widgets
 */
require_once(dirname(__FILE__) . "/../widgets/config/WConfigurationTabBar.php");
require_once(dirname(__FILE__) . "/../widgets/config/WMicTester.php");
require_once(dirname(__FILE__) . "/../widgets/config/WWebcamTester.php");

require_once(dirname(__FILE__) . "/../widgets/evaluation/WEvaluationTabBar.php");
require_once(dirname(__FILE__) . "/../widgets/evaluation/WEvaluationDataTable.php");

require_once(dirname(__FILE__) . "/../widgets/exercises/WVideoList.php");
require_once(dirname(__FILE__) . "/../widgets/exercises/WExerciseInfo.php");

require_once(dirname(__FILE__) . "/../widgets/home/WHomeSigned.php");
require_once(dirname(__FILE__) . "/../widgets/home/WHomeUnsigned.php");
require_once(dirname(__FILE__) . "/../widgets/home/WLatestUploadedVideos.php");
require_once(dirname(__FILE__) . "/../widgets/home/WLatestBestRatedVideos.php");
require_once(dirname(__FILE__) . "/../widgets/home/WLatestUserActivity.php");
require_once(dirname(__FILE__) . "/../widgets/home/WStepByStep.php");

require_once(dirname(__FILE__) . "/../widgets/main/WNav.php");
require_once(dirname(__FILE__) . "/../widgets/main/WHead.php");
require_once(dirname(__FILE__) . "/../widgets/main/WFooter.php");

require_once(dirname(__FILE__) . "/../widgets/userManagement/WActivate.php");
require_once(dirname(__FILE__) . "/../widgets/userManagement/WLoggedIn.php");
require_once(dirname(__FILE__) . "/../widgets/userManagement/WLoggedOut.php");
require_once(dirname(__FILE__) . "/../widgets/userManagement/WRegister.php");

require_once(dirname(__FILE__) . "/../widgets/W404.php");
require_once(dirname(__FILE__) . "/../widgets/WUnauthorized.php");

/**
 * Widget loader
 */
final class WidgetLoader
{
	/* ERROR WIDGET */
	const ERROR_WIDGET = "404";
	
	/* AVAILABLE MODULES */
	private static $_widget = array
	(
		"404" => "W404",
		"BestRatedVideos" => "WLatestBestRatedVideos",
		"ExerciseInfo" => "WExerciseInfo",
		"Footer" => "WFooter",
		"Head" => "WHead",
		"HomeSigned" => "WHomeSigned",
		"HomeUnsigned" => "WHomeUnsigned",
		"LatestActivity" => "WLatestUserActivity",
		"LatestUploadedVideos" => "WLatestUploadedVideos",
		"LoggedIn" => "WLoggedIn",
		"LoggedOut" => "WLoggedOut",
		"Nav" => "WNav",
		"StepByStep" => "WStepByStep",
		"VideoList" => "WVideoList",
		"Unauthorized" => "WUnauthorized",
		"EvaluationTabBar" => "WEvaluationTabBar",
		"EvaluationDataTable" => "WEvaluationDataTable",
		"ConfigurationTabBar" => "WConfigurationTabBar",
		"MicTester" => "WMicTester",
		"WebcamTester" => "WWebcamTester",
		"Register" => "WRegister",
		"Activate" => "WActivate"
	);
	
	/* Constructor */
	private function __construct()
	{
		throw new Exception("This class cannot be instantiated");
	}
	
	/* loads a widget */
	public static function loadWidget($widgetName)
	{
		$cfg = Config::getInstance();
		$args = func_get_args();
		
		if ( in_array("IWidget", class_implements(self::$_widget[$widgetName])) )
			$r = call_user_func(self::$_widget[$widgetName] . "::load", $args);
		else
			$r = call_user_func(self::$_widget[self::ERROR_WIDGET] . "::load", $args);
		
		return $r;
	}
}

?>