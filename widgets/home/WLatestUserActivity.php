<?php

require_once(dirname(__FILE__) . "/../Widget.php");

// Utils
require_once(dirname(__FILE__) . "/../../util/view/TimeFormatter.php");

// API
require_once(dirname(__FILE__) . "/../../api/services/Home.php");

class WLatestUserActivity extends Widget
{	
	public static function load($args)
	{
		parent::load($args);
		
		$home = new Home();
		$received = $home->usersLatestReceivedAssessments();
		$given = $home->usersLatestGivenAssessments();
		
		// Prepare template
		self::assign("received", $received);
		self::assign("given", $given);
		self::assign("cfg", self::$config);
		self::assign("time", new TimeFormatter());
		
		return self::fetch("home/LatestUserActivity.tpl");
	}
}

?>