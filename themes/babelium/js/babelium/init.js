
/* ============================================================
 * INIT CONTROLLER
 * ==========================================================*/

BP.control = new Controller();

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
 * INIT BABELIUM's CONTENT MANAGEMENT SYSTEM
 * ==========================================================*/

$(document).ready(function()
{
	// Retrieve module and action from location
	var m = (RegExp("module=(.+?)(&|$)").exec(location.search) || [,"home"])[1];
	var a = (RegExp("action=(.+?)(&|$)").exec(location.search) || [,undefined])[1];
	BP.pushState({module: m, action: a}, null, null);	
	
	// Init content management system
	BP.CMS.init();
	
	/**
	 * On popstate
	 */
	window.onpopstate = function(event)
	{
		if ( typeof event.state == 'undefined' || event.state == null )
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