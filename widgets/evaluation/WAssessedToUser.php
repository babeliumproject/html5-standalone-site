<?php

require_once(dirname(__FILE__) . "/../Widget.php");

class WAssessedToUser extends Widget
{	
	public static function load($args)
	{
		parent::load($args);
		
		// Prepare template
		self::assign("evaluations", $args[1]);
		self::assign("response", $args[2]);
		self::assign("userNames", $args[3]);
		return self::fetch("evaluation/DetailsAssessedToUser.tpl");
	}
}

?>