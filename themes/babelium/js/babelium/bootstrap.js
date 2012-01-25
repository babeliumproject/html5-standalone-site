
/* ============================================================
 * INIT CONTROLLER
 * ==========================================================*/

BP.control = new Controller();

/*
 * ============================================================ BP SERVICES
 * CALLER ==========================================================
 */

BP.Services = new ApiGateway();
BP.Services.getCommunicationToken();

BP.onCommunicationReady = function () {
	BP.EM = new ExerciseManager();
	BP.CM = new ConfigurationManager();
}

/*
 * ============================================================ LOAD SERVICES
 * FROM A XML FILE ==========================================================
 */

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


/*
 * ============================================================ INIT BABELIUM's
 * CONTENT MANAGEMENT SYSTEM AND INITIAL STATUS
 * ==========================================================
 */

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

/*
 * ==========================================================
 * SWF COMPONENT'S RED5 CONNECTION CALLBACK
 * ==========================================================
 */

function onConnectionReady(compId)
{
	var swfComponent = null;
	
	if (navigator.appName.indexOf("Microsoft") != -1){
		swfComponent = window[compId];
	} else { 
		swfComponent = document[compId];
	}
	if (!swfComponent) {
		alert("There was a problem while loading the SWF component.");
		return;
	}
	
	if(compId == 'babeliumPlayer'){
		if ( BP.EM.selectedExercise )	
			BP.EM.loadSelectedExercise(swfComponent);
		else	
			BP.EM.loadExerciseFromContent(swfComponent);
	} 
	if(compId == 'babeliumMicTester'){
		BP.CM.setupComponent(swfComponent, 'mic');
	}
	if(compId == 'babeliumWebcamTester'){
		BP.CM.setupComponent(swfComponent, 'webcam');
	}
}