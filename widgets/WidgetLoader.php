<?php

include_once(__DIR__."/../config/Config.php");

/**
 * Widget loader
 */
final class WidgetLoader
{
	const ERROR_WIDGET = "404";
	
	/* Constructor */
	private function __construct()
	{
		throw new Exception("This class cannot be instantiated");
	}
	
	/* loads a widget */
	public static function loadWidget($widget)
	{
		if ( !self::widgetAvailable($widget) )
			$widget = self::ERROR_WIDGET;
		
		$cfg = Config::getInstance();
		
		$theme = $cfg->theme;
		
		if ( !file_exists("themes/".$theme."/templates/".$widget.".tpl") )
		{
			$cfg->logger->error("Cant load Widget ($widget) template");
			return false;
		}
		
		$cfg->smarty->display($widget.".tpl");
		
		$cfg->logger->info("Widget ($widget) successfully loaded");
	}
	
	/* checks if a widget is available */
	private static function widgetAvailable($widget)
	{
		return ( $widget == "home" || $widget == "head" || $widget == "nav"
		 			|| $widget == "footer" || $widget == "module404" );
	}
}

?>