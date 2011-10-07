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

require_once(dirname(__FILE__) . "/../../../config/Config.php");
require_once 'Datasource.php';

$settings = Config::getInstance();
$json_input = file_get_contents('php://input');

$commit_info = json_decode($json_input, true);
$appRevision = $commit_info['revision'];

$logPath = $settings->logPath;
$projectSecretKey = $settings->project_secret_key;
$digest = hash_hmac("md5",$json_input,$projectSecretKey);

error_log("[".date("d/m/Y H:i:s")."] webhook request received.\n",3,$logPath.'/webhook.log');
error_log("\tJSON input: ".$json_input."\n",3,$logPath.'/webhook.log');

$headers = apache_request_headers();

if ($digest == $headers["Google-Code-Project-Hosting-Hook-Hmac"]){
        if(!empty($appRevision) && is_numeric($appRevision)){
                $sql = "UPDATE preferences SET prefValue= '%s' WHERE (prefName='appRevision')";

                $conn = new Datasource ( $settings->host, $settings->db_name, $settings->db_username, $settings->db_password );
                $conn->_execute ( $sql, $appRevision );
                error_log("\tCommited revision: ".$appRevision."\n", 3, $logPath.'/webhook.log');

        } else {
                error_log("\tWrong input received.\n", 3, $logPath.'/webhook.log');
        }
} else {
        error_log("\tAuthentication failed.\n", 3, $logPath.'/webhook.log');
}



?>