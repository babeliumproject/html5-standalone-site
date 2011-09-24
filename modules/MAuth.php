<?php

require_once(dirname(__FILE__) . "/../util/interfaces/iModule.php");
require_once(dirname(__FILE__) . "/../config/Config.php");
require_once("SessionManager.php");

require_once("Zend/Json.php");

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
		$cfg = Config::getInstance();
		$sm = SessionManager::getInstance();
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
				$user = $sm->getVar("loggedUser");
	
				// Login object
				$phpObj = Zend_Json::decode(base64_decode($args[2]));
				$remember = $phpObj["remember"];
				
				if ( $remember )
					$sm->rememberMe();
				else
					$sm->forgetMe();
				
				$cfg->smarty->assign("user", $user);
				return $cfg->smarty->fetch("userManagement/UserLoggedInNav.tpl");
			}
			else
				return $loggedIn;
		}
		/**
		 * Process Logout
		 */
		else if ( $action == "logout" )
		{
			if ( $sm->getVar("isLoggedIn") )
			{
				$sm->expireSession();
				return $cfg->smarty->fetch("userManagement/UserLoggedOutNav.tpl");
			}
		}
		
		return false;
	}
	
	/**
	 * Process user login
	 */
	public static function processLogin($user)
	{
		$cfg = Config::getInstance();

		$client = new Zend_Http_Client();
		$client->setUri($cfg->api_bridge . "?class=Auth&method=processLogin&user=" . $user);
		$client->setConfig(array(
			"maxredirects" => 0,
			"timeout"      => 30));
			
		$phpObj = Zend_Json::decode($client->request()->getBody());
		
		$response = $phpObj["Auth"]["processLogin"];
			
		/**
		 * Escape response's relevant content
		 */
		if ( isset($response["response"]) )
			return $response["response"];
		else
		{
			// User loged in
			$sm = SessionManager::getInstance();
			$sm->setVar("loggedUser", $response);
			$sm->setVar("isLoggedIn", true);
			
			return true;
		}
	}
}

?>