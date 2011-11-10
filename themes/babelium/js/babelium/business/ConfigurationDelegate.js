
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