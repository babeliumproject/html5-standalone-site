<?php

include_once(__DIR__."/../util/interfaces/iWidget.php");

class WHead implements IWidget
{	
	public static function load($args)
	{
		$cfg = Config::getInstance();
		return $cfg->smarty->fetch($args[0] . ".tpl");
	}
}

?>