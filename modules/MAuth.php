<?php

require_once(dirname(__FILE__) . "/Module.php");
require_once(dirname(__FILE__) . "/../util/Convert.php");

require_once("Zend/Json.php");

// API
require_once(dirname(__FILE__) . "/../api/services/Auth.php");

class MAuth extends Module
{	
	/**
	 * Load module
	 * @param args[0] : auth
	 * @param args[1] : action {login | logout}
	 * [@param args[2] : login info {name, pass, remember}]
	 */
	public static function load($args)
	{
		parent::load($args);

		/**
		 * Process Login
		 */
		if ( self::$action == "login" && isset(self::$params) )
		{
			$loggedIn = self::processLogin(self::$params);

			if ( $loggedIn === true )
			{
				return WidgetLoader::loadWidget("LoggedIn", self::$sessionManager->getUserData());
			}
			else
				return $loggedIn;
		}
		/**
		 * Process Logout
		 */
		else if ( self::$action == "logout" )
		{
			if ( self::$sessionManager->getVar("logged") == true )
			{
				self::doLogout();
				return WidgetLoader::loadWidget("LoggedOut");
			}
		}
		
		return false;
	}
	
	/**
	 * Process user login
	 * @param user User VO
	 */
	public function processLogin($user)
	{
		$auth = new Auth();
		$response = $auth->processLogin(Convert::array_to_object(Zend_Json::decode(base64_decode($user))));
		
		/**
		 * Escape response's relevant content
		 */
		if ( !is_object($response) )
			return $response;
		else
			return true;
	}
	
	/**
	 * Logouot an user
	 */
	public function doLogout()
	{
		$auth = new Auth();
		$auth->doLogout();
	}
	
}

?>