<?php

require_once(dirname(__FILE__) . "/../Widget.php");

class WLoggedOut extends Widget
{	
	public static function load($args)
	{
		parent::load($args);
		
		return self::fetch("userManagement/UserLoggedOutNav.tpl");
	}
	
}
	
	
?>