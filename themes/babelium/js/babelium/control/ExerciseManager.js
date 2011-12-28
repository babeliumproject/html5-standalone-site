
/* ============================================================
 * Babelium Exercise Manager
 * ==========================================================*/

BP.EM = (function ()
{
	// Private interface
	var _bpPlayer = null;

	var _bpPlayerStates = {
		PLAY_STATE : 0,
		PLAY_BOTH_STATE : 1,
		RECORD_MIC_STATE : 2,
		RECORD_BOTH_STATE : 3
	};

	var _exerciseName = null;
	var _exerciseTitle = null;
	var _exerciseId = null;
	var _currentExercise = null;
	
	var _exerciseStartedPlaying = false;

	// Public Interface
	return {
		// Self instance
		instance : this,
		
		// Loads an exercise
		loadExercise : function (videoPlayer, ex)
		{
			_bpPlayer = videoPlayer;
			this.setupVideoPlayer();
			this.onExerciseSelected(ex);
		},
	
		// Setups videoplayer
		setupVideoPlayer : function ()
		{
			// Nothing to do yet
		},
	
		// On exercise selected
		onExerciseSelected : function (exercise)
		{
			// Store selected exercise's information
			_exerciseName = exercise.name;
			_exerciseTitle = exercise.title;
			_exerciseId = exercise.id;
			_currentExercise = exercise;
			
			this.prepareExercise();
		},
	
		// Prepare exercise
		prepareExercise : function ()
		{
			if ( !_bpPlayer )
				return;

			// Prepare new video in VideoPlayer
			_bpPlayer.stopVideo();
			_bpPlayer.state(_bpPlayerStates.PLAY_STATE);
			_bpPlayer.videoSource(_exerciseName);
		},
		
		// Reset component
		resetComp : function ()
		{
			if ( !_bpPlayer )
				return;
			
			_bpPlayer.endVideo(); // Stop video
			_bpPlayer.setSubtitle(""); // Clear subtitles if any
			_bpPlayer.videoSource(""); // Reset video source
			_bpPlayer.state(_bpPlayerStates.PLAY_STATE); //Reset the player window to display only the exercise
		},
		
		// Show arrows
		showArrows : function ()
		{

			_bpPlayer.arrows(true);
			//_bpPlayer.setArrows(this.cueManager.cues2rolearray(), this.selectedRole);
		},

		// Hide arrows
		hideArrows : function ()
		{
			_bpPlayer.arrows(false);
			_bpPlayer.removeArrows();
		}
	};

})();
