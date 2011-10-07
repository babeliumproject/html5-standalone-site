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
require_once 'utils/SessionHandler.php';

/**
 * This class provides means to record statistical data about the user's activity on the system
 * 
 * @author Babelium Team
 *
 */
class UserVideoHistory{

	private $conn;

	public function UserVideoHistory(){
		try {
			$verifySession = new SessionHandler(true);
			$settings = Config::getInstance();
			$this->conn = new Datasource ( $settings->host, $settings->db_name, $settings->db_username, $settings->db_password );
		} catch (Exception $e) {
			throw new Exception($e->getMessage());
		}
	}

	public function exerciseWatched($videoHistoryData){

		if($sessionId = $this->_currentSessionData($_SESSION['uid'])){

			$sql = "INSERT INTO user_videohistory (fk_user_id, fk_user_session_id, fk_exercise_id, subtitles_are_used, fk_subtitle_id)
			    	VALUES ('%d','%d','%d','%d','%d')";
			return $this->conn->_insert($sql, $_SESSION['uid'], $sessionId, $videoHistoryData->exerciseId, $videoHistoryData->subtitlesAreUsed, $videoHistoryData->subtitleId);
		} else {
			return false;
		}
	}

	public function exerciseAttemptResponse($videoHistoryData){
		if($sessionId = $this->_currentSessionData($_SESSION['uid'])){
			$sql = "INSERT INTO user_videohistory (fk_user_id, fk_user_session_id, fk_exercise_id, response_attempt, subtitles_are_used, fk_subtitle_id, fk_exercise_role_id)
					VALUES ('%d', '%d', '%d', 1, '%d', '%d', '%d')";
			return $this->conn->_insert($sql, $_SESSION['uid'], $sessionId, $videoHistoryData->exerciseId,
			$videoHistoryData->subtitlesAreUsed, $videoHistoryData->subtitleId, $videoHistoryData->exerciseRoleId);
		} else {
			return false;
		}
	}

	public function exerciseSaveResponse($videoHistoryData){
		if($sessionId = $this->_currentSessionData()){
			$sql = "INSERT INTO user_videohistory (fk_user_id, fk_user_session_id, fk_exercise_id, fk_response_id, subtitles_are_used, fk_subtitle_id, fk_exercise_role_id)
					VALUES ('%d', '%d', '%d', '%d', '%d', '%d', '%d')";
			return $this->conn->_insert($sql, $_SESSION['uid'], $sessionId, $videoHistoryData->exerciseId, $videoHistoryData->responseId,
			$videoHistoryData->subtitlesAreUsed, $videoHistoryData->subtitleId, $videoHistoryData->exerciseRoleId);
		} else {
			return false;
		}
	}

	private function _currentSessionData(){
		//Initialize session
		//session_start();
		$sessionId = session_id();

		$sql = "SELECT id, session_id FROM user_session WHERE ( session_id = '%s' AND fk_user_id = '%d' AND closed = 0 )";
		$result = $this->conn->_execute ( $sql, $sessionId, $_SESSION['uid'] );
		$row = $this->conn->_nextRow($result);
		if($row){
			return $row[0];
		} else {
			return false;
		}
	}
}

?>
