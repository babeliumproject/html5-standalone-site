<?php

require_once(dirname(__FILE__) . "/../util/interfaces/iModule.php");
require_once(dirname(__FILE__) . "/../config/Config.php");
require_once("SessionManager.php");

require_once("Zend/Json.php");

class MAuth implements IModule
{	
	/**
	 * Load module
	 */
	public static function load($args)
	{
		$cfg = Config::getInstance();
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
				$cfg->smarty->assign("username", SessionManager::getInstance()->getVar("loggedUser"));
				return $cfg->smarty->fetch("userManagement/UserLoggedInNav.tpl");
			}
			else
				return $loggedIn;
		}
		
		return false;
	}
	
	/**
	 * 
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