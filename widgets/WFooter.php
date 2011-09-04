<?php

include_once($_SERVER["DOCUMENT_ROOT"] . "/util/interfaces/iWidget.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/config/Config.php");

class WFooter implements IWidget
{	
	public static function load($args)
	{
		$cfg = Config::getInstance();
		return $cfg->smarty->fetch($args[0] . ".tpl");
	}
}

?>