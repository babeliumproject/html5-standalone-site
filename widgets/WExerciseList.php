<?php

require_once(dirname(__FILE__) . "/../util/interfaces/iWidget.php");
require_once(dirname(__FILE__) . "/../config/Config.php");
require_once("Zend/Http/Client.php");
require_once("Zend/Json.php");

class WExerciseList implements IWidget
{	
	public static function load($args)
	{
		$cfg = Config::getInstance();
		
		$widget = $args[0];
		$phpObj = $args[1];
		
		// Prepare template
		$cfg->smarty->assign("exercises", $phpObj);
		
		return $cfg->smarty->fetch($widget.".tpl");
	}
}

?>