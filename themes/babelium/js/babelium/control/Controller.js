
/* ============================================================
 * Babelium Controller
 * ==========================================================*/

var Controller = Cairngorm.FrontController.extend(
{
	init : function ()
	{
		this._super();

		// View Change Event
		this.addCommand(ViewChangeEvent.VIEW_HOME_MODULE, ViewHomeModuleCommand);
		this.addCommand(ViewChangeEvent.VIEW_EXERCISE_MODULE, ViewExerciseModuleCommand);
		this.addCommand(ViewChangeEvent.VIEW_EVALUATION_MODULE, ViewEvaluationModuleCommand);
		this.addCommand(ViewChangeEvent.VIEW_SUBTITLE_MODULE, ViewSubtitleModuleCommand);
		this.addCommand(ViewChangeEvent.VIEW_ABOUT_MODULE, ViewAboutModuleCommand);
		this.addCommand(ViewChangeEvent.VIEW_CONFIG_MODULE, ViewConfigModuleCommand);
		this.addCommand(ViewChangeEvent.VIEW_LOGIN_POPUP, ToggleLoginPopupCommand);
		
		// On popstate event
		this.addCommand(ViewChangeEvent.RELOAD_STATE, ReloadStateCommand);
		
		// User management
		this.addCommand(LoginEvent.PROCESS_LOGIN, ProcessLoginCommand);
		this.addCommand(LoginEvent.SIGN_OUT, SignOutCommand);
		
		// Home module
		this.addCommand(HomepageEvent.LATEST_USER_UPLOADED_VIDEOS, LatestUploadedVideosCommand);
		this.addCommand(HomepageEvent.BEST_RATED_VIDEOS_SIGNED_IN, SignedBestVideosCommand);
		this.addCommand(HomepageEvent.LATEST_USER_ACTIVITY, LatestUserActivityCommand);
		
		// Exercise module
		this.addCommand(ExerciseEvent.EXERCISE_SELECTED, ExerciseSelectedCommand);
		this.addCommand(ExerciseEvent.GET_RECORDABLE_EXERCISES, GetRecordableExercisesCommand);
		this.addCommand(ExerciseEvent.REC_START, StartRecordingCommand);
		this.addCommand(ExerciseEvent.RECORDING_ABORTED, RecordingAbortedCommand);
		this.addCommand(ExerciseEvent.SAVE_RESPONSE, SaveResponseCommand);
		this.addCommand(ExerciseEvent.WATCH_RESPONSE, WatchResponseCommand);
		this.addCommand(ExerciseEvent.RECORD_AGAIN, RecordAgainCommand);
		
		// Evaluation module
		this.addCommand(EvaluationEvent.VIEW_PENDING_ASSESMENTS, ViewPendingAssesmentsCommand);
		this.addCommand(EvaluationEvent.VIEW_CURRENTLY_ASSESSED_TO_USER, ViewCurrentlyAssessedToUserCommand);
		this.addCommand(EvaluationEvent.VIEW_CURRENTLY_ASSESSED_BY_USER, ViewCurrentlyAssessedByUserCommand);
	}
});