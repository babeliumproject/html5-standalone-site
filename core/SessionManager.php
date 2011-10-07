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
	public $namespace = null;

	/* Private constructor */
	private function __construct() 
	{
		if ( session_id() == '' ){
			session_start(); 
		    $_SESSION['initiated'] = true;
		}
		if ( !isset($_SESSION['initiated']) ){
		    session_regenerate_id();
		    $_SESSION['initiated'] = true;
		} 
		
		/* Explicitly start the session */
		//Zend_Session::start();

		/* Create our Session namespace - using 'Default' namespace */
		//$this->namespace = new Zend_Session_Namespace();

		/** 
		 * Check that our namespace has been initialized - if not, regenerate the session id
		 * Makes Session fixation more difficult to achieve
		 */
		/*if ( !isset($this->namespace->initialized) ) 
		{
			Zend_Session::regenerateId();
			$this->namespace->initialized = true;
		}*/
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
		return (isset($this->namespace->$var)) ? $this->namespace->$var : $default;
	}

	/**
	 * Save a value to the session
	 * @param $var string
	 * @param $value
	 */
	public function setVar($var, $value)
	{
		if ( !empty($var) && !empty($value) )
		{
			$this->namespace->$var = $value;
		}
	}
	
	/**
	 * Remember an user for 7 days
	 */
	public function rememberMe()
	{
		Zend_Session::rememberMe(60*60*24*7);
	}
	
	/**
	 * Forget an user at the end of the user agent session
	 */
	public function forgetMe()
	{
		Zend_Session::forgetMe();
	}
	
	/**
	 * Expire the session and delete all session data
	 */
	public function expireSession()
	{
		Zend_Session::destroy();
		Zend_Session::expireSessionCookie();
	}
	
	/**
	 * For now, we disable the IP check. Many ISPs have load-balance based dynamic IPs
	 * so it could be a bother for the user.
	 * 
	 * @throws Exception
	 */
	public function avoidSessionHijacking()
	{
		if( $this->getVar("LoggedIn") != null && $this->getVar("uid") != null 
				&& $this->getVar("user-agent-hash") != null )
		{

			if ( $this->getVar("LoggedIn") == false || $this->getVar("uid") == 0 
					|| $this->getVar("user-agent-hash") != sha1($_SERVER['HTTP_USER_AGENT']) )		
			{
				throw new Exception("Unauthorized");
			}
		}
		else
			throw new Exception("Unauthorized");
	}
}
?>