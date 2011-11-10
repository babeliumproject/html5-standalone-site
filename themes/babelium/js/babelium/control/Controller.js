
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
		this.addCommand(ViewChangeEvent.VIEW_POPSTATE, ViewPopStateCommand);
		
		// User management
		this.addCommand(LoginEvent.PROCESS_LOGIN, ProcessLoginCommand);
		this.addCommand(LoginEvent.SIGN_OUT, SignOutCommand);
		
		// Home module
		this.addCommand(HomepageEvent.LATEST_USER_UPLOADED_VIDEOS, LatestUploadedVideosCommand);
		this.addCommand(HomepageEvent.BEST_RATED_VIDEOS_SIGNED_IN, SignedBestVideosCommand);
		this.addCommand(HomepageEvent.LATEST_USER_ACTIVITY, LatestUserActivityCommand);
	}
});