<?php

require_once(dirname(__FILE__) . "/../Widget.php");

// API
require_once(dirname(__FILE__) . "/../../api/services/Home.php");

class WHomeUnsigned extends Widget
{	
	public static function load($args)
	{
		parent::load($args);
		
		$home = new Home();
		$response = $home->unsignedMessagesOfTheDay("en_US");
		
		self::assign("motds", $response);
		
		return self::fetch("home/HomeUnsigned.tpl");
	}
}

?>