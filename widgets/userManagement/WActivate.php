<?php 

require_once(dirname(__FILE__) . "/../Widget.php");

class WActivate extends Widget
{	
	public static function load($args)
	{
		parent::load($args);
		
		$activationlanguage = null;
		if(isset($args[1])){
			$activationlanguage = $args[1];
		}
		self::assign("activationlanguage", $activationlanguage);
		
		return self::fetch("userManagement/Activation.tpl");
	}
}

?>