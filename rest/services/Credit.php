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

require_once 'utils/Config.php';
require_once 'utils/Datasource.php';
require_once 'utils/SessionHandler.php';

/**
 * This service should be available only to valid and authenticated users.
 * Credit related queries are stored in this service.
 * 
 * @author Babelium Team
 */
class Credit {
	
	private $conn;
	
	/**
	 * Constructor function
	 * 
	 * @throws Exception
	 * 		Throws an error if the one trying to access this class is not successfully logged in on the system 
	 * 		or there was any problem establishing a connection with the database.
	 */
	public function Credit() {

		try {
			$verifySession = new SessionHandler(true);
			$settings = new Config ( );
			$this->conn = new Datasource ( $settings->host, $settings->db_name, $settings->db_username, $settings->db_password );
		} catch (Exception $e) {
			throw new Exception($e->getMessage());
		}

	}
	
	/**
	 * Retrieves current user's credit activity of the current day 
	 * @return array $results
	 * 		An array of objects with the credit data or null if no credit data was found
	 */
	public function getCurrentDayCreditHistory() {
		$sql = "SELECT c.changeDate, c.changeType, c.changeAmount, c.fk_exercise_id, e.name, c.fk_response_id, r.file_identifier 
				FROM (((credithistory c INNER JOIN users u ON c.fk_user_id=u.id) INNER JOIN exercise e ON e.id=c.fk_exercise_id) LEFT OUTER JOIN response r on r.id=c.fk_response_id) 
				WHERE (c.fk_user_id = %d AND CURDATE() <= c.changeDate ) ORDER BY changeDate DESC ";
		
		return $this->_listQuery ( $sql, $_SESSION['uid'] );
	}
	
	/**
	 * Retrieves current user's credit activity of the last week
	 * @return array $results
	 * 		An array of objects with the credit data or null if no credit data was found
	 */
	public function getLastWeekCreditHistory() {
		$sql = "SELECT c.changeDate, c.changeType, c.changeAmount, c.fk_exercise_id, e.name, c.fk_response_id, r.file_identifier 
				FROM (((credithistory c INNER JOIN users u ON c.fk_user_id=u.id) INNER JOIN exercise e ON e.id=c.fk_exercise_id) LEFT OUTER JOIN response r on r.id=c.fk_response_id) 
				WHERE (c.fk_user_id = %d AND DATE_SUB(CURDATE(),INTERVAL 7 DAY) <= c.changeDate ) ORDER BY changeDate DESC ";
		
		return $this->_listQuery ( $sql, $_SESSION['uid'] );
	}
	
/**
	 * Retrieves current user's credit activity of the last month
	 * @return array $results
	 * 		An array of objects with the credit data or null if no credit data was found
	 */
	public function getLastMonthCreditHistory() {
		$sql = "SELECT c.changeDate, c.changeType, c.changeAmount, c.fk_exercise_id, e.name, c.fk_response_id, r.file_identifier 
				FROM (((credithistory c INNER JOIN users u ON c.fk_user_id=u.id) INNER JOIN exercise e ON e.id=c.fk_exercise_id) LEFT OUTER JOIN response r on r.id=c.fk_response_id) 
				WHERE (c.fk_user_id = %d AND DATE_SUB(CURDATE(),INTERVAL 30 DAY) <= c.changeDate ) ORDER BY changeDate DESC ";
		
		return $this->_listQuery ( $sql, $_SESSION['uid'] );
	}
	
	/**
	 * Retrieves current user's credit activity since he registered in the system
	 * @return array $results
	 * 		An array of objects with the credit data or null if no credit data was found
	 */
	public function getAllTimeCreditHistory() {
		$sql = "SELECT c.changeDate, c.changeType, c.changeAmount, c.fk_exercise_id, e.name, c.fk_response_id, r.file_identifier 
				FROM (((credithistory c INNER JOIN users u ON c.fk_user_id=u.id) INNER JOIN exercise e ON e.id=c.fk_exercise_id) LEFT OUTER JOIN response r on r.id=c.fk_response_id) 
				WHERE (c.fk_user_id = %d ) ORDER BY changeDate DESC ";
		
		return $this->_listQuery ( $sql, $_SESSION['uid'] );
	}
	
	/**
	 * Performs a sql query whose result is expected to be of several-row length
	 * 
	 * @return mixed $searchResults
	 * 		Returns an array of objects or false if the query didn't have results.
	 */
	private function _listQuery() {
		$searchResults = array ();
		$result = $this->conn->_execute ( func_get_args() );
		
		while ( $row = $this->conn->_nextRow ( $result ) ) {
			$temp = new stdClass ( );
			$temp->changeDate = $row [0];
			$temp->changeType = $row [1];
			$temp->changeAmount = $row [2];
			$temp->videoExerciseId = $row [5];
			$temp->videoExerciseName = $row [6];
			$temp->videoResponseId = $row [7];
			$temp->videoResponseName = $row [8];
			//$temp->videoEvaluationId = $row[9];
			//$temp->videoEvaluationName = $row[10];
			

			array_push ( $searchResults, $temp );
		}
		if (count ( $searchResults ) > 0)
			return $searchResults;
		else
			return false;
	}
	
}

?>