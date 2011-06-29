<?php

include_once(dirname(__FILE__)."/../util/interfaces/iWidget.php");
include_once(dirname(__FILE__)."/../config/Config.php");

class WHead implements IWidget
{	
	public static function load($args)
	{
		$cfg = Config::getInstance();
		return $cfg->smarty->fetch($args[0] . ".tpl");
	}
}

?>