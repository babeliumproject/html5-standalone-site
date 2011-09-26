<?php

require_once(dirname(__FILE__) . "/../../util/interfaces/iWidget.php");
require_once(dirname(__FILE__) . "/../../config/Config.php");

class WLoggedOut implements IWidget
{	
	public static function load($args)
	{
		$cfg = Config::getInstance();
		return $cfg->smarty->fetch("userManagement/UserLoggedOutNav.tpl");
	}
	
}
	
	
?>