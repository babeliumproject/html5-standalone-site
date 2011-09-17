
// Babelium Project
var BP = {};

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
		var location = "home", _this = this;
		window.history.pushState({module : location }, location, "?module="+location);
	
		$("#maincontent > aside#loader > div#loadcontext > span").html("Loading <strong>"+location+"</strong>");
		$("#maincontent > aside#loader").slideDown(500);

		$("#maincontent > section").slideUp(500, function()
		{
			$("#maincontent > section").remove();
			
			BP.HomeDelegate.viewHomeModule(_this);
		});
	},
	
	onResult : function ( response )
	{
		var data = $.parseJSON(response);
		$("#maincontent > header > h1").text(data.title);
		var content = $(data.content).hide();
		content.appendTo("#maincontent").slideDown(500);
		$("#maincontent > aside#loader").slideUp(500);
	},
	
	onFault : function ()
	{
		alert("Error loading home module");
	}
});

//ViewExerciseModuleCommand
var ViewExerciseModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		
	}
});

//ViewHomeModuleCommand
var ViewEvaluationModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		
	}
});

//ViewExerciseModuleCommand
var ViewSubtitleModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		
	}
});

//ViewHomeModuleCommand
var ViewConfigModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		
	}
});

//ViewExerciseModuleCommand
var ViewAboutModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		
	}
});

/* ============================================================
 * INIT CONTROLLER
 * ==========================================================*/

BP.control = new Controller();

/* ============================================================
 * LOAD SERVICES FROM A XML FILE
 * ==========================================================*/

$.get("/themes/babelium/js/mvc/service.xml", null, function ( data, textStatus)
{
	var _httpGateways = {};
	
	$(data).find("gateway").each(function()
	{
		var p = $(this);
		
		if ( p.attr("type") == "http" )
			_httpGateways[p.attr("id")] = p.attr("target");
	});
	
	$(data).find("service").each(function ()
	{
		var p = $(this), g = _httpGateways[p.attr("destination")];
		
		if ( g == null )
			return;
		
		// Create HTTP Service: gateway + target
		var hs = new Cairngorm.HTTPService(g, p.attr("class"));
		
		// Register HTTP Service: id + http service object
		Cairngorm.ServiceLocator.registerHttpService(p.attr("id"), hs);
	});
});

/* ============================================================
 * HOME MODULE DELEGATE
 * ==========================================================*/

BP.HomeDelegate = (function ()
{
	var _serviceID = "homeMOD";
	
	return {
		
		viewHomeModule : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( null, responder );
		}
	};

})();


alert("Successfully loaded");
