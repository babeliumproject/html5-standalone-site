
/* ============================================================
 * Babelium Exercise Manager
 * ==========================================================*/

function ExerciseManager ()
{
	this.bpPlayer = null;

	this.bpPlayerStates = {
		PLAY_STATE : 0,
		PLAY_BOTH_STATE : 1,
		RECORD_MIC_STATE : 2,
		RECORD_BOTH_STATE : 3
	};

	this.exerciseName = null;
	this.exerciseTitle = null;
	this.exerciseId = null;
	this.currentExercise = null;
	this.currentResponse = null;
	this.selectedExercise = null; // Exercise preload
	this.selectedResponse = null;
	
	this.selectedRole = null;
	this.selectedLocale = null;
	
	this.exerciseStartedPlaying = false;
	
	this.cueManager = null;
	this.cueManagerReady = false;
	
	this.recordedFilename = null;

	var instance = this;
		
	// Loads an exercise
	this.loadSelectedExercise = function (videoPlayer)
	{
		this.bpPlayer = videoPlayer;
		this.cueManager = new cuePointManager();
		this.setupVideoPlayer();
		this.onExerciseSelected();
	};
	
	// Loads a response
	this.loadSelectedResponse = function (videoPlayer)
	{
		this.bpPlayer = videoPlayer;
		this.cueManager = new cuePointManager();
		this.setupVideoPlayer();
		this.onResponseSelected();
	};
	
	// For firs-time web page load, load an exercise from content's data
	this.loadExerciseFromContent = function (videoPlayer)
	{
		var container = $("section.exerciseInfo");
		var id = container.data("id");
		var name = container.data("name");
		this.selectedExercise = new ExerciseVO(id, name, null);
		this.loadSelectedExercise(videoPlayer);
	};
	
	// For firs-time web page load, load an exercise from content's data
	this.loadResponseFromContent = function (videoPlayer)
	{
		var container = $("section.evaluationDetails");
		var id = container.data("id");
		var name = container.data("name");
		this.selectedExercise = new ExerciseVO(id, name, null);
		this.selectedResponse = {"responseName" : container.data("responsename"), "characterName" : container.data("charname"), "responseId" : container.data("responseid"), "subtitleId" : container.data("subtitleid")};
		this.loadSelectedResponse(videoPlayer);
	};
	
	// Setups videoplayer
	this.setupVideoPlayer = function ()
	{
		this.bpPlayer.addEventListener("onRecordingAborted", "BP.EM.recordingAbortedListener");
		this.bpPlayer.addEventListener("onRecordingFinished", "BP.EM.recordingFinishedListener");
	};
	
	// On exercise selected
	this.onExerciseSelected = function (exercise)
	{
		// Store selected exercise's information
		this.exerciseName = this.selectedExercise.name;
		this.exerciseTitle = this.selectedExercise.title;
		this.exerciseId = this.selectedExercise.id;
		this.currentResponse = null;
		
		this.currentExercise = exercise;
		
		this.cueManagerReady = false;
		
		this.prepareExercise();
		this.resetCueManager();
		this.prepareCueManager();
	};
	
	// On response selected
	this.onResponseSelected = function()
	{
		// Store selected exercise's information
		this.exerciseName = this.selectedExercise.name;
		this.exerciseTitle = this.selectedExercise.title;
		this.exerciseId = this.selectedExercise.id;
		this.responseName = this.selectedResponse.responseName;
		
		this.currentExercise = this.selectedExercise;
		this.currentResponse = this.selectedResponse;
		this.cueManagerReady = false;

		this.resetCueManager();
		this.prepareCueManagerEvaluation();
	};
	
	// Prepare exercise
	this.prepareExercise = function ()
	{
		if ( !this.bpPlayer )
			return;

		// Prepare new video in VideoPlayer
		this.bpPlayer.stopVideo();
		this.bpPlayer.setState(this.bpPlayerStates.PLAY_STATE);
		this.bpPlayer.exerciseSource(this.exerciseName);
	};
		
	// Reset component
	this.resetComp = function ()
	{
		if ( !this.bpPlayer )
			return;
		
		this.bpPlayer.endVideo(); // Stop video
		this.bpPlayer.setSubtitle(""); // Clear subtitles if any
		this.bpPlayer.exerciseSource(""); // Reset video source
		this.bpPlayer.setState(this.bpPlayerStates.PLAY_STATE); //Reset the player window to display only the exercise
	};
	
	// Show arrows
	this.showArrows = function ()
	{
		if ( !this.bpPlayer )
			return;
		
		this.bpPlayer.arrows(true);
		this.bpPlayer.setArrows(this.cueManager.cues2rolearray(), this.selectedRole);
	};

	// Hide arrows
	this.hideArrows = function ()
	{
		if ( !this.bpPlayer )
			return;
		
		this.bpPlayer.arrows(false);
		this.bpPlayer.removeArrows();
	};
		
	// Setup recording
	this.setupRecording = function ()
	{
		if ( !this.bpPlayer )
			return;
		
		// Retrieve selected role
		this.selectedRole = $("select#recRole > option:selected").val();
		this.selectedLocale = $("select#recLocale > option:selected").val();
		
		this.setupRecordingCommands();
		
		// Recording method
		if ( $("input[name=recordingMethod]:checked").val() == "micOnly" )
			this.bpPlayer.setState(this.bpPlayerStates.RECORD_MIC_STATE);
		else
			this.bpPlayer.setState(this.bpPlayerStates.RECORD_BOTH_STATE);
		
		this.showArrows();
		this.showRecordingOptions();
	};
	
	// Reset Cuepoint Manager
	this.resetCueManager = function ()
	{
		this.cueManager.reset();
		this.bpPlayer.removeEventListener("onEnterFrame", "BP.EM.enterFrameListener");
	};
	
	// Prepare Cuepoint Manager
	this.prepareCueManager = function()
	{
		this.cueManager.setVideo(this.exerciseId);

		this.cueManager.addEventListener("onSubtitlesRetrieved", instance.onSubtitlesRetrieved);
		this.selectedLocale = $("select#recLocale > option:selected").val();
		this.cueManager.setCuesFromSubtitleUsingLocale(this.selectedLocale);
		this.bpPlayer.removeEventListener("onEnterFrame", "BP.EM.enterFrameListener");
		this.bpPlayer.addEventListener("onEnterFrame", "BP.EM.enterFrameListener");
	};
	
	// Prepare Cuepoint Manager for Evaluation
	this.prepareCueManagerEvaluation = function()
	{
		this.cueManager.addEventListener("onSubtitlesRetrieved", instance.onSubtitlesRetrieved);
		this.cueManager.setCuesFromSubtitleUsingId(this.currentResponse.subtitleId);
		this.bpPlayer.removeEventListener('onEnterFrame', 'BP.EM.enterFrameListener');
		this.bpPlayer.addEventListener('onEnterFrame', 'BP.EM.enterFrameListener');
	};
		
	// Enter frame listener
	this.enterFrameListener = function (event)
	{
		this.cueManager.monitorCuePoints(event);
	};
	
	// Show recording options
	this.showRecordingOptions = function ()
	{
		$("article.exerciseInfo").fadeOut("fast", function()
		{
			var aux = $("article.recordingEndOptions");
			aux.find("button:lt(3)").attr("disabled", "disabled");
			aux.fadeIn();
		});
	};
	
	// Hide recording options
	this.hideRecordingOptions = function ()
	{
		$("article.recordingEndOptions").fadeOut("fast", function ()
		{
			$("article.exerciseInfo").fadeIn();
		});
	};
		
	/**
	 * Callback from another scope, use the 'instance' variable to access local properties/methods
	 */
	this.onSubtitlesRetrieved = function ()
	{
		if ( instance.currentResponse == undefined )
			instance.setupPlayCommands();
		else
		{
			instance.bpPlayer.setState(instance.bpPlayerStates.PLAY_BOTH_STATE);
			instance.bpPlayer.exerciseSource(instance.exerciseName);
			instance.bpPlayer.secondSource(instance.responseName);
			instance.selectedRole = instance.currentResponse.characterName;
			instance.setupRecordingCommands();
			instance.bpPlayer.addEventListener("onMetadataRetrieved", "BP.EM.onMetadataRetrieved");
		}
	};
		
	// Setup play commands
	this.setupPlayCommands = function()
	{
		var auxList = this.cueManager.getCuelist();
		if ( auxList.length <= 0 )
			return;

		for ( var i in auxList )
		{
			auxList[i].setStartCommand(new onPlaybackCuePoint(auxList[i], this.bpPlayer));
			auxList[i].setEndCommand(new onPlaybackCuePoint(null, this.bpPlayer));
		}
			
		this.cueManagerReady = true;

		this.videoStartedPlayingListener(null);
	};
	
	// Setup Recording Commands
	this.setupRecordingCommands = function()
	{
		var auxList = this.cueManager.getCuelist();
		
		if ( auxList.length <= 0 )
			return;

		for ( var i in auxList) {

			if (auxList[i].role != this.selectedRole) {
				auxList[i].setStartCommand(new onRecordingOtherRoleCuePoint(auxList[i], this.bpPlayer));
				auxList[i].setEndCommand(new onPlaybackCuePoint(null, this.bpPlayer));
			} else {
				auxList[i].setStartCommand(new onRecordingSelectedRoleStartCuePoint(auxList[i], this.bpPlayer));
				auxList[i].setEndCommand(new onRecordingSelectedRoleStopCuePoint(this.bpPlayer));
			}
		}
		this.bpPlayer.seek(false);
		this.cueManagerReady = true;
	};
		
	// Watch response
	this.watchResponse = function ()
	{
		instance.showArrows();
		instance.setupRecordingCommands();
		instance.bpPlayer.exerciseSource(instance.exerciseName);
		instance.bpPlayer.setState(instance.bpPlayerStates.PLAY_BOTH_STATE);
		instance.bpPlayer.secondSource(instance.recordedFilename);
		instance.bpPlayer.seek(false);
	}
	
	// Setup Replay Commands
	this.setupReplayCommands = function()
	{
		var auxList = this.cueManager.getCuelist();

		if ( auxList.length <= 0 )
			return;

		for ( var i in auxList )
		{
			auxList[i].setStartCommand(new onReplayRecordingCuePoint(auxList[i], this.bpPlayer));
			auxList[i].setEndCommand(new onReplayRecordingCuePoint(null, this.bpPlayer));
		}

		this.cueManagerReady = true;
	};
		
	// Callbacks
	this.onMetadataRetrieved = function(event) 
	{
		this.showArrows();
	};
		
	this.videoStartedPlayingListener = function ()
	{
		// TODO
	};
	
	// On recording aborted by user
	this.recordingAbortedListener = function ()
	{
		alert("Devices not working");
		this.recordingError();
		this.prepareExercise();
		this.resetCueManager();
	};
	
	// On recording finished
	this.recordingFinishedListener = function (recFilename)
	{
		// Store last recorded response's filename
		this.recordedFilename = recFilename;

		// Set the videoplayer to playback both the exercise and the
		// last response.
		this.setupRecordingCommands();
		this.bpPlayer.exerciseSource(this.exerciseName);
		this.bpPlayer.setState(this.bpPlayerStates.PLAY_BOTH_STATE);
		this.bpPlayer.secondSource(this.recordedFilename);

		this.bpPlayer.seek(false);
		//this.bpPlayer.stopVideo();
		
		// Enable buttons
		$("article.recordingEndOptions > button:lt(3)").removeAttr("disabled");
	};
	
	// Recording error
	this.recordingError = function()
	{
		this.hideArrows();
		this.bpPlayer.unattachUserDevices();
		this.bpPlayer.setState(this.bpPlayerStates.PLAY_STATE);

		this.bpPlayer.removeEventListener('onEnterFrame','bpExercises.onEnterFrameListener');

		this.hideRecordingOptions();
	};
	
	// Save Response
	this.saveResponse = function ()
	{
		var responseThumbnail = "nothumb.png";
		var subtitleId = this.cueManager.currentSubtitle();

		var duration = this.bpPlayer.duration();

		// Prepare an AJAX call to the appointed service
		var parameters = {
			'userId' : null,
			'exerciseId' : instance.exerciseId,
			'fileIdentifier' : instance.recordedFilename,
			'isPrivate' : true,
			'thumbnailUri' : responseThumbnail,
			'source' : 'Red5',
			'duration' : duration,
			'addingDate' : null,
			'ratingAmount' : 0,
			'characterName' : instance.selectedRole,
			'transcriptionId' : 0,
			'subtitleId' : subtitleId
		};
		
		BP.Services.send(false, "saveResponse", parameters, this.saveResponseCallback);
	};
	
	/**
     * Service callback, use the 'instance' variable to access local scope
     */
	this.saveResponseCallback = function(data)
	{
		if ( data == undefined || data["response"] == undefined )
		{
			alert("Error while saving the response. Please try again later");
			return;
		}
		
		var responseId = data["response"]["responseId"];
		BP.Services.send(false, "makePublic", responseId, this.publishResponseCallback);
	};

	/**
     * Service callback, use the 'instance' variable to access local scope
     */
	this.publishResponseCallback = function(data)
	{
		if ( data == undefined || data["response"] == undefined 
				|| data["response"]["creditCount"] == undefined )
		{
			alert("Error updating response's status");
			return;
		}
		
		var result = data["response"];
		$("span#creditCount").text(result.creditCount);
		alert("Your response has been published. Thanks for your collaboration.");
		new ViewChangeEvent(ViewChangeEvent.VIEW_HOME_MODULE).dispatch();
	};
	
	/**
	 * Save evaluation
	 */
	this.saveEvaluation = function (evaluation, callback)
	{
		if ( !evaluation || !this.currentResponse )
			return;
		
		evaluation.responseId = this.currentResponse.responseId;
		BP.Services.send(false, "addAssessment", evaluation, callback);
	};
}
