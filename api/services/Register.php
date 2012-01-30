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

require_once(dirname(__FILE__) . "/../../config/Config.php");
require_once 'utils/Datasource.php';
require_once 'utils/EmailAddressValidator.php';
require_once 'utils/Mailer.php';
require_once 'utils/SessionHandler.php';

/**
 * This class performs signup and user activation operations
 * 
 * @author Babelium Team
 *
 */
class Register{

	private $conn;
	private $settings;

	public function Register(){
		try{
			$verifySession = new SessionHandler();
			$this->settings = Config::getInstance();
			$this->conn = new Datasource($this->settings->host, $this->settings->db_name, $this->settings->db_username, $this->settings->db_password);
		} catch (Exception $e){
			throw new Exception($e->getMessage());
		}
	}

	public function newUser($user = null)
	{
		if(!$user)
			return 'Error';
		$validator = new EmailAddressValidator();
		if(!$validator->check_email_address($user->email)){
			return 'wrong_email';
		} else {
			$initialCredits = $this->_getInitialCreditsQuery($sql);
			$hash = $this->_createRegistrationHash();
			
			$insert = "INSERT INTO users (name, password, email, realName, realSurname, creditCount, activation_hash)";
			$insert .= " VALUES ('%s', '%s', '%s' , '%s', '%s', '%d', '%s' ) ";

			$realName = $user->realName? $user->realName : "unknown";
			$realSurname = $user->realSurname? $user->realSurname : "unknown";

			$result = $this->_insert ( $user, $insert, $user->name, $user->pass, $user->email,$realName, $realSurname, $initialCredits, $hash );
			if ( $result != false )
			{
				//Add the languages selected by the user
				$languages = $user->languages;
				if (count($languages) > 0)
					$this->addUserLanguages($languages, $result->id);

				//We get the first mother tongue as message locale
				$motherTongueLocale = $languages[0]->language;


				// Submit activation email
				$mail = new Mailer($user->name);

				$subject = 'Babelium Project: Account Activation';

				$args = array(
						'PROJECT_NAME' => 'Babelium Project',
						'USERNAME' => $user->name,
						'PROJECT_SITE' => 'http://'.$_SERVER['HTTP_HOST'].'/Main.html#',
						'ACTIVATION_LINK' => 'http://'.$_SERVER['HTTP_HOST'].'/Main.html#/activation/activate/hash='.$hash.'&user='.$user->name,
						'SIGNATURE' => 'The Babelium Project Team');

				if ( !$mail->makeTemplate("mail_activation", $args, $motherTongueLocale) ) 
					return null;

				$mail->send($mail->txtContent, $subject, $mail->htmlContent);

				return $result;
			}
			return "User or email already exists";
		}
	}

	//The parameter should be an array of UserLanguageVO
	private function addUserLanguages($languages, $userId) {
		$positivesToNextLevel = $this->_getPositivesToNextLevel($sql);

		$params = array();

		$sql = "INSERT INTO user_languages (fk_user_id, language, level, purpose, positives_to_next_level) VALUES ";
		foreach($languages as $language) {
			$sql .= " ('%d', '%s', '%d', '%s', '%d'),";
			array_push($params, $userId, $language->language, $language->level, $language->purpose, $positivesToNextLevel);
		}
		unset($language);
		$sql = substr($sql,0,-1);
		// put sql query and all params in one array
		$merge = array_merge((array)$sql, $params);

		$result = $this->conn->_insert($merge);
		return $result;

	}

	public function activate($user = null){

		if(!$user)
			return false;
		
		$sql = "SELECT language 
				FROM users AS u INNER JOIN user_languages AS ul ON u.id = ul.fk_user_id 
				WHERE (u.name = '%s' AND u.activation_hash = '%s') LIMIT 1";
		$result = $this->conn->_singleSelect($sql, $user->name, $user->activationHash);

		if ( $result )
		{
			$sql = "UPDATE users SET active = 1, activation_hash = ''
			        WHERE (name = '%s' AND activation_hash = '%s')";
			$update = $this->conn->_update($sql, $user->name, $user->activationHash);
		}

		return ($result && $update)? $result->language : NULL ;
	}


	private function _create() {
		$data = func_get_args();
		$user = array_shift($data); // remove User VO

		// Check user with same name or same email
		$sql = "SELECT ID FROM users WHERE (name='%s' OR email = '%s' ) ";
		$result = $this->conn->_singleSelect($sql, $user->name, $user->email);
		if ($result)
			return false;

		$userId = $this->conn->_insert( $data );

		if ($userId) {
			$sql = "SELECT ID as id, 
						   name, 
						   email, 
						   password, 
						   creditCount 
					FROM users WHERE (ID= '%d' ) ";

		
			$result = $this->conn->_singleSelect($sql, $userId);
			return $result;
		} else {
			return false;
		}
	}

	private function _createRegistrationHash()
	{
		$hash = "";
		$chars = $this->_getHashChars();
		$length = $this->_getHashLength();

		// Generate Hash
		for ( $i = 0; $i < $length; $i++ )
		$hash .= substr($chars, rand(0, strlen($chars)-1), 1);  // java: chars.charAt( random );

		return $hash;
	}

	private function _getHashLength()
	{
		$sql = "SELECT prefValue FROM preferences WHERE ( prefName = 'hashLength' ) ";
		$result = $this->conn->_singleSelect($sql);
		return $result ? $result->prefValue : 20;
	}

	private function _getHashChars()
	{
		$sql = "SELECT prefValue FROM preferences WHERE ( prefName = 'hashChars' ) ";
		$result = $this->conn->_singleSelect($sql);
		return $result ? $result->prefValue : "abcdefghijklmnopqrstuvwxyz0123456789-_"; // Default: avoiding crashes
	}

	private function _getInitialCreditsQuery(){
		$sql = "SELECT prefValue FROM preferences WHERE ( prefName='initialCredits' )";
		$result = $this->conn->_singleSelect($sql);
		if($result){
			return $result->prefValue;
		} else {
			throw new Exception("An unexpected error occurred while trying to save your registration data.");
		}
	}

	private function _getPositivesToNextLevel(){
		$sql = "SELECT prefValue FROM preferences WHERE ( prefName='positives_to_next_level' )";
		$result = $this->conn->_singleSelect($sql);
		if($result){
			return $result->prefValue;
		} else {
			throw new Exception("Unexpected error while trying to retrieve preference data");
		}
	}
}
?>
