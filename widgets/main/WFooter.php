<?php

require_once(dirname(__FILE__) . "/../Widget.php");

class WFooter extends Widget
{	
	public static function load($args)
	{
		parent::load($args);
		
		return self::fetch("main/Footer.tpl");
	}
}

?>