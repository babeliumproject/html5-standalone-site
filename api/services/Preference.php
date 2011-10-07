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
 * Class to retrieve application preference data
 * 
 * @author Babelium Team
 *
 */
class Preference {

	private $conn;

	public function Preference(){
		try {
			$verifySession = new SessionHandler();
			$settings = Config::getInstance();
			$this->conn = new Datasource($settings->host, $settings->db_name, $settings->db_username, $settings->db_password);
		} catch (Exception $e) {
			throw new Exception($e->getMessage());
		}
	}

	public function getAppPreferences(){
		$sql = "SELECT * FROM preferences";

		$searchResults = $this->_listQuery($sql);

		return $searchResults;
	}

	private function _listQuery($sql){
		$searchResults = array();
		$preferenceData = array();
		$result = $this->conn->_execute($sql);

		while ($row = $this->conn->_nextRow($result))
		{
			$temp = new stdClass();
			$temp->prefName = $row[1];
			$temp->prefValue = $row[2];
			$preferenceData[$row[1]] = $row[2];
			array_push($searchResults, $temp);
		}
		$_SESSION['preferenceData'] = $preferenceData;
		return $searchResults;
	}
}

?>