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

require_once $_SERVER["DOCUMENT_ROOT"] . "/config/Config.php";
require_once 'utils/Datasource.php';
require_once 'utils/SessionHandler.php';

/**
 * Class to perform subtitle roles related operations
 * 
 * @author Babelium Team
 *
 */
class ExerciseRole
{

	private $conn;

	public function ExerciseRole()
	{
		try {
			$verifySession = new SessionHandler();
			$settings = Config::getInstance();
			$this->conn = new DataSource($settings->host, $settings->db_name, $settings->db_username, $settings->db_password);
		} catch (Exception $e) {
			throw new Exception ($e->getMessage());
		}
	}


	public function getExerciseRoles($exerciseId)
	{

		$sql = "SELECT MAX(id) as id, fk_exercise_id, character_name
				FROM exercise_role
				WHERE fk_exercise_id = '%d'
				GROUP BY character_name";

		$searchResults = $this->_listRolesQuery ( $sql, $exerciseId );

		return $searchResults;
	}

	private function _listRolesQuery(){
		$searchResults = array ();
		$result = $this->conn->_execute ( func_get_args() );

		while ( $row = $this->conn->_nextRow ( $result ) ) {
			$temp = new stdClass ( );
			$temp->id = $row[0];
			$temp->exerciseId = $row[1];
			$temp->characterName = $row[2];
			array_push ( $searchResults, $temp );
		}

		return $searchResults;
	}

}

?>