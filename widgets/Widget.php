<?php

require_once(dirname(__FILE__) . "/../util/interfaces/iWidget.php");
require_once(dirname(__FILE__) . "/../config/Config.php");
require_once(dirname(__FILE__) . "/../core/SessionManager.php");

class Widget implements IWidget
{
	protected static $smarty;
	
	protected static $config;
	protected static $sessionManager;
	
	public static function load($args)
	{
		self::$config = Config::getInstance();
		self::$sessionManager = SessionManager::getInstance();
		self::$smarty = Config::getInstance()->smarty;
	}
	
	protected static function assign($name, $value)
	{
		self::$smarty->assign($name, $value);
	}
	
	protected static function fetch($tplName)
	{
		return self::$smarty->fetch(self::$sessionManager->getWebLanguage() . "/" . $tplName);
	}
}

?>