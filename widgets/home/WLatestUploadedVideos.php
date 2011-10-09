<?php

require_once(dirname(__FILE__) . "/../../util/interfaces/iWidget.php");
require_once(dirname(__FILE__) . "/../../config/Config.php");

// API
require_once(dirname(__FILE__) . "/../../api/services/Home.php");

class WLatestUploadedVideos implements IWidget
{	
	public static function load($args)
	{
		$cfg = Config::getInstance();
		
		$home = new Home();
		$response = $home->latestAvailableVideos(); // Provisional
		
		// Prepare template
		$cfg->smarty->assign("exercises", $response);
		$cfg->smarty->assign("locale", new LocaleFlagResource());
		$cfg->smarty->assign("level", new LevelCorrespondence());
		$cfg->smarty->assign("license", new License());
		$cfg->smarty->assign("time", new TimeFormatter());
		
		return $cfg->smarty->fetch("home/LastUploadedVideos.tpl");
	}
}

?>