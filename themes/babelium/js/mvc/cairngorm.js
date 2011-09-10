/**
 * This is not an official port of Cairngorm MVC Framework
 * @author Babelium Project -> http://www.babeliumproject.com
 * @source http://sourceforge.net/adobe/cairngorm/code/839/tree/cairngorm/trunk/frameworks/cairngorm/com/adobe/cairngorm/
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
		this.self = "Super";
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
		new this.commands[ev.type]().execute();
	}
});


/* ============================================================
 * control/CairngormEventDispatcher.as
 * ==========================================================*/

Cairngorm.EventDispatcher =
{
	// Listeners hash map
	listeners : {},

	/**
	 * Add Event Listener
	 * @param type = Event Type (String)
	 * @param listener = function
	 */
	addEventListener : function ( type, listener )
	{
		if ( type != null && typeof listener.executeCommand == 'function' )
			this.listeners[type] = listener;
	},
	
	/**
	 * Dispatch event
	 * @param ev = Cairngorm Event
	 */
	dispatchEvent : function ( ev )
	{	
		if ( this.listeners[ev.type] != null )
			this.listeners[ev.type].executeCommand(ev);
	}
};


/* ============================================================
 * control/CairngormEvent.as
 * ==========================================================*/

Cairngorm.Event = Class.extend(
{	
	/**
	 * Constructor
	 * @param type = String
	 */
	init : function ( type )
	{
		this.type = type;
		this.data = {};
	},
	
	/**
	 * Dispatch Cairngorm Event 
	 */
	dispatch : function ()
	{
		return Cairngorm.EventDispatcher.dispatchEvent(this);
	},
	
	/**
	 * Set data
	 * @param data = Object
	 */
	setData : function ( data )
	{
		this.data = data;
	},
	
	/**
	 * Get data
	 */
	getData : function ()
	{
		return this.data;
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
	init : function ()
	{
		this.commands = {};
	},
	
	/**
	 * Execute an action
	 */
	execute : function () {}
});
