<?php

require_once(dirname(__FILE__) . "/Widget.php");

require_once("Zend/Http/Client.php");
require_once("Zend/Json.php");

// Utils
require_once(dirname(__FILE__) . "/../util/view/LevelCorrespondence.php");
require_once(dirname(__FILE__) . "/../util/view/LocaleFlagResource.php");
require_once(dirname(__FILE__) . "/../util/view/License.php");

class WExerciseList extends Widget
{	
	public static function load($args)
	{
		parent::load($args);
		
		$params = $args[1];
		
		// Prepare template
		self::assign("exercises", $params);
		self::assign("locale", new LocaleFlagResource());
		self::assign("level", new LevelCorrespondence());
		self::assign("license", new License());
		
		
		return self::fetch("ExerciseList.tpl");
	}
}

?>