<?php

require_once(dirname(__FILE__) . "/../../util/interfaces/iWidget.php");
require_once(dirname(__FILE__) . "/../../config/Config.php");

// Utils
require_once(dirname(__FILE__) . "/../../util/view/TimeFormatter.php");

// API
require_once(dirname(__FILE__) . "/../../api/services/Home.php");

class WLatestUserActivity implements IWidget
{	
	public static function load($args)
	{
		$cfg = Config::getInstance();
		
		$home = new Home();
		$received = $home->usersLatestReceivedAssessments();
		$given = $home->usersLatestGivenAssessments();
		
		// Prepare template
		$cfg->smarty->assign("received", $received);
		$cfg->smarty->assign("given", $given);
		$cfg->smarty->assign("cfg", $cfg);
		$cfg->smarty->assign("time", new TimeFormatter());
		
		return $cfg->smarty->fetch("home/LatestUserActivity.tpl");
	}
}

?>