
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
		this.addCommand(ViewChangeEvent.VIEW_LOGIN_POPUP, ToggleLoginPopupCommand);
		
		// User management
		this.addCommand(LoginEvent.PROCESS_LOGIN, ProcessLoginCommand);
		this.addCommand(LoginEvent.SIGN_OUT, SignOutCommand);
	}
});


/* ============================================================
 * Custom Events
 * ==========================================================*/

/**
 * View Change Event
 */ 
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
ViewChangeEvent.VIEW_LOGIN_POPUP = "viewLoginPopup";

/**
 * LoginEvent
 */
var LoginEvent = Cairngorm.Event.extend(
{
	// Just a simple event, no action needed
	init : function ( type, user )
	{
		this._super(type);
		this.setData(user);
	}
});
// Constants
LoginEvent.PROCESS_LOGIN = "processLogin";
LoginEvent.SIGN_OUT = "signOut";

/* ============================================================
 * Custom Commands
 * ==========================================================*/

/**
 * ViewHomeModuleCommand
 */
var ViewHomeModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
	
		window.history.pushState({module : "home" }, "Home - Babelium Project", "?module=home");
		
		BP.CMS.prepareMainContent("home", function ()
		{
			BP.HomeDelegate.viewHomeModule(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		alert("Error loading home module");
	}
});

/**
 * ViewExerciseModuleCommand
 */
var ViewExerciseModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
	
		window.history.pushState({module : "pract" }, "Practice - Babelium Project", "?module=pract");
		
		BP.CMS.prepareMainContent("practice module", function ()
		{
			BP.PracticeDelegate.viewPracticeModule(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		alert("Error loading practice module");
	}
});

/**
 * ViewEvaluationModuleCommand
 */
var ViewEvaluationModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
	
		window.history.pushState({module : "eval" }, "Evaluation - Babelium Project", "?module=eval");
		
		BP.CMS.prepareMainContent("evaluation module", function ()
		{
			BP.EvaluationDelegate.viewEvaluationModule(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		alert("Error loading evaluation module");
	}
});

/**
 * ViewSubtitleModuleCommand
 */
var ViewSubtitleModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
	
		window.history.pushState({module : "subs" }, "Subtitles - Babelium Project", "?module=subs");
		
		BP.CMS.prepareMainContent("subtitle module", function ()
		{
			BP.SubtitleDelegate.viewSubtitleModule(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		alert("Error loading subtitle module");
	}
});

/**
 * ViewConfigModuleCommand
 */
var ViewConfigModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
	
		window.history.pushState({module : "conf" }, "Configuration - Babelium Project", "?module=conf");
		
		BP.CMS.prepareMainContent("configuration module", function ()
		{
			BP.ConfigDelegate.viewConfigModule(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		alert("Error loading config module");
	}
});

/**
 * ViewAboutModuleCommand
 */
var ViewAboutModuleCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		var _this = this;
	
		window.history.pushState({module : "about" }, "About - Babelium Project", "?module=about");
		
		BP.CMS.prepareMainContent("about", function ()
		{
			BP.AboutDelegate.viewAboutModule(_this);
		});
	},
	
	onResult : function ( response )
	{
		BP.CMS.innerMainContent(response);
	},
	
	onFault : function ()
	{
		alert("Error loading about module");
	}
});

/**
 * ToggleLoginPopupCommand
 */
var ToggleLoginPopupCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		BP.CMS.toggleLoginPopup();
	}
});

/**
 * ProcessLoginCommand
 */
var ProcessLoginCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		if ( this.data == null )
			return;

		$("li#loginhelper").html("<img src='themes/babelium/images/loading.gif' alt='Loading..' width='16' height='16' />");
		BP.AuthDelegate.processLogin(this, this.data);
	},
	
	onResult : function ( response )
	{
		response = $.parseJSON(response);
		
		if ( response.content.indexOf("<li>") != -1 )
		{
			// Logged in
			$("li#loginhelper").html("");
			$("ul#usernav").html(response.content);
			BP.CMS.hideLoginPopup();
		}
		else
			$("li#loginhelper").html(response.content);
	},
	
	onFault : function ()
	{
		alert("Error trying to connect to the login server");
	}
});

/**
 * SignOutCommand
 */
var SignOutCommand = Cairngorm.Command.extend(
{
	execute : function ()
	{
		BP.AuthDelegate.signOut(this);
	},
	
	onResult : function ( response )
	{
		response = $.parseJSON(response);
		
		if ( response.content.indexOf("<li>") != -1 )
		{
			$("li#loginhelper").html("");
			$("ul#usernav").html(response.content);
		}
	},
	
	onFault : function ()
	{
		alert("Error trying to connect to the login server");
	}
});

/* ============================================================
 * INIT CONTROLLER
 * ==========================================================*/

BP.control = new Controller();

/* ============================================================
 * LOAD SERVICES FROM A XML FILE
 * ==========================================================*/

$.get("themes/babelium/js/mvc/services.xml", null, function ( data, textStatus)
{
	var _httpGateways = {};
	
	$(data).find("gateway").each(function()
	{
		var p = $(this);
		
		if ( p.attr("type") == "http" )
			_httpGateways[p.attr("id")] = {target: p.attr("target"), method: p.attr("method")};
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

/* ============================================================
 * PRACTICE MODULE DELEGATE
 * ==========================================================*/

BP.PracticeDelegate = (function ()
{
	var _serviceID = "pracMOD";
	
	return {
		
		viewPracticeModule : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( null, responder );
		}
	};

})();

/* ============================================================
 * EVALUATION MODULE DELEGATE
 * ==========================================================*/

BP.EvaluationDelegate = (function ()
{
	var _serviceID = "evalMOD";
	
	return {
		
		viewEvaluationModule : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( null, responder );
		}
	};

})();

/* ============================================================
 * SUBTITLE MODULE DELEGATE
 * ==========================================================*/

BP.SubtitleDelegate = (function ()
{
	var _serviceID = "subsMOD";
	
	return {
		
		viewSubtitleModule : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( null, responder );
		}
	};

})();

/* ============================================================
 * CONFIG MODULE DELEGATE
 * ==========================================================*/

BP.ConfigDelegate = (function ()
{
	var _serviceID = "confMOD";
	
	return {
		
		viewConfigModule : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( null, responder );
		}
	};

})();

/* ============================================================
 * ABOUT MODULE DELEGATE
 * ==========================================================*/

BP.AboutDelegate = (function ()
{
	var _serviceID = "aboutMOD";
	
	return {
		
		viewAboutModule : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( null, responder );
		}
	};

})();

/* ============================================================
 * USER MODULE DELEGATE
 * ==========================================================*/

BP.UserDelegate = (function ()
{
	var _serviceID = "userMOD";
	
	return {
		
		viewUserModule : function ( responder )
		{
			
		}
	};

})();

/* ============================================================
 * Auth MODULE DELEGATE
 * ==========================================================*/

BP.AuthDelegate = (function ()
{
	var _serviceID = "authMOD";
	
	return {
		
		processLogin : function ( responder, data )
		{
			if ( !data || typeof data.toJSONStr != "function" )
				return;

			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			var params = "action=login&params="+Base64.encode(data.toJSONStr());
			_service.call( params, responder );
		},
		
		signOut : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			var params = "action=logout";
			_service.call( params, responder );
		}
	};

})();


/* ============================================================
 * VALUE OBJECTS
 * ==========================================================*/

var LoginVO = Cairngorm.VO.extend(
{
	init : function ( name, pass, remember )
	{
		this.name = name;
		this.pass = pass;
		this.remember = (remember)? 1 : 0;
	}
});
