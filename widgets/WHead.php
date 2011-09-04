<?php

include_once($_SERVER["DOCUMENT_ROOT"] . "/util/interfaces/iWidget.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/config/Config.php");

class WHead implements IWidget
{	
	public static function load($args)
	{
		$cfg = Config::getInstance();
		$cfg->smarty->assign("MODULE_GATEWAY", $cfg->module_bridge);
		
		return $cfg->smarty->fetch($args[0] . ".tpl");
	}
}

?>