
/* ============================================================
 * HOME MODULE DELEGATE
 * ==========================================================*/

BP.HomeDelegate = (function ()
{
	var _serviceID = "homeMOD";
	
	return {
		
		viewHomeModule : function ( responder, loadMotd )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			// Avoid reloading motd
			var params = (!loadMotd && BP.at("home")) ? "params=min" : null;
			_service.call( params, responder );
		},
		
		latestAvailableVideos : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( "action=latest&params=min", responder );
		},
		
		topScoreMostViewedVideos : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( "action=rated&params=min", responder );
		},
		
		latestUserActivity : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( "action=activity&params=min", responder );
		}
	};

})();