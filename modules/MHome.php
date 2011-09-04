<?php

include_once($_SERVER["DOCUMENT_ROOT"] . "/util/interfaces/iModule.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/config/Config.php");

class MHome implements IModule
{	
	public static function load($args)
	{
		$r = WidgetLoader::loadWidget("ExerciseList");
		
		return $r;
	}
}

?>