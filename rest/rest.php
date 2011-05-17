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

/** DEBUG MODE **/
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once 'ZendRestJson.php';

//Instantiate custom Zend Rest Server
$server = new ZendRestJson();

//Set the data representation for the response received from the server. Default representation mode is XML
if ( isset($_GET['mode']) )
	$server->setResponseMode($_GET['mode']);
else
	$server->setResponseMode('json');
	
//Set the path to reach the services
define ('SERVICE_PATH', '/services/');

require_once dirname(__FILE__) . SERVICE_PATH . 'Auth.php';
require_once dirname(__FILE__) . SERVICE_PATH . 'Credit.php';
require_once dirname(__FILE__) . SERVICE_PATH . 'Evaluation.php';
require_once dirname(__FILE__) . SERVICE_PATH . 'Exercise.php';
require_once dirname(__FILE__) . SERVICE_PATH . 'ExerciseRole.php';
require_once dirname(__FILE__) . SERVICE_PATH . 'Home.php';
require_once dirname(__FILE__) . SERVICE_PATH . 'Preference.php';
require_once dirname(__FILE__) . SERVICE_PATH . 'Register.php';
require_once dirname(__FILE__) . SERVICE_PATH . 'Response.php';
require_once dirname(__FILE__) . SERVICE_PATH . 'Search.php';
require_once dirname(__FILE__) . SERVICE_PATH . 'Subtitle.php';
require_once dirname(__FILE__) . SERVICE_PATH . 'TagCloud.php';
require_once dirname(__FILE__) . SERVICE_PATH . 'Transcription.php';
require_once dirname(__FILE__) . SERVICE_PATH . 'User.php';
require_once dirname(__FILE__) . SERVICE_PATH . 'UserVideoHistory.php';

$server->setClass('Auth');
$server->setClass('Credit');
$server->setClass('Evaluation');
$server->setClass('Exercise');
$server->setClass('ExerciseRole');
$server->setClass('Home');
$server->setClass('Preference');
$server->setClass('Register');
$server->setClass('Response');
$server->setClass('Search');
$server->setClass('Subtitle');
$server->setClass('TagCloud');
$server->setClass('Transcription');
$server->setClass('User');
$server->setClass('UserVideoHistory');

$server->handle();

?>
