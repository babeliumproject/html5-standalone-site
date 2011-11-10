
/* ============================================================
 * Auth MODULE DELEGATE
 * ==========================================================*/

BP.AuthDelegate = (function ()
{
	var _serviceID = "authMOD";

	return {

		processLogin : function ( responder, data )
		{
			if ( !data || typeof data.toJSONStr != "function" )
				return;

			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			var params = "action=login&params="+data.toBase64();
			_service.call( params, responder );
		},

		signOut : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			var params = "action=logout";
			_service.call( params, responder );
		}
	};

})();
