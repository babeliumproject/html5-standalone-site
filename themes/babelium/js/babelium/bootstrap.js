
/* ============================================================
 * INIT CONTROLLER
 * ==========================================================*/

BP.control = new Controller();

/* ============================================================
 * SETUP STATE HANDLER
 * ==========================================================*/

//Application state
BP.state = {};
BP.selectedExercise = null;
BP.bpPlayer = null;

//Push state
BP.pushState = function ( data, title, href )
{
	window.history.pushState(data, title, href);
	BP.state = data;
};

// Last visited module
BP.at = function ( moduleName )
{
	if ( typeof moduleName == 'undefined' )
		return (typeof BP.state.module == 'undefined') ? null : BP.state.module;
	else 
		return (typeof BP.state.module == 'undefined') ? false : BP.state.module == moduleName;
};

// Last requested action
BP.action = function ( actionName )
{	
	if ( typeof actionName == 'undefined' )
		return (typeof BP.state.action == 'undefined') ? null : BP.state.action;
	else 
		return (typeof BP.state.action == 'undefined') ? false : BP.state.action == actionName;
};

// Last requested action's parameters
BP.params = function( params )
{
	if ( typeof actionName == 'undefined' )
		return (typeof BP.state.params == 'undefined') ? null : BP.state.params;
	else 
		return (typeof BP.state.params == 'undefined') ? false : BP.state.params == params;
};

/* ============================================================
 * REGISTER SOME USEFUL FUNCTIONS FOR BP SERVICES
 * ==========================================================*/

BP.getUUID = (function () 
{
	// http://www.ietf.org/rfc/rfc4122.txt
	// section 4.4 (Algorithms for Creating a UUID from Truly Random or
	// Pseudo-Random Number)
	// http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	}).toUpperCase();
})();

BP.getSessionID = (function () 
{
	// http://www.elated.com/articles/javascript-and-cookies/
	var results = document.cookie.match('(^|;) ?' + 'PHPSESSID' + '=([^;]*)(;|$)');
	if (results)
		return (unescape(results[2]));
	else
		return null;
})();

/* ============================================================
 * BP SERVICES CALLER
 * ==========================================================*/

BP.Services = new services();
BP.Services.getCommunicationToken();

BP.onCommunicationReady = function () {
	BP.EM = new ExerciseManager();
}

/* ============================================================
 * LOAD SERVICES FROM A XML FILE
 * ==========================================================*/

$.get("themes/babelium/js/services.xml", null, function ( data, textStatus)
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
 * INIT BABELIUM's CONTENT MANAGEMENT SYSTEM AND INITIAL STATUS
 * ==========================================================*/

$(document).ready(function()
{
	// Retrieve module and action from location
	var m = (RegExp("module=(.+?)(&|$)").exec(location.search) || [,"home"])[1];
	var a = (RegExp("action=(.+?)(&|$)").exec(location.search) || [,undefined])[1];
	var p = (RegExp("params=(.+?)(&|$)").exec(location.search) || [,undefined])[1];
	BP.pushState({module: m, action: a, params: p}, null, null);	
	
	// Init content management system
	BP.CMS.init();
	
	/**
	 * On popstate
	 */
	window.onpopstate = function(event)
	{
		if ( typeof event.state == "undefined" || event.state == null )
			return;
		else
		{
			var state = event.state;
			
			if ( state.module == "home" && BP.at("home") )
				state.params = "min";
			
			new ViewChangeEvent(ViewChangeEvent.VIEW_POPSTATE, state).dispatch();
		}
	};
});

/* ============================================================
 * VIDEOPLAYER'S ONREADY CALLBACK
 * ==========================================================*/

function onConnectionReady(playerId)
{
	var bpPlayer = null;
	
	if (navigator.appName.indexOf("Microsoft") != -1){
		bpPlayer = window[playerId];
	} else { 
		bpPlayer = document[playerId];
	}
	if (!bpPlayer) {
		alert("There was a problem while loading the video player.");
		return;
	}
	
	BP.bpPlayer = bpPlayer;
	
	if ( BP.selectedExercise )	
		BP.EM.loadExercise(bpPlayer, BP.selectedExercise);
	else if ( BP.params() != null )	
		BP.EM.loadExerciseFromContent(bpPlayer);
}