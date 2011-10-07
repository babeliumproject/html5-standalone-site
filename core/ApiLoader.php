<?php

require_once(dirname(__FILE__) . "/../util/interfaces/iSingleton.php");
require_once(dirname(__FILE__) . "/../config/Config.php");

require_once("SessionManager.php");
require_once("Zend/Rest/Client.php");

class ApiLoader implements ISingleton
{
	protected static $_instance;
	private $sm;

	/* Private constructor */
	private function __construct() 
	{
		$this->sm = SessionManager::getInstance();
		
		if ( $this->sm->getVar("commToken") == null )
		{
			$this->requestCommunicationToken();
		}
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
	 * Request a communication Token
	 */
	private function requestCommunicationToken()
	{
		$cfg = Config::getInstance();
		
		// Init HTTP Client
		/*$client = new Zend_Http_Client();

		$client->setUri($cfg->api_bridge . "?getCommunicationToken");

		// POST PARAMETERS
		$data = array(
			'method' => 'getCommunicationToken',
			'header' => array(
				'session' => session_id(),
				'uuid' => uniqid(),
				'secretKey' => md5(session_id())
			)
		);
		
		$client->setParameterPost($data);
		
		// CALL
		$response = $client->request(Zend_Http_Client::POST);
		
		die($response->getBody());*/
		
		// POST PARAMS
		$uuid = uniqid();
		$session_id = session_id();
		$md5 = md5($session_id);
		
		// INIT CURL
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $cfg->api_bridge . "?getCommunicationToken");
		curl_setopt($ch, CURLOPT_POSTFIELDS, "header[uuid]=$uuid&header[session]=$session_id&parameters[secretKey]=$md5&method=getCommunicationToken");
		curl_setopt($ch, CURLOPT_TIMEOUT, 3);
		
		$headers = getallheaders();
		
		$aux = array();
		
		foreach ( $headers as $k=>$v )
			$aux[] = "$k: $v";
		
		curl_setopt($ch, CURLOPT_HTTPHEADER, $aux);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		curl_setopt($ch, CURLINFO_HEADER_OUT, TRUE);
		
		$response = curl_exec($ch);

		$header = curl_getinfo($ch, CURLINFO_HEADER_OUT);
		
		die($header . "\n\n\n" . $response);
		
		curl_close($ch);
		
		//$phpObj = Zend_Json::decode($response);
	}
}
?>
