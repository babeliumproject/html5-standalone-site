<?php

require_once(dirname(__FILE__) . "/../util/interfaces/iSingleton.php");
require_once(dirname(__FILE__) . "/../config/Config.php");

/**
 * Session Manager
 * @source: http://calisza.wordpress.com/2008/09/23/simple-php-wrapper-class-for-zend-session/
 */
require_once("Zend/Session.php");

class SessionManager implements ISingleton
{
	protected static $_instance;

	/* Private constructor */
	private function __construct() 
	{
		if ( session_id() == '' )
		{
			session_start(); 
		    $_SESSION['initiated'] = true;
		}

		if ( !isset($_SESSION['initiated']) )
		{
		    session_regenerate_id();
		    $_SESSION['initiated'] = true;
		} 
		
		self::setWebLanguage($_GET["locale"]);
	}

	/* Returns an unique instance */
	public static function getInstance() 
	{
		if ( !(self::$_instance instanceof self) ) 
		{
			self::$_instance = new self;
		}

		return self::$_instance;
	}

	/**
	 * Retrieve a value stored in the session
	 * return $default if $var not found in session namespace
	 * @param $var string
	 * @param $default string
	 * @return string
	 */
	public function getVar($var, $default=null)
	{
		return isset($_SESSION[$var]) ? $_SESSION[$var] : NULL;
	}

	/**
	 * Save a value to the session
	 * @param $var string
	 * @param $value
	 */
	public function setVar($var, $value)
	{
		$_SESSION[$var] = $value;
	}
	
	/**
	 * Remember an user for 7 days
	 */
	public function rememberMe()
	{
		// TODO
	}
	
	/**
	 * Forget an user at the end of the user agent session
	 */
	public function forgetMe()
	{
		// TODO
	}
	
	/**
	 * Expire the session and delete all session data
	 */
	public function expireSession()
	{
		// TODO
	}
	
	/**
	 * Is logged in
	 */
	public function isLoggedIn()
	{
		return isset($_SESSION["logged"]) && $_SESSION["logged"] === true;
	}
	
	/**
	 * Retrieve user info
	 */
	public function getUserData()
	{
		return $this->getVar("user-data");
	}
	
	/**
	 * Retrieve user language
	 */
	public function getWebLanguage()
	{
		$language = $this->getVar("web-language");
		return isset($language) ? $language : Config::getInstance()->defaultLanguage;
	}
	
	/**
	 * Set Web language
	 */
	public function setWebLanguage($locale)
	{
		if ( in_array($locale, array("en_US", "es_ES", "eu_ES", "fr_FR")) )
			$this->setVar("web-language", $locale);
	}
	
	/**
	 * For now, we disable the IP check. Many ISPs have load-balance based dynamic IPs
	 * so it could be a bother for the user.
	 * 
	 * @throws Exception
	 */
	public function avoidSessionHijacking()
	{
		// TODO
	}
}
?>
