<?php

require_once(dirname(__FILE__) . "/../Widget.php");

// Utils
require_once(dirname(__FILE__) . "/../../util/view/LevelCorrespondence.php");
require_once(dirname(__FILE__) . "/../../util/view/LocaleFlagResource.php");
require_once(dirname(__FILE__) . "/../../util/view/License.php");
require_once(dirname(__FILE__) . "/../../util/view/TimeFormatter.php");

class WVideoList extends Widget
{	
	public static function load($args)
	{
		parent::load($args);
		
		$phpObj = $args[1];
		
		// Prepare template
		self::assign("exercises", $phpObj);
		self::assign("cfg", self::$config);
		self::assign("webLocale", self::$sessionManager->getWebLanguage());
		self::assign("locale", new LocaleFlagResource());
		self::assign("level", new LevelCorrespondence());
		self::assign("license", new License());
		self::assign("time", new TimeFormatter());
		
		return self::fetch("exercises/VideoList.tpl");
	}
}

?>