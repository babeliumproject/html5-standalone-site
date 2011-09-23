<?php

require_once(dirname(__FILE__) . "/../util/interfaces/iWidget.php");
require_once(dirname(__FILE__) . "/../config/Config.php");

require_once(dirname(__FILE__) . "/../modules/SessionManager.php");

class WNav implements IWidget
{	
	public static function load($args)
	{
		$cfg = Config::getInstance();
		
		$cfg->smarty->assign("user", SessionManager::getInstance()->getVar("loggedUser"));
		$cfg->smarty->assign("isLoggedIn", SessionManager::getInstance()->getVar("isLoggedIn"));
		$cfg->smarty->assign("moduleTitle", $args[1]);
		$cfg->smarty->assign("sectionTitle", $args[2]);
		return $cfg->smarty->fetch($args[0] . ".tpl");
	}
}

?>