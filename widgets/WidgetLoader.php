<?php

include_once(__DIR__."/../util/interfaces/iWidget.php");

include_once("WExerciseList.php");
include_once("WNav.php");
include_once("WHead.php");
include_once("WFooter.php");

include_once("W404.php");

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
		
		if ( in_array("IWidget", class_implements(self::$_widget[$widget])) )
			$r = call_user_func(self::$_widget[$widget] . "::load", func_get_args());
		else
			$r = call_user_func(self::$_widget[self::ERROR_WIDGET] . "::load", func_get_args());
		
		$cfg->logger->info("Widget ($widget) successfully loaded");
		
		return $r;
	}
}

?>