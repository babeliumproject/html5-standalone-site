<?php

require_once(dirname(__FILE__) . "/../util/interfaces/iModule.php");
require_once(dirname(__FILE__) . "/../config/Config.php");
require_once(dirname(__FILE__) . "/../core/WidgetLoader.php");
require_once(dirname(__FILE__) . "/../core/SessionManager.php");
require_once(dirname(__FILE__) . "/../util/Convert.php");

require_once("Zend/Json.php");

// API
require_once(dirname(__FILE__) . "/../api/services/Auth.php");

class MAuth implements IModule
{	
	/**
	 * Load module
	 * @param args[0] : auth
	 * @param args[1] : action {login | logout}
	 * [@param args[2] : login info {name, pass, remember}]
	 */
	public static function load($args)
	{
		$action = "";
		
		if ( isset($args[1]) )
			$action = $args[1];
		
		/**
		 * Process Login
		 */
		if ( $action == "login" && isset($args[2]) )
		{
			$loggedIn = self::processLogin($args[2]);

			if ( $loggedIn === true )
			{
				return WidgetLoader::loadWidget("LoggedIn", $_SESSION["user-data"]);
			}
			else
				return $loggedIn;
		}
		/**
		 * Process Logout
		 */
		else if ( $action == "logout" )
		{
			if ( isset($_SESSION["logged"]) && $_SESSION["logged"] == true )
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
		$cfg = Config::getInstance();

		/*$client = new Zend_Http_Client();
		$client->setUri($cfg->api_bridge . "?class=Auth&method=processLogin&user=" . $user);
		$client->setConfig(array(
			"maxredirects" => 0,
			"timeout"      => 30));
			
		$phpObj = Zend_Json::decode($client->request()->getBody());
		
		$response = $phpObj["Auth"]["processLogin"];*/
		
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