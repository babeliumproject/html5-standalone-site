<?php

require_once(dirname(__FILE__) . "/../util/interfaces/iModule.php");
require_once(dirname(__FILE__) . "/../config/Config.php");
require_once(dirname(__FILE__) . "/../core/WidgetLoader.php");
require_once(dirname(__FILE__) . "/../core/SessionManager.php");

abstract class Module implements IModule
{
	protected static $action;
	protected static $params;
	protected static $state;
	
	protected static $config;
	protected static $sessionManager;
	
	public static function load($args)
	{
		self::$action = isset($args[1]) ? $args[1] : NULL;
		self::$params = isset($args[2]) ? $args[2] : NULL;
		self::$state  = isset($args[3]) ? $args[3] : NULL;
		
		self::$config = Config::getInstance();
		self::$sessionManager = SessionManager::getInstance();
	}
}

?>