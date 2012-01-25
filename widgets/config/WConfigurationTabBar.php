<?php

require_once(dirname(__FILE__) . "/../Widget.php");

class WConfigurationTabBar extends Widget
{
	public static function load($args)
	{
		parent::load($args);

		// Prepare template

		return self::fetch("configuration/ConfigurationTabBar.tpl");
	}
}

?>