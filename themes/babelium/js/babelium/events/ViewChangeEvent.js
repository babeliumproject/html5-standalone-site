
/**
 * View Change Event
 */ 

var ViewChangeEvent = Cairngorm.Event.extend(
{
	// Just a simple event, no action needed
	init : function ( type, data )
	{
		this._super(type, data);
	}
});

// Constants
ViewChangeEvent.VIEW_HOME_MODULE = "viewHomeModule";
ViewChangeEvent.VIEW_EXERCISE_MODULE = "viewExerciseModule";
ViewChangeEvent.VIEW_EVALUATION_MODULE = "viewEvaluationModule";
ViewChangeEvent.VIEW_SUBTITLE_MODULE = "viewSubtitleModule";
ViewChangeEvent.VIEW_ABOUT_MODULE = "viewAboutModule";
ViewChangeEvent.VIEW_CONFIG_MODULE = "viewConfigModule";
ViewChangeEvent.VIEW_LOGIN_POPUP = "viewLoginPopup";
ViewChangeEvent.RELOAD_STATE = "reloadState";