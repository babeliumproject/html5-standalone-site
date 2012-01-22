<?php

require_once(dirname(__FILE__) . "/../Widget.php");

class WNav extends Widget
{	
	public static function load($args)
	{
		parent::load($args);
			
		self::assign("user", self::$sessionManager->getUserData());
		self::assign("isLoggedIn", self::$sessionManager->isLoggedIn());
		self::assign("moduleTitle", $args[1]);
		self::assign("sectionTitle", $args[2]);
		self::assign("hideHeader", $args[3]);
		return self::fetch("main/Navigation.tpl");
	}
}

?>