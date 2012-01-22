<?php

require_once(dirname(__FILE__) . "/../Widget.php");

// Utils
require_once(dirname(__FILE__) . "/../../util/view/LevelCorrespondence.php");
require_once(dirname(__FILE__) . "/../../util/view/LocaleFlagResource.php");
require_once(dirname(__FILE__) . "/../../util/view/License.php");
require_once(dirname(__FILE__) . "/../../util/view/TimeFormatter.php");

// API
require_once(dirname(__FILE__) . "/../../api/services/Exercise.php");
require_once(dirname(__FILE__) . "/../../api/services/Subtitle.php");

class WExerciseInfo extends Widget
{	
	public static function load($args)
	{
		parent::load($args);
		
		$exercise = $args[1];
		$loggedIn = $args[2];
		
		// Retrieve locales
		$ex = new Exercise();
		$sub = new Subtitle();
		$locales = $ex->getExerciseLocales($exercise->id);
		$roles = $sub->getExerciseRoles($exercise->id);
		
		// Prepare template
		self::assign("exercise", $exercise);
		self::assign("roles", $roles);
		self::assign("locales", $locales);
		self::assign("loggedIn", $loggedIn);
		
		
		return self::fetch("exercises/ExerciseInfo.tpl");
	}
}

?>