<?php

include_once(dirname(__FILE__)."/../util/interfaces/iModule.php");
include_once(dirname(__FILE__)."/../config/Config.php");

class M404 implements IModule
{	
	public static function load($args)
	{
		$cfg = Config::getInstance();
		return WidgetLoader::loadWidget("404");
	}
}

?>