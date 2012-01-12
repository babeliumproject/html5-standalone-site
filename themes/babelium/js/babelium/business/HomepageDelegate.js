
/* ============================================================
 * HOME MODULE DELEGATE
 * ==========================================================*/

BP.HomeDelegate = (function ()
{
	var _serviceID = "home";
	
	return {
		
		viewHomeModule : function ( responder, loadMotd )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			// Avoid reloading motd
			var params = (!loadMotd && BP.SM.at("home")) ? {state : "min"} : null;
			_service.call( params, responder );
		},
		
		latestAvailableVideos : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( {action : "latest", state: "min"}, responder );
		},
		
		topScoreMostViewedVideos : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( {action : "rated", state: "min"}, responder );
		},
		
		latestUserActivity : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( {action : "activity", state: "min"}, responder );
		}
	};

})();