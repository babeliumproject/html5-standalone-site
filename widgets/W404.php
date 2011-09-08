<?php

require_once(dirname(__FILE__) . "/../util/interfaces/iWidget.php");

class W404 implements IWidget
{	
	public static function load($name)
	{
		$cfg = Config::getInstance();
		return $cfg->smarty->fetch("404.tpl");
	}
}

?>