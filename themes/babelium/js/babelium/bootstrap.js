
/* ============================================================
 * INIT CONTROLLER
 * ==========================================================*/

BP.control = new Controller();

/*
 * ============================================================
 * BP SERVICES CALLER
 * ==========================================================
 */

// Try to connect to babeliums API
BP.Services = new ApiGateway();
BP.Services.getCommunicationToken();

// On communication with API successfully stabilized
BP.onCommunicationReady = function ()
{
	BP.EM = new ExerciseManager();
	BP.CM = new ConfigurationManager();
}

/*
 * ============================================================ 
 * LOAD SERVICES FROM A XML FILE
 * ==========================================================
 */

/**
 * Tag types:
 * <gateway id="{ID}" target="{URL}" type="{HTTP}" method="{get|post}"> 
 * <service id="{ID}" destination="{gatewayId}" class="{target module}" />
 */
$.get("themes/babelium/js/services.xml", null, function ( data, textStatus)
{
	var _httpGateways = {};
	
	// Find and store gateways in hashmap
	$(data).find("gateway").each(function()
	{
		var p = $(this);
		
		if ( p.attr("type") == "http" )
			_httpGateways[p.attr("id")] = {target: p.attr("target"), method: p.attr("method")};
	});
	
	// Find and create services for each entry
	$(data).find("service").each(function ()
	{
		var p = $(this); // XML item
		var g = _httpGateways[p.attr("destination")]; // Checks if gateway exists
		
		// return if destination is not valid
		if ( g == null )
			return;
		
		// Create HTTP Service: gateway + target module
		var hs = new Cairngorm.HTTPService(g, p.attr("class"));
		
		// Register HTTP Service: id + http service object
		Cairngorm.ServiceLocator.registerHttpService(p.attr("id"), hs);
	});
});


/*
 * ============================================================
 * INIT BABELIUM's CONTENT MANAGEMENT SYSTEM AND INITIAL STATUS
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
	
	if (compId == 'babeliumPlayer')
	{
		if ( BP.SM.at("practice") )
		{
			if ( BP.EM.selectedExercise )	
				BP.EM.loadSelectedExercise(swfComponent);
			else	
				BP.EM.loadExerciseFromContent(swfComponent);
		}
		else if ( BP.SM.at("evaluate") )
		{
			BP.EM.loadResponseFromContent(swfComponent);
		}
			
	} 
	else if (compId == 'babeliumMicTester')
		BP.CM.setupComponent(swfComponent, 'mic');
	else if (compId == 'babeliumWebcamTester')
		BP.CM.setupComponent(swfComponent, 'webcam');
}