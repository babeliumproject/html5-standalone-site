<?php

/**
 * Babelium Project open source collaborative second language oral practice - http://www.babeliumproject.com
 *
 * Copyright (c) 2011 GHyM and by respective authors (see below).
 *
 * This file is part of Babelium Project.
 *
 * Babelium Project is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Babelium Project is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

require_once 'Zend/Rest/Server.php';
require_once 'Zend/Json.php';
/**
 * A customized version of Zend's Rest Server class that allows to receive base64 encoded json parameters
 * and return json and xml responses
 *
 * @author Babelium Team
 *
 */
class ZendRestJson extends Zend_Rest_Server
{

	protected $_faultResult = false;

	/**
	 * Constructor
	 */
	public function __construct()
	{
		parent::__construct();
		
		if(session_id() == ''){
			session_start();
			$_SESSION['initiated'] = true;
		}
		//Avoid session fixation
		if (!isset($_SESSION['initiated'])){
			session_regenerate_id();
			$_SESSION['initiated'] = true;
		}
	}

	/**
	 * Implement Zend_Server_Interface::handle()
	 *
	 * @param  array $request
	 * @throws Zend_Rest_Server_Exception
	 * @return string|void
	 */
	public function handle($request = false)
	{
		$this->_headers = array('Content-Type: application/json');	
		if (!$request) {
			$request = $_REQUEST;
		}

		//We can sanitize $_GET and $_POST before using their contents or let each method deal with its parameters' cleanliness.

		$g = array();
		$p = array();
		if(isset($_GET) && count($_GET) > 0){
			$g = $_GET;
		}
		if(isset($_POST) && count($_POST) > 0){
			$p = $_POST;
		}

		//$_POST should always contain at least 'method' and 'header' properties
		if(count($g) == 1 && count($p) > 1){
			$m = array_keys($g);
			$this->_method = $m[0];
			if(isset($this->_functions[$this->_method])){
				if($this->_functions[$this->_method] instanceof Zend_Server_Reflection_Function || $this->_functions[$this->_method] instanceof Zend_Server_Reflection_Method && $this->_functions[$this->_method]->isPublic()){

					//Check if the request is valid
					if( $this->_validateRequest($p) ){

						//Retrieve the request parameters, if any
						$request_params = array();
						if(array_key_exists('parameters',$p)){
							$request_params = $this->_parseParams($p['parameters']);
							//error_log(print_r($request_params,true),3,"/tmp/test.log");
							$request_keys = array_keys($request_params);
							array_walk($request_keys, array(__CLASS__, "lowerCase"));
							$request_params = array_combine($request_keys, $request_params);
						}
						$func_args = $this->_functions[$this->_method]->getParameters();
						$calling_args = array();
						$missing_args = array();
						foreach($func_args as $arg){
							if(isset($request_params[strtolower($arg->getName())])){
								$calling_args[] = $request_params[strtolower($arg->getName())];
							} elseif( $arg->isOptional()){
								$calling_args[] = $arg->getDefaultValue();
							} else {
								$missing_args[] = $arg->getName();
							}
						}

						foreach ($request_params as $key => $value) {
							if (substr($key, 0, 3) == 'arg') {
								$key = str_replace('arg', '', $key);
								$calling_args[$key] = $value;
								if (($index = array_search($key, $missing_args)) !== false) {
									unset($missing_args[$index]);
								}
							}
						}

						// Sort arguments by key -- @see ZF-2279
						ksort($calling_args);

						$result = false;
						if (count($calling_args) < count($func_args)) {
							require_once 'Zend/Rest/Server/Exception.php';
							$result = $this->fault(new Zend_Rest_Server_Exception('Invalid Method Call to ' . $this->_method . '. Missing argument(s): ' . implode(', ', $missing_args) . '.'), 400);
						}

						if (!$result && $this->_functions[$this->_method] instanceof Zend_Server_Reflection_Method) {
							// Get class
							$class = $this->_functions[$this->_method]->getDeclaringClass()->getName();

							if ($this->_functions[$this->_method]->isStatic()) {
								// for some reason, invokeArgs() does not work the same as
								// invoke(), and expects the first argument to be an object.
								// So, using a callback if the method is static.
								$result = $this->_callStaticMethod($class, $calling_args);
							} else {
								// Object method
								$result = $this->_callObjectMethod($class, $calling_args);
							}
						} elseif (!$result) {
							try {
								$result = call_user_func_array($this->_functions[$this->_method]->getName(), $calling_args); //$this->_functions[$this->_method]->invokeArgs($calling_args);
							} catch (Exception $e) {
								$result = $this->fault($e);
							}
						}
					} else {
						require_once 'Zend/Rest/Server/Exception.php';
						$result = $this->fault(new Zend_Rest_Server_Exception("Invalid request"),400);
					}
				} else {
					require_once "Zend/Rest/Server/Exception.php";
					$result = $this->fault(
					new Zend_Rest_Server_Exception("Unknown Method '$this->_method'."),
					404
					);
				}
			} else {
				require_once "Zend/Rest/Server/Exception.php";
				$result = $this->fault(
				new Zend_Rest_Server_Exception("Unknown Method '$this->_method'."),
				404
				);
			}
		} else {
			require_once "Zend/Rest/Server/Exception.php";
			$result = $this->fault(
			new Zend_Rest_Server_Exception("Malformed request."),
			404
			);
		}

		/*
		 if (isset($request['method'])) {
		$this->_method = $request['method'];
		if (isset($this->_functions[$this->_method])) {
		if ($this->_functions[$this->_method] instanceof Zend_Server_Reflection_Function || $this->_functions[$this->_method] instanceof Zend_Server_Reflection_Method && $this->_functions[$this->_method]->isPublic()) {
		$request_keys = array_keys($request);
		array_walk($request_keys, array(__CLASS__, "lowerCase"));
		$request = array_combine($request_keys, $request);
		$func_args = $this->_functions[$this->_method]->getParameters();
		$calling_args = array();
		$missing_args = array();
		foreach ($func_args as $arg) {
		if (isset($request[strtolower($arg->getName())])) {
		$calling_args[] = $this->_convertParameter($request[strtolower($arg->getName())]);
		} elseif ($arg->isOptional()) {
		$calling_args[] = $arg->getDefaultValue();
		} else {
		$missing_args[] = $arg->getName();
		}
		}

		foreach ($request as $key => $value) {
		if (substr($key, 0, 3) == 'arg') {
		$key = str_replace('arg', '', $key);
		$calling_args[$key] = $this->_convertParameter($value);
		if (($index = array_search($key, $missing_args)) !== false) {
		unset($missing_args[$index]);
		}
		}
		}

		// Sort arguments by key -- @see ZF-2279
		ksort($calling_args);

		$result = false;
		if (count($calling_args) < count($func_args)) {
		require_once 'Zend/Rest/Server/Exception.php';
		$result = $this->fault(new Zend_Rest_Server_Exception('Invalid Method Call to ' . $this->_method . '. Missing argument(s): ' . implode(', ', $missing_args) . '.'), 400);
		}

		if (!$result && $this->_functions[$this->_method] instanceof Zend_Server_Reflection_Method) {
		// Get class
		$class = $this->_functions[$this->_method]->getDeclaringClass()->getName();

		if ($this->_functions[$this->_method]->isStatic()) {
		// for some reason, invokeArgs() does not work the same as
		// invoke(), and expects the first argument to be an object.
		// So, using a callback if the method is static.
		$result = $this->_callStaticMethod($class, $calling_args);
		} else {
		// Object method
		$result = $this->_callObjectMethod($class, $calling_args);
		}
		} elseif (!$result) {
		try {
		$result = call_user_func_array($this->_functions[$this->_method]->getName(), $calling_args); //$this->_functions[$this->_method]->invokeArgs($calling_args);
		} catch (Exception $e) {
		$result = $this->fault($e);
		}
		}
		} else {
		require_once "Zend/Rest/Server/Exception.php";
		$result = $this->fault(
		new Zend_Rest_Server_Exception("Unknown Method '$this->_method'."),
		404
		);
		}
		} else {
		require_once "Zend/Rest/Server/Exception.php";
		$result = $this->fault(
		new Zend_Rest_Server_Exception("Unknown Method '$this->_method'."),
		404
		);
		}
		} else {
		require_once "Zend/Rest/Server/Exception.php";
		$result = $this->fault(
		new Zend_Rest_Server_Exception("No Method Specified."),
		404
		);
		}*/
		error_log(print_r($result,true),3,"/tmp/test.log");
		//if ($result instanceof SimpleXMLElement) {		
		//	$response = $result->asXML();
		//} elseif ($result instanceof DOMDocument) {
		//	$response = $result->saveXML();
		//} elseif ($result instanceof DOMNode) {
		//	$response = $result->ownerDocument->saveXML($result);
		
		if (!$this->_faultResult){
			if (is_array($result) || is_object($result)) {
				$response = $this->_handleStruct($result);
			} else {
				$response = $this->_handleScalar($result);
			}
		} else {
			$response = $result;
		}

		$response = Zend_Json::encode($response,false);
		$response = preg_replace_callback('/\\\\u([0-9a-f]{4})/i', create_function('$match', 'return mb_convert_encoding(pack("H*", $match[1]), "UTF-8", "UCS-2BE");'), $response);

		if (!$this->returnResponse()) {
			if (!headers_sent()) {
				foreach ($this->_headers as $header) {
					header($header);
				}
			}
			echo $response;
			return;
		}

		return $response;
	}

	public function fault($exception = null, $code = null)
	{
		if (isset($this->_functions[$this->_method])) {
			$function = $this->_functions[$this->_method];
		} elseif (isset($this->_method)) {
			$function = $this->_method;
		} else {
			$function = 'unknown';
		}

		if ($function instanceof Zend_Server_Reflection_Method) {
			$class = $function->getDeclaringClass()->getName();
		} else {
			$class = false;
		}

		if ($function instanceof Zend_Server_Reflection_Function_Abstract) {
			$method = $function->getName();
		} else {
			$method = $function;
		}

		$json = array();
                $json['header']['method'] = $method;
                $json['header']['session'] = session_id();


		if ($exception instanceof Exception) {
			$json['response'] = array("message" => $exception->getMessage());
                        $code = $exception->getCode();
                } elseif (($exception !== null) || 'rest' == $function) {
			$json['response'] = array("message" => 'An unknown error occurred. Please try again.');
                } else {
			$json['response'] = array("message" => 'Call to ' . $method . ' failed.');
                }

		$json['status'] = 'failure';

		// Headers to send
		if ($code === null || (404 != $code)) {
			$this->_headers[] = 'HTTP/1.0 400 Bad Request';
		} else {
			$this->_headers[] = 'HTTP/1.0 404 File Not Found';
		}
		$this->_faultResult = true;
		return $json;
	}

	/**
	 * Handle an array or object result
	 *
	 * @param array|object $struct Result Value
	 * @return string XML Response
	 */
	protected function _handleStruct($struct)
	{
		$function = $this->_functions[$this->_method];
		$method = $function->getName();
		 
		$json = array();
		$json['header']['method'] = $method;
		$json['header']['session'] = session_id();

		if(isset($struct)){
			if((is_array($struct) && count($struct) > 1) || is_object($struct)){
				$json['response'] = (object) $struct;
			} else {
				$json['response'] = $struct[0];
			}
		} else {
			$json['response'] = null;
		}

		$json['status'] = 'success';

		return $json;
	}

	protected function _handleScalar($value)
	{
		$function = $this->_functions[$this->_method];
		$method = $function->getName();
		 
		$json = array();
		$json['header']['method'] = $method;
		$json['header']['session'] = session_id();

		 
		if ($value === false) {
			$value = 0;
		} elseif ($value === true) {
			$value = 1;
		}

		if (isset($value)) {
			$json['response'] = $value;
		} else {
			$json['response'] = null;
		}

		$json['status'] = 'success';

		return $json;
	}


	/**
	 * Checks whether the provided parameter is an base64 encoded json representation of an object and if so
	 * returns a stdClass representation of it. If the parameter is not base64 decodable or doesn't have
	 * a valid json representation we assume it's an scalar parameter and return it as it is.
	 *
	 * @param mixed $parameter
	 * 		An HTTP request parameter of undetermined type
	 * @return mixed $result_parameter
	 * 		Returns an stdClass representation of the parameter given this parameter is a base64 encoded json representation. Otherways it returns the parameter as is.
	 */
	//protected function _convertParameter($parameter){
	//	$result_parameter = $parameter;
	//	//JSON object parameters are encoded using base64 on the client
	//	if(base64_decode($parameter) !== false){
	//		$json_parameter = base64_decode($parameter);
	//		if(json_decode($json_parameter) !== null){
	//			$object_parameter = json_decode($json_parameter);
	//			$result_parameter = $object_parameter;
	//		}
	//	}
	//	return $result_parameter;
	//
	//}

	protected function _parseParams($parameters){
		$result_parameter = $parameters;
		//This means we have more than one parameter and thus, we want it to be an object
		if(is_array($result_parameter) && count($result_parameter) > 1){
			$object_parameter = (object)$parameters;
			//$result_parameter = $object_parameter;
			$result_parameter = array('arg'=>$object_parameter);
		}
		return $result_parameter;
	}

	protected function _validateRequest($request){

		$request_method = array();
		$request_header = array();

		$result = FALSE;

		//Check if minimum required fields are present in the request
		if( array_key_exists('method',$request) && array_key_exists('header',$request) ){
			$request_method = $request['method'];
			$request_header = $request['header'];
			if( array_key_exists('uuid',$request_header) && array_key_exists('session',$request_header) ) {
				$uuid = $request_header['uuid'];
				$session = $request_header['session'];
				if( $this->_method == $request_method && session_id() != "" && $session == session_id() ){
					if( $this->_method == 'getCommunicationToken' ){
						$_SESSION['uuid'] = $uuid;
						$result = TRUE;
					} else {

                //error_log("\n\nREQUEST VALIDATION\n",3,"/tmp/test.log");
                //error_log("Request contents:\n",3,"/tmp/test.log");
                //error_log(print_r($request,true),3,"/tmp/test.log");
                //error_log("Session contents:\n",3,"/tmp/test.log");
                //error_log(print_r($_SESSION,true),3,"/tmp/test.log");

						if( array_key_exists('token',$request_header) && isset($_SESSION['uuid']) && $uuid == $_SESSION['uuid'] ){
							//error_log("Request Header has TOKEN field set and the UUID is present on the SERVER_SESSION\n",3,"/tmp/test.log");
							$request_token = $request_header['token'];
							$request_salt = substr($request_token,0,6);
							$commToken = isset($_SESSION['commToken']) ? $_SESSION['commToken'] : "";
							//error_log("RT: ".$request_token." / SCT: ".$commToken." /RM: ".$request_method ." / ST: ".$this->_checkToken($request_method, $commToken, $request_salt)."\n",3,"/tmp/test.log");
							if($this->_checkToken($request_method, $commToken, $request_salt) == $request_token){
								$result = TRUE;
							}
						}

					}
				}
			}
		}
		return $result;
	}

	protected function _checkToken($method, $commToken, $salt){
		$statToken = 'myMusicFightsAgainstTheSystemThatTeachesToLiveAndDie';
		$token = $commToken;
		$c = sha1($method.":".$token.":".$statToken.":".$salt);
		return $salt . $c;
	}


	/*
	 protected function _generateRandomCommunicationToken($length){
	$token = '';
	$i = 0;
	while ($i < $length){
	$token = $token . dechex(floor((rand(0,1000000) * 16)/1000000));
	$i++;
	}
	return $token;
	}
	*/


}
?>
