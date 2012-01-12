

/* ============================================================
 * ABOUT MODULE DELEGATE
 * ==========================================================*/

BP.AboutDelegate = (function ()
{
	var _serviceID = "about";
	
	return {
		
		viewAboutModule : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( null, responder );
		}
	};

})();