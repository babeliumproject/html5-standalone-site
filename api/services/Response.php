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
require_once 'utils/VideoProcessor.php';

/**
 * This class performs exercise response related operations
 * 
 * @author Babelium Team
 *
 */
class Response {

	private $conn;
	private $filePath;
	private $imagePath;
	private $red5Path;

	private $evaluationFolder = '';
	private $exerciseFolder = '';
	private $responseFolder = '';
	
	private $mediaHelper;

	public function Response() {
		try {
			$verifySession = new SessionHandler(true);
			$settings = Config::getInstance();
			$this->filePath = $settings->filePath;
			$this->imagePath = $settings->imagePath;
			$this->posterPath = $settings->posterPath;
			$this->red5Path = $settings->red5Path;
			$this->conn = new Datasource ( $settings->host, $settings->db_name, $settings->db_username, $settings->db_password );
			
			$this->mediaHelper = new VideoProcessor();

		} catch (Exception $e) {
			throw new Exception($e->getMessage());
		}
	}

	public function saveResponse($data){
		set_time_limit(0);
		$this->_getResourceDirectories();
		$thumbnail = 'nothumb.png';
		
		try{
			$videoPath = $this->red5Path .'/'. $this->responseFolder .'/'. $data->fileIdentifier . '.flv';
			$mediaData = $this->mediaHelper->retrieveMediaInfo($videoPath);
			$duration = $mediaData->duration;

			if($mediaData->hasVideo){
				$snapshot_output = $this->mediaHelper->takeFolderedRandomSnapshots($videoPath, $this->imagePath, $this->posterPath);
				$thumbnail = 'default.jpg';
			}
		} catch (Exception $e){
			throw new Exception($e->getMessage());
		}
		

		$insert = "INSERT INTO response (fk_user_id, fk_exercise_id, file_identifier, is_private, thumbnail_uri, source, duration, adding_date, rating_amount, character_name, fk_subtitle_id) ";
		$insert = $insert . "VALUES ('%d', '%d', '%s', 1, '%s', '%s', '%s', now(), 0, '%s', %d ) ";

		$result = $this->conn->_insert($insert, $_SESSION['uid'], $data->exerciseId, $data->fileIdentifier, $thumbnail, $data->source, $duration, $data->characterName, $data->subtitleId );
		$r = new stdClass();
		$r->responseId = $result;
		return $r;
	}

	public function makePublic($responseId)
	{
		$result = 0;
		
		$this->conn->_startTransaction();
		
		$sql = "UPDATE response SET is_private = 0 WHERE (id = '%d' ) ";

		$update = $this->conn->_execute ( $sql, $responseId );
		if(!$update){
			$this->conn->_failedTransaction();
			throw new Exception("Response publication failed");
		}
		
		//Update the user's credit count
		$creditUpdate = $this->_subCreditsForEvalRequest();
		if(!$creditUpdate){
			$this->conn->_failedTransaction();
			throw new Exception("Credit addition failed");
		}

		//Update the credit history
		$creditHistoryInsert = $this->_addEvalRequestToCreditHistory($responseId);
		if(!$creditHistoryInsert){
			$this->conn->_failedTransaction();
			throw new Exception("Credit history update failed");
		}
		
		if($update && $creditUpdate && $creditHistoryInsert){
			$this->conn->_endTransaction();

			$result = $this->_getUserInfo();
		}
		
		return $result;
		
	}

	private function _subCreditsForEvalRequest() {
		$sql = "UPDATE (users u JOIN preferences p)
			SET u.creditCount=u.creditCount-p.prefValue 
			WHERE (u.ID=%d AND p.prefName='evaluationRequestCredits') ";
		return $this->conn->_execute ( $sql, $_SESSION['uid'] );
	}

	private function _addEvalRequestToCreditHistory($responseId){
		$sql = "SELECT prefValue FROM preferences WHERE ( prefName='evaluationRequestCredits' )";
		$result = $this->conn->_execute ( $sql );
		$row = $this->conn->_nextRow($result);
		if($row){
			$changeAmount = $row[0];
			$sql = "SELECT fk_exercise_id FROM response WHERE (id='%d')";
			$result = $this->conn->_execute($sql, $responseId);
			$row = $this->conn->_nextRow($result);
			if($row){
				$exerciseId = $row[0];
				$sql = "INSERT INTO credithistory (fk_user_id, fk_exercise_id, fk_response_id, changeDate, changeType, changeAmount) ";
				$sql = $sql . "VALUES ('%d', '%d', '%d', NOW(), '%s', '%d') ";
				return $this->conn->_insert($sql, $_SESSION['uid'], $exerciseId, $responseId, 'eval_request', $changeAmount);
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	private function _getUserInfo(){

		$sql = "SELECT name, creditCount, joiningDate, isAdmin FROM users WHERE (id = %d) ";

		return $this->_singleQuery($sql, $_SESSION['uid']);
	}

	private function _singleQuery(){
		$valueObject = new stdClass();
		$result = $this->conn->_execute(func_get_args());

		$row = $this->conn->_nextRow($result);
		if ($row)
		{
			$valueObject->name = $row[0];
			$valueObject->creditCount = $row[1];
			$valueObject->joiningDate = $row[2];
			$valueObject->isAdmin = $row[3]==1;
		}
		else
		{
			return false;
		}
		return $valueObject;
	}

	private function _getResourceDirectories(){
		$sql = "SELECT prefValue FROM preferences
				WHERE (prefName='exerciseFolder' OR prefName='responseFolder' OR prefName='evaluationFolder') 
				ORDER BY prefName";
		$result = $this->conn->_execute($sql);

		$row = $this->conn->_nextRow($result);
		$this->evaluationFolder = $row ? $row[0] : '';
		$row = $this->conn->_nextRow($result);
		$this->exerciseFolder = $row ? $row[0] : '';
		$row = $this->conn->_nextRow($result);
		$this->responseFolder = $row ? $row[0] : '';
	}

}

?>
