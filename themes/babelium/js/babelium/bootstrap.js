
/* ============================================================
 * INIT CONTROLLER
 * ==========================================================*/

BP.control = new Controller();

/* ============================================================
 * BP SERVICES CALLER
 * ==========================================================*/

BP.Services = new ApiGateway();
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
	// Init state manager
	BP.SM.init();
	// Init content management system
	BP.CMS.init();
	
	/**
	 * On popstate
	 */
	window.onpopstate = BP.SM.onPopState;
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
	
	if ( BP.EM.selectedExercise )	
		BP.EM.loadSelectedExercise(bpPlayer);
	else	
		BP.EM.loadExerciseFromContent(bpPlayer);
}