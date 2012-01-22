<?php

require_once(dirname(__FILE__) . "/../Widget.php");

class WHead extends Widget
{	
	public static function load($args)
	{
		parent::load($args);
		
		self::assign("MODULE_GATEWAY", self::$config->module_bridge);		
		return self::fetch("main/Head.tpl");
	}
}

?>