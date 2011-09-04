<?php

include_once($_SERVER["DOCUMENT_ROOT"] . "/util/interfaces/iModule.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/config/Config.php");

class M404 implements IModule
{	
	public static function load($args)
	{
		$cfg = Config::getInstance();
		return WidgetLoader::loadWidget("404");
	}
}

?>