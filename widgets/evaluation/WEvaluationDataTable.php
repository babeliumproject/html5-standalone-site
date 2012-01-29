<?php

require_once(dirname(__FILE__) . "/../Widget.php");

// Utils
require_once(dirname(__FILE__) . "/../../util/view/LevelCorrespondence.php");
require_once(dirname(__FILE__) . "/../../util/view/LocaleFlagResource.php");

class WEvaluationDataTable extends Widget
{	
	public static function load($args)
	{
		parent::load($args);
		
		// Prepare template
		self::assign("data", $args[1]);
		self::assign("action", $args[2]);
		self::assign("cfg", self::$config);
		self::assign("webLocale", self::$sessionManager->getWebLanguage());
		self::assign("locale", new LocaleFlagResource());
		self::assign("level", new LevelCorrespondence());
		
		return self::fetch("evaluation/EvaluationDataTable.tpl");
	}
}

?>