<?php 

require_once(dirname(__FILE__) . "/../Widget.php");

class WRegister extends Widget
{	
	public static function load($args)
	{
		parent::load($args);
		
		if(isset($args[1])){
			$errors = $args[1];
			self::assign("errors", $errors);
		}
		
		return self::fetch("userManagement/RegisterForm.tpl");
	}
}

?>