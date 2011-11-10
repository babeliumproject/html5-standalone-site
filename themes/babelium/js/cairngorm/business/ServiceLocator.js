
/* ============================================================
 * business/ServiceLocator.as
 * ==========================================================*/

Cairngorm.ServiceLocator = (function()
{
	// Private interface
	var _httpServices = new Cairngorm.HTTPServices();
	// TODO var _remoteObjects = null;
	// TODO var _webServices = null;
	
	// Public interface
	return {
		
		/**
		 * Finds http service by name
		 * @return HTTPService
		 */
		getHttpService : function ( name )
		{
			return _httpServices.getService(name);
		},
	
		/**
		 * Register a service identified by its id
		 * @param name : service id
		 * @param service : HTTPService
		 */
		registerHttpService : function ( name, service )
		{
			_httpServices.registerService(name, service);
		}
	};

})();