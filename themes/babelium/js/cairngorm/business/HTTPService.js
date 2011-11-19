
/* ============================================================
 * RemoteObject.as
 * ==========================================================*/

Cairngorm.HTTPService = Class.extend(
{
	/**
	 * Constructor
	 */
	init : function ( gateway, service )
	{
		this.target = gateway.target;
		this.method = gateway.method;
		this.service = service;
	},

	call : function ( params, responder ) 
	{
		if ( params == null )
			params = "";

		if ( this.method == "get" )
		{
			var src = this.target + this.service + "&" + params;

			$.ajax(
			{
				// Target url
				url : src,
				// timeout in millis
				timeout : 5000,
				// The success call back.
				success : responder.onResult,
				// The error handler.
				error : responder.onResult
			});
		}
	}

});