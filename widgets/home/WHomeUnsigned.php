<?php

require_once(dirname(__FILE__) . "/../../util/interfaces/iWidget.php");
require_once(dirname(__FILE__) . "/../../config/Config.php");

// API
require_once(dirname(__FILE__) . "/../../api/services/Home.php");

class WHomeUnsigned implements IWidget
{	
	public static function load($args)
	{
		$cfg = Config::getInstance();
		
		$home = new Home();
		$response = $home->unsignedMessagesOfTheDay("en_US");
		
		$cfg->smarty->assign("motds", $response);
		
		return $cfg->smarty->fetch("home/HomeUnsigned.tpl");
	}
}

?>