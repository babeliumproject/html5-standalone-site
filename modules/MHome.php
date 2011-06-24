<?php

include_once(__DIR__."/../util/interfaces/iModule.php");
include_once(__DIR__."/../config/Config.php");
include_once("Zend/Http/Client.php");
include_once("Zend/Json.php");

class MHome implements IModule
{	
	public static function load($name)
	{
		$r = WidgetLoader::loadWidget("ExerciseList");
		
		return $r;
	}
}

?>