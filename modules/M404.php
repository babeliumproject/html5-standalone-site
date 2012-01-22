<?php

require_once(dirname(__FILE__) . "/Module.php");

class M404 extends Module
{	
	public static function load($args)
	{
		parent::load($args);
		
		$cfg = Config::getInstance();
		return WidgetLoader::loadWidget("404");
	}
}

?>