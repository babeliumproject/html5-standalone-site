<?php

require_once(dirname(__FILE__) . "/../util/interfaces/iWidget.php");
require_once(dirname(__FILE__) . "/../config/Config.php");

/**
 * Widgets
 */
require_once(dirname(__FILE__) . "/../widgets/WExerciseList.php");
require_once(dirname(__FILE__) . "/../widgets/WNav.php");
require_once(dirname(__FILE__) . "/../widgets/WHead.php");
require_once(dirname(__FILE__) . "/../widgets/WFooter.php");
require_once(dirname(__FILE__) . "/../widgets/userManagement/WLoggedIn.php");
require_once(dirname(__FILE__) . "/../widgets/userManagement/WLoggedOut.php");
require_once(dirname(__FILE__) . "/../widgets/W404.php");

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
				"ExerciseList" => "WExerciseList",
				"Nav" => "WNav",
				"Head" => "WHead",
				"Footer" => "WFooter",
				"LoggedIn" => "WLoggedIn",
				"LoggedOut" => "WLoggedOut"
			);
	
	/* Constructor */
	private function __construct()
	{
		throw new Exception("This class cannot be instantiated");
	}
	
	/* loads a widget */
	public static function loadWidget($widget)
	{
		$cfg = Config::getInstance();
		$widgetName = $widget;
		$args = func_get_args();
		
		if ( in_array("IWidget", class_implements(self::$_widget[$widget])) )
			$r = call_user_func(self::$_widget[$widget] . "::load", $args);
		else
			$r = call_user_func(self::$_widget[self::ERROR_WIDGET] . "::load", $args);
		
		return $r;
	}
}

?>