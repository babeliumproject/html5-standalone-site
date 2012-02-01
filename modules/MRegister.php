<?php

require_once(dirname(__FILE__) . "/Module.php");
require_once(dirname(__FILE__) . "/../util/Convert.php");

require_once("Zend/Json.php");

// Require service classes
require_once(dirname(__FILE__) . "/../api/services/Register.php");

class MRegister extends Module
{	
	public static function load($args)
	{
		parent::load($args);
		
		// HTML content that will be returned
		$content = "";
		$loggedIn = self::$sessionManager->isLoggedIn();
		
		//Is the user is already logged in don't let him register
		if(!$loggedIn){
			if ( self::$action == "newUser" && isset(self::$params) )
			{
				$response = self::registerUser(self::$params);
				if(is_numeric($response)){
					$content = "success";
				} else {
					//Register errors found, notice the user
					//$response contains an error string that should be i18n later on
					$content = WidgetLoader::loadWidget("Register",$response);
				}
			}
			elseif ( self::$action == "activate" && isset(self::$params))
			{
				$response = self::registerUser(self::$params);
				//If $response is null the template should report the error and otherways inform of the success and redirect to home
				$content = WidgetLoader::loadWidget("Activate", $response);
			}
			else
			{
				$content = WidgetLoader::loadWidget("Register");
			}
		} else {
			// Return false or something to tell the client that it's already loggedIn and shouldn't be here
		}
	
		
		// We have an initial set of languages, one for the mother tongue and another for the language the user wants to practice.
		// Afterwards, we should be able to add and remove items dynamically.
		//$content = $content . WidgetLoader::loadWidget("RegisterLanguages");
		
		return $content;
	}
	
	private function registerUser($data){
		$register = new Register();
		$user = Convert::array_to_object(Zend_Json::decode(base64_decode($data)));
		
		//Add a dummy language set for now, until the language knowledge widgets are developed
		$languages = array();
		
		$mLang = new stdClass();
		$mLang->language = 'es_ES';
		$mLang->level = 7;
		$mLang->purpose = 'evaluate';
		
		$languages[] = $mLang;
		
		$pLang = new stdClass();
		$pLang->language = 'eu_ES';
		$pLang->level = 1;
		$pLang->purpose = 'practice';
		
		$languages[] = $pLang;
		
		$user->languages = $languages;
		//
	
		$response = $register->newUser($user);
		return $response;
	}
	
	private function activateUser($data){
		$register = new Register();
		$params = Convert::array_to_object(Zend_Json::decode(base64_decode($data)));
		$response = $register->activate($params);
		return $response;
		
	}
	
}

?>