
/* ============================================================
 * RemoteObject.as
 * ==========================================================*/

Cairngorm.HTTPService = Class.extend(
{
	/**
	 * Constructor
	 */
	POST : "post",
	GET : "get",
	
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

		if ( this.method == this.GET )
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
				error : responder.onFault
			});
		}
		else if ( this.method == this.POST )
		{
			var src = this.target + this.service;

			$.ajax(
			{
				// POST
				type: "POST",
				// Target url
				url : src,
				// Data
				data : params,
				// timeout in millis
				timeout : 5000,
				// The success call back.
				success : responder.onResult,
				// The error handler.
				error : responder.onFault
			});
		}
	}

});