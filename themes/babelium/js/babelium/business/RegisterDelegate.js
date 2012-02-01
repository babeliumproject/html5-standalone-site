
/* ============================================================
 * REGISTER MODULE DELEGATE
 * ==========================================================*/

BP.RegisterDelegate = (function ()
{
	var _serviceID = "register";
	
	return {
		
		viewRegisterModule : function ( responder )
		{
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			_service.call( null, responder );
		},
		
		processRegister : function (responder, user){
			if ( !user || typeof user.toBase64 != "function" )
				return;
			
			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			var params = {action : "newUser", params : user.toBase64()};
			_service.call( params, responder );
			
		}
		/* This method shouldn't be called from JS
		,
		activateUser : function (responder, user){
			if ( !user || typeof user.toBase64 != "function" )
				return;

			var _service = Cairngorm.ServiceLocator.getHttpService(_serviceID);
			var params = {action : "activate", params : user.toBase64()};
			_service.call( params, responder );
		}*/
	
	};

})();