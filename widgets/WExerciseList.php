<?php

require_once(dirname(__FILE__) . "/../util/interfaces/iWidget.php");
require_once(dirname(__FILE__) . "/../config/Config.php");
require_once("Zend/Http/Client.php");
require_once("Zend/Json.php");

// Utils
require_once(dirname(__FILE__) . "/../util/view/LevelCorrespondence.php");
require_once(dirname(__FILE__) . "/../util/view/LocaleFlagResource.php");
require_once(dirname(__FILE__) . "/../util/view/License.php");
require_once(dirname(__FILE__) . "/../util/view/TimeFormatter.php");

class WExerciseList implements IWidget
{	
	public static function load($args)
	{
		$cfg = Config::getInstance();
		
		$widget = $args[0];
		$phpObj = $args[1];
		
		// Prepare template
		$cfg->smarty->assign("exercises", $phpObj);
		$cfg->smarty->assign("locale", new LocaleFlagResource());
		$cfg->smarty->assign("level", new LevelCorrespondence());
		$cfg->smarty->assign("license", new License());
		$cfg->smarty->assign("time", new TimeFormatter());
		
		return $cfg->smarty->fetch("exercises/VideoList.tpl");
	}
}

?>