
/* ============================================================
 * CONFIG MODULE DELEGATE
 * ==========================================================*/

BP.ConfigDelegate = (function ()
{
	var _serviceID = "config";
	
	return {
		
		viewConfigModule : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( null, responder );
		}
	};

})();