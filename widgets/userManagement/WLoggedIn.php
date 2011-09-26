<?php

require_once(dirname(__FILE__) . "/../../util/interfaces/iWidget.php");
require_once(dirname(__FILE__) . "/../../config/Config.php");

class WLoggedIn implements IWidget
{	
	public static function load($args)
	{
		$cfg = Config::getInstance();
		$cfg->smarty->assign("user", $args[1]); // user data
		return $cfg->smarty->fetch("userManagement/UserLoggedInNav.tpl");
	}
	
}
	
	
?>