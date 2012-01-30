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

require_once 'Zend/Loader.php';
require_once(dirname(__FILE__) . "/../../config/Config.php");
require_once 'utils/Datasource.php';
require_once 'utils/SessionHandler.php';
require_once 'utils/VideoProcessor.php';

/**
 * Class to perform operations that deal with external services data, such as YouTube Data API
 * 
 * @author Babelium Team
 *
 */
class External {
	
	// Enter your Google account credentials
	private $email;
	private $passwd;
	private $devKey;
	
	// Video duration size
	private $maxDuration;
	
	private $filePath;
	private $imagePath;
	private $red5Path;
	private $exerciseFolder;
	private $evaluationFolder;
	private $responseFolder;
	private $conn;
	private $mediaHelper;
	
	function External() {
		Zend_Loader::loadClass ( 'Zend_Gdata_YouTube' );
		Zend_Loader::loadClass ( 'Zend_Gdata_ClientLogin' );
		Zend_Loader::loadClass ( 'Zend_Gdata_App_Exception' );
		Zend_Loader::loadClass ( 'Zend_Gdata_App_Extension_Control' );
		Zend_Loader::loadClass ( 'Zend_Gdata_App_CaptchaRequiredException' );
		Zend_Loader::loadClass ( 'Zend_Gdata_App_HttpException' );
		Zend_Loader::loadClass ( 'Zend_Gdata_App_AuthException' );
		Zend_Loader::loadClass ( 'Zend_Gdata_YouTube_VideoEntry' );
		Zend_Loader::loadClass ( 'Zend_Gdata_App_Entry' );
		
		try {
			$verifySession = new SessionHandler();
		
			$settings = Config::getInstance();
		
			$this->filePath = $settings->filePath;
			$this->imagePath = $settings->imagePath;
			$this->red5Path = $settings->red5Path;
			$this->email = $settings->yt_user;
			$this->passwd = $settings->yt_password;
			$this->devKey = $settings->yt_developerKey;
		
			$this->maxDuration = $settings->maxDuration;
		
			$this->conn = new Datasource ( $settings->host, $settings->db_name, $settings->db_username, $settings->db_password );
			$this->mediaHelper = new VideoProcessor();
			$this->_getResourceDirectories();
		
		} catch (Exception $e) {
			throw new Exception($e->getMessage());
		}
	}
	
	private function authenticate() {
		try {
			$client = Zend_Gdata_ClientLogin::getHttpClient ( $this->email, $this->passwd, 'youtube' );
		} catch ( Zend_Gdata_App_CaptchaRequiredException $cre ) {
			throw new Exception ( "Captcha required: " . $cre->getCaptchaToken () . "\n" . "URL of CAPTCHA image: " . $cre->getCaptchaUrl () . "\n" );
		} catch ( Zend_Gdata_App_AuthException $ae ) {
			throw new Exception ( "Problem authenticating: " . $ae->getMessage () . "\n" );
		}
		
		$client->setHeaders ( 'X-GData-Key', 'key=' . $this->devKey );
		return $client;
	}
	
	private function _getResourceDirectories(){
		$sql = "SELECT prefValue 
				FROM preferences
				WHERE (prefName='exerciseFolder' OR prefName='responseFolder' OR prefName='evaluationFolder') 
				ORDER BY prefName";
		$result = $this->conn->_multipleSelect($sql);
		if($result){
			$this->evaluationFolder = $result[0] ? $result[0]->prefValue : '';
			$this->exerciseFolder = $result[1] ? $result[1]->prefValue : '';
			$this->responseFolder = $result[2] ? $result[2]->prefValue : '';
		}
	}
	
	public function processPendingSlices(){
		set_time_limit(0);
		$sql = "SELECT id, name, source, language, fk_user_id as userId, title, thumbnail_uri as thumbnailUri, duration, status
				FROM exercise WHERE (status='Unsliced') ";
		$transcodePendingVideos = $this->conn->_multipleSelect($sql);
		if(count($transcodePendingVideos) > 0){
			echo "  * There are video slices that need to be processed.\n";
			foreach($transcodePendingVideos as $pendingVideo){
				$this->setExerciseProcessing($pendingVideo->id);
				//Prepare for video to be downloaded and sliced up
				$sql2 = "SELECT id, name, watchUrl, start_time, duration
						 FROM video_slice WHERE (name = '%s')";
				$vSlice = $this->conn->_multipleSelect($sql2, $pendingVideo->name);
				//Call the download and slice function
				$creation = $this->createSlice($vSlice);		
				if ($creation) {
					//The video was downloaded and sliced up
					$sliceFileName = 'SLC'.$pendingVideo->name.'.flv';
					$path = $this->filePath.'/'.$sliceFileName;
					if(is_file($path) && filesize($path)>0){
						$outputHash = $this->mediaHelper->str_makerand(11,true,true);
						$outputName = $outputHash.".flv";
						
						try{
							//Check if the video already exists
							if(!$this->checkIfFileExists($path)){
								//Asuming everything went ok, take a snapshot of the video
								$outputImagePath = $this->imagePath .'/'. $outputHash . '.jpg';
								$snapshot_output = $this->mediaHelper->takeRandomSnapshot($path, $outputImagePath);
		
								//move the outputFile to it's final destination
								rename($path, $this->red5Path .'/'. $this->exerciseFolder .'/'. $outputName);
								$duration = $vSlice->duration;
								
								//Set the exercise as available and update it's data
								$this->conn->_startTransaction();
								
								$updateResult = $this->setExerciseAvailable($pendingVideo->id, $outputHash, $outputHash.'.jpg', $duration, md5_file($this->red5Path .'/'. $this->exerciseFolder .'/'. $outputName));
								if(!$updateResult){
									$this->conn->_failedTransaction();
									throw new Exception("Database operation error. Changes rollbacked.");
								}
								
								$updateSlice = $this->updateSliceName($outputHash,$vSlice->id);
								if(!$updateSlice){
									$this->conn->_failedTransaction();
									throw new Exception("Database operation error. Changes rollbacked.");
								}
								
								$creditUpdate = $this->_addCreditsForUploading($pendingVideo->userId);
								if(!$creditUpdate){
									$this->conn->_failedTransaction();
									throw new Exception("Database operation error. Changes rollbacked.");
								}
								
								$historyUpdate = $this->_addUploadingToCreditHistory($pendingVideo->userId, $pendingVideo->id);
								if(!$historyUpdate){
									$this->conn->_failedTransaction();
									throw new Exception("Database operation error. Changes rollbacked.");
								}
								
								$this->conn->_endTransaction();
								
								echo "\n";
								echo "          filename: ".$pendingVideo->name."\n";
								echo "          filesize: ".filesize($this->red5Path .'/'. $this->exerciseFolder .'/'. $outputName)."\n";
								echo "          input path: ".$path."\n";
								echo "          output path: ".$this->red5Path .'/'. $this->exerciseFolder .'/'. $outputName."\n";
								echo "          snapshot output: ".$snapshot_output."\n";
							} else {
								//Remove the non-valid files
								//@unlink($outputPath);
								$this->setExerciseRejected($pendingVideo->id);
								echo "\n";
								echo "          filename: ".$pendingVideo->name."\n";
								echo "          filesize: ".filesize($path)."\n";
								echo "          input path: ".$path."\n";
								echo "          error: Duplicated file\n";
							}
							//Remove the old files (original and slice)
							@unlink($path);
							$originalPath = $this->filePath.'/'.$pendingVideo->name.'.flv';
							@unlink($originalPath);
							
						} catch (Exception $e) {
						echo $e->getMessage()."\n";
						}
					}//end if(is_file)
				}else{
					//The video was not downloaded due to duration limit restrictions
					$this->setExerciseRejected($pendingVideo->id);
							echo "\n";
							echo "          filename: ".$pendingVideo->name."\n";
							echo "          filesize: ".filesize($path)."\n";
							echo "          input path: ".$path."\n";
							echo "          error: Duplicated file\n";
				
				}
			}//end for_each
				
		} else {
			echo "  * There aren't video slices that need to be processed.\n";		
		}
	
	}
	
	public function retrieveVideo($data) {

		$url = escapeshellcmd($data);
		$pattern = '/v=([A-Za-z0-9._%-]*)[&\w;=\+_\-]*/';
		preg_match($pattern, $url, $matches);
		$result = $matches[1];
			
		return $result;
	}
	
	public function retrieveUserVideo($data) {

		$url = escapeshellcmd($data);
		$pattern = '/\/([^\/]*)$/'; //Captures each character starting from the last / of the Url 
		preg_match($pattern, $url, $matches);
		$result = $matches[1];
	
		return $result;
	}
	
	public function createSlice ($sliceData) {
		
		set_time_limit(0); // Bypass the execution time limit
		
		$name = $data->name;
		$watchUrl = $data->watchUrl;
		$start_time = $data->start_time;
		$duration = $data->duration;
		
		$outputFolder = $this->filePath;
		$outputVideo = $outputFolder."/".$name.'.flv';
		
		$sql = "SELECT prefValue FROM preferences WHERE (prefName = 'sliceDownCommandPath')";
		$result = $this->conn->_singleSelect($sql);
		if($result)
			$pathCommand = $result->prefValue;	
		
		$maxDurationCheck = $this->checkVideoDuration($name);
		
		if($maxDurationCheck) {
		
			$comandoDescarga = $pathComando." -w -o ".$outputVideo." ".$watchUrl;
			$downloadVideo = exec($comandoDescarga); //Download temporarily Video
			$vidDescarga = $outputVideo;
			$sliceFileName = 'SLC'.$name.'.flv';
			$sliceVideo = $outputFolder."/".$sliceFileName;
	
			$comandoRecorte = "ffmpeg -y -i ".$vidDescarga." -ss ".$start_time." -t ".$duration." -s 320x240 -acodec libmp3lame -ar 22050 -ac 2 -f flv ".$sliceVideo; 	//Execute Slice
	
			$ffmpeg_output = exec($comandoRecorte);
			
		}
		
		if (is_file($sliceVideo)) {
			return true;	
		}else{
			return false;
		}
		
	}
	
	public function insertVideoSlice($sliceData, $exerciseData) {
	
		set_time_limit(0); // Bypass the execution time limit
		
		$watchUrl = $data->watchUrl;
		
		$sql = "SELECT prefValue FROM preferences WHERE (prefName = 'sliceDownCommandPath')";
		$result = $this->conn->_singleSelect($sql);
		if($result)
			$pathCommand = $result->prefValue;	
		
		$downloadCommand = $pathCommand." -e --get-thumbnail ".$watchUrl;
		$thumbnail = exec($downloadCommand); //Get VideoSlice's Thumbnail Uri
				
		$sql = "INSERT INTO video_slice (name, watchUrl, start_time, duration) VALUES ('%s', '%s', %d, %d)";
		$result = $this->_insert($sql, $data->name, $data->watchUrl, $data->start_time, $data->duration);
		
		$sql2 = "INSERT INTO exercise (name, description, source, language, fk_user_id, tags, title, thumbnail_uri, duration, status, license, reference, adding_date) VALUES ('%s', '%s', '%s', '%s', %d, '%s', '%s', '%s', %d, '%s', '%s', '%s', NOW())";
		$result = $this->_insert($sql2, $data2->name, $data2->description, $data2->source, $data2->language, $data2->userId, $data2->tags, $data2->title, $thumbnail, $data->duration, $data2->status, $data2->license, $data2->reference);
		
		return $result;
	}
	
	private function checkVideoDuration($videoId) {
		//Check that the video to be downloaded for the slicing process does not exceed maximum duration
		set_time_limit(0);
		
		$httpClient = $this->authenticate ();
		$yt = new Zend_Gdata_YouTube ( $httpClient );
		
		$myVideoEntry = $yt->getVideoEntry($videoId);
		$duration = $myVideoEntry->getVideoDuration();
		$limit = $this->maxDuration;
	
		if ($duration<=$limit) {	
			return true;
		}else{
			return false;
		}
	
	}
	
	private function updateSliceName($newName,$id){
	
		$sql = "UPDATE video_slice SET name='%s' WHERE (id=%d) ";
		return $this->conn->_update($sql, $newName, $id);
	
	}
	
	private function setExerciseAvailable($exerciseId, $newName, $newThumbnail, $newDuration, $fileHash){

		$sql = "UPDATE exercise SET name='%s', thumbnail_uri='%s', duration='%s', filehash='%s', status='Available'
            	WHERE (id=%d) ";
		return $this->conn->_update ( $sql, $newName, $newThumbnail, $newDuration, $fileHash, $exerciseId );
	}

	private function setExerciseProcessing($exerciseId){
		$sql = "UPDATE exercise SET status='Processing' WHERE (id=%d) ";
		return $this->conn->_update($sql, $exerciseId);
	}

	private function setExerciseRejected($exerciseId){
		$sql = "UPDATE exercise SET status='Rejected' WHERE (id=%d) ";
		return $this->conn->_update($sql, $exerciseId);
	}

	private function _addCreditsForUploading($userId) {
		$sql = "UPDATE (users u JOIN preferences p)
				SET u.creditCount=u.creditCount+p.prefValue 
				WHERE (u.ID=%d AND p.prefName='uploadExerciseCredits') ";
		return $this->conn->_update ( $sql, $userId );
	}
	
	private function _addUploadingToCreditHistory($userId, $exerciseId){
		$sql = "SELECT prefValue FROM preferences WHERE ( prefName='uploadExerciseCredits' )";
		$result = $this->conn->_singleSelect ( $sql );
		if($result){
			$sql = "INSERT INTO credithistory (fk_user_id, fk_exercise_id, changeDate, changeType, changeAmount) ";
			$sql = $sql . "VALUES ('%d', '%d', NOW(), '%s', '%d') ";
			return $this->conn->_insert ($sql, $userId, $exerciseId, 'upload', $result->prefValue);
		} else {
			return false;
		}
	}
	
	
	private function checkIfFileExists($path){
		$fileExists = false;
		$currentHash = md5_file($path);
		$sql = "SELECT filehash FROM exercise";
		$videoHashes = $this->conn->_multipleSelect($sql);
		foreach($videoHashes as $existingHash){
			if ($existingHash->fileHash == $currentHash){
				$fileExists = true;
				break;
			}
		}
		return $fileExists;
	}
	
}
?>