<?php

include_once(dirname(__FILE__) . "/../util/interfaces/iModule.php");
include_once(dirname(__FILE__) . "/../config/Config.php");

// Available modules
include_once("M404.php");
include_once("MHome.php");

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
				"home" => "MHome"
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