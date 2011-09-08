<?php

require_once(dirname(__FILE__) . "/../util/interfaces/iModule.php");
require_once(dirname(__FILE__) . "/../config/Config.php");

class MHome implements IModule
{	
	public static function load($args)
	{
		$r = WidgetLoader::loadWidget("ExerciseList");
		
		return $r;
	}
}

?>