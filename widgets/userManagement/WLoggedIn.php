<?php

require_once(dirname(__FILE__) . "/../Widget.php");

class WLoggedIn extends Widget
{	
	public static function load($args)
	{
		parent::load($args);
		
		self::assign("user", $args[1]); // user data
		return self::fetch("userManagement/UserLoggedInNav.tpl");
	}
	
}
	
	
?>