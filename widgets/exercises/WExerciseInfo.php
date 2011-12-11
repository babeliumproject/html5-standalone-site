<?php

require_once(dirname(__FILE__) . "/../../util/interfaces/iWidget.php");
require_once(dirname(__FILE__) . "/../../config/Config.php");

// Utils
require_once(dirname(__FILE__) . "/../../util/view/LevelCorrespondence.php");
require_once(dirname(__FILE__) . "/../../util/view/LocaleFlagResource.php");
require_once(dirname(__FILE__) . "/../../util/view/License.php");
require_once(dirname(__FILE__) . "/../../util/view/TimeFormatter.php");

// API
require_once(dirname(__FILE__) . "/../../api/services/Exercise.php");
require_once(dirname(__FILE__) . "/../../api/services/Subtitle.php");

class WExerciseInfo implements IWidget
{	
	public static function load($args)
	{
		$cfg = Config::getInstance();
		
		$exercise = $args[1];
		$loggedIn = $args[2];
		
		// Retrieve locales
		$ex = new Exercise();
		$sub = new Subtitle();
		$locales = $ex->getExerciseLocales($exercise->id);
		$roles = $sub->getExerciseRoles($exercise->id);
		
		// Prepare template
		$cfg->smarty->assign("exercise", $exercise);
		$cfg->smarty->assign("roles", $roles);
		$cfg->smarty->assign("locales", $locales);
		$cfg->smarty->assign("loggedIn", $loggedIn);
		
		
		return $cfg->smarty->fetch("exercises/ExerciseInfo.tpl");
	}
}

?>