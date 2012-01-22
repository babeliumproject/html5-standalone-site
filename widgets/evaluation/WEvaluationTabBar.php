<?php

require_once(dirname(__FILE__) . "/../Widget.php");

class WEvaluationTabBar extends Widget
{	
	public static function load($args)
	{
		parent::load($args);
		
		// Prepare template
		self::assign("restrictedEvaluation", $args[1]);
		self::assign("isAdmin", $args[2]);
		
		return self::fetch("evaluation/EvaluationTabBar.tpl");
	}
}

?>