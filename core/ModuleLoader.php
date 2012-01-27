<?php

require_once(dirname(__FILE__) . "/../util/interfaces/iModule.php");
require_once(dirname(__FILE__) . "/../config/Config.php");

/**
 * Available modules
 */
require_once(dirname(__FILE__) . "/../modules/M404.php");
require_once(dirname(__FILE__) . "/../modules/MAuth.php");
require_once(dirname(__FILE__) . "/../modules/MConfig.php");
require_once(dirname(__FILE__) . "/../modules/MEvaluation.php");
require_once(dirname(__FILE__) . "/../modules/MExercises.php");
require_once(dirname(__FILE__) . "/../modules/MHome.php");
require_once(dirname(__FILE__) . "/../modules/MRegister.php");

/**
 * Module loader
 */
final class ModuleLoader
{
	/* ERROR MODULE */
	const ERROR_MODULE = "404";
	
	/* AVAILABLE MODULES */
	private static $_module = array
	(
		"404" => "M404",
		"home" => "MHome",
		"auth" => "MAuth",
		"config" => "MConfig",
		"practice" => "MExercises",
		"evaluate" => "MEvaluation",
		"register" => "MRegister"
	);
	
	/* Constructor */
	private function __construct()
	{
		throw new Exception("This class cannot be instantiated");
	}

	/* loads a module */
	public static function loadModule($module)
	{
		$cfg = Config::getInstance();
		$args = func_get_args();
		
		if ( in_array("IModule", class_implements(self::$_module[$module])) )
			$r = call_user_func(self::$_module[$module] . "::load", $args);
		else
			$r = call_user_func(self::$_module[self::ERROR_MODULE] . "::load", $args);
	
		return $r;
	}
	
}

?>