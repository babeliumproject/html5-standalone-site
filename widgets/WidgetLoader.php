<?php

require_once(dirname(__FILE__) . "/../util/interfaces/iWidget.php");
require_once(dirname(__FILE__) . "/../config/Config.php");

require_once("WExerciseList.php");
require_once("WNav.php");
require_once("WHead.php");
require_once("WFooter.php");

require_once("W404.php");

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
				"Footer" => "WFooter"
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
		
		//$cfg->logger->info("Widget ($widget) successfully loaded");
		
		return $r;
	}
}

?>