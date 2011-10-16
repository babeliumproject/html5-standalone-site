/**
 * ==========================================================
 * 
 * This is not an official port of Cairngorm MVC Framework
 * @author Babelium Project -> http://www.babeliumproject.com
 * 
 * ==========================================================
 * 
 * @source Cairngorm (Flex) Open Source Code:
 * http://sourceforge.net/adobe/cairngorm/code/839/tree/cairngorm/trunk/frameworks/cairngorm/com/adobe/cairngorm/
 * @source Simple Javascript Inheritance (./base.js):
 * http://ejohn.org/blog/simple-javascript-inheritance/#postcomment
 * @source Singleton Pattern w and w/o private members:
 * http://stackoverflow.com/questions/1479319/simplest-cleanest-way-to-implement-singleton-in-javascript
 * 
 */

/* ============================================================
 * control/FrontController.as
 * ==========================================================*/

var Cairngorm = {};

Cairngorm.FrontController = Class.extend(
{
	/**
	 * Constructor
	 */
	init : function ()
	{
		this.commands = {};
	},
	
	/**
	 * Add command
	 * @param evType = Event Type (String)
	 * @param commandRef = Class
	 */
	addCommand : function (evType, commandRef)
	{	
		if ( evType == null )
			return;
		
		this.commands[evType] = commandRef;
		Cairngorm.EventDispatcher.addEventListener(evType, this);
	},
	
	/**
	 * Remove Command
	 * @param commandName = String
	 */
	removeCommand : function ( commandName )
	{
		if ( commandName == null )
			return;
		
		this.commands[commandName] = null;
		delete this.commands[commandName];
	},
	
	/**
	 * Execute Command
	 * @param ev = CairngormEvent
	 */
	executeCommand : function ( ev )
	{
		new this.commands[ev.type](ev.data).execute();
	}
});


/* ============================================================
 * control/CairngormEventDispatcher.as
 * ==========================================================*/

Cairngorm.EventDispatcher = (function()
{
	// Private interface
	var _listeners = {};
	
	// Public interface
	return {
		
		/**
		 * Add Event Listener
		 * @param type = Event Type (String)
		 * @param listener = function
		 */
		addEventListener : function ( type, listener )
		{
			if ( type != null && typeof listener.executeCommand == 'function' )
				_listeners[type] = listener;
		},
		
		/**
		 * Dispatch event
		 * @param ev = Cairngorm Event
		 */
		dispatchEvent : function ( ev )
		{	
			if ( _listeners[ev.type] != null )
				_listeners[ev.type].executeCommand(ev);
		}
	};
})();

/* ============================================================
 * control/CairngormEvent.as
 * ==========================================================*/

Cairngorm.Event = Class.extend(
{	
	/**
	 * Constructor
	 * @param type = String
	 */
	init : function ( type, data )
	{
		this.type = type;
		this.data = data != null ? data : {};
	},
	
	/**
	 * Dispatch Cairngorm Event 
	 */
	dispatch : function ()
	{
		return Cairngorm.EventDispatcher.dispatchEvent(this);
	}
});


/* ============================================================
 * command/Command.as
 * ==========================================================*/

Cairngorm.Command = Class.extend(
{	
	/**
	 * Constructor
	 */
	init : function ( data )
	{
		this.data = data;
	},
	
	/**
	 * Execute an action
	 */
	execute : function () {}
});


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
				error : responder.onFault
			});
		}
	}

});


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


/* ============================================================
 * vo/ValueObject.as
 * ==========================================================*/

Cairngorm.VO = Class.extend(
{
	init : function (){},
	
	/**
	 * Convert this object's properties
	 * to json object
	 */
	toJSON : function ()
	{
		var jsonObj = {};
		
		for ( var i in this )
			if ( typeof this[i] != "function" )
				jsonObj[i] = this[i];
		
		return jsonObj;
	},
	
	/**
	 * Convert this object's properties
	 * to json string
	 */
	toJSONStr : function ()
	{
		var jsonStr = "{";
		
		for ( var i in this.toJSON() )
		{
			if ( jsonStr.length != 1 )
				jsonStr += ",";

			jsonStr += '"' + i + '": "' + this[i] + '"';
		}
		
		jsonStr += "}";
		
		return jsonStr;
	},
	
	/**
	 * Convert this to base64
	 */
	toBase64 : function ()
	{
		return Base64.encode(this.toJSONStr());
	}
	
});