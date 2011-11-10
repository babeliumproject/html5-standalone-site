
/* ============================================================
 * business/HTTPServices.as
 * ==========================================================*/

Cairngorm.HTTPServices = Class.extend(
{
	/**
	 * Constructor
	 */
	init : function ()
	{
		this.services = {};
	},
		
	/**
	 * Finds a service by name
	 * @param name : service id
	 * @return RemoteObject
	 */
	getService : function ( name )
	{
		return this.services[name];
	},
	
	/**
	 * Register a service identified by its id
	 * @param name : service id
	 * @param service : httpservice
	 */
	registerService : function ( name, service )
	{
		this.services[name] = service;
	}

});