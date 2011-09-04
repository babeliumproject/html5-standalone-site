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

/**
 * This class performs tag cloud related operations
 * 
 * @author Babelium Team
 *
 */
class TagCloud {
	private $conn;
	private $numTags;
	 
	public function TagCloud() {
			$settings = Config::getInstance();
			$this->numTags = $settings->numTags;
			$this->conn = new Datasource ( $settings->host, $settings->db_name, $settings->db_username, $settings->db_password );
	}
	
	public function getTagCloud() {
		$searchResults = array();
		$sql = "SELECT *
				 FROM tagcloud
				 ORDER BY amount DESC, tag
				 LIMIT " . $this->numTags . ";";
 		$result = $this->conn->_execute ( $sql );
 		while ( $row = $this->conn->_nextRow ( $result ) ) {
			$temp = new stdClass();
			
			$temp->tag = $row[0];
			$temp->amount = $row[1];
			
			array_push ( $searchResults, $temp );
		}
		return $searchResults;
	}
}
?>