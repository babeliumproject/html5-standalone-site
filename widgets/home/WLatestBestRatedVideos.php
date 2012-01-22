<?php

require_once(dirname(__FILE__) . "/../Widget.php");
// Utils
require_once(dirname(__FILE__) . "/../../util/view/LevelCorrespondence.php");
require_once(dirname(__FILE__) . "/../../util/view/LocaleFlagResource.php");
require_once(dirname(__FILE__) . "/../../util/view/License.php");
require_once(dirname(__FILE__) . "/../../util/view/TimeFormatter.php");

// API
require_once(dirname(__FILE__) . "/../../api/services/Home.php");

class WLatestBestRatedVideos extends Widget
{	
	public static function load($args)
	{
		parent::load($args);
		
		$home = new Home();
		$response = $home->topScoreMostViewedVideos();
		
		// Prepare template
		self::assign("exercises", $response);
		self::assign("cfg", self::$config);
		self::assign("locale", new LocaleFlagResource());
		self::assign("level", new LevelCorrespondence());
		self::assign("license", new License());
		self::assign("time", new TimeFormatter());
		
		return self::fetch("home/LatestBestRatedVideos.tpl");
	}
}

?>