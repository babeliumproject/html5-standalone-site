<?php

require_once(dirname(__FILE__) . "/Widget.php");

class WUnauthorized extends Widget
{	
	public static function load($args)
	{
		parent::load($args);
		return self::fetch("Unauthorized.tpl");
	}
}

?>