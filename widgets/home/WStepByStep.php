<?php

require_once(dirname(__FILE__) . "/../Widget.php");

class WStepByStep extends Widget
{	
	public static function load($args)
	{
		parent::load($args);
		
		return self::fetch("home/StepByStep.tpl");
	}
}

?>