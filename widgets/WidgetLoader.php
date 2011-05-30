<?php

include_once(__DIR__."/../config/Config.php");

final class WidgetLoader
{
	/* Constructor */
	private function __construct()
	{
		throw new Exception("This class cannot be instantiated");
	}
	
	/* loads widget */
	public static function loadWidget($widget)
	{
		if ( !self::widgetAvailable($widget) )
			return false;
		
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
		$cfg = Config::getInstance();
		
		$cfg->logger->info("Checking widget ($widget) availabillity");
		
		// Try to load widget xml file
		try{
			$xml = simplexml_load_file(strval($cfg->widgetDescFile));
		} catch (Exception $e){}
		
		if ( !isset($xml->$widget) )
		{
			$cfg->logger->warn("Widget ($widget) is not available");
			return false;
		}

		$cfg->logger->info("Widget ($widget) is available");
		return true;
	}
}

?>