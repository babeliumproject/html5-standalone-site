

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
	}
});


/* ============================================================
 * Custom Events
 * ==========================================================*/

// View Change Event
var ViewChangeEvent = Cairngorm.Event.extend(
{
	// Just a simple event, no action needed
	init : function ( type )
	{
		this._super(type);
	}
});
// Constants
ViewChangeEvent.VIEW_HOME_MODULE = "viewHomeModule";
ViewChangeEvent.VIEW_EXERCISE_MODULE = "viewExerciseModule";
ViewChangeEvent.VIEW_EVALUATION_MODULE = "viewEvaluationModule";
ViewChangeEvent.VIEW_SUBTITLE_MODULE = "viewSubtitleModule";
ViewChangeEvent.VIEW_ABOUT_MODULE = "viewAboutModule";
ViewChangeEvent.VIEW_CONFIG_MODULE = "viewConfigModule";


/* ============================================================
 * Custom Commands
 * ==========================================================*/

// ViewHomeModuleCommand
var ViewHomeModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		load("home");
	}
});

//ViewExerciseModuleCommand
var ViewExerciseModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		load("exercises");
	}
});

//ViewHomeModuleCommand
var ViewEvaluationModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		load("evaluation");
	}
});

//ViewExerciseModuleCommand
var ViewSubtitleModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		load("subtitle");
	}
});

//ViewHomeModuleCommand
var ViewConfigModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		load("config");
	}
});

//ViewExerciseModuleCommand
var ViewAboutModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		load("about");
	}
});

/* ============================================================
 * INIT CONTROLLER
 * ==========================================================*/

var control = new Controller();