<?php 

require_once(dirname(__FILE__) . "/../Widget.php");

class WRegister extends Widget
{	
	public static function load($args)
	{
		parent::load($args);
		
		$errors = null;
		$success = null;
		if(isset($args[1]))
			$errors = $args[1];
		if(isset($args[2]))
			$success = $args[2];
		
		self::assign("errors", $errors);
		self::assign("success", $success);
		
		return self::fetch("userManagement/RegisterForm.tpl");
	}
}

?>