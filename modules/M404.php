<?php

include_once(__DIR__."/../util/interfaces/iModule.php");
include_once(__DIR__."/../config/Config.php");
include_once(__DIR__."/../widgets/WidgetLoader.php");

class M404 implements IModule
{	
	public static function load($name)
	{
		$cfg = Config::getInstance();
		WidgetLoader::loadWidget("module404");
	}
}

?>