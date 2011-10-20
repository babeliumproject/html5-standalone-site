<?php

require_once(dirname(__FILE__) . "/../../util/interfaces/iWidget.php");
require_once(dirname(__FILE__) . "/../../config/Config.php");

// Utils
require_once(dirname(__FILE__) . "/../../util/view/LevelCorrespondence.php");
require_once(dirname(__FILE__) . "/../../util/view/LocaleFlagResource.php");
require_once(dirname(__FILE__) . "/../../util/view/License.php");
require_once(dirname(__FILE__) . "/../../util/view/TimeFormatter.php");

// API
require_once(dirname(__FILE__) . "/../../api/services/Home.php");

class WLatestBestRatedVideos implements IWidget
{	
	public static function load($args)
	{
		$cfg = Config::getInstance();
		
		$home = new Home();
		$response = $home->topScoreMostViewedVideos();
		
		// Prepare template
		$cfg->smarty->assign("exercises", $response);
		$cfg->smarty->assign("cfg", $cfg);
		$cfg->smarty->assign("locale", new LocaleFlagResource());
		$cfg->smarty->assign("level", new LevelCorrespondence());
		$cfg->smarty->assign("license", new License());
		$cfg->smarty->assign("time", new TimeFormatter());
		
		return $cfg->smarty->fetch("home/LatestBestRatedVideos.tpl");
	}
}

?>