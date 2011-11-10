
/* ============================================================
 * SUBTITLE MODULE DELEGATE
 * ==========================================================*/

BP.SubtitleDelegate = (function ()
{
	var _serviceID = "subsMOD";
	
	return {
		
		viewSubtitleModule : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( null, responder );
		}
	};

})();